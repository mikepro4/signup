var fs = require('fs');
var wrench = require('wrench');
var hash = require('./lib/hash');
var bless = require('./lib/bless.js')
var shell = require('shelljs');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['build', 'tmp', 'signup-*'],
            tmp: ['tmp'],
            currentVersion: ['currentVersion.*.txt']
        },
        build: {
            release: 'signup' + grunt.template.today('-yyyymmdd-HHMMss-')
            + shell.exec('git rev-parse --short HEAD', { silent: true }).output.toString().trim(),
            releasePattern: /signup-[0-9]{8}-[0-9]{6}-[a-f0-9]{7}\.tar\.gz/
        },
        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**/*.jsx'],
                        dest: 'tmp',
                        ext: '.js'
                    }
                ]
            }
        },
        requirejs: {
            build: {
                options: {
                    appDir: 'tmp',
                    dir: 'build',
                    baseUrl: 'assets/javascripts',
                    mainConfigFile: 'tmp/assets/javascripts/dependencies.js',
                    done: function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);
                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }
                        grunt.log.ok("No duplicate requirejs modules found.");
                        done();
                    },
                    modules: [
                        {
                            name: 'application'
                        }
                    ],
                    preserveLicenseComments: false,
                    optimize: 'uglify2',
                    uglify2: {
                        compress: {
                            sequences: true,
                            drop_debugger: true,
                            join_vars: true,
                            drop_console: true,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false,
                        mangle: true
                    },
                    generateSourceMaps: false,
                    skipDirOptimize: true,
                    removeCombined: true, // TODO fix issues with hbs
                    logLevel: 2,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\.|\.css/, // /^\.|node_modules|Gruntfile|Gulpfile|\.md|package.json|.../
                    inlineText: true
                }
            }
        },
        less: {
            build: {
                files: {
                    'build/assets/stylesheets/application.css': 'app/assets/stylesheets/application.less'
                },
                options: {
                    compress: true,
                    cleancss: true,
                    ieCompat: true,
                    report: 'gzip',
                    sourceMap: false
                }
            }
        },
        blesscss: {
            split: {
                files: '<%= less.build.files %>',
                result: []
            }
        },
        fingerprint: {
            javascripts: {
                modules: '<%= requirejs.build.options.modules %>',
                files: []
            },
            stylesheets: {
                path: 'assets/stylesheets',
                files: []
            },
            fonts: {
                path: 'assets/fonts',
                files: []
            },
            images: {
                path: 'assets/images',
                files: []
            }
        },
        replace: {
            html: {
                src: ['app/index.html'],
                dest: 'build/index.html',
                replacements: [{
                    from: 'jsx!',
                    to: ''
                }, {
                    from: /data-main="[^"]+"/, // javascripts
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var javascript = grunt.config.get('fingerprint').javascripts.files[0];
                        grunt.log.ok("updating HTML with fingerprinted javascript: '" + javascript + "'");
                        return 'data-main="' + '/' + javascript + '"';
                    }
                }, {
                    from: /(\ +)<link type="text\/css".*/, // stylesheets
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var stylesheets = grunt.config.get('fingerprint').stylesheets.files,
                            output = '';
                        for (var i = 0; i < stylesheets.length; i++) {
                            grunt.log.ok("updating HTML with fingerprinted stylesheet: '" + stylesheets[i] + "'");
                            output += regexMatches[0] + '<link type="text/css" href="' + '/' + stylesheets[i]
                            + '" rel="stylesheet" media="all">'
                            + (stylesheets.length > 1 && stylesheets.length - 1 !== i ? '\n' : '');
                        }
                        return output;
                    }
                }]
            },
            tmp: {
                src: ['tmp/**/*.js'],
                overwrite: true,
                replacements: [{
                    from: 'jsx!',
                    to: ''
                }]
            }
        },
        copy: {
            tmp: {
                expand: true,
                cwd: 'app',
                src: ['**/*.js', '**/*.ttf', '*.json'],
                dest: 'tmp'
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**/*'],
                        dest: '<%= build.release %>'
                    }
                ]
            }
        },
        compress: {
            build: {
                options: {
                    archive: '<%= build.release %>' + '.tar.gz',
                    mode: 'tgz',
                    pretty: true
                },
                files: [
                    {
                        src: ['<%= copy.build.files[0].dest %>' + '/**/*']
                    }
                ]
            }
        },
        s3: {
            options: {
                key: process.env.COMPSTAK_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID
                || process.env.AWS_ACCESS_KEY || '',
                secret: process.env.COMPSTAK_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
                || process.env.AWS_SECRET_KEY || '',
                bucket: 'compstak'
            },
            publish: {
                upload: [
                    {
                        src: '<%= compress.build.options.archive %>',
                        dest: 'deploy/signup/' + '<%= compress.build.options.archive %>'
                    }
                ]
            },
            deploy: {
                upload: [
                    {
                        src: null,
                        dest: 'deploy/signup/'
                    }
                ]
            }
        },
        deploy: {
            staging: {
                release: null
            },
            uat: {
                release: null
            },
            prod: {
                release: null
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './app/bower_components',
                    cleanTargetDir: true,
                    copy: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-s3');

    grunt.registerMultiTask('fingerprint', 'fingerprint assets', function () {
        var appPath = grunt.config.get('requirejs').build.options.appDir;     // signup
        var basePath = grunt.config.get('requirejs').build.options.baseUrl;   // assets/javascripts
        var buildPath = grunt.config.get('requirejs').build.options.dir;      // build

        var fingerprints = {};
        var fingerprint = function (files, path) {
            files.forEach(function (filename) {
                var file = fs.readFileSync(path + '/' + filename);
                var stat = fs.statSync(path + '/' + filename);
                var size = stat.size;
                var mtime = stat.mtime;
                var fingerprint = (new Number(size)).toString(36) + '-' + hash(file, "crc32") + 0x80000000;
                fingerprints[filename] = filename.replace(/(\.[\w\d_-]+)$/i, '-' + fingerprint + '$1');
            });
        };
        switch (this.target) {
            case 'javascripts':
                fingerprint(grunt.config.get('requirejs').build.options.modules.map(function (module) {
                    return 'assets/javascripts/' + module.name + '.js';
                }), buildPath);
                grunt.config.set('fingerprint.javascripts.files', Object.keys(fingerprints).map(function (key) {
                    return fingerprints[key];
                }));
                break;
            case 'stylesheets':
                fingerprint(grunt.config.get('blesscss').split.result.map(function (filename) {
                    return filename;
                }), buildPath);
                grunt.config.set('fingerprint.stylesheets.files', Object.keys(fingerprints).map(function (key) {
                    return fingerprints[key];
                }));
                break;
            case 'images':
            case 'fonts':
                if (grunt.file.exists(buildPath + '/' + this.data.path)) {
                    var files = [];
                    files = wrench.readdirSyncRecursive(buildPath + '/' + this.data.path);
                    fingerprint(files.map(function (f) {
                        return this.data.path + '/' + f;
                    }.bind(this)), buildPath);
                }
                break;
        }
        for (var source in fingerprints) {
            grunt.file.copy(buildPath + '/' + source, buildPath + '/' + fingerprints[source]);
            // grunt.file.delete(source); // TODO keep non-fingerprinted assets for debugging purposes
            grunt.log.ok(source + ' => ' + fingerprints[source]);
        }
    });

// splits the CSS file in case it doesn't respect IE6-9 CSS limitations
    grunt.registerMultiTask('blesscss', 'split CSS', function () {
        var buildPath = grunt.config.get('requirejs').build.options.dir;
        var input = Object.keys(this.data.files).pop();
        var result = bless({ input: input, output: input });
        grunt.config.set('blesscss.split.result', result.files.map(function (filename) {
            return filename.substring((buildPath + '/').length);
        }));
        grunt.log.ok(result.message);
        for (var filename in result.files) {
            grunt.log.ok(result.files[filename]);
        }
    });

    grunt.registerMultiTask('deploy', 'deploy the signup frontend application', function (release) {
        grunt.task.clearQueue(); // makes sure there's only one environment being deployed at the same time
        if (typeof release === 'undefined' || !grunt.config.get('build.releasePattern').test(release)) {
            var files = fs.readdirSync('./').filter(function (file) {
                return grunt.config.get('build.releasePattern').test(file);
            }).sort(function (a, b) {
                return (fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());
            });
            if (files.length === 0) {
                grunt.log.error('no releases available for deployment');
                return false;
            } else {
                release = files[0];
            }
        }
        var currentVersionFilename = 'currentVersion.' + this.target + '.txt';
        if (fs.existsSync(currentVersionFilename)) {
            fs.unlinkSync(currentVersionFilename);
        }
        grunt.log.ok('setting currentVersion.' + this.target + '.txt to ' + release);
        grunt.file.write(currentVersionFilename, release);
        grunt.config.set('s3.deploy.upload', [
            {
                src: currentVersionFilename,
                dest: grunt.config.get('s3.deploy.upload')[0].dest + currentVersionFilename
            }
        ]);
        grunt.task.run('s3:deploy');
    });

    grunt.registerTask('server', ['express:dev', 'watch']);
    grunt.registerTask('test', ['express:dev', 'saucelabs-mocha']);
    grunt.registerTask('build', [
        'clean:all',
        'bower:install',
        'react',
        'copy:tmp',
        'replace:tmp',
        'requirejs',
        'clean:tmp',
        'less',
        'blesscss',
        'fingerprint',
        'replace:html',
        'copy:build',
        'compress',
        's3:publish'
    ]);

};

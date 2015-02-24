/*
 * bless.js CSS Post-Processor library from: https://github.com/paulyoung/bless.js
 *
 */

// dependencies
var path = require('path'),
    util = require('util'),
    console = require('console'),
    fs = require('fs');

//
// lib/bless/parser.js START
//
var Parser = function (env) {
    this.env = env = env || {};
    var output = this.env.output,
        options = this.env.options;

    //
    // The Parser
    //
    return parser = {
        //
        // Parse an input string,
        // call `callback` when done.
        //
        parse: function (str, callback) {
            var files = [],
                error = null,
                limit = 4095,
                selectors = str.match(/(,|\{)/g),
                rules = str.match(/([^\{]+\{(?:[^\{\}]|\{[^\{\}]*\})*\})/g),
                numSelectors = 0;

            if (!selectors) {
                files.push({
                    filename: output,
                    content: str
                });
                callback(error, files, numSelectors);
                return;
            }

            var ext = path.extname(output),
                filename = path.basename(output, ext),
                offset = 0,
                selectorCount = 0;

            for (var i = 0, length = rules.length; i < length; i++) {
                var matchCount,
                    matchArray = [],
                    regex = /(?:\s*@media\s*[^\{]*(\{))?(?:\s*(?:[^,\{]*(?:(,)|(\{)(?:[^\}]*\}))))/g,
                    rule = rules[i];

                do {
                    var no_comments = rule.replace(/(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)/g, '');
                    var matches = regex.exec(no_comments);

                    if (matches) {
                        for (m = 1, matchesLength = matches.length; m < matchesLength; m++) {
                            var match = matches[m];
                            if (match) {
                                matchArray.push(match);
                            }
                        }
                    }
                } while (matches);

                matchCount = matchArray.length;

                if (selectorCount + matchCount > limit) {
                    var slice = rules.slice(offset, i);

                    if (slice.length > 0) {
                        slice[0] = slice[0].replace(/^\s+/, '');

                        files.push({
                            content: slice.join('')
                        });
                    }

                    offset = i;
                    selectorCount = 0;
                }

                numSelectors += matchCount;
                selectorCount += matchCount;
            }

            rules = rules.slice(offset);

            var filesLength = files.length;

            for (var j = 0; j < filesLength; j++) {
                files[j]['filename'] = output.replace(ext, '-' + (filesLength - j) + ext);
            }

            if (filesLength > 0 && options.imports) {
                for (var k = 1; k <= filesLength; k++) {
                    var outputFilename = filename + '-' + k + ext;
                    if (options.cacheBuster) {
                        outputFilename += cacheBuster;
                    }
                    var importStr = '@import url(\'' + outputFilename + '\');';
                    importStr = options.compress ? importStr : importStr + '\n';
                    rules.unshift(importStr);
                }
            }

            files.push({
                filename: output,
                content: rules.join('')
            });

            callback(error, files, numSelectors);
        }
    }
};

Parser.cleanup = function (options, output, callback) {
    var error = null,
        dir = path.dirname(output),
        ext = path.extname(output),
        filename = path.basename(output, ext),
        fileRegex = filename + '-' + '(\\d+)' + ext;

    if (options.cacheBuster) {
        fileRegex += cacheBuster;
    }

    var importRegex = '@import url\\(\'(' + fileRegex + '\')\\);';

    fs.readFile(output, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }

        var importsMatch = data.match(importRegex),
            importIndex = 0;
        if (importsMatch) {
            importIndex = importsMatch[2];
        }

        fs.readdir(dir, function (err, filenames) {
            if (err) {
                callback(err);
            }

            var files = [];

            for (i in filenames) {
                var file = filenames[i],
                    match = file.match(fileRegex);
                if (match) {
                    if (parseInt(match[1], 10) > importIndex) {
                        files.push(path.join(dir, file));
                    }
                }
            }

            callback(err, files);
        });
    });
};
//
// lib/bless/parser.js END
//

//
// bin/blessc START
//
function noun(noun, variable) {
    if (variable != 1) {
        noun += 's';
    }
    return noun;
}

function formatNumber(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
}

var parseCss = function (input, data, output, options) {
    var result = {};
    var parser = new (Parser)({
        output: output,
        options: options
    });
    parser.parse(data, function (err, files, numSelectors) {
        if (err) {
            throw err;
            process.exit(1);
        } else {
            try {
                var selectorNoun = noun('selector', numSelectors);
                numSelectors = formatNumber(numSelectors);
                var message = 'Source CSS file contained ' + numSelectors + ' ' + selectorNoun + '.',
                    numFiles = files.length,
                    fileNoun = noun('file', numFiles);

                if (numFiles > 1 || input != output) {
                    for (var i in files) {
                        var file = files[i],
                            fd = fs.openSync(file.filename, 'w');
                        fs.writeSync(fd, file.content, 0, 'utf8');
                    }
                    message += ' ' + numFiles + ' CSS ' + fileNoun + ' created.';

                } else {
                    message += ' No changes made.';
                }

                result.message = message;
                result.files = files.map(function (f) {
                    return f.filename;
                }).reverse(); // fix order to make <link> element insertion easier

//                    return {
//                        message: message,
//                        files: files.map(function (f) { return f.filename; })
//                    };
//
//                    Parser.cleanup(options, output, function (err, files) {
//                        if (err) {
//                            throw err;
//                            process.exit(1);
//                        } else {
//                            var oldVerb;
//
//                            for (var i in files) {
//                                var file = files[i];
//
//                                if (!options.cleanup) {
//                                    oldVerb = 'renamed';
//                                    var ext = path.extname(file),
//                                        dest = file.replace(ext, '-old' + ext),
//                                        read = fs.createReadStream(file),
//                                        write = fs.createWriteStream(dest);
//
//                                    read.on('end', function (err) {
//                                        if (err) {
//                                            throw err;
//                                            process.exit(1);
//                                        }
//                                    });
//
//                                    util.pump(read, write);
//                                } else {
//                                    oldVerb = 'removed';
//                                }
//
//                                fs.unlink(files[i], function (err) {
//                                    if (err) {
//                                        throw err;
//                                        process.exit(1);
//                                    }
//                                });
//                            }
//
//                            var numOld = files.length;
//
//                            if (numOld > 0) {
//                                var removedFileNoun = noun('file', numOld);
//                                message += ' Additional CSS ' + removedFileNoun + ' no longer needed. ' + numOld + ' additional ' + removedFileNoun + ' ' + oldVerb + '.';
//                            }
//
//                            console.log('blessc: ' + message);
//                        }
//                    });

            } catch (e) {
                throw e;
                process.exit(2);
            }
        }
    });
    return result;
};

module.exports = function (options) {
    return parseCss(options.input, fs.readFileSync(options.input, { encoding: 'utf-8' }), options.output, {});
};

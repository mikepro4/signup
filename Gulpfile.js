var gulp       = require('gulp');
var less       = require('gulp-less');
var gutil      = require('gulp-util');
var livereload = require('gulp-livereload');
var watch      = require('gulp-watch');
var plumber    = require('gulp-plumber');
var concat     = require('gulp-concat');
var declare    = require('gulp-declare');
var path       = require('path');
var async      = require('async');
var fs         = require('fs');
var glob       = require('glob');
var util       = require('util');

//based on: http://rhumaric.com/2014/01/livereload-magic-gulp-style/

// root dir for our static assets, 
// must not start with "./" or "/" as this breaks detecting new files being added -_-
var APP_ROOT = 'app';
//var APP_ROOT = 'build';
var TESTS_ROOT = 'test';

// constants for http and livereload ports
var HTTP_PORT       = 7000;
var LIVERELOAD_PORT = 35800;

var GENERATED_ASSETS = [
  APP_ROOT + '/js/templates/**/*.js',
  APP_ROOT + '/js/brewed/**/*.js',
  APP_ROOT + '/css/**/*.css'
];

gulp.task('clean', function cleanGeneratedAssets (next) {
  gutil.log('cleaning generated assets...');
  
  return  async.each(GENERATED_ASSETS, function globFiles (assetGlob, callback) {
    return glob(assetGlob, function deleteGlobbedFiles(err, files) {
      if (err) return callback(err);

      gutil.log('cleaning files for [' + assetGlob + "]: \n" + util.inspect(files));

      return async.each(files, fs.unlink, callback);
    });
  }, function doneCleaning (err) {
    if (err) {
      gutil.log('error while cleaning assets:');
      gutil.log(err);
    } else {
      gutil.log('successfully cleaned generated assets!');
    }

    return next();
  });
});


var expressApp 
gulp.task('express', ['clean'], function startExpress (next) {
  if (undefined !== expressApp) {
    return next();
  }

  var express = require('express');
  
  expressApp = express();
  expressApp.use(express.static(APP_ROOT));
  expressApp.use('/test', express.static(TESTS_ROOT));

  // Add a catch all route which renders index.html
  // This should prevent us from rewriting every route with nginx.
  // We only use node in dev this should be ok.
  // expressApp.get('/*', function(req, res){
  //   res.sendfile('index.html', {root: './' + APP_ROOT});
  // });

  expressApp.listen(HTTP_PORT, function onListen () {
    gutil.log('Dark Crystal server listening on http://localhost:' + HTTP_PORT);

    return next();
  });
});

var liveReloadServer;
gulp.task('livereload', ['clean'], function startLivereload (next) {
  if (undefined !== liveReloadServer) {
    // its already running, skip step
    return next();
  }

  var tinylr = require('tiny-lr');

  liveReloadServer = tinylr();
  liveReloadServer.listen(LIVERELOAD_PORT, function onListen (err) {
    if (err) return gutil.log(err);

    return next();
  });
});

gulp.task('less', ['express', 'livereload'], function brewLess () {
    watch({glob: APP_ROOT + '/**/*.less'}, function() {
        return  gulp.src(APP_ROOT + '/assets/stylesheets/application.less')
                .pipe(plumber())
                .pipe(less({
                  paths: [ path.join(APP_ROOT, 'less', 'includes') ]
                }).on('error', function(err){
                  gutil.log(err);
                  this.emit('end');
                }))
                .pipe(gulp.dest(APP_ROOT + '/assets/stylesheets/'))
                .pipe(livereload(liveReloadServer));
    });
});

gulp.task('images', ['express', 'livereload'], function brewImages () {
  watch({
    name: 'images',
    glob: APP_ROOT + '/assets/images/**/*'
  })
    .pipe(plumber())
    .pipe(livereload(liveReloadServer))
})

gulp.task('html', ['express', 'livereload'], function brewHtml () {
  watch({ 
    name: 'html',
    glob: APP_ROOT + '/**/*.html' 
  })
    .pipe(plumber())
    .pipe(livereload(liveReloadServer))
})

gulp.task('javascripts', ['express', 'livereload'], function brewJavaScript () {
  watch({
    name: 'javascripts',
    glob: [APP_ROOT + '/assets/javascripts/**/*.js', APP_ROOT + '/assets/javascripts/**/*.jsx']
  })
    .pipe(plumber())
    .pipe(livereload(liveReloadServer))
})

gulp.task('test_javascripts', ['express', 'livereload'], function brewJavaScript () {
  watch({
    name: 'test_javascripts',
    glob: TESTS_ROOT + '/**/*.js'
  })
    .pipe(plumber())
    .pipe(livereload(liveReloadServer))
})

gulp.task('default', ['less', 'images', 'html', 'javascripts'])

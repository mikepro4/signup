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

// constants for http and livereload ports
var HTTP_PORT       = 7000;
var LIVERELOAD_PORT = 35800;

var expressApp
gulp.task('express', function (next) {
  if (undefined !== expressApp) {
    return next();
  }
  var express = require('express');
  
  expressApp = express();
  expressApp.use(express.static(APP_ROOT));

  expressApp.listen(HTTP_PORT, function onListen () {
    gutil.log('Dark Crystal server listening on http://localhost:' + HTTP_PORT);

    return next();
  });
});

var liveReloadServer;
gulp.task('livereload', function startLivereload (next) {
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

gulp.task('default', ['less', 'images', 'html', 'javascripts'])

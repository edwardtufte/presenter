(function() {
  var coffee, concat, gulp, gutil, handleError, jade, plumber, stylus;

  gulp = require('gulp');

  stylus = require('gulp-stylus');

  jade = require('gulp-jade');

  coffee = require('gulp-coffee');

  concat = require('gulp-concat');

  gutil = require('gulp-util');

  plumber = require('gulp-plumber');

  handleError = function(taskName) {
    return function() {
      gutil.beep.apply(arguments);
      return gutil.log.apply(arguments);
    };
  };

  gulp.task('gulp', function() {
    return gulp.src(['./gulpfile.coffee']).pipe(coffee()).pipe(gulp.dest('./'));
  });

  gulp.task('coffee', function() {
    var coffeeStream, e;
    coffeeStream = coffee().on('error', handleError('coffee'));
    try {
      return gulp.src(['./coffee/setup.coffee', './coffee/mockData.coffee', './coffee/AppView.coffee', './coffee/SectionModel.coffee', './coffee/SectionCollection.coffee', './coffee/SectionView.coffee', './coffee/SectionsView.coffee', './coffee/app.coffee']).pipe(plumber()).pipe(coffeeStream).pipe(concat("app.js")).pipe(gulp.dest('./js/'));
    } catch (_error) {
      e = _error;
      return gutil.log(e);
    }
  });

  gulp.task('plugins', function() {
    return gulp.src(['./js/jquery.js', './js/jquery-ui.js', './js/underscore.js', './js/backbone.js', './js/d3.js', './js/medium-editor.js']).pipe(plumber()).pipe(concat("plugins.js")).pipe(gulp.dest('./js/'));
  });

  gulp.task('stylus', function() {
    var stylusStream;
    stylusStream = stylus({
      use: ['nib']
    }).on('error', handleError('stylus'));
    return gulp.src('./styl/index.styl').pipe(plumber()).pipe(stylusStream).pipe(gulp.dest('./css/'));
  });

  gulp.task('jade', function() {
    var jadeStream;
    jadeStream = jade({
      pretty: true
    }).on('error', handleError('jade'));
    return gulp.src('./jade/*').pipe(plumber()).pipe(jadeStream).pipe(gulp.dest('./'));
  });

  gulp.task('watch-coffee', function() {
    return gulp.watch('./coffee/*', function() {
      return gulp.run('coffee');
    });
  });

  gulp.task('watch-stylus', function() {
    return gulp.watch('./styl/*', function() {
      return gulp.run('stylus');
    });
  });

  gulp.task('watch-jade', function() {
    return gulp.watch('./jade/*', function() {
      return gulp.run('jade');
    });
  });

  gulp.task('default', function() {
    return gulp.run('coffee', 'stylus', 'jade', 'plugins', 'watch-coffee', 'watch-jade', 'watch-stylus');
  });

}).call(this);

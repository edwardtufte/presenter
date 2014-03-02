(function() {
  var coffee, gulp, jade, stylus;

  gulp = require('gulp');

  stylus = require('gulp-stylus');

  jade = require('gulp-jade');

  coffee = require('gulp-coffee');

  gulp.task('coffee', function() {
    return gulp.src('./coffee/*').pipe(coffee()).pipe(gulp.dest('./js/'));
  });

  gulp.task('stylus', function() {
    return gulp.src('./styl/index.styl').pipe(stylus({
      use: ['nib']
    })).pipe(gulp.dest('./css/'));
  });

  gulp.task('jade', function() {
    return gulp.src('./jade/*').pipe(jade({
      pretty: true
    })).pipe(gulp.dest('./'));
  });

  gulp.task('default', function() {
    gulp.run('coffee', 'stylus', 'jade');
    gulp.watch('./coffee/*', function() {
      return gulp.run('coffee');
    });
    gulp.watch('./styl/*', function() {
      return gulp.run('stylus');
    });
    return gulp.watch('./jade/*', function() {
      return gulp.run('jade');
    });
  });

}).call(this);

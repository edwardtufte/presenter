(function() {
  var coffee, concat, gulp, jade, stylus;

  gulp = require('gulp');

  stylus = require('gulp-stylus');

  jade = require('gulp-jade');

  coffee = require('gulp-coffee');

  concat = require('gulp-concat');

  gulp.task('gulp', function() {
    return gulp.src(['./gulpfile.coffee']).pipe(coffee()).pipe(gulp.dest('./'));
  });

  gulp.task('coffee', function() {
    return gulp.src(['./coffee/setup.coffee', './coffee/AppView.coffee', './coffee/SectionModel.coffee', './coffee/SectionCollection.coffee', './coffee/SectionView.coffee', './coffee/SectionsView.coffee', './coffee/app.coffee']).pipe(coffee()).pipe(concat("app.js")).pipe(gulp.dest('./js/'));
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

gulp = require('gulp')
stylus = require('gulp-stylus')
jade = require('gulp-jade')
coffee = require('gulp-coffee')

gulp.task 'coffee', ->
  gulp.src('./coffee/*')
    .pipe(coffee())
    .pipe(gulp.dest('./js/'))

gulp.task 'stylus', ->
  gulp.src('./styl/index.styl')
    .pipe(stylus({use: ['nib']}))
    .pipe(gulp.dest('./css/'))

gulp.task 'jade', ->
  gulp.src('./jade/*')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./'))

gulp.task 'default', ->

  gulp.run 'coffee', 'stylus', 'jade'

  gulp.watch './coffee/*', ->
    gulp.run 'coffee'

  gulp.watch './styl/*', ->
    gulp.run 'stylus'

  gulp.watch './jade/*', ->
    gulp.run 'jade'

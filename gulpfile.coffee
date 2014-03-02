gulp = require('gulp')
stylus = require('gulp-stylus')
jade = require('gulp-jade')
coffee = require('gulp-coffee')
concat = require('gulp-concat')
gutil = require('gulp-util')

handleError = (taskName) ->
  return ->
    gutil.beep.apply(arguments)
    gutil.log.apply(arguments)


gulp.task 'gulp', ->
  gulp.src(['./gulpfile.coffee']).pipe(coffee())
    .pipe(gulp.dest('./'))

gulp.task 'coffee', ->

  coffeeStream = coffee()
    .on('error', handleError('coffee'))
  try
    gulp.src([
      './coffee/setup.coffee'
      './coffee/AppView.coffee'
      './coffee/SectionModel.coffee'
      './coffee/SectionCollection.coffee'
      './coffee/SectionView.coffee'
      './coffee/SectionsView.coffee'
      './coffee/app.coffee'
    ]).pipe(coffeeStream)
      .pipe(concat("app.js"))
      .pipe(gulp.dest('./js/'))
  catch e
    gutil.log e

gulp.task 'plugins', ->
  gulp.src([
    './js/jquery.js'
    './js/jquery-ui.js'
    './js/underscore.js'
    './js/backbone.js'
    './js/d3.js'
    './js/medium-editor.js'
  ]).pipe(concat("plugins.js"))
    .pipe(gulp.dest('./js/'))

gulp.task 'stylus', ->
  stylusStream = stylus({use: ['nib']})
    .on('error', handleError('stylus'))

  gulp.src('./styl/index.styl')
    .pipe(stylusStream)
    .pipe(gulp.dest('./css/'))

gulp.task 'jade', ->
  jadeStream = jade({pretty: true})
    .on('error', handleError('jade'))

  gulp.src('./jade/*')
    .pipe(jadeStream)
    .pipe(gulp.dest('./'))

gulp.task 'watch-coffee', ->
  gulp.watch './coffee/*', ->
    gulp.run 'coffee'

gulp.task 'watch-stylus', ->
  gulp.watch './styl/*', ->
    gulp.run 'stylus'

gulp.task 'watch-jade', ->
  gulp.watch './jade/*', ->
    gulp.run 'jade'

gulp.task 'default', ->

  gulp.run 'coffee', 'stylus', 'jade', 'plugins', 'watch-coffee', 'watch-jade', 'watch-stylus'

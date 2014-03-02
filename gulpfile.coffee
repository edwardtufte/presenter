gulp = require('gulp')
stylus = require('gulp-stylus')
jade = require('gulp-jade')
coffee = require('gulp-coffee')
concat = require('gulp-concat');

gulp.task 'gulp', ->
  gulp.src(['./gulpfile.coffee']).pipe(coffee())
    .pipe(gulp.dest('./'))

gulp.task 'coffee', ->
  gulp.src([
    './coffee/setup.coffee'
    './coffee/AppView.coffee'
    './coffee/SectionModel.coffee'
    './coffee/SectionCollection.coffee'
    './coffee/SectionView.coffee'
    './coffee/SectionsView.coffee'
    './coffee/app.coffee'
  ]).pipe(coffee())
    .pipe(concat("app.js"))
    .pipe(gulp.dest('./js/'))

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
  gulp.src('./styl/index.styl')
    .pipe(stylus({use: ['nib']}))
    .pipe(gulp.dest('./css/'))

gulp.task 'jade', ->
  gulp.src('./jade/*')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./'))

gulp.task 'default', ->

  gulp.run 'coffee', 'stylus', 'jade', 'plugins'

  gulp.watch './coffee/*', ->
    gulp.run 'coffee'

  gulp.watch './styl/*', ->
    gulp.run 'stylus'

  gulp.watch './jade/*', ->
    gulp.run 'jade'

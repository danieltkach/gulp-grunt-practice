/*
/ This gulpfile.js sets up two tasks: one for processing your
/ SASS files into CSS, and another for transpiling, 
/ concatenating, and minifying your JavaScript files.
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/script'))
  .pipe(rename('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('default', gulp.parallel('styles', 'scripts'));
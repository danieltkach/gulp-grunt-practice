/*
/ This gulpfile.js sets up two tasks: one for processing your
/ SASS files into CSS, and another for transpiling, 
/ concatenating, and minifying your JavaScript files.
*/

const path = require('path');
const mainJsPath = path.resolve(__dirname, 'src/scripts/main.js');

// Require the needed packages
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');

// Define the styles task
function styles() {
  return gulp.src('src/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/styles'));
}

// Define the scripts task
function scripts() {
  return browserify(mainJsPath)
    .transform(babelify.configure({
      presets: ["@babel/preset-env"]
    }))
    .bundle()
    .pipe(source('main.min.js')) // Gives streaming vinyl file object
    .pipe(buffer()) // Convert from streaming to buffered vinyl file object
    .pipe(uglify()) // Now gulp-uglify works
    .pipe(gulp.dest('dist/scripts'));
}

// Define the HTML task
function html() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
}

// Watch for changes
function watch() {
  gulp.watch('src/styles/**/*.scss', styles);
  gulp.watch('src/scripts/**/*.js', scripts);
  gulp.watch('src/*.html', html);
}

// Define the default task
gulp.task('default', gulp.series(styles, scripts, html, watch));
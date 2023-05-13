/*
/ This gulpfile.js sets up tasks for processing your
/ SASS files into CSS, for transpiling, concatenating, and 
/ minifying your JavaScript files, compressing images, testing 
/ and so on.
*/

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
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/styles'));
}

// browserify won't take relative paths, so these are necessary
const path = require('path');
const mainJsPath = path.resolve(__dirname, 'src/scripts/main.js');

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

// Imagemin task
const imagemin = require('gulp-imagemin');
const images =()=> {
  return gulp.src('src/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
}

// Live Reloading
const browserSync = require('browser-sync').create();
const serve = (done) => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
}

const reload = (done) => {
  browserSync.reload();
  done();
}

// Testing
const jasmine = require('gulp-jasmine');
const test =()=> {
  return gulp.src('test/**/*.js')
  .pipe(jasmine());
}

// Watch for changes
function watch() {
  gulp.watch('src/styles/**/*.scss', gulp.series(styles, reload));
  gulp.watch('src/scripts/**/*.js', gulp.series(scripts, reload));
  gulp.watch('src/*.html', gulp.series(html, reload));
  gulp.watch('src/images/**/*', gulp.series(images, reload))
}

// Export all tasks to run individually by gulp <task-name>
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = gulp.series(styles, scripts, html, images, serve);
exports.test = test;

// Define the default task
exports.default = gulp.series(styles, scripts, html, images, serve, watch);
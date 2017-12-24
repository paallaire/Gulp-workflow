/* --------------------------------------------------------------------------------
    Variables
-------------------------------------------------------------------------------- */
const gulp = require('gulp');
const watch = require('gulp-watch');
const twig = require('gulp-twig');
const del = require('del');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const notify = require('gulp-notify');

const src = './views/**/*.twig';
const dest = './public';

const options = {
  verbose: true
}

var onError = function (err) {
  notify.onError({
    title: "Gulp error in " + err.plugin,
    message: err.toString()
  })(err);

  // play a sound once
  gutil.beep();
};

/* clean
================================================================= */
gulp.task('clean', (done) => {

  del(['public/*.html']);
  done();

});

/* watch
================================================================= */
gulp.task('watch', ['clean', 'build'], function () {

  return watch('./views/**/*.twig', options, function () {
    gulp.src('./views/*.twig')
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(twig())
      .pipe(gulp.dest(dest));
  });

});

/* build
================================================================= */
gulp.task('build', ['clean'], function () {

  return gulp.src('./views/*.twig')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(twig())
    .pipe(gulp.dest(dest));

});
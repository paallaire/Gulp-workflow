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

const src = ['/templates/**/*.twig', '/templates/!{_layouts,_partials}/*.twig'];
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

/* watch-twig
================================================================= */
gulp.task('watch-twig', ['clean', 'build-twig'], function () {

  return watch(src, options, function () {
    gulp.src(src)
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(twig())
      .pipe(gulp.dest(dest));
  });

});

/* build-twig
================================================================= */
gulp.task('build-twig', ['clean'], function () {

  return gulp.src(src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(twig())
    .pipe(gulp.dest(dest));

});
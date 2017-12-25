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

const sortingOptions = require('./postcss-sorting');
const postcss = require('gulp-postcss');
const sorting = require('postcss-sorting');
const syntax = require('postcss-scss');
const csscomb = require('gulp-csscomb');

// Path
const src = './views/**/*.twig';
const dest = './public';

// Options
const twigOptions = {
  verbose: true
}

const onError = function (err) {
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

  return watch('./views/**/*.twig', twigOptions, function () {
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


/* formatStyles
================================================================= */
gulp.task('formatStyles', function () {
  return gulp.src('./assets/styles/**/*.scss')
    //.pipe(csscomb())
    .pipe(postcss([
      sorting(sortingOptions)
    ], { parser: syntax })
    )
    .pipe(gulp.dest('./assets/styles/'));
});




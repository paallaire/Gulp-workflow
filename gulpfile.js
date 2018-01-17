/* --------------------------------------------------------------------------------
    Variables
-------------------------------------------------------------------------------- */
const gulp           = require('gulp');
const watch          = require('gulp-watch');
const twig           = require('gulp-twig');
const del            = require('del');
const plumber        = require('gulp-plumber');
const gutil          = require('gulp-util');
const notify         = require('gulp-notify');

const sortingOptions = require('./postcss-sorting');
const sorting        = require('postcss-sorting');

const postcss        = require('gulp-postcss');
const reporter       = require('postcss-reporter');
const syntax_scss    = require('postcss-scss');
const stylelint      = require('stylelint');

// Sites (Static)
const src = [
'./views/**/*.twig',
];
const dest = './public';

// Stylesguide
const srcStyles = [
  './styleguide/views/**.twig', 
];
const watchStyles = [
  './styleguide/views/**/*.twig', 
];
const destStyles = './public/styleguide';

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

  del(['public/*.html','public/styleguide/*.html']);
  done();

});

/* watch
================================================================= */
gulp.task('watch', ['clean', 'build'], function () {

  return watch(watchStyles, twigOptions, function () {
    gulp.src(srcStyles)
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(twig())
      .pipe(gulp.dest(destStyles));
  });

});

/* build
================================================================= */
gulp.task('build', ['clean'], function () {

  return gulp.src(srcStyles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(twig())
    .pipe(gulp.dest(destStyles));

});


/* formatStyles
================================================================= */
gulp.task('formatStyles', function () {
  return gulp.src('./assets/styles/**/*.scss')
    //.pipe(csscomb())
    .pipe(postcss([
      sorting(sortingOptions)
    ], { parser: syntax_scss })
    )
    .pipe(gulp.dest('./assets/styles/'));
});

gulp.task("scss-lint", function () {

  // Stylelint config rules
  const stylelintConfig = {
    "rules": {
      "block-no-empty": null,
      "color-no-invalid-hex": true,
      "comment-empty-line-before": [ "always", {
        "ignore": ["stylelint-commands", "after-comment"]
      } ],
      "declaration-colon-space-after": "always",
      "indentation": ["tab", {
        "except": ["value"]
      }],
      "max-empty-lines": 2,
      "rule-empty-line-before": [ "always", {
        "except": ["first-nested"],
        "ignore": ["after-comment"]
      } ],
      "unit-whitelist": ["em", "rem", "%", "s","px"]
    }
  }

  const processors = [
    stylelint(stylelintConfig),
    reporter({
      clearMessages: true,
      throwError: false
    })
  ];

  return gulp.src(
    ['assets/styles/**/*.scss',
      // Ignore linting vendor assets
      // Useful if you have bower components
      '!app/assets/css/vendor/**/*.scss']
  )
    .pipe(postcss(processors, { syntax: syntax_scss }));
});



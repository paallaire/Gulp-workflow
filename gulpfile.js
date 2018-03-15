/* --------------------------------------------------------------------------------
    Modules
-------------------------------------------------------------------------------- */
const gulp = require('gulp');
const watch = require('gulp-watch');
const twig = require('gulp-twig');
const del = require('del');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const wait = require('gulp-wait2');

const sortingOptions = require('./postcss-sorting');
const sorting = require('postcss-sorting');

const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');
const syntax_scss = require('postcss-scss');
const stylelint = require('stylelint');

/* --------------------------------------------------------------------------------
    Variables
-------------------------------------------------------------------------------- */

const styleguide = {
    src: [
        './styleguide/templates/pages/**.twig'
    ],
    watch: [
        './styleguide/sg-templates/**/*.twig',
        './styleguide/templates/**/*.twig'
    ],
    dest: './public/styleguide',
    delete: 'public/styleguide/*.html'
}

const site = {
    src: [
        './site/pages/**.twig'
    ],
    watch: [
        './site/**/*.twig'
    ],
    dest: './public/',
    delete: 'public/*.html'
}

const twigOptions = {
    verbose: true
}

/* --------------------------------------------------------------------------------
    Event OnError
-------------------------------------------------------------------------------- */
const onError = (err) => {

    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.toString()
    })(err);

    gutil.beep();

};

/* --------------------------------------------------------------------------------
    Clean
-------------------------------------------------------------------------------- */
gulp.task('clean', (done) => {

    del([
        styleguide.delete,
        site.delete
    ]);
    done();

});


/* --------------------------------------------------------------------------------
    Watch
-------------------------------------------------------------------------------- */
gulp.task('watch', ['clean', 'build'], () => {

    gulp.watch(styleguide.watch, ['watch-sg']);
    gulp.watch(site.watch, ['watch-site']);

});

gulp.task('twig-sg', () => {

    return gulp.src(styleguide.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(wait(1000))
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(styleguide.dest));
  
});

gulp.task('twig-site', () => {

    return gulp.src(site.src)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(wait(1000))
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(site.dest));
  
});

/* --------------------------------------------------------------------------------
    Build
-------------------------------------------------------------------------------- */
gulp.task('build', ['clean'], () => {

    gulp.start('twig-sg');
    gulp.start('twig-site');

});


/* --------------------------------------------------------------------------------
    Default
-------------------------------------------------------------------------------- */
gulp.task('default', ['clean'], () => {
    gulp.start('build');
});

/* --------------------------------------------------------------------------------
    FormatStyles ( Work in progress... )
-------------------------------------------------------------------------------- */
gulp.task('formatStyles', () => {

    return gulp.src('./assets/styles/**/*.scss')
        .pipe(postcss([
            sorting(sortingOptions)
        ], {
                parser: syntax_scss
            }))
        .pipe(gulp.dest('./assets/styles/'));

});

/* --------------------------------------------------------------------------------
    Scss-lint ( Work in progress... )
-------------------------------------------------------------------------------- */
gulp.task("scss-lint", () => {

    // Stylelint config rules
    const stylelintConfig = {
        "rules": {
            "block-no-empty": null,
            "color-no-invalid-hex": true,
            "comment-empty-line-before": ["always", {
                "ignore": ["stylelint-commands", "after-comment"]
            }],
            "declaration-colon-space-after": "always",
            "indentation": ["tab", {
                "except": ["value"]
            }],
            "max-empty-lines": 2,
            "rule-empty-line-before": ["always", {
                "except": ["first-nested"],
                "ignore": ["after-comment"]
            }],
            "unit-whitelist": ["em", "rem", "%", "s", "px"]
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
            '!app/assets/css/vendor/**/*.scss'
        ]
    )
        .pipe(postcss(processors, {
            syntax: syntax_scss
        }));
});



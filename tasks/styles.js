/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const lost = require('lost');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-dart-sass');

module.exports = function (gulp, config, browserSyncSite, browserSyncStyleguide) {
    const sassOpts = {
        outputStyle: config.isProd ? 'compressed' : 'expanded',
        includePaths: ['node_modules'],
    };

    const sassPlugins = [
        lost(),
        autoprefixer({
            browsers: [
                'last 2 versions',
                'ie >= 10',
            ],
        }),
    ];

    return function () {
        let stream =
            gulp.src(`${config.styles.dev}/main.scss`)
                .pipe(gulpif(!config.isProd, sourcemaps.init()))
                .pipe(sass(sassOpts)).on('error', sass.logError)
                .pipe(postcss(sassPlugins))
                .pipe(gulpif(!config.isProd, sourcemaps.write()))
                .pipe(gulp.dest(config.styles.dist))
                .pipe(browserSyncSite.reload({
                    stream: true,
                }))
                .pipe(browserSyncStyleguide.reload({
                    stream: true,
                }));

        return stream;
    };
};

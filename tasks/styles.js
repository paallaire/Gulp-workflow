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
    ]

    return function () {
        var stream =
            gulp.src(`${config.styles.dev}/main.scss`)
            //.pipe(gulpif(!isProd, sourcemaps.init()))
            .pipe(sass(sassOpts)).on('error', sass.logError)
            .pipe(postcss(sassPlugins))
            //.pipe(gulpif(!isProd, sourcemaps.write()))
            .pipe(gulp.dest(config.styles.dist))
            .pipe(browserSyncSite.reload({
                stream: true,
            }))

        return stream;
    };
};

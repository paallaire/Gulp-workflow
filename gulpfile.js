/* --------------------------------------------------------------------------------
    MODULES
-------------------------------------------------------------------------------- */
const gulp = require('gulp');
const args = require('yargs').argv;
const browserSyncSite = require('browser-sync').create('site');
const browserSyncStyleguide = require('browser-sync').create('styleguide');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const config = require('./gulpfile.config');

/* --------------------------------------------------------------------------------
    INIT
-------------------------------------------------------------------------------- */
config.isProd = args.env === 'production';

/* --------------------------------------------------------------------------------
    BUILD TASKS
-------------------------------------------------------------------------------- */
function getTask(task) {
    return require(`./tasks/${task}`)(gulp, config, browserSyncSite, browserSyncStyleguide);
}

/* --------------------------------------------------------------------------------
    Webpack TASKS - TO DO
-------------------------------------------------------------------------------- */
const webpackTask = (watch) => {
    // still usefull ?
    //webpackConfig.watch = watch;
    return gulp.src(`${config.scripts.dev}/main.js`)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.scripts.dist));
    // .pipe(gulp.dest(config.scripts.kss));
};
gulp.task('webpack', () => webpackTask(false));

gulp.task('webpack-watch', () => {
    console.log('webpack-watch');
    return webpackTask(true);
});

/* --------------------------------------------------------------------------------
    TASKS
-------------------------------------------------------------------------------- */
gulp.task('server', getTask('server'));
gulp.task('clean', getTask('clean'));
gulp.task('styles', getTask('styles'));
gulp.task('images', getTask('images'));
gulp.task('fonts', getTask('fonts'));
gulp.task('video', getTask('video'));
gulp.task('json', getTask('json'));
gulp.task('svg', getTask('svg'));
gulp.task('twig', getTask('twig'));

gulp.task('styleguide', getTask('styleguide'));
gulp.task('styleguide-server', getTask('styleguide-server'));
gulp.task('copy-assets-to-styleguide', getTask('copy-assets-to-styleguide'));

/* --------------------------------------------------------------------------------
    BUILD
-------------------------------------------------------------------------------- */
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'styles',
        'webpack',
        'images',
        'fonts',
        'video',
        'json',
        'svg',
        'twig',
    ),
    'styleguide',
    'copy-assets-to-styleguide',
));

gulp.task('default', gulp.series('build'));

/* --------------------------------------------------------------------------------
    WATCH TASK
-------------------------------------------------------------------------------- */
gulp.task('watch', gulp.series(
    'build',
    'server',
    'styleguide-server',
));

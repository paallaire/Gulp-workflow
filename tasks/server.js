/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
module.exports = function (gulp, config, browserSyncSite, browserSyncStyleguide) {

    return function (done) {
        browserSyncSite.init(config.browserSync);

        gulp.watch(`${config.images.dev}/**/*`, gulp.series('images'));
        gulp.watch(`${config.svg.dev}/**/*`, gulp.series('svg'));
        gulp.watch(`${config.fonts.dev}/**/*`, gulp.series('fonts'));
        gulp.watch(`${config.json.dev}/**/*`, gulp.series('json'));
        gulp.watch(`${config.video.dev}/**/*`, gulp.series('video'));

        gulp.watch(`${config.styles.dev}/**/*`, gulp.series('styles', 'copy-assets-to-styleguide'));
        gulp.watch(`${config.scripts.dev}/**/*`, gulp.series('webpack', 'copy-assets-to-styleguide'));

        done();
    };
};

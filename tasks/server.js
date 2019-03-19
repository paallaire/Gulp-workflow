module.exports = function (gulp, config, browserSyncSite, browserSyncStyleguide) {

    return function () {
        var stream =
            browserSyncSite.init({
                server: {
                    baseDir: "./public"
                },
                port: 3000,
                ui: {
                    port: 3000,
                },
                notify: true,
                files: [
                    './templates/**/*.twig',
                    './public/**/*.html',
                    './lib/**/*.php',
                    './*.php',
                    `${config.scripts.dist}/**/*.js`,
                    `${config.scripts.dist}/**/*.css`,
                ],
                ghostMode: {
                    clicks: true,
                    links: true,
                    forms: false,
                    scroll: true,
                },
                reloadDelay: 250,
            });

            gulp.watch(`${config.styles.dev}/**/*`, gulp.series('styles'));

        return stream;
    };
};

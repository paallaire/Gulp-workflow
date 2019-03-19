/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */

module.exports = function (gulp, config) {
    return function () {
        const stream =
            gulp
                .src(`${config.video.dev}/*`)
                .pipe(gulp.dest(config.video.dist));

        return stream;
    };
};

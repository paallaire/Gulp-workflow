/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */

module.exports = function (gulp, config) {
    return function () {
        const stream =
            gulp
                .src(`${config.json.dev}/*`)
                .pipe(gulp.dest(config.json.dist));

        return stream;
    };
};

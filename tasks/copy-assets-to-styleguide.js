/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */

module.exports = function (gulp, config) {
    return function () {
        const stream =
            gulp
                .src(`${config.root.public}/dist/**/*`)
                .pipe(gulp.dest('./kss-styleguide/styleguide/dist/'));

        return stream;
    };
};

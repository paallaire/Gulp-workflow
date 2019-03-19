/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const svgmin = require('gulp-svgmin');

module.exports = function (gulp, config) {
    return function () {
        const stream =
            gulp
                .src(`${config.svg.dev}/*`)
                .pipe(svgmin({
                    plugins: [{
                        removeViewBox: false,
                    }],
                }))
                .pipe(gulp.dest(config.svg.dist));

        return stream;
    };
};

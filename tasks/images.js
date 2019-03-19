/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const imagemin = require('gulp-imagemin');

module.exports = function (gulp, config) {
    return function () {
        const stream =            
            gulp.src(`${config.images.dev}/*`)
                .pipe(imagemin([
                    imagemin.gifsicle({
                        interlaced: true,
                    }),
                    imagemin.jpegtran({
                        progressive: true,
                    }),
                    imagemin.optipng({
                        optimizationLevel: 5,
                    }),
                ], {
                    verbose: true,
                }))
                .pipe(gulp.dest(config.images.dist));

        return stream;
    };
};

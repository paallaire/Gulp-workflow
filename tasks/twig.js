/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const twig = require('gulp-twig');

module.exports = function (gulp, config) {
    const twigOptions = {
        verbose: true,
    };

    return function () {
        return gulp
            .src(`${config.siteTwig.dev}/pages/*.twig`)
            .pipe(twig(twigOptions))
            .pipe(gulp.dest(config.siteTwig.dist));
    };
};

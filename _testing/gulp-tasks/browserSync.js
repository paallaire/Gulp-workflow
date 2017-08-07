const gulp = require("gulp"),
  browserSync = require('browser-sync').create();

gulp.task('watch', function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("assets/styles/*.scss", ['sass']);

});



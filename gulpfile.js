const config = require('./gulpfile.config');
const gulp = require('gulp');

// Global
const browserSyncSite = require('browser-sync').create('site');
const browserSyncStyleguide = require('browser-sync').create('styleguide');

let env = {
    isProd: false,
};

var toto = 'toto';

// --------------------function to get tasks from gulp/tasks
function getTask(task) {
	return require('./tasks/' + task)(gulp, config, browserSyncSite, browserSyncStyleguide);
}

gulp.task('server', getTask('server'));
gulp.task('clean', getTask('clean'));
gulp.task('styles', getTask('styles'));

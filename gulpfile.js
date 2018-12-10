/* --------------------------------------------------------------------------------
    Modules
-------------------------------------------------------------------------------- */

const args = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const browserSyncSite = require('browser-sync').create('site');
const browserSyncStyleguide = require('browser-sync').create('styleguide');
const cssnano = require('cssnano');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const lost = require('lost');
const postcss = require('gulp-postcss');
const reload = browserSync.reload;
const run = require('gulp-run-command').default
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const svgSymbols = require('gulp-svg-symbols');
const twig = require('gulp-twig');
const webpack = require('webpack-stream');

const isProd = args.env === 'production';
const config = require('./gulpfile.config');

/* --------------------------------------------------------------------------------
    CLEAN
-------------------------------------------------------------------------------- */
gulp.task('clean', function () {
	return del(
		[config.root.public, './kss-styleguide/styleguide']
	);
});

/* --------------------------------------------------------------------------------
    TWIG STYLEGUIDE
-------------------------------------------------------------------------------- */
const twigOptions = {
	verbose: true
}

gulp.task('twig-site', function () {

	return gulp.src(config.twigSite.dev + '/pages/*.twig')
		.pipe(twig(twigOptions))
		.pipe(gulp.dest(config.twigSite.dist));
});


/* --------------------------------------------------------------------------------
    STYLEGUIDE (KSS)
-------------------------------------------------------------------------------- */

gulp.task('twig-styleguide', function () {

	return gulp.src(config.twigStyleGuide.dev + '/*.twig')
		.pipe(twig(twigOptions))
		.pipe(gulp.dest(config.twigStyleGuide.dist));
});

gulp.task('kss-build', run('npm run kss'));

gulp.task('kss', gulp.series(
	'twig-styleguide',
	'kss-build'
));

/* --------------------------------------------------------------------------------
    WEBPACK
-------------------------------------------------------------------------------- */
const webpackTask = function (watch) {
	const webpackConfig = require('./webpack.config.js');
	webpackConfig.watch = watch;
	return gulp.src(config.scripts.dev + '/main.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(config.scripts.dist));
};

gulp.task('webpack', function () {
	return webpackTask(false);
});

gulp.task('webpack-watch', function () {
	return webpackTask(true);
});

/* --------------------------------------------------------------------------------
    SASS
-------------------------------------------------------------------------------- */
gulp.task('sass', function () {
	let opts = {
		outputStyle: isProd ? 'compressed' : 'expanded',
		includePaths: ['node_modules']
	};
	let plugins = [
		lost(),
		autoprefixer({
			browsers: [
				"last 2 versions",
				"ie >= 10"
			]
		})
	];
	if (isProd) {
		plugins.push(cssnano({
			preset: 'default'
		}));
	}
	return gulp.src(config.styles.dev + '/main.scss')
		.pipe(gulpif(!isProd, sourcemaps.init()))
		.pipe(sass(opts)).on('error', sass.logError)
		.pipe(postcss(plugins))
		.pipe(gulpif(!isProd, sourcemaps.write()))
		.pipe(gulp.dest(config.styles.dist))
		.pipe(gulp.dest(config.styles.kssDist))
		.pipe(reload({
			stream: true
		}));
});

/* --------------------------------------------------------------------------------
    ASSETS
-------------------------------------------------------------------------------- */
gulp.task('images', function () {
	return gulp.src(config.images.dev + '/*')
		.pipe(imagemin())
		.pipe(gulp.dest(config.images.dist));
});

gulp.task('svg', function () {
	return gulp
		.src(config.svg.dev + '/*')
		.pipe(svgmin({
			plugins: [{
				removeViewBox: false
			}]
		}))
		.pipe(svgSymbols({
			templates: [`default-svg`]
		}))
		.pipe(gulp.dest(config.svg.dist));
});

gulp.task('fonts', function () {
	return gulp
		.src(config.fonts.dev + '/*')
		.pipe(gulp.dest(config.fonts.dist));
});

gulp.task('json', function () {
	return gulp
		.src(config.json.dev + '/*')
		.pipe(gulp.dest(config.json.dist));
});

gulp.task('video', function () {
	return gulp
		.src(config.video.dev + '/*')
		.pipe(gulp.dest(config.video.dist));
});

/* --------------------------------------------------------------------------------
    SERVER
-------------------------------------------------------------------------------- */
gulp.task('browser-sync', function (cb) {
	browserSyncSite.init({
		proxy: false,
		server: {
			baseDir: config.browserSync.baseDir
		},
        port: 3000,
        ui: {
            port: 3000
        },
		notify: true,
		files: [
			'./templates/**/*.twig',
			config.scripts.dist + '/**/*.js',
			config.styles.dist + '/**/*.css',
		],
		ghostMode: {
			clicks: true,
			links: true,
			forms: true,
			scroll: true
		},
		reloadDelay: 250
	});
	cb();
});

gulp.task('browser-sync-sg', function (cb) {
	browserSyncStyleguide.init({
		proxy: false,
		server: {
			baseDir: './kss-styleguide/styleguide'
		},
        port: 4001,
        ui: {
            port: 4001
        },
		notify: true,
		files: [
			'./kss-styleguide/markup/*.twig',
			config.styles.dist + '/**/*.css',
		],
		ghostMode: {
			clicks: true,
			links: true,
			forms: true,
			scroll: true
		},
		reloadDelay: 2000
	});
	cb();
});

/* --------------------------------------------------------------------------------
    WATCH-FILES
-------------------------------------------------------------------------------- */
gulp.task('watch-files', function (done) {
	gulp.watch(config.styles.dev + '/**/*', gulp.series('sass'));
	gulp.watch(config.images.dev + '/**/*', gulp.series('images'));
	gulp.watch(config.svg.dev + '/**/*', gulp.series('svg'));
	gulp.watch(config.fonts.dev + '/**/*', gulp.series('fonts'));
	gulp.watch(config.json.dev + '/**/*', gulp.series('json'));
	gulp.watch(config.video.dev + '/**/*', gulp.series('video'));
    gulp.watch(config.twigSite.dev + '/**/*.twig', gulp.series('twig-site'));
    gulp.watch(config.twigStyleGuide.dev + '/**/*.twig', gulp.series('kss'));
	gulp.watch([
		config.root.dist + '/**/*.css',
		config.root.dist + '/**/*.js',
	]);
	done();
});

/* --------------------------------------------------------------------------------
    MAIN TASKS
-------------------------------------------------------------------------------- */
gulp.task('build', gulp.series(
	'clean',
	gulp.parallel(
		'sass',
		'webpack',
		'images',
		'svg',
		'fonts',
		'video',
		'json',
		'twig-site'
	),
	'kss'
));

gulp.task('watch', gulp.series(
	'build',
	gulp.parallel(
		'webpack-watch',
        'browser-sync',
        'browser-sync-sg',
        'watch-files'
	)
));

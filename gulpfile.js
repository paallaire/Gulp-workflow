
// ## Globals
var argv = require('minimist')(process.argv.slice(2));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var lazypipe = require('lazypipe');
var less = require('gulp-less');
var merge = require('merge-stream');
var minifyCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var runTimestamp = Math.round(Date.now() / 1000);

// Custom 
var postcss = require('gulp-postcss');
var lost = require('lost');
var data = require('gulp-data');
var twig = require('gulp-twig');
var wait = require('gulp-wait');

// Error
var onError = function (err) {
    console.log("///////////// ERROR");
    console.log(err.toString());
    this.emit('end');
};

// Type ( craftcms, wordpress or static )
var gulpSetup = 'static';

// See https://github.com/austinpray/asset-builder
var manifest = require('asset-builder')('assets/manifest.json');


// `path` - Paths to base asset directories. With trailing slashes.
// - `path.source` - Path to the source files. Default: `assets/`
// - `path.dist` - Path to the build directory. Default: `dist/`
var path = manifest.paths;

// `config` - Store arbitrary configuration values here.
var config = manifest.config || {};

// `globs` - These ultimately end up in their respective `gulp.src`.
// - `globs.js` - Array of asset-builder JS dependency objects. Example:
//   ```
//   {type: 'js', name: 'main.js', globs: []}
//   ```
// - `globs.css` - Array of asset-builder CSS dependency objects. Example:
//   ```
//   {type: 'css', name: 'main.css', globs: []}
//   ```
// - `globs.fonts` - Array of font path globs.
// - `globs.images` - Array of image path globs.
// - `globs.bower` - Array of all the main Bower files.
var globs = manifest.globs;

// `project` - paths to first-party assets.
// - `project.js` - Array of first-party JS assets.
// - `project.css` - Array of first-party CSS assets.
var project = manifest.getProjectGlobs();

// CLI options
var enabled = {
    // Enable static asset revisioning when `--production`
    rev: argv.production,
    // Disable source maps when `--production`
    maps: !argv.production,
    // Fail styles task on error when `--production`
    failStyleTask: argv.production,
    // Fail script task on error when `--production`
    failScriptTask: argv.production,
    // Minify
    minify: argv.production,
    // twigjs 
    twigjs: true,
    // PostCss Lost
    lost: true
};

// Path to the compiled assets manifest in the dist directory
var revManifest = path.dist + 'assets.json';

// ## Reusable Pipelines
// See https://github.com/OverZealous/lazypipe

// ### CSS processing pipeline
// Example
// ```
// gulp.src(cssFiles)
//   .pipe(cssTasks('main.css')
//   .pipe(gulp.dest(path.dist + 'styles'))
// ```
var cssTasks = function (filename) {
    return lazypipe()
        .pipe(function () {
            return wait(500)
        })
        .pipe(function () {
            return gulpif(!enabled.failStyleTask, plumber());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        .pipe(function () {
            return gulpif('*.less', less());
        })
        .pipe(function () {
            return gulpif('*.scss', sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                errLogToConsole: !enabled.failStyleTask
            }));
        })
        .pipe(function () {
            return gulpif(enabled.lost, postcss([lost()]));
        })
        .pipe(concat, filename)
        .pipe(autoprefixer, {
            browsers: [
                'last 5 versions',
                'ie 10'
            ]
        })
        .pipe(function () {
            return gulpif(enabled.minify, minifyCss());
        })
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot: path.source + 'styles/'
            }));
        })();
};

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(path.dist + 'scripts'))
// ```
var jsTasks = function (filename) {
    return lazypipe()
        .pipe(function () {
            return gulpif(!enabled.failScriptTask, plumber());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        .pipe(function () {
            return gulpif('*.ts', ts({
                out: 'output.js'
            }));
        })
        .pipe(concat, filename)
        .pipe(function () {
            return gulpif(enabled.minify, uglify({
                compress: {
                    'drop_debugger': true
                }
            }));
        })
        .pipe(function () {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function () {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot: path.source + 'scripts/'
            }));
        })();
};

// ### Write to rev manifest
// If there are any revved files then write them to the rev manifest.
// See https://github.com/sindresorhus/gulp-rev
var writeToManifest = function (directory) {
    return lazypipe()
        .pipe(gulp.dest, path.dist + directory)
        .pipe(browserSync.stream, { match: '**/*.{js,css}' })
        .pipe(rev.manifest, revManifest, {
            base: path.dist,
            merge: true
        })
        .pipe(gulp.dest, path.dist)();
};

// ## Gulp tasks
// Run `gulp -T` for a task summary

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes Bower CSS and project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('styles', ['wiredep'], function () {
    var merged = merge();
    manifest.forEachDependency('css', function (dep) {
        var cssTasksInstance = cssTasks(dep.name);
        if (!enabled.failStyleTask) {
            cssTasksInstance.on('error', function (err) {
                console.error(err.message);
                this.emit('end');
            });
        }
        merged.add(gulp.src(dep.globs, { base: 'styles' })
            .pipe(cssTasksInstance));
    });
    return merged
        .pipe(writeToManifest('styles'));
});

// ### Scripts
// `gulp scripts` - Compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', function () {
    var merged = merge();
    manifest.forEachDependency('js', function (dep) {
        var jsTasksInstance = jsTasks(dep.name);
        if (!enabled.failScriptTask) {
            jsTasksInstance.on('error', function (err) {
                console.error(err.message);
                this.emit('end');
            });
        }
        merged.add(gulp.src(dep.globs, { base: 'scripts' })
            .pipe(jsTasksInstance)
        );
    });
    return merged
        .pipe(writeToManifest('scripts'));
});

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', function () {
    return gulp.src(globs.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.dist + 'fonts'))
        .pipe(browserSync.stream());
});

// ### Compile icons to fonts
gulp.task('icons', function () {

});

// ### Images
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', function () {
    return gulp.src(globs.images)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 4 }),
            imagemin.svgo({ plugins: [{ removeViewBox: true }, { removeUnknownsAndDefaults: false }, { cleanupIDs: false }] })
        ], { verbose: true }))
        .pipe(gulp.dest(path.public + 'images'))
        .pipe(browserSync.stream());
});

// ### SVG
// `gulp svg` - 
gulp.task('svg', function () {
    return gulp.src(path.source + 'svg/*.svg')
        .pipe(gulp.dest(path.dist + 'svg'))
        .pipe(browserSync.stream());
});

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, ["public", "build"]));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function () {

    console.log('Mode Watch :', gulpSetup);
    console.log('--------------------------------------');

    // craftcms
    if (gulpSetup === 'craftcms') {

        browserSync.init({
            files: ['craft/templates/**/*.twig'],
            proxy: config.devUrl
        });

    }
    // wordpress
    else if (gulpSetup === 'wordpress') {
    }
    // static
    else if (gulpSetup === 'static') {

        browserSync.init({
            server: {
                baseDir: "./public/"
            },
            ghostMode: {
                clicks: true,
                links: true,
                forms: true,
                scroll: true
            },
            reloadDelay: 1000
        });

        gulp.watch(['twig/**/*'], ['twig-watch']);

    }

    gulp.watch([path.source + 'styles/**/*'], ['styles']);
    gulp.watch([path.source + 'scripts/**/*'], ['scripts']);
    gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
    gulp.watch([path.source + 'icons/**/*'], ['icons']);
    gulp.watch([path.source + 'images/**/*'], ['images']);
    gulp.watch(['bower.json', 'assets/manifest.json'], ['build']);
});

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function (callback) {

    // craftcms
    if (gulpSetup === 'craftcms') {

        runSequence('styles',
            'scripts',
            ['fonts', 'icons', 'images','svg'],
            callback);

    }
    // wordpress
    else if (gulpSetup === 'wordpress') {
        console.log('wordpress');
    }
    // static
    else if (gulpSetup === 'static') {

        runSequence('styles',
            'scripts',
            ['fonts', 'icons', 'images','svg'],
            'twig-watch',
            callback);

    }

});

// ### Wiredep
// `gulp wiredep` - Automatically inject Less and Sass Bower dependencies. See
// https://github.com/taptapship/wiredep
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    return gulp.src(project.css)
        .pipe(wiredep())
        .pipe(changed(path.source + 'styles', {
            hasChanged: changed.compareSha1Digest
        }))
        .pipe(gulp.dest(path.source + 'styles'));
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// ### twig
// `twig` - to do
gulp.task('twig', function () {
    return gulp
        .src('twig/*.twig')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(data(function (file) {
            return require('./twig/data.json');
        }))
        .pipe(twig())
        .pipe(gulp.dest(path.public))
});

gulp.task('twig-watch', ['twig'], function (done) {
    browserSync.reload();
    done();
});


/* Gulp
-------------------------------------------- */
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');

/* Plugins
-------------------------------------------- */
const imagemin = require('gulp-imagemin');
const twig = require('gulp-twig');
const svgSprite = require('gulp-svg-sprite');

/* del
-------------------------------------------- */
function cleanTask(cb) {
  del(['./public/dist']);
  cb();
}

/* imagemin
-------------------------------------------- */
const imageminOptions =
  ([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 75, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
    }),
  ],
  {
    verbose: true,
  });

function imagesTask() {
  return src('assets/images/**/*').pipe(imagemin(imageminOptions)).pipe(dest('./public/dist/images'));
}

/* twig
-------------------------------------------- */
function twigTask() {
  return src('./templates/pages/*.twig').pipe(twig()).pipe(dest('./public/'));
}

/* fonts
-------------------------------------------- */
function fontsTask() {
  return src('**/*', { cwd: './assets/fonts' }).pipe(dest('./public/dist/fonts'));
}

/* icons
-------------------------------------------- */
const config = {
  mode: {
    defs: {
      dest: '',
      sprite: 'sprite.svg',
    },
  },
};

function iconsTask() {
  return src('**/*.svg', { cwd: './assets/icons' }).pipe(svgSprite(config)).pipe(dest('./public/dist/icons'));
}

/* watch
-------------------------------------------- */
function watchTask(cb) {
  watch('assets/images/**/*', imagesTask);
  watch('./templates/pages/*.twig', twigTask);
  cb();
}

/* env
-------------------------------------------- */
// if (process.env.NODE_ENV === 'production') {
//   exports.build = series(transpile, minify);
// } else {
//   exports.build = series(transpile, livereload);
// }

/* tasks
-------------------------------------------- */
exports.default = series(cleanTask, parallel(imagesTask, fontsTask, iconsTask), twigTask);
exports.watch = series(cleanTask, parallel(imagesTask, fontsTask, iconsTask), twigTask, watchTask);
exports.clean = cleanTask;
exports.images = imagesTask;
exports.twig = twigTask;
exports.fonts = fontsTask;
exports.icons = iconsTask;

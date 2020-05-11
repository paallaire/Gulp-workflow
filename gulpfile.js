const { series, src, dest, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const colorGroups = require('color-groups');

const config = require('./config');

const svgConfig = {
    mode: {
        symbol: {
            inline: true,
            dest: '',
            sprite: 'sprite.svg',
        },
    },
};

function fonts() {
    return src('**/*', { cwd: `${config.path.assets}/fonts` }).pipe(dest(`${config.path.dist}/fonts`));
}

function icons() {
    return src('**/*.svg', { cwd: `${config.path.assets}/icons` })
        .pipe(svgSprite(svgConfig))
        .pipe(dest(`${config.path.dist}/icons`));
}

function images() {
    return src(`${config.path.assets}/images/**`)
        .pipe(imagemin())
        .pipe(dest(`${config.path.dist}/images`));
}

exports.fonts = fonts;
exports.icons = icons;
exports.images = images;
exports.watch = function() {
    watch(`${config.path.assets}/fonts/**`, fonts);
    watch(`${config.path.assets}/icons/**`, icons);
    watch(`${config.path.assets}/images/**`, images);
};
exports.default = series(fonts, icons, images);

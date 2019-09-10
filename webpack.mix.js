

const mix = require('laravel-mix');
const path = require('path')
const globby = require('globby');

const purgecssOptions = require('./purgecss');
const WEBSITE_URL = 'http://vicone.test';
const ENV = process.env.NODE_ENV;

require('laravel-mix-purgecss');
require('laravel-mix-imagemin');
require('dotenv').config();

const source = {
    assets: path.resolve('assets'),
    dist: path.resolve('web'),
    styleguide: path.resolve('styleguide'),
    fonts: path.resolve('assets/fonts'),
    icons: path.resolve('assets/svg'),
    images: path.resolve('assets/images'),
    scripts: path.resolve('assets/scripts'),
    styles: path.resolve('assets/styles'),
    static: path.resolve('assets/static'),
    templates: path.resolve('assets/templates'),
    videos: path.resolve('assets/videos'),
}

// base
//----------------------------------------------------------
mix.setPublicPath('web');

// development or production
//----------------------------------------------------------
if (ENV === 'development' || ENV === 'production') {

    console.log('=== development or production ');

    mix.js(`${source.scripts}/main.js`, 'scripts')
        .sass(`${source.styles}/main.scss`, 'styles')
        .sass(`${source.styles}/tailwind.scss`, 'styles')
        .options({
            processCssUrls: false,
            postCss: [
                require('postcss-preset-env')({ stage: 2 }),
                require('tailwindcss')('./tailwind.config.js'),
                require('postcss-pxtorem')({
                    rootValue: 16,
                    unitPrecision: 5,
                    propList: [
                        'font',
                        'font-size',
                        'line-height',
                        'letter-spacing',
                    ],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                }),
            ],
        }).purgeCss({
            enabled: mix.inProduction(),
            folders: ['assets', 'modules', 'templates'],
            extensions: ['html', 'js', 'jsx', 'php', 'twig', 'vue'],
            whitelist: purgecssOptions.whitelist,
            whitelistPatterns: purgecssOptions.whitelistPatterns,
            whitelistPatternsChildren: purgecssOptions.whitelistPatterns,
            keyframes: true
        });

}


// development
//----------------------------------------------------------
if (ENV === 'development') {

    console.log('=== development');

    mix.sourceMaps()
        .browserSync({
            proxy: WEBSITE_URL,
            files: [
                'modules/**/*.php',
                'templates/**/*.twig',
                'translations/**/*.php',
                'web/fonts/**/*',
                'web/images/**/*',
                'web/scripts/**/*.js',
                'web/styles/**/*.css',
                'web/svg/**/*',
            ],
            ghostMode: {
                clicks: false,
                links: false,
                forms: false,
                scroll: false,
            },
            reloadDelay: 1000,
        });

}

// Copies
//----------------------------------------------------------
if (ENV === 'copyFiles' || ENV === 'production') {

    console.log('=== copyFiles');

    mix.copyDirectory(`${source.assets}/fonts`, `${source.dist}/fonts`)
        .copyDirectory(`${source.assets}/json`, `${source.dist}/json`)
        .copyDirectory(`${source.assets}/svg`, `${source.dist}/svg`)
        .copyDirectory(`${source.assets}/videos`, `${source.dist}/videos`)

        // styleguide
        .copyDirectory(`${source.assets}/images`, `${source.styleguide}/images`)
        .copyDirectory(`${source.assets}/json`, `${source.styleguide}/json`)
        .copyDirectory(`${source.assets}/svg`, `${source.styleguide}/svg`)
        .copyDirectory(`${source.assets}/videos`, `${source.styleguide}/videos`);

}

// production
//----------------------------------------------------------
if (ENV === 'production') {

    console.log('=== imagemin');

    mix.imagemin(
        {
            from: path.join(source.images, '**/*'),
            to: `${source.dist}/images`,
            context: 'assets/images',
        },
        {},
        {
            gifsicle: { interlaced: true },
            mozjpeg: { progressive: true, arithmetic: false },
            optipng: { optimizationLevel: 3 }, // Lower number = speedier/reduced compression
            svgo: {
                plugins: [
                    { convertPathData: false },
                    { convertColors: { currentColor: false } },
                    { removeDimensions: true },
                    { removeViewBox: false },
                    { cleanupIDs: false },
                ],
            },
        }
    )

}
else {

    console.log('=== copyImages');

    mix.copyDirectory(`${source.assets}/images`, `${source.dist}/images`)

}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copy(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });

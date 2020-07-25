const mix = require('laravel-mix');

// plugins
require('laravel-mix-twig-to-html');

// base
//----------------------------------------------------------
mix.setPublicPath('public')
    .js('./assets/scripts/main.js', './dist/scripts')
    .sass('./assets/styles/main.scss', './dist/styles')
    .sass('./assets/styles/tailwind.scss', './dist/styles')
    .options({
        processCssUrls: false,
        postCss: [
            require('postcss-preset-env')({ stage: 2 }),
            require('tailwindcss')('./tailwind.config.js'),
            require('postcss-pxtorem')({
                rootValue: 16,
                unitPrecision: 5,
                propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
            }),
        ],
    })
    .twigToHtml({
        files: [
            {
                template: 'templates/pages/*.{twig,html}',
                inject: false, // disable asset tag injection
            },
        ],
        fileBase: 'templates/pages',
        twigOptions: { data: {} },
    })
    .extract()
    .version();

// Watch
//----------------------------------------------------------
if (!mix.inProduction()) {
    mix.sourceMaps().browserSync({
        proxy: false,
        server: {
            baseDir: './public/',
        },
        // proxy: WEBSITE_URL,
        files: [
            './public/**/*.html',
            './public/dist/fonts/**/*',
            './public/dist/images/**/*',
            './public/dist/scripts/**/*.js',
            './public/dist/styles/**/*.css',
            './public/dist/svg/**/*',
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

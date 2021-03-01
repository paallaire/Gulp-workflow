const mix = require('laravel-mix');

// Build
// ----------------------------------------------------------
mix
  .setPublicPath('public')
  .js('./assets/scripts/main.js', './dist/scripts')
  .sass('./assets/styles/main.scss', './dist/styles')
  .sass('./assets/styles/tailwind.scss', './dist/styles')
  .options({
    processCssUrls: false,
    postCss: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
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
  .extract()
  .version();

// Watch
// ----------------------------------------------------------
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
    reloadDelay: 100,
  });
}

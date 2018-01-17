const mix = require('laravel-mix');
const path = require('path');

/*
  // Styleguide
  .sass('assets/styles/styleguide.scss', 'public/dist/styles/')
  //Site
  //.sass('/assets/styles/main.scss', '/styleguide/public/dist/styles')
*/


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .setPublicPath(path.normalize("public/dist"))
  // Styleguide
  .js('assets/scripts/styleguide.js', 'scripts')
  .sass('assets/styles/styleguide.scss', 'styles')
  // Site
  .sass('../assets/styles/main.scss', 'styles')
  .js('../assets/scripts/main.js', 'scripts')
  .options({
    postCss: [
      require('lost')()
    ]
  })
  .sourceMaps()
  .version()
  .browserSync({
    proxy: false,
    files: [
      'public/**/*.html',
      'public/dist/scripts/*.js',
      'public/dist/styles/*.css',
      '../public/themes/mutation/**/*.html',
      '../public/themes/mutation/**/*.js',
      '../public/themes/mutation/**/*.css'
    ],
    server: {
      baseDir: "./public/"
    },
    ghostMode: {
      clicks: true,
      links: true,
      forms: true,
      scroll: true
    }
  })



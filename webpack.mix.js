const mix = require('laravel-mix');
const path = require('path');

// Extensions
require('laravel-mix-polyfill');

// Variables
const WEBSITE_URL = 'http://base.test/';

mix
    .setPublicPath(path.normalize('public/dist'))
    .setResourceRoot('/dist/')
    .js('assets/scripts/main.js', 'scripts')
    .sass('assets/styles/main.scss', 'styles')
    .polyfill({
        enabled: true,
        useBuiltIns: 'usage',
        targets: {
            ie: 11,
        },
    })
    .version();

if (!mix.inProduction()) {
    mix
        .browserSync({
            proxy: WEBSITE_URL,
            port: 3000,
            files: [
                'templates/**/*.twig',
                'public/dist/scripts/**/*.js',
                'public/dist/styles/**/*.css',
            ],
            ghostMode: {
                clicks: true,
                links: true,
                forms: false,
                scroll: true,
            },
            reloadDelay: 250,
        });
}

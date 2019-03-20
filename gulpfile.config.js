const assetsDev = './assets';
const assetsDist = './public/dist';
const assetsPublic = './public';
const twigDev = './templates';

const kssDist = './kss-styleguide/styleguide/site-assets';

module.exports = {
    url: 'http://cafe.test/',
    isProd: false,
    root: {
        dev: assetsDev,
        dist: assetsDist,
        public: assetsPublic,
    },
    styles: {
        dev: `${assetsDev}/styles`,
        dist: `${assetsDist}/styles`,
        kss: `${kssDist}/styles`,
        kssDev: './kss-styleguide/custom-template-twig/kss-assets/css',
    },
    scripts: {
        dev: `${assetsDev}/scripts`,
        dist: `${assetsDist}/scripts`,
        kss: `${kssDist}/scripts`,
    },
    images: {
        dev: `${assetsDev}/images`,
        dist: `${assetsDist}/images`,
        kss: `${kssDist}/images`,
    },
    svg: {
        dev: `${assetsDev}/svg`,
        dist: `${assetsDist}/svg`,
        kss: `${kssDist}/svg`,
    },
    fonts: {
        dev: `${assetsDev}/fonts`,
        dist: `${assetsDist}/fonts`,
        kss: `${kssDist}/fonts`,
    },
    json: {
        dev: `${assetsDev}/json`,
        dist: `${assetsDist}/json`,
        kss: `${kssDist}/json`,
    },
    video: {
        dev: `${assetsDev}/video`,
        dist: `${assetsDist}/video`,
        kss: `${kssDist}/video`,
    },
    siteTwig: {
        dev: twigDev,
        dist: './public',
    },
    browserSync: {
        server: {
            baseDir: './public',
        },
        port: 3000,
        ui: {
            port: 3000,
        },
        notify: true,
        files: [
            './public/**/*.html',
            `${assetsDev}/scripts/**/*.js`,
            `${assetsDev}/scripts/**/*.css`,
        ],
        ghostMode: {
            clicks: true,
            links: true,
            forms: false,
            scroll: true,
        },
        reloadDelay: 250,
    },
    browserSyncStyleguide: {
        proxy: false,
        server: {
            baseDir: './kss-styleguide/styleguide',
        },
        port: 4001,
        ui: {
            port: 4001,
        },
        notify: true,
        files: [
            './kss-styleguide/styleguide/*.html',
            './kss-styleguide/styleguide/markup/*.html',
            `${assetsDist}/**/*.css`,
        ],
        ghostMode: {
            clicks: true,
            links: true,
            forms: false,
            scroll: true,
        },
        reloadDelay: 2000,
    },
    styleguide: true,
    kssOptions: {
        title: 'Styleguide',
        mask: '*.scss',
        placeholder: '[modifier]',
        builder: 'kss-styleguide/custom-template-twig',
        source: 'assets/styles/',
        destination: 'kss-styleguide/styleguide/',
        homepage: '../../kss-styleguide/kss-homepage.md',
        css: [
            '/dist/styles/main.css',
        ],
        js: [
            '/dist/scripts/main.js',
        ],
    },
};

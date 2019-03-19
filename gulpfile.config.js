const assetsDev = './assets';
const assetsDist = './public/dist';
const assetsPublic = './public';
const twigDev = './templates';

const kssDist = './kss-styleguide/styleguide/site-assets';

module.exports = {
    url: 'http://cafe.test/',
    isProd: true,
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
    kssTwig: {
        dev: './kss-styleguide/markup',
        dist: './kss-styleguide/styleguide/markup',
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
            '/site-assets/styles/kss.css',
            '/site-assets/styles/main.css',
        ],
        js: [
            '/site-assets/scripts/main.js',
        ],
    },
};

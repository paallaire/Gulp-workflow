const path = require('path');

module.exports = {
    proxy: 'http://vicone.test',
    path: {
        assets: path.resolve('assets'),
        public: path.resolve('public'),
        dist: path.resolve('public/dist'),
        styleguide: path.resolve('styleguide'),
        // scripts: path.resolve('assets/scripts'),
        // styles: path.resolve('assets/styles'),
        // fonts: path.resolve('assets/fonts'),
        // icons: path.resolve('assets/icons'),
        // svg: path.resolve('assets/svg'),
        // images: path.resolve('assets/images'),
        // static: path.resolve('assets/static'),
        // templates: path.resolve('assets/templates'),
        // videos: path.resolve('assets/videos'),
    },
};

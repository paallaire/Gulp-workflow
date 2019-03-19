const del = require('del');

module.exports = function (gulp, config, browserSyncSite, browserSyncStyleguide) {
    return function (cb) {
        var stream = del(config.root.public, cb);
        return stream;
    };
};

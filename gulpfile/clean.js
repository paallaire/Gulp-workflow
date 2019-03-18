// =========================================================
// Gulp Task: clean
// Description: deletes dist folder
// =========================================================
const del = require('del');
const config = require('../config.js');

// eslint-disable-next-line func-names
module.exports = function (gulp, plugins) {
    return (cb) => {
        const stream = del(config.clean.folders, cb);
        return stream;
    };
};

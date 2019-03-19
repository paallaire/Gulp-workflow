/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const kss = require('kss');

module.exports = function (gulp, config) {
    return function () {
        const stream =
            kss(config.kssOptions);

        return stream;
    };
};

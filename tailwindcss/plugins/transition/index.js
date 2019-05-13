/* eslint-disable func-names */
module.exports = function (variants) {
    return function ({ addUtilities }) {
        addUtilities({
            '.transiton-slow-all': { transition: 'all 1s ease' },
            '.transiton-noormal-all': { transition: 'all .5s ease' },
            '.transiton-fast-all': { transition: 'all .3s ease' },
        }, variants);
    };
};

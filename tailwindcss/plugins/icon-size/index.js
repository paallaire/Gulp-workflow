/* eslint-disable func-names */
module.exports = function (variants) {
    return function ({ addUtilities }) {
        addUtilities({
            '.icon-size-sm': { 'font-size': '10px' },
            '.icon-size-xs': { 'font-size': '20px' },
            '.icon-size-md': { 'font-size': '30px' },
            '.icon-size-lg': { 'font-size': '50px' },
            '.icon-size-xl': { 'font-size': '60px' },
        }, variants);
    };
};

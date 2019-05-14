/* eslint-disable func-names */
const _ = require('../../../node_modules/lodash');

module.exports = function ({ variants = ['responsive'] }) {
    return function ({ e, addUtilities, config }) {
        addUtilities([
            ..._.map(config('theme.iconSize', {}), (value, key) => ({
                [`.icon-size-${e(key)}`]: {
                    'font-size': `${value}`,
                },
            })),
        ], variants);
    };
};

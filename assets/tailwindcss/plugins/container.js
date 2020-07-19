/* eslint-disable func-names */
const _ = require('lodash');

module.exports = function ({ addUtilities, e, theme, variants }) {
    const screens = theme('screens', {});
    const paddingX = 40;
    const scrollBarWidth = 17;
    const utilities = _.map(screens, (value, name) => ({
        [`.${e(`container-${name}`)}`]: {
            paddingLeft: `${paddingX / 2}px`,
            paddingRight: `${paddingX / 2}px`,

            [`@media (min-width: ${`${(parseInt(value) + paddingX + scrollBarWidth)}px)`}`]: {
                maxWidth: `${value}`,
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: theme('spacing.0'),
                paddingRight: theme('spacing.0'),
            },

        },
    }));

    addUtilities(utilities, ['responsive']);
};


const spacingUnits = require('./assets/tailwindcss/units/generateUnitByMultiplicator')(5, 200);
const fontSizeUnit = require('./assets/tailwindcss/units/generateUnitByMultiplicator')(2, 75);

module.exports = {
  purge: ['./assets/**/*.js', './assets/**/*.vue', './templates/**/*.twig', './dist/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    spacing: {
      0: '0',
      '1px': '1px',
      '2px': '2px',
      '3px': '3px',
      '4px': '4px',
      '6px': '6px',
      '7px': '7px',
      '8px': '8px',
      '9px': '9px',
      ...spacingUnits,
    },
    fontSize: {
      xs: ['12px', '20px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      ...fontSizeUnit,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('./assets/tailwindcss/plugins/debug-screens'),
  ],
  corePlugins: {
    backgroundImage: false,
    container: false,
  },
};

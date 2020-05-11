// polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'dom4';
import 'whatwg-fetch';
import 'picturefill';
import 'svgxuse';

// modules
import demoInit from './demo';
import { $body } from './utils/env';
import devMode from './utils/dev';

import loadWebfonts from './utils/webFonts';
import lazyLoadInit from './utils/lazyLoad';

document.addEventListener('DOMContentLoaded', () => {
    // load webfonts
    // loadWebfonts();

    // // init
    demoInit();
    // lazyLoadInit();

    // devMode();
});

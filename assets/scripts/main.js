// polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'dom4';
import 'whatwg-fetch';
import 'picturefill';
import 'svgxuse';

// modules
import demoInit from './demo';
import { $body, isDebug } from './utils/environment';
import loadWebfonts from './utils/webFonts';
import lazyLoadInit from './utils/lazyLoad';

document.addEventListener('DOMContentLoaded', () => {
    // set helper class
    $body.classList.add(isDebug ? 'is-dev' : 'is-production');

    // load webfonts
    loadWebfonts();

    // init
    demoInit();
    lazyLoadInit();
});

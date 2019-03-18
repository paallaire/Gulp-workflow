
/* --------------------------------------------------------------------------------
Polyfill
-------------------------------------------------------------------------------- */
import 'babel-polyfill';
import 'svgxuse';

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import bowser from 'bowser';
import Vue from 'vue';
import {
    mapGetters,
    mapMutations,
} from 'vuex';
import im from '../../node_modules/include-media-export/dist/include-media-1.0.2.min.js';

import ShowGridInit from './utils/helper/showGrid';
import formInit from './utils/form/main';
import swiperInit from './utils/swiper';
import rellaxInit from './utils/rellax';
import aosInit from './utils/aos';
import lazyInit from './utils/lazyload';

/* --------------------------------------------------------------------------------
Vue
-------------------------------------------------------------------------------- */
import store from './store';

/* --------------------------------------------------------------------------------
Vue - Components
-------------------------------------------------------------------------------- */
import modal from './vue-components/Modal.vue';
import navCanvas from './vue-components/NavCanvas.vue';

/* --------------------------------------------------------------------------------
Vue - Directives
-------------------------------------------------------------------------------- */
const VueScrollTo = require('vue-scrollto');

const easings = {
    ease: [0.25, 0.1, 0.25, 1.0],
    linear: [0.00, 0.0, 1.00, 1.0],
    'ease-in': [0.42, 0.0, 1.00, 1.0],
    'ease-out': [0.00, 0.0, 0.58, 1.0],
    'ease-in-out': [0.42, 0.0, 0.58, 1.0],
    material: [0.4, 0.0, 0.2, 1.0],
};

Vue.use(VueScrollTo, {
    container: 'body',
    duration: 500,
    easing: [0.4, 0.0, 0.2, 1.0],
    offset: 0,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true,
});

/* --------------------------------------------------------------------------------
APP
-------------------------------------------------------------------------------- */
console.log('main.js');
aosInit();

const vm = new Vue({
    el: '#app',
    store,
    components: {
        navCanvas,
        modal,
    },
    data: {},
    computed: {
        ...mapGetters([
            'lang',
            'env',
            'modal',
            'hasMenuCanvas',
            'hasBodyScroll',
        ]),
    },
    watch: {},
    methods: {
        ...mapMutations([
            'setModal',
            'setNavCanvas',
            'setBodyScroll',
        ]),
    },
    mounted() {
        console.log('mounted');
        formInit(this.lang);
        swiperInit();
        lazyInit();

        const el = document.querySelector('#app');

        el.classList.add('test');

        const url = new URL(window.location.href);
        // const debug = url.searchParams.get('debug') !== null ? true : false;

        console.log('url', url);
        // console.log('debug', debug);

        // Dev only
        if (this.env === 'dev') {
            ShowGridInit(16);
        }

        // Disable for IE
        if (!bowser.msie) {
            rellaxInit();
        }
    },
    destroyed() {},
});

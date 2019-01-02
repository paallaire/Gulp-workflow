/* --------------------------------------------------------------------------------
Polyfill
-------------------------------------------------------------------------------- */
import 'babel-polyfill';
import 'svgxuse';
// import im from '../../node_modules/include-media-export/dist/include-media-1.0.2.min.js';

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import bowser from 'bowser';
import formInit from './utils/form';
import formValidation from './utils/from-validaton';
import swiperInit from './utils/swiper';
import ShowGridInit from './utils/showGrid';
import rellaxInit from './utils/rellax';
import aosInit from './utils/aos.js';
import lazyInit from './utils/lazyload';
import progressBar from './utils/progresBar'; // TO DO

/* --------------------------------------------------------------------------------
Vue
-------------------------------------------------------------------------------- */
import Vue from 'vue';
import {
    mapGetters,
    mapMutations,
} from 'vuex';
import store from './store';

/* --------------------------------------------------------------------------------
Vue - Directives
-------------------------------------------------------------------------------- */
let VueScrollTo = require('vue-scrollto');

let easings = {
    'ease': [0.25, 0.1, 0.25, 1.0],
    'linear': [0.00, 0.0, 1.00, 1.0],
    'ease-in': [0.42, 0.0, 1.00, 1.0],
    'ease-out': [0.00, 0.0, 0.58, 1.0],
    'ease-in-out': [0.42, 0.0, 0.58, 1.0],
    'material': [0.4, 0.0, 0.2, 1.0]
}

Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: [0.4, 0.0, 0.2, 1.0],
    offset: 0,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

/* --------------------------------------------------------------------------------
Vue - Components
-------------------------------------------------------------------------------- */
import modal from './vue-components/Modal.vue';
import navCanvas from './vue-components/NavCanvas.vue';

/* --------------------------------------------------------------------------------
APP
-------------------------------------------------------------------------------- */
aosInit();

const vm = new Vue({
    el: '#app',
    store,
    components: {
        navCanvas,
        modal
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
        formInit();
        swiperInit();
        lazyInit();
        // let test = new progressBar();

   

        formValidation(this.lang);

        // Dev only
        if (this.env == 'dev') {
            ShowGridInit(16);
        }

        // Disable for IE
        if (!bowser.msie) {
            rellaxInit();
        }

    },
    destroyed() {},
});

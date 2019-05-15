
// polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'dom4';
import 'whatwg-fetch';


/* --------------------------------------------------------------------------------
Vue
-------------------------------------------------------------------------------- */
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import ShowGridInit from './utils/helper/showGrid';
import store from './store/index';

// Directives

// Components

// App
const vm = new Vue({
    el: '#app',
    store,
    components: {},
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
        if (this.env === 'dev') {
            // ShowGridInit(16);
        }
    },
    destroyed() { },
});

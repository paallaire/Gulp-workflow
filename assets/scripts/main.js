/* --------------------------------------------------------------------------------
Polyfill
-------------------------------------------------------------------------------- */
import 'babel-polyfill';

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import 'svgxuse';
import ShowGridInit from './utils/showGrid.js'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

/* --------------------------------------------------------------------------------
Vue
-------------------------------------------------------------------------------- */
import Vue from 'vue';
import store from './store'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

/* --------------------------------------------------------------------------------
Vue - Directives
-------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------
Vue - Components
-------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------
APP
-------------------------------------------------------------------------------- */
let vm = new Vue({
    el: '#app',
    store,
    components: {},
    data: {},
    computed: {
        ...mapGetters([
            'lang',
            'env',
            'isModalActive',
            'isMenuMobileActive',
            'hasBodyScroll',
        ])
    },
    watch: {
        hasBodyScroll: function (val) {
            const $body = document.querySelector("body");

            if (this.hasBodyScroll === false) {
                disableBodyScroll($body);
                $body.classList.add('no-scroll')
            } else {
                enableBodyScroll($body);
                $body.classList.remove('no-scroll');
            }

        },
      },
    methods: {
        ...mapMutations(["setHasBodyScroll"])
    },
    mounted: function () {
        ShowGridInit(12);
        this.setHasBodyScroll(false);
    },
    destroyed: function () {}
});
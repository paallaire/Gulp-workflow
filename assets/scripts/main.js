

/* --------------------------------------------------------------------------------
Polyfill
-------------------------------------------------------------------------------- */
import 'babel-polyfill';

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import getEnv from './utils/getEnv.js';
import 'svgxuse'; // Fix simple polyfill that fetches external SVGs referenced in use elements when the browser itself  ( IE 10-11 )

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
import Modal from './components/Modal.vue';

/* --------------------------------------------------------------------------------
APP
-------------------------------------------------------------------------------- */
let vm = new Vue({
    el: '#app',
    store,
    components: {
        Modal
    },
    data: {},
    computed: {
        ...mapGetters([
            'lang',
            'isModalActive',
            'env'
        ])
    },
    methods: {
        ...mapMutations([
            'setModal',
            'setEnv'
        ]),
        showModal: function (name) {
            this.setModal(name);
        },
        hideModal: function () {
            this.setModal(null);
        }
    },
    mounted: function () {
        let env = getEnv();
        this.setEnv(env);
    },
    destroyed: function () { }
});


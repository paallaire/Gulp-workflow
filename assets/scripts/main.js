

// Helpers
import getEnv from './utils/getEnv.js';

// Fix simple polyfill that fetches external SVGs referenced in use elements when the browser itself  ( IE 10-11 )
import 'svgxuse';

// Get breakpoints from SASS
// https://github.com/eduardoboucas/include-media-export
import mq from './vendors/include-media-1.0.2.min.js';

// Vue
import Vue from 'vue';
import store from './store'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

// Directives

// Components
import Modal from './components/Modal.vue';

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
            'modalActive',
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


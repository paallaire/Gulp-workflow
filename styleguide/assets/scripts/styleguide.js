console.log('styleguide js');

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import getEnv from '../../../assets/scripts/utils/getEnv.js';
import getLang from '../../../assets/scripts/utils/getLang.js';
import * as bodyScroll from '../../../assets/scripts/utils/bodyScroll.js';
import { Sticky } from '../../../assets/scripts/utils/sticky.js';

/* --------------------------------------------------------------------------------
Vue
-------------------------------------------------------------------------------- */
import Vue from 'vue';
import store from '../../../assets/scripts/store'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

/* --------------------------------------------------------------------------------
Vue - Components
-------------------------------------------------------------------------------- */
import SgNavMobile from './components/SgNavMobile.vue';
import Modal from '../../../assets/scripts/components/Modal.vue';
import ShowGrid from '../../../assets/scripts/components/ShowGrid.vue';

/* --------------------------------------------------------------------------------
Vue - Directives
-------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------
APP
-------------------------------------------------------------------------------- */
let vm = new Vue({
    el: '#app',
    store,
    components: {
        SgNavMobile,
        Modal,
        ShowGrid
    },
    data: {
        showNavMobile: false
    },
    computed: {
        ...mapGetters([
            'lang',
            'env',
            'isMenuMobileActive',
            'isModalActive',
        ])
    },
    methods: {
        ...mapMutations([
            'setEnv',
            'setLanguage',
            'setModal',
            'setMenuMobile'
        ]),
        showModal(name) {
            this.setModal(name);
        },
        hideModal() {
            this.setModal(null);
        },
        showMenuMobile() {
            this.setMenuMobile(true);
        },
        closeNavMobile() {
            this.setMenuMobile(false);
            this.showNavMobile = false;
        }
    },
    mounted() {
        this.setEnv(getEnv());
        this.setLanguage(getLang());
    },
    destroyed() { }
});


let stickyNav = new Sticky();
stickyNav.init('.test');

console.log( bodyScroll.getWidth() );
bodyScroll.init();



console.log('styleguide js');

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import getEnv from '../../../assets/scripts/utils/getEnv.js';
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
            'isMenuMobileActive',
            'modalActive',
            'env'
        ])
    },
    methods: {
        ...mapMutations([
            'setModal',
            'setEnv',
            'setMenuMobile'
        ]),
        showModal: function (name) {
            this.setModal(name);
        },
        hideModal: function () {
            this.setModal(null);
        },
        showMenuMobile : function() {
            this.setMenuMobile(true);
        },
        closeNavMobile: function () {
            this.setMenuMobile(false);
            this.showNavMobile = false;
        }
    },
    mounted: function () {
        let env = getEnv();
        this.setEnv(env);

    },
    destroyed: function () { }
});


let stickyNav = new Sticky();
stickyNav.init('.test');


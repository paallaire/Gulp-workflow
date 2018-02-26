console.log('styleguide js');

// Helpers
import getEnv from '../../../assets/scripts/utils/getEnv.js';

// Vue
import Vue from 'vue';
import store from '../../../assets/scripts/store'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

// Directives

// components
import SgNavMobile from './components/NavMobile.vue';
import Modal from '../../../assets/scripts/components/Modal.vue';
import ShowGrid from '../../../assets/scripts/components/ShowGrid.vue';

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
    },
    closeNavMobile: function () {
      this.showNavMobile = false;
    }
  },
  mounted: function () {
    let env = getEnv();
    this.setEnv(env);
  },
  destroyed: function () { }
});



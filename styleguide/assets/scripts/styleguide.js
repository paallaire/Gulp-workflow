console.log('styleguide js');

// Vue
import Vue from 'vue';
import store from '../../../assets/scripts/store'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";


import SgNavMobile from './components/NavMobile.vue';
import Modal from '../../../assets/scripts/components/Modal.vue';


let vm = new Vue({
  el: '#app',
  store,
  components: {
    SgNavMobile,
    Modal
  },
  data: {
    showNavMobile: false
  },
  computed: {
    ...mapGetters([
      'lang',
      'modalActive'
    ])
  },
  methods: {
    ...mapMutations([
      'setModal'
    ]),
    showModal: function (name) {
      this.setModal(name);
      //this.$store.commit("setModal", name);
    },
    hideModal: function () {
      this.setModal(null);
      //this.$store.commit("setModal", null);
    },
    closeNavMobile: function() {
      this.showNavMobile = false;
    }
  },
  mounted: function () { },
  destroyed: function () { }
});



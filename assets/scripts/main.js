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

// Components
import Dropdown from './components/Dropdown.vue';
import NavSticky from './components/NavSticky.vue';
import Modal from './components/Modal.vue';

let vm = new Vue({
  el: '#app',
  store,
  components: {
    Dropdown,
    NavSticky,
    Modal
  },
  data: {},
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
  },
  mounted: function () { },
  destroyed: function () { }
});


console.log('styleguide js');

import Vue from 'vue';
import SgNavMobile from './components/NavMobile.vue';


let vm = new Vue({
  el: '#app',
  components: {
    SgNavMobile
  },
  data: {
    showNavMobile: false
  },
  methods: {
    closeNavMobile: function() {
      this.showNavMobile = false;
    }
  }
});



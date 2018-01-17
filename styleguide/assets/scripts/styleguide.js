console.log('styleguide js');

import Vue from 'vue';
import NavMobile from './components/NavMobile.vue';


let vm = new Vue({
  el: '#app',
  components: {
    NavMobile
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



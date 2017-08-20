console.log('hello js');

import Vue from 'vue';
import Notification from './components/Notification.vue';
import NavMobile from './components/NavMobile.vue';

let vm = new Vue({
  el: '#app',
  components: {
    Notification,
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

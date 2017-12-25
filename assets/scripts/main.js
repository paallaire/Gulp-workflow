console.log('hello js');

// Get breakpoints from SASS
// https://github.com/eduardoboucas/include-media-export
import mq from './vendors/include-media-1.0.2.min.js';

import Vue from 'vue';
import Notification from './components/Notification.vue';
import NavMobile from './components/NavMobile.vue';



console.log( mq.getActive() );

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

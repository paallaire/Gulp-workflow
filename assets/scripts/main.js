// Fix simple polyfill that fetches external SVGs referenced in use elements when the browser itself  ( IE 10-11 )
import 'svgxuse';

// Get breakpoints from SASS
// https://github.com/eduardoboucas/include-media-export
import mq from './vendors/include-media-1.0.2.min.js';

// Vue
import Vue from 'vue';
import Dropdown from './components/Dropdown.vue';

let vm = new Vue({
  el: '#app',
  components: {
    Dropdown,
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

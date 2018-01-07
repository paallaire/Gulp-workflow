<template>
  <div class="nav-sticky" :class="[cssClass,statusScroll]">
    test
  </div>
</template>

<script>
import getSize from "../utils/getSize";
import _ from "lodash";
export default {
  name: "navSticky",
  props: {
    cssClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      previousTop: 0,
      currentTop: null,
      isScrollUp: null
    };
  },
  computed: {
    statusScroll: function() {
      return this.isScrollUp ? "is-show" : "is-hide";
    }
  },
  methods: {
    onScroll: _.debounce(
      function(e) {
        this.setStatus();
      },
      250,
      { leading: false, trailing: true }
    ),
    setStatus: function() {
      this.currentTop = window.pageYOffset;

      if (this.currentTop < this.previousTop) {
        this.isScrollUp = true;
      } else {
        this.isScrollUp = false;
      }

      this.previousTop = this.currentTop;
    }
  },
  mounted: function() {
    window.addEventListener("scroll", this.onScroll);
    this.isScrollUp = true;
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

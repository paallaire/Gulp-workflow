<template>
  <div class="dropdown" :class="menuPositionCss">
    <div class="dropdown-header" @click="isActive = !isActive">
      <slot name="header"></slot>
    </div>
    <transition name="menu">
      <div class="dropdown-items" v-show="isActive">
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import getSize from "../utils/getSize";
import _ from "lodash";
export default {
  name: "dropdown",
  props: {
    placement: {
      type: String,
      default: "bottom"
    }
  },
  data() {
    return {
      isActive: false,
      menuPosition: null,
      menuInitPosition: null
    };
  },
  computed: {
    menuPositionCss: function() {
      return "placement-" + this.menuPosition;
    }
  },
  watch: {
    isActive: function() {
      if (this.isActive) {
        this.setPosition();
        window.addEventListener("resize", this.onResize);
      } else {
        window.removeEventListener("resize", this.onResize);
      }
    }
  },
  methods: {
    onResize: _.debounce(function(e) {
      this.setPosition();
    }, 300),
    setPosition: function() {
      let $header = this.$el.children[0];
      let $header_rect = $header.getBoundingClientRect();
      let $dd = this.$el.children[1];
      let $dd_size = getSize($dd);

      switch (this.menuInitPosition) {
        case "bottom":
          if ($dd_size.height + $header_rect.top > document.body.clientHeight) {
            this.menuPosition = "top";
          } else {
            this.menuPosition = this.menuInitPosition;
          }
          break;

        default:
          if ($dd_size.height > $header_rect.top) {
            this.menuPosition = "bottom";
          } else {
            this.menuPosition = this.menuInitPosition;
          }
      }
    }
  },
  mounted: function() {
    this.menuPosition = this.placement;
    this.menuInitPosition = this.placement;
    this.isActive = false;
  },
  destroyed: function() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
}
.menu-leave {
  opacity: 1;
}
.menu-enter-active {
  transition: opacity 0.3s ease;
  opacity: 1;
}
.menu-enter {
  opacity: 0;
}
</style>
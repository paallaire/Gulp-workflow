<template>
  <div class="vue-nav-mobile">

    <transition name="nav-mobile--menu">
      <div class="vue-nav-mobile__menu" v-if="isMenuMobileActive">
        <slot name="header"></slot>
        <slot name="nav"></slot>
      </div>
    </transition>

    <transition name="nav-mobile--overlay">
      <div class="vue-nav-mobile__overlay" @click.prevent="close()" v-if="isMenuMobileActive"></div>
    </transition>

  </div>
</template>

<script>
// Get breakpoints from SASS ( https://github.com/eduardoboucas/include-media-export )
import im from "../../../../assets/scripts/vendors/include-media-1.0.2.min.js";
import _ from "lodash";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "SgNavMobile",
  computed: {
    ...mapGetters(["isMenuMobileActive"])
  },
  methods: {
    ...mapMutations(["setMenuMobile"]),
    close: function() {
      this.setMenuMobile(false);
    },
    resize: _.debounce(function(e) {
      if (im.greaterThan('tablet') && this.isMenuMobileActive) {
        this.close();
      }
    }, 250)
  },
  mounted: function() {
    window.addEventListener("resize", this.resize);
  },
  destroyed: function() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-nav-mobile {
  width: 100%;
  height: 100%;
  background: #fff;
}

.vue-nav-mobile__menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 320px;
  height: 100%;
  background: #fff;
}

.vue-nav-mobile__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: #000;
  cursor: pointer;
  opacity: 0.2;
}

/* transition menu */
.nav-mobile--menu-enter-active,
.nav-mobile--menu-leave-active {
  transition: transform 0.3s ease;
}

.nav-mobile--menu-enter {
  transform: translateX(-320px);
}

.nav-mobile--menu-enter-to {
  transform: translateX(0);
}

.nav-mobile--menu-leave {
  transform: translateX(0);
}

.nav-mobile--menu-leave-to {
  transform: translateX(-320px);
}

/* transition overlay */
.nav-mobile--overlay-enter-active,
.nav-mobile--overlay-leave-active {
  transition: opacity 0.3s;
}

/* out */
.nav-mobile--overlay-enter,
.nav-mobile--overlay-leave-to {
  opacity: 0;
}

/* in */
.nav-mobile--overlay-enter-to,
.nav-mobile--overlay-leave {
  opacity: 0.2;
}
</style>

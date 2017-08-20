<template>
  <div class="vue-nav-mobile">

    <transition name="nav-mobile--menu">
      <div class="vue-nav-mobile__menu" v-if="show">
        <slot name="header"></slot>
        <slot name="nav"></slot>
      </div>
    </transition>

    <transition name="nav-mobile--overlay">
      <div class="vue-nav-mobile__overlay" @click="close()" v-if="show"></div>
    </transition>

  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'navMobile',
  props: ['show'],
  methods: {
    close: function () {
      this.$emit('nav-mobile-close');
    },
    resize: _.debounce(function (e) {

      const w = window.innerWidth;

      if (w >= 1000 && this.show) {
        this.close();
      }

    }, 250)
  },
  mounted: function () {
    window.addEventListener("resize", this.resize);
  },
  destroyed: function () {
    window.removeEventListener("resize", this.resize);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-nav-mobile {
  width: 100%;
  height: 100%;
  background: #ccc;
}

.vue-nav-mobile__menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 320px;
  height: 100%;
  background: #eee;
}

.vue-nav-mobile__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  cursor: pointer;
}


/* transition menu */

.nav-mobile--menu-enter-active,
.nav-mobile--menu-leave-active {
  transition: transform .5s ease;
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
  opacity: 1;
}
</style>

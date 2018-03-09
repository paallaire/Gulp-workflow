<template>
    <transition name="modal">
        <div :id="name" :name="name" v-if="visible" class="c-modal" :class="isActive">
            <div class="c-modal__overlay" @click.self="hide()"></div>
            <div class="c-modal__content">
                <button @click.prevent="hide()" class="c-modal__btn-close" aria-label="close">Close</button>
                <div class="c-modal__body"><slot name="body"></slot></div>
            </div>
        </div>
    </transition>
</template>

<script>
import _ from "lodash";
import * as bodyScroll from './../utils/bodyScroll.js';
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "modal",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters(["isModalActive"]),
    isActive() {
      return this.visible ? "is-active" : "";
    }
  },
  watch: {
    isModalActive() {
      if (this.isModalActive == this.name) {
        this.show();
      }
    }
  },
  methods: {
    ...mapMutations(["setModal"]),
    show() {
      this.visible = true;
      window.addEventListener("keyup", this.onEscapeKeyUp);
      bodyScroll.noScroll(true);
    },
    hide() {
      this.visible = false;
      this.setModal(null);
      window.removeEventListener("keyup", this.onEscapeKeyUp);
      bodyScroll.noScroll(false);
    },
    onEscapeKeyUp(event) {
      if (event.which === 27 && this.visible) {
        this.hide();
      }
    }
  },
  mounted() {},
  destroyed() {
    window.removeEventListener("keyup", this.onEscapeKeyUp);
  }
};
</script>



<template>
  <transition name="modal">
    <div :id="name" :name="name" v-if="visible" class="c-modal" :class="isActive">
      <div class="c-modal__background" @click.self="hide()"></div>
      <div class="c-modal__content">
          <a href="#" @click.prevent="hide()"><slot name="close">X</slot></a>
          <div class="c-modal__body"><slot name="body">Content</slot></div>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "modal",
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters(["modalActive"]),
    isActive() {
      return this.visible ? 'is-active' : '';
    }
  },
  watch: {
    modalActive() {
      if (this.modalActive == this.name) {
        this.show();
      }
    }
  },
  methods: {
    show() {
      this.visible = true;
      window.addEventListener("keyup", this.onEscapeKeyUp);
    },
    hide() {
      this.visible = false;
      this.$store.commit("setModal", null);
      window.removeEventListener("keyup", this.onEscapeKeyUp);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* in */
.modal-enter {
  opacity: 0;
}

.modal-enter-active {
  transition: opacity 0.375s cubic-bezier(0.4, 0.0, 0.2, 1);
  /*opacity: 1; default value */
}

/* out */
.modal-leave {
  /*opacity: 1; default value */
}

.modal-leave-active {
  transition: opacity 0.375s cubic-bezier(0.4, 0.0, 0.2, 1);
  opacity: 0;
}

</style>
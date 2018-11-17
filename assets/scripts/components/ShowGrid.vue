<template>
  <div class="show-grid">
    <button class="show-grid__button" @click="toggle">{{ btnLabel }} Grid</button>

    <transition name="show-grid">
    <div class="show-grid__visual" v-if="isActive">

        <div class="show-grid__row" :class="rowClass">
          <div class="show-grid__column" :class="columnClass" v-for='(item, index) in columns' :key='index'></div>
        </div>
  
    </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "showGrid",
  props: {
    columns: {
      type: Number,
      default: 12
    },
    rowClass: {
      type: String,
      default: "row"
    },
    columnClass: {
      type: String,
      default: "col-small-1"
    }
  },
  data() {
    return {
      isActive: false,
      btnLabel: "Show"
    };
  },
  computed: {
    ...mapGetters(["env"])
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;

      if (this.isActive) {
        this.btnLabel = "Hide";
      } else {
        this.btnLabel = "Show";
      }
      
    }
  },
  mounted() {},
  destroyed() {}
};
</script>
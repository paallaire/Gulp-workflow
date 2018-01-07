
import 'es6-promise/auto';

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: null,
    modalActive: null
  },
  getters: {
    lang(state) {
      return state.lang;
    },
    modalActive(state) {
      return state.modalActive;
    },
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang;
    },
    setModal(state, modalActive) {
      state.modalActive = modalActive;
    },
  }

});
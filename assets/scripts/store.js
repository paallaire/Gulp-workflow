
import 'es6-promise/auto';

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: null,
    modalActive: null,
    env: "prod"
  },
  getters: {
    lang(state) {
      return state.lang;
    },
    modalActive(state) {
      return state.modalActive;
    },
    env(state) {
      return state.env;
    },
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang;
    },
    setModal(state, modalActive) {
      state.modalActive = modalActive;
    },
    setEnv(state, env) {
      state.env = env ? 'dev' : 'prod';
    },
  }

});
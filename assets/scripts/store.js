
import 'es6-promise/auto';
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: null,
        env: "prod",
        isModalActive: null,
        isMenuMobileActive: false,
        hasBodyScroll: true
    },
    getters: {
        lang(state) {
            return state.lang;
        },
        env(state) {
            return state.env;
        },
        isMenuMobileActive(state) {
            return state.isMenuMobileActive;
        },
        isModalActive(state) {
            return state.isModalActive;
        },
        hasBodyScroll(state) {
            return state.hasBodyScroll;
        }
    },
    mutations: {
        setLanguage(state, lang) {
            state.lang = lang;
        },
        setEnv(state, env) {
            state.env = env ? 'dev' : 'prod';
        },
        setMenuMobile(state, isMenuMobileActive) {
            state.isMenuMobileActive = isMenuMobileActive;
        },
        setModal(state, isModalActive) {
            state.isModalActive = isModalActive;
        },
        setHasBodyScroll(state, hasBodyScroll) {
            state.hasBodyScroll = hasBodyScroll;
        }
    }
});
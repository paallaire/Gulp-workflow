import 'es6-promise/auto';
import Vue from "vue";
import Vuex from "vuex";

import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock';

import getEnv from "./utils/getEnv";
import getLang from "./utils/getLang";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: getLang(),
        env: getEnv(),
        modal: null,
        hasMenuCanvas: false,
        hasBodyScroll: false
    },
    getters: {
        lang: state => {
            return state.lang;
        },
        env: (state) => {
            return state.env;
        },
        hasMenuCanvas: (state) => {
            return state.hasMenuCanvas;
        },
        modal: (state) => {
            return state.modal;
        },
        hasBodyScroll: (state) => {
            return state.hasBodyScroll;
        }
    },
    mutations: {
        setLanguage: (state, lang) => {
            state.lang = lang;
        },
        setEnv: (state, env) => {
            state.env = env ? 'dev' : 'prod';
        },
        setHasMenuCanvas: (state, hasMenuCanvas) => {
            state.hasMenuCanvas = hasMenuCanvas;
        },
        setModal: (state, modal) => {
            state.modal = modal;
        },
        setBodyScroll: (state, hasBodyScroll) => {
            const $body = document.querySelector("body");

            console.log(state, hasBodyScroll);

            state.hasBodyScroll = hasBodyScroll;

            if (!state.hasBodyScroll) {
                disableBodyScroll($body);
                $body.classList.add('no-scroll')
            } else {
                enableBodyScroll($body);
                $body.classList.remove('no-scroll');
            }

        }
    }
});
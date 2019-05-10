import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { getEnv, getLang } from '../utils/helper/env';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: getLang(),
        env: getEnv(),
        bodyScrollDisabled: false,
    },
    getters: {
        lang: state => state.lang,
        env: state => state.env,
        bodyScrollDisabled: state => state.bodyScrollDisabled,
    },
    mutations: {
        setLanguage: (state, lang) => {
            state.lang = lang;
        },
        setEnv: (state, env) => {
            state.env = env ? 'dev' : 'prod';
        },
        setBodyScrollDisabled(state, { status, selector }) {
            state.bodyScrollDisabled = { status, selector };

            if (status) {
                disableBodyScroll(selector);
            } else {
                clearAllBodyScrollLocks();
            }
        },
    },
});

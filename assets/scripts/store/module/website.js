import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { getEnv, getLang } from '../../utils/helper/env';

// Data
const data = {
    lang: getLang(),
    env: getEnv(),
    bodyScrollDisabled: false,
};

// Getters - get value
const getters = {
    lang: state => state.lang,
    env: state => state.env,
    bodyScrollDisabled: state => state.bodyScrollDisabled,
};

// Setter - set value asynchrone (async)
const actions = {};

// Setter - set value synchrone (sync)
const mutations = {
    setLanguage: (state, lang) => {
        state.lang = lang;
    },
    setEnv: (state, env) => {
        state.env = env ? 'dev' : 'prod';
    },
    setBodyScrollDisabled(state, { status, element }) {
        state.bodyScrollDisabled = { status, element };
        if (status) {
            disablePageScroll(element);
        } else {
            enablePageScroll(element);
        }
    },
};

export default {
    state: data,
    getters,
    actions,
    mutations,
};

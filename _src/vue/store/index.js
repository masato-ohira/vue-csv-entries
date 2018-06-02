'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import createLogger from 'vuex/dist/logger';

import types from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const store = new Vuex.Store({
  state: {
    posts: null,
  },
  getters,
  actions,
  mutations,
  plugins: [
    createLogger(),
  ],
});

export {store, types};

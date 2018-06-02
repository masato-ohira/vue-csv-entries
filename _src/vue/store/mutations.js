'use strict';
import types from './types';

const mutations = {

  [types.SET_POSTS](state, data) {
    state.posts = data;
  },

};

export default mutations;

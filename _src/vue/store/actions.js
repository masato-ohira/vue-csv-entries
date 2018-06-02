'use strict';
import types from './types';
import $ from 'jquery';

const actions = {
  [types.SET_POSTS]({commit, state}, api) {
    $.ajax({
      url: api,
    })
    .done( (res) => {
      commit(types.SET_POSTS, res);
    });
  },
};

export default actions;

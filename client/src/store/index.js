import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import board from './modules/board';
import error from './modules/error';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    board,
    error
  }
});

export default store
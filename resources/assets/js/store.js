import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  debug: process.env.NODE_ENV !== 'production',
  state: {

  },
  actions: {},
  mutations: {},
});

export default store;

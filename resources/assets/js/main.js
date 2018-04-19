import Vue from 'vue';
import './../scss/styles.scss';

import Dashboard from './components/Dashboard.vue';
import store from './store';

Vue.config.devtools = true;

const vueApp = new Vue({
  el: '#app',
  data: {
    test: null,
  },
  components: {
    Dashboard,
  },
  computed: {},
  methods: {},
  mounted() {},
});
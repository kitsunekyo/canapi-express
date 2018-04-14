import Vue from 'vue';
import './../scss/styles.scss';

import App from './components/App.vue';
import store from './store';

Vue.config.devtools = true;

const vueApp = new Vue({
  el: '#app',
  data: {
    test: null,
  },
  components: {
    App,
  },
  computed: {},
  methods: {},
  mounted() {},
});
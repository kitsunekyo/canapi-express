import Vue from 'vue';
import './../scss/styles.scss';

import App from './components/App.vue';

const vueApp = new Vue({
  el: '#app',
  data: {
    test: null,
  },
  components: {
    App,
  }
});
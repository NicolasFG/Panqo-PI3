import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import axios from 'axios';
import Vueaxios from 'vue-axios';

Vue.use(Vueaxios, axios);

Vue.config.productionTip = false;
// parparVue.prototype.$http = axios;
// const token = localStorage.getItem('token');
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
// }
new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');

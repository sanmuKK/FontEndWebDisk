import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from "./axios";

// Vue.config.productionTip = false

Vue.use(ElementUI);


Vue.prototype.$axios = axios;
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
};


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
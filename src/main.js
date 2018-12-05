import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'
import router from './router/'
import store from './store/'

Vue.use(VeeValidate)

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
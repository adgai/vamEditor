import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import {axiosIntercept} from "@/utils/request";

// eslint-disable-next-line no-undef
Vue.prototype.$http = axiosIntercept(Vue)
Vue.prototype.$axios = axios

Vue.config.productionTip = false


import router from './router'

Vue.use(VueRouter)
// const router = new VueRouter()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

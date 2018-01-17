import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'

Vue.config.productionTip = false

window.URL = window.URL || window.webkitURL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

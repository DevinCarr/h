import Vue from 'vue'
import Router from 'vue-router'
import MainHealth from '@/components/MainHealth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Health',
      component: MainHealth
    }
  ]
})

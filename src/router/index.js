import Vue from 'vue'
import Router from 'vue-router'
import Health from '@/components/Health'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Health',
      component: Health
    }
  ]
})

import { createRouter, createWebHashHistory } from 'vue-router'
import unCLient from '@renderer/src/views/unclient/index.vue'
import Home from '@renderer/src/layout/index.vue'
import Timer from '@renderer/src/views/timer/index.vue'
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/un_client',
      component: unCLient
    },
    {
      path: '/timer',
      component: Timer
    }
  ]
})

import { createRouter, createWebHashHistory } from 'vue-router'
import unCLient from '@renderer/src/views/unclient/index.vue'
import Home from '@renderer/src/views/home/index.vue'
import Timer from '@renderer/src/views/timer/index.vue'
import Match from '@renderer/src/views/match/index.vue'
import GameStart from '@renderer/src/views/gameStart/index.vue'
import ChampSelect from '@renderer/src/views/champSelect/index.vue'
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
    },
    {
      path: '/match',
      component: Match
    },
    {
      path: '/gameStart',
      component: GameStart
    },
    {
      path: '/champSelect',
      component: ChampSelect
    }
  ]
})

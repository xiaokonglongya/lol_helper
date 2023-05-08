import { createApp } from 'vue'
import App from './App.vue'
import 'vfonts/Lato.css'
import { injectNaiveui } from './plugins/naive-ui'
import router from './router/index'
import { createPinia } from 'pinia'
const store = createPinia()
const app = createApp(App)
injectNaiveui(app).use(router).use(store)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
import 'vfonts/Lato.css'
import { injectNaiveui } from './plugins/naive-ui'
import router from './router/index'
import { createPinia } from 'pinia'
const store = createPinia()
const app = createApp(App)
injectNaiveui(app).use(router).use(store)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import 'vfonts/Lato.css'
import { injectNaiveui } from './plugins/naive-ui'
const app = createApp(App)
injectNaiveui(app)
app.mount('#app')

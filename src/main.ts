import './style/mian.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(createHead())

app.mount('#app')
import './style/mian.scss'
import './style/tailwind.pcss'
import configs from './configs'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'

const app = createApp(App)

console.log(...(configs.cliPrint ?? []));
app.use(createPinia()).use(createHead())

app.mount('#app')
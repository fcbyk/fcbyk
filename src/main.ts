import './style/mian.scss'
import './style/tailwind.pcss'
import configs from './configs'
import { createApp,ref} from 'vue'
import App from './App.vue'

const app = createApp(App)

console.log(...(configs.cliPrint ?? []));

app.provide("isSending", ref(false))
app.provide('messages', ref([]))

app.mount('#app')
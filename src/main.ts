import './assets/mian.scss'
import './assets/tailwind.css'

import { createApp,ref} from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide("isSending", ref(false))
app.provide('messages', ref([]))

app.mount('#app')

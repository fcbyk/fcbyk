import './style/mian.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

// 动态注入CCSS
const cdnUrl = import.meta.env.VITE_APP_CDN_CSS
if (cdnUrl) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = cdnUrl
  document.head.appendChild(link)
}

const app = createApp(App)

app.use(createPinia()).use(createHead()).use(router)

app.mount('#app')
import App from './App.vue'
import '@/assets/styles/index.scss'
import router from '@/router'
const app = createApp(App)

app.use(router)
app.mount('#app')

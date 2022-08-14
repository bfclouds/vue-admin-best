import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { setupStore } from './store'
import '@/style/index.less'
import './assets/tailwind.css'
import 'element-plus/dist/index.css'
import '@/style/design/index.less'
import '../mock/index'

const app = createApp(App)

app.use(router).use(ElementPlus)
setupStore(app)

app.mount('#app')

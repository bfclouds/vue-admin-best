import { resolveComponent, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import signRoutes from './routes/sign'
import homeRoutes from './routes/home'

const RouteView = {
  render: () => h(resolveComponent('router-view')),
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...signRoutes, ...homeRoutes],
})

export default router

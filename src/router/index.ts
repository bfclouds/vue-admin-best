import { resolveComponent, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import signRoutes from './sign'

const RouteView = {
  render: () => h(resolveComponent('router-view')),
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...signRoutes],
})

export default router

import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import baseRoutes from './routes'
// import { usePermissionStoreWithOut } from '@/store/modules/permission'

// const RouteView = {
//   render: () => h(resolveComponent('router-view')),
// }

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRoutes],
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

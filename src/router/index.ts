import { resolveComponent, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import baseRoutes from './routes'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

const RouteView = {
  render: () => h(resolveComponent('router-view')),
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRoutes],
})

const permissionStore = usePermissionStoreWithOut()

async function getAsyncMenus() {
  const menu = await permissionStore.buildRoutesAction()
  console.log(menu)
}
getAsyncMenus()

export default router

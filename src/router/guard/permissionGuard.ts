import { Router, RouteRecordRaw } from 'vue-router'
// import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic'

export async function createPermissionGuard(router: Router) {
  // const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, form, next) => {
    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()
    console.log('routes >>>', routes)

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    console.log('routes: >>> ', to, to.name)

    permissionStore.setIsDynamicAddedRoute(true)

    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)

    if (!to.name || to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      next()
    }
  })
}

import { treeMap } from '@/utils/helper/treeHelper'
import { isUrl } from '@/utils/is'
import { AppRouteModule, Menu } from '../types'

export function transformRouteToMenu(routeList: AppRouteModule[]): Menu[] {
  const MenuList = treeMap(routeList, {
    conversion(route: AppRouteModule) {
      const { meta: { title, hideMenu = false } = {} } = route

      return {
        ...(route.meta || {}),
        meta: route.meta,
        name: title,
        hideMenu,
        path: route.path,
        ...(route.redirect ? { redirect: route.redirect } : {}),
      }
    },
  })

  joinParentPath(MenuList)
  return MenuList
}

function joinParentPath(routeList: Menu[], parentPath = ''): Menu[] {
  routeList.forEach((menu) => {
    // || isUrl(menu.path)
    if (!menu.path.startsWith('/')) {
      menu.path = `${parentPath}/${menu.path}`
    }

    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  })

  return routeList
}

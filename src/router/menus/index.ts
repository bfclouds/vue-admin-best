import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { Menu } from '../types'

const staticMenus: Menu[] = []

export function getShallowMenus() {
  return getAsyncMenus()
}

export function getMenus() {
  const menus = getAsyncMenus()
  return menus
}

function getAsyncMenus() {
  const permissionStore = usePermissionStoreWithOut()
  return permissionStore.getFrontMenuList
  // return staticMenus
}

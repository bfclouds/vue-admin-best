import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { getAllParentPath } from '../helper/mentHelper'
import { Menu } from '../types'

const staticMenus: Menu[] = []

export function getShallowMenus() {
  return getAsyncMenus()
}

export function getMenus() {
  const menus = getAsyncMenus()
  return menus
}

export async function getCurrentAllParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  console.log(allParentPath)
  return allParentPath
}

function getAsyncMenus() {
  const permissionStore = usePermissionStoreWithOut()
  return permissionStore.getFrontMenuList
  // return staticMenus
}

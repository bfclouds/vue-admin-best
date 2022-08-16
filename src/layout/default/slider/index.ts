import { getMenus, getShallowMenus } from '@/router/menus'
import { Menu } from '@/router/types'
import usePermissionStore from '@/store/modules/permission'
import { onMounted, ref, unref, watch } from 'vue'

const menuList = ref<Menu[]>([])

export function useMenus() {
  const permissionStore = usePermissionStore()

  onMounted(() => {
    menuList.value = getShallowMenus()
    console.log('menuList: >>>>', menuList.value)

    console.log('menuList: >>>', menuList.value)
  })

  watch(
    [
      () => permissionStore.getLastBuildMenuTime,
      () => permissionStore.getBackMenuList,
    ],
    () => {
      genMenus()
    },
    {
      immediate: true,
    }
  )

  // get Menus
  async function genMenus() {
    const menus = await getMenus()
    menuList.value = menus
  }

  return {
    menuList,
  }
}

import { Menu } from '@/router/types'
import usePermissionStore from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { computed, onMounted, ref, unref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  getCurrentAllParentPath,
  getMenus,
  getShallowMenus,
} from '@/router/menus'
import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
} from '@/enums/appEnum'
import { before } from 'lodash-es'

const menuList = ref<Menu[]>([])
const activeRoute = ref<string[]>([])

export function useMenus() {
  watch(
    () => activeRoute.value,
    (newValue) => {
      console.log(newValue)
    }
  )

  const permissionStore = usePermissionStore()
  const appStore = useAppStore()
  const route = useRoute()
  // menu
  const isHideMenu = computed(() => appStore.getFullContent)
  const getMixSideWidth = computed(() => {
    return unref(isHideMenu)
      ? `${SIDE_BAR_MINI_WIDTH}px`
      : `${SIDE_BAR_SHOW_TIT_MINI_WIDTH}px`
  })
  const activeRouteName = computed(() => {
    return menuList.value.find((item) => item.path === activeRoute.value[0])
      ?.name
  })
  const openedMenus = computed(() => {
    // console.log('xxxx ', activeRoute.value.at(-1))
    // const subRouteList = subMenuList.value?.map((item) => item.children || [])
    // subRouteList
    // return subMenuList.value?.reduce((before: string[], next) => {
    //   return before.concat((next.children || []).map((item) => item.path))
    // }, [])
    // if (activeRoute.value.length > 2) {
    //   return [activeRoute.value[1]]
    // }
    return subMenuList.value?.map((item) => item.path)
  })
  async function genMenus() {
    const menus = await getMenus()
    menuList.value = menus
  }

  // subMenu
  const subMenuList = computed(() => {
    for (let i = 0; i < menuList.value.length; i++) {
      const item = menuList.value[i]
      if (item.path === activeRoute.value[0]) {
        return item.children
      }
    }
    return []
  })

  onMounted(async () => {
    menuList.value = getShallowMenus()
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

  watch(
    () => route.path,
    async () => {
      activeRoute.value = await getCurrentAllParentPath(route.path)
    },
    {
      immediate: true,
    }
  )

  return {
    menuList,
    getMixSideWidth,
    activeRoute,
    subMenuList,
    activeRouteName,
    openedMenus,
  }
}

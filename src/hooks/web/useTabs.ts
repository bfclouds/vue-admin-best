import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { RouteLocationNormalized, useRouter } from 'vue-router'

export function useTabs() {
  const appStore = useAppStore()
  const tabStore = useMultipleTabStore()
  const router = useRouter()

  const isHidedMenu = computed(() => appStore.getFullContent)
  const tabList = computed(() => {
    return tabStore.getTabList
  })

  function addTab(route: RouteLocationNormalized) {
    if (!route) {
      return
    }

    tabStore.addTab(route)
  }

  function getCurrentTab() {
    const route = unref(router.currentRoute)
    return tabList.value.find((item) => item.fullPath === route.fullPath)
  }

  const currentIndex = computed({
    get: () => {
      const r = tabList.value.find(
        (item) => item.fullPath === getCurrentTab()?.fullPath
      )
      return r?.name || ''
    },
    set: (name) => {
      // const r = tabList.value[]
      console.log(name)
      const r = tabList.value.find((item) => item.name === name)
      r?.path && router.push(r?.path)
      // router.push(name as RouteLocationRaw)
    },
  })

  function toggleHideMenu() {
    appStore.setFullContent(!isHidedMenu.value)
  }

  return {
    toggleHideMenu,
    tabList,
    isHidedMenu,
    getCurrentTab,
    currentIndex,
    addTab,
  }
}

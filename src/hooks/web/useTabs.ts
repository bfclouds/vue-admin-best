import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { RouteLocationNormalized, useRouter } from 'vue-router'

export function useTabs() {
  const appStore = useAppStore()
  const tabStore = useMultipleTabStore()
  const { currentRoute } = useRouter()

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
    const route = unref(currentRoute)
    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)!
  }

  function toggleHideMenu() {
    appStore.setFullContent(!isHidedMenu.value)
  }

  return {
    toggleHideMenu,
    tabList,
    isHidedMenu,
    getCurrentTab,
    addTab,
  }
}

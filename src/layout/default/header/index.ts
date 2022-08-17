import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useHeader() {
  const appStore = useAppStore()

  const isHidedMenu = computed(() => appStore.getFullContent)
  function toggleHideMenu() {
    appStore.setFullContent(!isHidedMenu.value)
  }
  return {
    toggleHideMenu,
    isHidedMenu,
  }
}

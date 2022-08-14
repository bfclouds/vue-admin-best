import { defineStore } from 'pinia'
import { Menu } from '@/router/types'
import { getMenuList } from '@/api/sys/menu'
import { store } from '../index'

interface PermissionState {
  backMenuList: Menu[]
  frontMunuList: Menu[]
}

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    backMenuList: [],
    frontMunuList: [],
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMunuList(): Menu[] {
      return this.frontMunuList || []
    },
  },
  actions: {
    async buildRoutesAction() {
      // 获取
      const routeList = await getMenuList()
      console.log(routeList)
      // this.fontMunuList = routeList
    },
  },
})

export default usePermissionStore

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}

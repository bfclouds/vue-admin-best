import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}

export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => ({
    cacheTabList: new Set(),
    tabList: [],
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    },
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      const { fullPath, path, params, query, meta } = route
      let updateIndex = -1
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })
      if (tabHasExits) {
        // 修改，说明只是路由query等参数变化
        const curTab = toRaw(this.tabList[updateIndex])
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        // 新增
        // 如果动态路由层级大于0，限制该路由打开数
        const dynamicLevel = (meta?.dynamicLevel as number) ?? -1
        if (dynamicLevel > 0) {
          const realPath = meta?.realPath ?? ''
          if (
            this.tabList.filter((e) => e?.meta.realPath === realPath).length >=
            dynamicLevel
          ) {
            const index = this.tabList.findIndex(
              (e) => e?.meta.realPath === realPath
            )
            this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
      }
    },
  },
})

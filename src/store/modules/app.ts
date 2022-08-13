import { defineStore } from 'pinia'
import { Menu } from '@/router/types'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    backMenuList: [],
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
  },
  actions: {},
})

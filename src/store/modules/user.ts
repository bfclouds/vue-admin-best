import { defineStore } from 'pinia'
import { Menu } from '@/router/types'
import { store } from '@/store'

interface UserState {
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app',
  state: (): UserState => ({
    lastUpdateTime: 0,
  }),
  getters: {
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {},
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}

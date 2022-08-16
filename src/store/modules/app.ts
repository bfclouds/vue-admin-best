import { defineStore } from 'pinia'
import { Menu } from '@/router/types'
import { store } from '@/store'

interface ProjectConfig {
  permissionMode: string
}

interface AppState {
  projectConfig: ProjectConfig
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    projectConfig: {
      permissionMode: '',
    },
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
  },
  actions: {},
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}

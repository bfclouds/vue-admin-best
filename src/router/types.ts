import { RouteMeta } from 'vue-router'

export interface Menu {
  name: string
  path: string
  icon?: string
  children?: Menu[]
  meta?: Partial<RouteMeta>
}

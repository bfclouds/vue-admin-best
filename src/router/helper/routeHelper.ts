import { cloneDeep } from 'lodash-es'
import { LayoutComp } from '../constant'
import { AppRouteModule, AppRouteRecordRaw } from '../types'

const layoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()
layoutMap.set('LAYOUT', LayoutComp)

function requireAllViews(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((key) => {
    if (/index\.vue$/.test(key)) {
      const sliceKey = key.replace('./', '/')
      const k = sliceKey.slice(0, sliceKey.lastIndexOf('.'))
      layoutMap.set(k, r(key).default)
    }
  })
}

let isInit = false

export function transformObjToRoute<T = AppRouteModule>(
  routeList: AppRouteModule[]
): T[] {
  if (!isInit) {
    requireAllViews(require.context('../../views/', true, /\.vue$/))
    isInit = true
  }
  routeList.forEach((route) => {
    const { component } = route
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = layoutMap.get('LAYOUT')
      } else {
        route.children = [cloneDeep(route)]
        route.component = LayoutComp
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      console.warn(`请正确配置路由${route?.name}的component属性`)
    }

    route.children && asyncImportRoute(route.children)
  })
  return routeList as unknown as T[]
}

function asyncImportRoute(routes: AppRouteRecordRaw[]) {
  routes.forEach((route) => {
    if (typeof route.component === 'string') {
      const layoutFound = layoutMap.get(route.component)

      if (layoutFound) {
        route.component = layoutFound
      } else {
        new Error('页面组件不存在')
      }

      route.children && asyncImportRoute(route.children)
    }
  })
}

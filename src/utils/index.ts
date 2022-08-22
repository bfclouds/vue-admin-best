import { isObject } from '@/utils/is'
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

export function deepMerge<T = any>(source: any = {}, target: any = {}): T {
  for (const key in target) {
    isObject(source)
      ? deepMerge(source[key], target[key])
      : (source[key] = target[key])
  }
  return source
}

export function getRawRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route

  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          path: item.path,
          name: item.name,
          meta: item.meta,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

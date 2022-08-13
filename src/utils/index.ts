import { isObject } from '@/utils/is'

export function deepMerge<T = any>(source: any = {}, target: any = {}): T {
  for (const key in target) {
    isObject(source)
      ? deepMerge(source[key], target[key])
      : (source[key] = target[key])
  }
  return source
}

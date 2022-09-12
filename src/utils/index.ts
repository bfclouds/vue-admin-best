import { isObject } from '@/utils/is'
import JSEncrypt from 'jsencrypt'
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import dayjs from 'dayjs'

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

const pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjKi9wwdoIqYBlTH2hXuveumMG
swhTHhpKnfiH9sigPlBNvzZCWTRfBTFJR9zi2gjsajXXU9vJmHdLLwV51iQBirmX
aJzgKIdX41kB9FL+mAaNrRtBIFTKYG1hxpD5Day1yhk990XZkwJ063UQ6jrSyCuB
o5E3cN4hSQqQXWcv0wIDAQAB
-----END PUBLIC KEY-----
`
export function jsEncryptData(val: any) {
  try {
    const data = typeof val === 'string' ? val : JSON.stringify(val)
    const encrypt = new JSEncrypt()
    encrypt.setPrivateKey(pubKey)
    return encrypt.encrypt(data)
  } catch (err) {
    return val
  }
}

export function formatData(date: string) {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
}

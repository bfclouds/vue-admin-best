import { defHttp } from '@/utils/http'

enum Api {
  GetMenuList = '/getMenuList',
}

export const getMenuList = () => {
  return defHttp.get({ url: Api.GetMenuList })
}

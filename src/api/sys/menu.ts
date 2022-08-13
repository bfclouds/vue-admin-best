import { defHttp } from '@/utils/http'

enum Api {
  GetMenuList = '/getMenuList',
}

export const getMeumList = () => {
  defHttp.get({ url: Api.GetMenuList })
}

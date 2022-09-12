import { Page } from '@/types/config'
import { defHttp } from '@/utils/http'
import { User } from '@/views/set/userManage/type'

enum Api {
  SetUser = '/set-user',
  GetUserList = '/get-user-list',
  SearchUser = '/search-user',
}

const userManageApi = {
  setUser: (params: User) => {
    return defHttp.post({ url: Api.SetUser, data: params })
  },
  getUserList: (params: Omit<Page, 'total'>) => {
    return defHttp.get({ url: Api.GetUserList, params }) as Promise<{
      data: User[]
      page: Page
    }>
  },
  searchUser: (params: { userName: string }) => {
    return defHttp.get({ url: Api.SearchUser, params }) as Promise<User[]>
  },
}

export default userManageApi

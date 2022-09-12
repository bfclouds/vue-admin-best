import { Page } from '@/types/config'
import { defHttp } from '@/utils/http'
import { User } from '@/views/set/userManage/type'

enum Api {
  SetUser = '/set-user',
  GetUserList = '/get-user-list',
}

const userManageApi = {
  setUser: (params: User) => {
    return defHttp.post({ url: Api.SetUser, data: params })
  },
  getUserList: (params: Omit<Page, 'total'>) => {
    return defHttp.get({ url: Api.GetUserList, params }) as Promise<User[]>
  },
}

export default userManageApi

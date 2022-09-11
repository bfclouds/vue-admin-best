import { defHttp } from '@/utils/http'
import { User } from '@/views/set/userManage/type'

enum Api {
  SetUser = '/set-user',
}

const userManageApi = {
  setUser: (params: User) => {
    return defHttp.post({ url: Api.SetUser, data: params })
  },
}

export default userManageApi

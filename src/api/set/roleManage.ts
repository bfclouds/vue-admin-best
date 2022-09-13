import { Page } from '@/types/config'
import { defHttp } from '@/utils/http'
import { Role } from '@/views/set/roleManage/type'

enum Api {
  SetRole = '/set-role',
  GetRoleList = '/get-role-list',
  SearchRole = '/search-role',
}

const roleManageApi = {
  setRole: (params: Role) => {
    return defHttp.post({ url: Api.SetRole, data: params })
  },
  getRoleList: (params: Omit<Page, 'total'>) => {
    return defHttp.get({ url: Api.GetRoleList, params }) as Promise<{
      data: Role[]
      page: Page
    }>
  },
  searchRole: (params: { roleName: string }) => {
    return defHttp.get({ url: Api.SearchRole, params }) as Promise<Role[]>
  },
}

export default roleManageApi

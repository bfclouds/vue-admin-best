import roleManageApi from './set/roleManage'
import userManageApi from './set/userManage'
import menuApi from './sys/menu'

const api = {
  ...userManageApi,
  ...menuApi,
  ...roleManageApi,
}

export default api

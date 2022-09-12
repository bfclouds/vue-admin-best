import userManageApi from './set/userManage'
import menuApi from './sys/menu'

const api = {
  ...userManageApi,
  ...menuApi,
}

export default api

import userManageApi from './home/userManage'
import menuApi from './sys/menu'

const api = {
  ...userManageApi,
  ...menuApi,
}

export default api

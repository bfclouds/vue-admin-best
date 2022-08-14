import { RouteRecordRaw } from 'vue-router'
import homeRoutes from './home'
import signRoutes from './sign'

const baseRoutes: Array<RouteRecordRaw> = [...signRoutes, ...homeRoutes]

export default baseRoutes

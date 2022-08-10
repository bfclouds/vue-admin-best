import { RouteRecordRaw } from 'vue-router'

const signRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/sys/login/index.vue'),
  },
]

export default signRoutes

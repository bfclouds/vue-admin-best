import { RouteRecordRaw } from 'vue-router'
import { LayoutComp } from '../constant'

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LayoutComp,
    redirect: '/darshboard',
    children: [
      {
        path: '/darshboard',
        name: 'darshboard',
        component: () => import('@/views/home/darshboard/DarshBoard.vue'),
      },
      {
        path: '/super-form',
        name: 'superForm',
        component: () => import('@/views/home/superForm/SuperForm.vue'),
      },
    ],
  },
]

export default homeRoutes

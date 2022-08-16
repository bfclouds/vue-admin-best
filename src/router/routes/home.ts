import { RouteRecordRaw } from 'vue-router'
import { LayoutComp } from '../constant'

const homeRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   component: LayoutComp,
  //   redirect: '/home/darshboard',
  //   children: [
  //     {
  //       path: '/home',
  //       redirect: '/home/darshboard',
  //     },
  //     {
  //       path: '/home/darshboard',
  //       name: 'darshboard',
  //       component: () => import('@/views/home/darshboard/index.vue'),
  //     },
  //     // {
  //     //   path: '/home/super-form',
  //     //   name: 'superForm',
  //     //   component: () => import('@/views/home/superForm/index.vue'),
  //     // },
  //   ],
  // },
]

export default homeRoutes

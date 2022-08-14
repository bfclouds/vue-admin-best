import Mock from 'mockjs'
import { resultSuccess } from '../_util'

const homeRoute = {
  path: '/',
  component: 'LAYOUT',
  redirect: '/home/darshboard',
  meta: {
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: true,
    icon: 'icon-home',
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: '/home/darshboard',
      meta: {
        icon: 'icon-home',
      },
    },
    {
      path: 'home/darshboard',
      name: 'Darshboard',
      component: '/home/darshboard',
      meta: {
        icon: 'icon-home',
      },
    },
  ],
}

const setRoute = {
  path: '/set',
  component: 'LAYOUT',
  redirect: '/set/index',
  meta: {
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: true,
    icon: 'icon-setting',
  },
  children: [
    {
      path: 'index',
      name: 'SetIndex',
      component: '/home/darshboard',
      meta: {
        icon: 'icon-home',
      },
    },
  ],
}

console.log('mockjs2')

// Mock.mock('/getMenuList', () => {
//   console.log(1)

//   const menu: Object[] = [homeRoute]
//   return resultSuccess(menu)
// })

Mock.mock('/getMenuList', 'get', (params: any) => {
  console.log(params)
  const menu: Object[] = [homeRoute]
  return resultSuccess(menu)
})

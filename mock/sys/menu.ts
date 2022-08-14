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

Mock.setup({
  timeout: '1000-3000',
})

Mock.mock('/api/getMenuList', 'get', (params: any) => {
  console.log('parans:>>>>>', params)
  const menu: Object[] = [homeRoute]
  return resultSuccess(menu)
})

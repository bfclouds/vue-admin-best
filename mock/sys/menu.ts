import Mock from 'mockjs'
import { resultSuccess } from '../_util'

const homeRoute = {
  path: '/',
  component: 'LAYOUT',
  redirect: 'home',
  meta: {
    title: '首页',
    hideChildrenInMenu: true,
    icon: 'icon-home',
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: '/home/home/index',
      meta: {
        title: '首页',
        icon: 'icon-home',
      },
    },
    {
      path: 'home/darshboard',
      name: 'Darshboard',
      component: '/home/darshboard/index',
      meta: {
        title: 'darshboard',
        icon: 'icon-home',
      },
    },
  ],
}

const setRoute = {
  path: '/set',
  component: 'LAYOUT',
  redirect: '/set/user-center',
  meta: {
    title: '设置',
    hideChildrenInMenu: true,
    icon: 'icon-setting',
  },
  children: [
    {
      path: 'user-center',
      name: 'UserCenter',
      component: '/set/userCenter/index',
      meta: {
        title: '用户中心',
        icon: 'icon-home',
      },
    },
    {
      path: 'user-manage',
      name: 'UserManage',
      component: '/set/userManage/index',
      meta: {
        title: '用户管理',
        icon: 'icon-home',
      },
    },
  ],
}

Mock.setup({
  timeout: '200',
})

Mock.mock('/api/getMenuList', 'get', (params: any) => {
  const menu: Object[] = [homeRoute, setRoute]
  return resultSuccess(menu)
})

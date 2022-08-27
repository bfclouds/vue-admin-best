import Mock from 'mockjs'
import { resultSuccess } from '../_util'

const homeRoute = {
  path: '/',
  component: 'LAYOUT',
  redirect: '/home',
  meta: {
    title: '首页',
    hideChildrenInMenu: true,
    icon: 'icon-home',
  },
  children: [
    {
      path: 'home',
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
        icon: 'icon-pie-chart',
      },
    },
  ],
}

const setRoute = {
  path: '/set',
  component: 'LAYOUT',
  // redirect: '/set/user-center',
  meta: {
    title: '设置',
    hideChildrenInMenu: true,
    icon: 'icon-icon-user-light',
  },
  children: [],
}

const userRoute = {
  path: '/user',
  component: 'LAYOUT',
  redirect: '/user/user-center',
  meta: {
    title: '用户',
    hideChildrenInMenu: true,
    icon: 'icon-icon-user-light',
  },
  children: [
    {
      path: 'user-center',
      name: 'UserCenter',
      component: '/user/userCenter/index',
      meta: {
        title: '用户中心',
        icon: 'icon-icon-user-light',
      },
    },
    {
      path: 'user-manage',
      name: 'UserManage',
      component: '/user/userManage/index',
      meta: {
        title: '用户管理',
        icon: 'icon-yonghuguanli',
      },
    },
  ],
}

const lowCodeRoute = {
  path: '/low-code',
  component: 'LAYOUT',
  redirect: '/low-code/template',
  meta: {
    title: '低代码',
    hideChildrenInMenu: true,
    icon: 'icon-a-24Apeizhi',
  },
  children: [
    {
      path: 'template',
      name: 'LowCodeTemplate',
      component: '/lowCode/template/index',
      meta: {
        title: '模版',
        icon: 'icon-a-24Apeizhi',
      },
    },
    {
      path: 'add',
      name: 'LowCodeAdd',
      component: '/lowCode/add/index',
      meta: {
        title: '添加',
        icon: 'icon-a-24Apeizhi',
      },
    },
  ],
}

const animation = {
  path: '/animation',
  redirect: '/animation/webgl',
  meta: {
    title: '动画',
    hideChildrenInMenu: true,
    icon: 'icon-a-24Apeizhi',
  },
  children: [
    {
      path: 'webgl',
      name: 'Webgl',
      component: 'LAYOUT',
      redirect: '/animation/webgl/test1',
      meta: {
        title: 'webgl',
        hideChildrenInMenu: true,
        icon: 'icon-a-24Apeizhi',
      },
      children: [
        {
          path: '/animation/webgl/test1',
          component: '/animation/webgl/test1/index',
          meta: {
            title: 'test1',
            icon: 'icon-a-24Apeizhi',
          },
        },
        {
          path: '/animation/webgl/test2',
          component: '/animation/webgl/test1/index',
          meta: {
            title: 'test2',
            icon: 'icon-a-24Apeizhi',
          },
        },
      ],
    },
  ],
}

Mock.setup({
  timeout: '200',
})

Mock.mock('/api/getMenuList', 'get', (params: any) => {
  const menu: Object[] = [homeRoute, userRoute, lowCodeRoute, animation]
  return resultSuccess(menu)
})

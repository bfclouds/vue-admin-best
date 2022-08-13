import { Mock } from 'mockjs'

const homeRoute = {
  path: '/',
  component: 'LAYOUT',
  redirect: '/home/darshboard',
  meta: {
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: true,
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      redirect: '/home/darshboard',
    },
    {
      path: 'home/darshboard',
      name: 'Darshboard',
      component: '/home/darshboard',
    },
  ],
}

/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  // {
  //   path: '/401',
  //   name: '401',
  //   component: () => import('@/views/401'),
  //   hidden: true,
  // },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/404'),
  //   hidden: true,
  // },
  // {
  //   path: '/personalCenter',
  //   component: () => import('@/views/personalCenter/index'),
  //   hidden: true,
  // },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },

  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '用户管理', icon: 'users-cog', permissions: ['admin'] },
    children: [
      // {
      //   path: 'userManagement',
      //   name: 'UserManagement',
      //   component: () =>
      //     import('@/views/personnelManagement/userManagement/index'),
      //   meta: { title: '增删用户' },
      // },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: () =>
          import('@/views/personnelManagement/personalCenter/index'),
        meta: { title: '用户管理', icon: 'users-cog'},
      }
      // {
      //   path: 'roleManagement',
      //   name: 'RoleManagement',
      //   component: () =>
      //     import('@/views/personnelManagement/roleManagement/index'),
      //   meta: { title: '角色管理' },
      // },
      // {
      //   path: 'menuManagement',
      //   name: 'MenuManagement',
      //   component: () =>
      //     import('@/views/personnelManagement/menuManagement/index'),
      //   meta: { title: '菜单管理', badge: 'New' },
      // },
    ],
  },
  {
    path: '/clothesManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'clothesManagement',
    meta: { title: '服装管理', icon: 'tshirt'},
    children: [
      {
        path: 'clothesQuery',
        name: 'clothesQuery',
        component: () =>
          import('@/views/clothesManagement/clothesQuery/index'),
        meta: { title: '服装库存' },
      },
      {
        path: 'clothesAdd',
        name: 'clothesAdd',
        component: () =>
          import('@/views/clothesManagement/clothesAdd/index'),
        meta: { title: '服装入库' },
      },
      {
        path: 'clothesTag',
        name: 'clothesTag',
        component: () =>
          import('@/views/clothesManagement/clothesTag/index'),
        meta: { title: '服装标签' },
      }
    ],
  },
  {
    path: '/orderManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'orderManagement',
    meta: { title: '订单管理', icon: 'scroll'},
    children: [
      {
        path: 'orderQuery',
        name: 'orderQuery',
        component: () =>
          import('@/views/orderManagement/orderQuery/index'),
        meta: { title: '订单记录' },
      },
      {
        path: 'orderRent',
        name: 'orderRent',
        component: () =>
          import('@/views/orderManagement/orderRent/index'),
        meta: { title: '租凭订单记录' },
      },
      {
        path: 'orderDelete',
        name: 'orderDelete',
        component: () =>
          import('@/views/orderManagement/orderDelete/index'),
        meta: { title: '订单处理' },
      },
      {
        path: 'orderRentDelete',
        name: 'orderRentDelete',
        component: () =>
          import('@/views/orderManagement/orderRentDelete/index'),
        meta: { title: '租凭订单处理' },
      }
    ],
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router

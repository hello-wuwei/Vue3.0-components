// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    name: 'SelectSearch',
    path: '/doc/select-search',
    component: () => import('@/views/SearchSelect/index.vue')
  },
  {
    name: 'Graph',
    path: '/doc/graph',
    component: () => import('@/views/Graph/index.vue')
  }
]

export default asyncRoutes

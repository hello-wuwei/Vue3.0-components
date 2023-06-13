import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import exceptionRoutes from '@/router/route.exception'
import asyncRoutes from '@/router/route.async'
const routes: Array<RouteRecordRaw> = [
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes,
]

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
})
export default router

import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { ErrorBoundary, LazyLoad } from '@/components'
import Layout from '@/layout'
import Login from '@/pages/login'
import NotFound from '@/pages/not-found'

// 不需要懒加载的页面组件

// 需要懒加载的页面组件
const Statistics = lazy(() => import('@/pages/statistics'))
const TestList = lazy(() => import('@/pages/test/list'))
const TestRecord = lazy(() => import('@/pages/test/record'))
const TestDetail = lazy(() => import('@/pages/test/detail'))
const Trade = lazy(() => import('@/pages/trade'))
const Goods = lazy(() => import('@/pages/goods'))

export interface UserInfo {
  name: string
  age: number
  permissionRoutes: string[]
  code: number
}
/**
 * @description 模拟请求用户信息
 * @returns
 */
export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'jianjian',
        age: 12,
        permissionRoutes: ['home', 'list'],
        code: 0
      })
    }, 1000)
  })
}

/**
 * @description 这个loader函数会在路由渲染前触发,所以可以用来做路由权限控制和登陆重定向
 * @description (取代请求拦截器中的登陆重定向)
 * @description 这个loader函数返回值可以在页面中通过 useRouteLoaderData(id)或者useLoaderData获取
 */
const rootLoader = async () => {
  console.log('页面加载前请求用户信息')
  return {
    name: 'test',
    age: 'test',
    permissionRoutes: []
  }
}
export type TRoute = RouteObject & {
  name: string
  children?: TRoute[]
}
export const routerConfig: TRoute[] = [
  {
    name: '看板',
    path: '/',
    id: 'root',
    errorElement: <ErrorBoundary />,
    element: <Layout />,
    loader: rootLoader,
    children: [
      {
        name: '看板',
        path: '/',
        element: LazyLoad(Statistics, 'statistics')
      },
      {
        name: '买卖',
        path: '/trade',
        element: LazyLoad(Trade, 'trade')
      },
      {
        name: '商品',
        path: '/goods',
        element: LazyLoad(Goods, 'goods')
      },
      {
        name: 'Not Found',
        path: '*',
        element: <NotFound />
      }
      // {
      //   path: 'test',
      //   children: [
      //     {
      //       path: '',
      //       element: LazyLoad(TestList, 'test-list')
      //     },
      //     {
      //       path: 'record',
      //       element: LazyLoad(TestRecord, 'test-record')
      //     },
      //     {
      //       path: ':id',
      //       element: LazyLoad(TestDetail, 'test-detail')
      //     }
      //   ]
      // }
    ]
  },
  {
    name: '登录',
    path: '/login',
    element: LazyLoad(Login, 'login')
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />
  }
] as RouteObject[] & TRoute[]

export default createBrowserRouter(routerConfig)

import { Suspense, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ErrorBoundary, Loading, Permission } from '@/components'
import Layout from '@/layout'
import Login from '@/pages/login'
import NotFound from '@/pages/not-found'

// 不需要懒加载的页面组件

// 需要懒加载的页面组件
const Home = lazy(() => import('@/pages/home'))
const TestList = lazy(() => import('@/pages/test/list'))
const TestRecord = lazy(() => import('@/pages/test/record'))
const TestDetail = lazy(() => import('@/pages/test/detail'))
const Business = lazy(() => import('@/pages/business'))
const Goods = lazy(() => import('@/pages/goods'))

/**
 * @param Component 懒加载的组件
 * @param code 用于判断权限的字段(你可以自己定)
 * @returns
 */
const LazyLoad = (
  // Component: React.LazyExoticComponent<() => JSX.Element>,
  Component: React.FC,
  code?: string
) => {
  return (
    <Permission code={code}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </Permission>
  )
}

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

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/',
    id: 'root',
    errorElement: <ErrorBoundary />,
    element: <Layout />,
    loader: rootLoader,
    children: [
      {
        path: '/home',
        element: LazyLoad(Home, 'home')
      },
      {
        path: '/business',
        element: LazyLoad(Business, 'business')
      },
      {
        path: '/goods',
        element: LazyLoad(Goods, 'goods')
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
    path: '/login',
    element: LazyLoad(Login, 'login')
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default createBrowserRouter(routerConfig)

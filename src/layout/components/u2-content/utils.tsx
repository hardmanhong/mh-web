import NotFound from '@/pages/not-found'
import { TRoute, routerConfig } from '@/router'

const routesMap: {
  [key: string]: TRoute
} = {}

const generateRoutesMap = (path: string, arr: TRoute[]) => {
  arr.forEach((item) => {
    routesMap[item.path as string] = {
      name: item.name,
      path: item.path as string,
      element: item.element
    }
    if (Array.isArray(item.children)) {
      generateRoutesMap(path, item.children)
    }
  })
}

export const getRouteByPath = (path = '/404') => {
  if (!Object.keys(routesMap).length) {
    generateRoutesMap(path, routerConfig)
  }
  const curRoute = routesMap[path]
  if (!curRoute.path) {
    return {
      name: 'Not Found',
      path: '/404',
      element: <NotFound />
    }
  }
  return curRoute
}

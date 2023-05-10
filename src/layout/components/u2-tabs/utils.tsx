import { match } from 'path-to-regexp'
import NotFound from '@/pages/not-found'
import { TRoute, routerConfig } from '@/router'

const routesMap: {
  [key: string]: TRoute
} = {}

const generateRoutesMap = (parentPath: string, arr: TRoute[]) => {
  arr.forEach((item) => {
    const key = [parentPath, item.path]
      .filter(Boolean)
      .join('/')
      .replace(/\/\//g, '/')

    routesMap[key] = {
      name: item.name,
      path: item.path as string,
      element: item.element
    }
    if (Array.isArray(item.children)) {
      generateRoutesMap(key, item.children)
    }
  })
}

export const getRouteByPath = (path = '/404') => {
  if (!Object.keys(routesMap).length) {
    generateRoutesMap('', routerConfig)
  }
  const find = Object.keys(routesMap).find((key) => {
    const fn = match(key, { decode: decodeURIComponent })
    return fn(path)
  })
  const curRoute = find ? routesMap[find] : routesMap[path]

  if (curRoute && curRoute.element && !curRoute?.path) {
    curRoute.path = path
    return curRoute
  }
  if (!curRoute?.path) {
    return {
      name: 'Not Found',
      path: '/404',
      element: <NotFound />
    }
  }
  return curRoute
}

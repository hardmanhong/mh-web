import { TRoute } from '@/router'

const routesMap: { [key: string]: { name: string; path: string } } = {}

const urlToList = (url: string) => {
  if (!url || url === '/') {
    return ['/']
  }
  const urlList = url.split('/').filter(Boolean)
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`)
}
export const generateRoutesMap = (parentPath: string, arr: TRoute[]) => {
  arr.forEach((item) => {
    const key = [parentPath, item.path]
      .filter(Boolean)
      .join('/')
      .replace(/\/\//g, '/')

    routesMap[key] = {
      name: item.name,
      path: item.path as string
    }
    if (Array.isArray(item.children)) {
      generateRoutesMap(key, item.children)
    }
  })
}
export const genMenuData = (parentPath: string, routes: any[]) =>
  routes
    .filter((item) => item && (item.name || item.children) && !item.hideMenu)
    .map(({ element, ...item }: any) => {
      const key = [parentPath, item.path]
        .filter(Boolean)
        .join('/')
        .replace(/\/\//g, '/')
      if (
        Array.isArray(item.children) &&
        !item.hideChildrenMenu &&
        item.children.some((child: any) => child && child.name)
      ) {
        const children = genMenuData(key, item.children) as any
        if (children.length) return { ...item, path: key, children }
      }
      return { ...item, path: key, children: [] }
    })
    .filter(Boolean)

export const getPaths = (pathname: string) => {
  const pathSnippets = urlToList(pathname)
  return pathSnippets
    .map((url) => {
      const currentItem = routesMap[url] || {}
      const { name } = currentItem
      return name
        ? {
            path: url,
            name
          }
        : { path: '', name: '' }
    })
    .filter((item) => item && item.path)
}

export const getSelectedMenuKeys = (pathname: string) =>
  getPaths(pathname).map((item) => item.path)

export const getOpenMenuKeys = (selectedMenuKeys: any[]) =>
  selectedMenuKeys.slice(0, selectedMenuKeys.length - 1)

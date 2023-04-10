import createContext from '../createContext'

const [BreadcrumbProvider, useGetBreadcrumb, useSetBreadcrumb] = createContext(
  []
)

const useBreadcrumb = () => [useGetBreadcrumb(), useSetBreadcrumb()]

export { BreadcrumbProvider, useBreadcrumb, useGetBreadcrumb, useSetBreadcrumb }

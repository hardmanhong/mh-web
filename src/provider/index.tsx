import { IProvider } from './types'

export {
  BreadcrumbProvider,
  useBreadcrumb,
  useGetBreadcrumb,
  useSetBreadcrumb
} from './breadcrumb'
export {
  ThemeProvider,
  useGetTheme,
  useInitTheme,
  useSetTheme,
  useTheme
} from './theme'

export function composeProviders(...providers: IProvider[]) {
  return ({ children }: { children: React.ReactNode }) =>
    providers.reduce((prev, Provider) => <Provider>{prev}</Provider>, children)
}

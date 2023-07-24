import { IProvider } from './types'

export { MessageProvider, useMessage } from './message'

export function composeProviders(...providers: IProvider[]) {
  return ({ children }: { children: React.ReactElement }) =>
    providers.reduce((prev, Provider) => <Provider>{prev}</Provider>, children)
}

import { IProvider } from './types'

export { MessgaeProvider, useMessage } from './message'

export function composeProviders(...providers: IProvider[]) {
  return ({ children }: { children: React.ReactElement }) =>
    providers.reduce((prev, Provider) => <Provider>{prev}</Provider>, children)
}

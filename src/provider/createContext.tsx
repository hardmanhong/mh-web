import React, { useContext, useState } from 'react'
import { IProvider } from './types'

function createCtx<T>(
  initialValue: T
): [
  IProvider,
  () => T & ({} | null),
  () => React.Dispatch<React.SetStateAction<T>>
] {
  const storeContext = React.createContext<T>(initialValue)
  const dispatchContext = React.createContext<
    React.Dispatch<React.SetStateAction<T>>
  >(() => {})

  const useStore = () => {
    const context = useContext(storeContext)
    if (context === undefined) {
      throw new Error('useStore')
    }
    return context
  }

  const useDispatch = () => {
    const context = useContext(dispatchContext)
    if (context === undefined) {
      throw new Error('useDispatch')
    }
    return context
  }

  const ContextProvider: IProvider = ({ children }) => {
    const [state, dispatch] = useState<T>(initialValue)

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={state}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    )
  }

  return [ContextProvider, useStore, useDispatch]
}
export default createCtx

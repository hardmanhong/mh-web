import React, { useContext, useEffect } from 'react'
import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import { EVENT, eventEmitter } from '@/utils'

const Context = React.createContext<MessageInstance>(message)

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    const callback = (msg: string) => {
      messageApi.error(msg)
    }
    eventEmitter.on(EVENT.REQUEST_ERROR, callback)
    return () => {
      eventEmitter.off(EVENT.REQUEST_ERROR, callback)
    }
  }, [])
  return (
    <Context.Provider value={messageApi}>
      {contextHolder}
      {children}
    </Context.Provider>
  )
}

const useMessage = () => {
  return useContext(Context)
}

export { MessageProvider, useMessage }

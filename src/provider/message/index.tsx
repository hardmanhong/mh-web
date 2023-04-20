import React, { useContext } from 'react'
import { message } from 'antd'
import { MessageInstance } from 'antd/lib/message'

const Context = React.createContext<MessageInstance>(message)

const MessgaeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [messageApi, contextHolder] = message.useMessage()
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

export { MessgaeProvider, useMessage }

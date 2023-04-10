import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

interface Iprops {
  code?: string
}

const Permission: FC<PropsWithChildren<Iprops>> = (props) => {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    if (props.code === 'login') return <Navigate to='/' />
    return <>{props.children}</>
  }
  if (props.code === 'login') return <>{props.children}</>
  return <Navigate to='/login' />
}

export default Permission

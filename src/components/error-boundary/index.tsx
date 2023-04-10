import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorBoundary: React.FC<any> = () => {
  const err = useRouteError() as any
  return <div>{err?.message}</div>
}

export default ErrorBoundary

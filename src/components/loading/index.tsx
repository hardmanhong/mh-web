import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const Loading: React.FC<any> = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  })
  return <></>
}

export default Loading

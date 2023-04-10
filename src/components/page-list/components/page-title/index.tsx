import React from 'react'
import clsx from 'clsx'
import './style.less'
import { IProps } from './types'

const PageTitle: React.FC<IProps> = ({ className, children }) => {
  return <span className={clsx('page-title', className)}>{children}</span>
}

export default PageTitle

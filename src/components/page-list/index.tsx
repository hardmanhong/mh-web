import React from 'react'
import clsx from 'clsx'
import { PageSearch, PageTitle } from './components'
import './style.less'
import { IProps } from './types'

const PageListFC: React.FC<IProps> = ({
  className,
  header,
  search,
  table,
  pagination,
  children
}) => {
  return (
    <div className={clsx('c-page-list', className)}>
      <div className='c-page-body'>
        {header && (
          <div className='c-page-header'>
            {React.isValidElement(header) ? (
              header
            ) : (
              <PageTitle>{header}</PageTitle>
            )}
          </div>
        )}
        {search && <div className='c-page-search'>{search}</div>}
        {table && <div className='c-page-table'>{table}</div>}
        {pagination && <div className='c-page-pagination'>{pagination}</div>}
      </div>
      {children}
    </div>
  )
}
type PageListFCType = typeof PageListFC
interface PageListType extends PageListFCType {
  Search: typeof PageSearch
  Title: typeof PageTitle
}
const PageList = PageListFC as PageListType
PageList.Search = PageSearch
PageList.Title = PageTitle

export default PageList

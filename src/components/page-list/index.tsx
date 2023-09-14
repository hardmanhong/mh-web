import React, { cloneElement, useMemo, useRef } from 'react'
import { Space } from 'antd'
import clsx from 'clsx'
import { computedScroll } from '@/utils'
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
  const ref = useRef<HTMLDivElement | null>(null)
  const CloneTableElement = cloneElement(table)
  const { loading, columns } = CloneTableElement.props
  const height = useMemo(() => {
    if (!ref.current) return 500
    const bottom =
      ref.current.querySelector('.ant-table-header')?.getBoundingClientRect()
        .bottom || 0
    const paginationHeight =
      (ref.current.querySelector('.c-page-pagination') as HTMLElement)
        ?.offsetHeight || 0
    const scrollHeight = `calc(100vh - ${bottom + paginationHeight + 16}px)`
    return scrollHeight
  }, [loading])
  const scroll = computedScroll(columns, 200, height)
  return (
    <div className={clsx('c-page-list', className)} ref={ref}>
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
        <Space direction='vertical' style={{ width: '100%' }}>
          {search && <div className='c-page-search'>{search}</div>}
          <div className='c-page-body'>
            {
              <div className='c-page-table'>
                <CloneTableElement.type
                  {...CloneTableElement.props}
                  scroll={scroll}
                />
              </div>
            }
            {pagination && (
              <div className='c-page-pagination'>{pagination}</div>
            )}
          </div>
        </Space>
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

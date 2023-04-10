import React from 'react'
import { Col, ColProps, Row } from 'antd'
import { IProps } from './types'

const PageSearchFC: React.FC<IProps> = ({ left, right, ...props }) => {
  return (
    <Row gutter={10} {...props}>
      {left}
      {right}
    </Row>
  )
}
const PageSearchLeft: React.FC<ColProps> = (props) => {
  return <Col span={22} {...props}></Col>
}
const PageSearchRight: React.FC<ColProps> = (props) => {
  return <Col span={2} {...props}></Col>
}
type PageSearchFCType = typeof PageSearchFC

interface IPageSearch extends PageSearchFCType {
  Left: typeof PageSearchLeft
  Right: typeof PageSearchRight
}
const PageSearch = PageSearchFC as IPageSearch

PageSearch.Left = PageSearchLeft
PageSearch.Right = PageSearchRight

export default PageSearch

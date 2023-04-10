import React from 'react'
import { Col, Pagination, Row } from 'antd'
import './style.less'
import { IProps } from './types'

const ZPagination: React.FC<IProps> = (props) => {
  const { left } = props
  return (
    <Row className='z-pagination' justify='space-between' align='middle'>
      <Col>{left}</Col>
      <Col>
        <Pagination {...props} />
      </Col>
    </Row>
  )
}
ZPagination.defaultProps = {
  size: 'small',
  showSizeChanger: true,
  showQuickJumper: true,
  showLessItems: true,
  showTotal: (total: number) => <div>共 {total} 条</div>
}
export default ZPagination

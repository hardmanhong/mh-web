import React, { useEffect, useState } from 'react'
import type { ResizeCallbackData } from 'react-resizable'
import { Col, Row, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import './style.less'
import { ZTableProps } from './types'

const { Resizable } = require('react-resizable')

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (
      e: React.SyntheticEvent<Element>,
      data: ResizeCallbackData
    ) => void
    width: number
  }
) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

const ZTable: React.FC<ZTableProps<any>> = (props) => {
  const [columns, setColumns] = useState(props.columns || [])
  useEffect(() => {
    setColumns((cols: any[]) => {
      return (props?.columns || []).map((item: any, index: number) => ({
        ...item,
        width: cols?.[index]?.width || item.width
      }))
    })
  }, [props.columns])
  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width
      }
      setColumns(newColumns)
    }
  const mergeColumns: ColumnsType<any> = columns.map(
    (col: any, index: number) => ({
      ...col,
      onHeaderCell: (column: ColumnsType<any>[number]) => ({
        width: column.width,
        onResize: handleResize(index) as React.ReactEventHandler<any>
      })
    })
  )
  const { name, options, ...tableProps } = props
  return (
    <div className='z-table'>
      {(name || options) && (
        <Row className='z-table-header' justify='space-between' align='middle'>
          {name && <Col className='z-table-name'>{name}</Col>}
          {options && <Col>{options}</Col>}
        </Row>
      )}
      <Table
        {...tableProps}
        components={{
          ...tableProps.components,
          header: {
            cell: ResizableTitle
          }
        }}
        columns={mergeColumns}
        pagination={false}
      />
    </div>
  )
}
ZTable.defaultProps = {
  size: 'small',
  bordered: true,
  pagination: false
}
export default ZTable

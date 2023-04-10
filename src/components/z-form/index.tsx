import React from 'react'
import { Col, Form, FormProps, Row, RowProps } from 'antd'
import clsx from 'clsx'
import './style.less'
import { IZFormProps } from './types'

const ZForm: React.FC<IZFormProps> = ({
  className,
  type = 'list',
  list = [],
  rowProps,
  colProps,
  children,
  ...props
}) => {
  const form = props.form || Form.useForm()[0]
  const isList = type === 'list'
  const isDetail = type === 'detail'

  const formPropsWithList: FormProps = {
    labelAlign: 'left',
    labelCol: { flex: '90px' },
    labelWrap: true
  }
  const formPropsWithDetail: FormProps = {
    labelAlign: 'right',
    labelCol: { flex: '110px' },
    labelWrap: true
  }
  const rowPropsWithList: RowProps = {
    gutter: [16, 8],
    ...rowProps
  }
  const rowPropsWithDetail: RowProps = {
    gutter: 32,
    ...rowProps
  }

  const _formProps = isList ? formPropsWithList : formPropsWithDetail
  const _rowProps = isList ? rowPropsWithList : rowPropsWithDetail

  return (
    <Form
      className={clsx(
        'c-form-generic',
        className,
        isList && 'list',
        isDetail && 'detail'
      )}
      colon={false}
      form={form}
      {..._formProps}
      {...props}
    >
      <Row {..._rowProps}>
        {list.map((item, i) => {
          return (
            <Form.Item
              key={
                Array.isArray(item?.props?.name)
                  ? item?.props?.name.join('-')
                  : item?.props?.name || i
              }
              noStyle
              shouldUpdate={item.props?.shouldUpdate || false}
            >
              {item.props?.shouldUpdate ? (
                () => {
                  const _colProps = {
                    ...colProps,
                    ...item.colProps
                  }
                  const span = item.hidden?.(form) ? 0 : _colProps?.span
                  return (
                    <Col
                      {..._colProps}
                      span={span}
                      key={
                        Array.isArray(item?.props?.name)
                          ? item?.props?.name.join('-')
                          : item?.props?.name || i
                      }
                    >
                      {item.hidden?.(form) ? null : (
                        <Form.Item {...item.props}>
                          {typeof item.component === 'function'
                            ? item.component(form)
                            : item.component}
                        </Form.Item>
                      )}
                    </Col>
                  )
                }
              ) : (
                <Col
                  {...colProps}
                  {...item.colProps}
                  key={
                    Array.isArray(item?.props?.name)
                      ? item?.props?.name.join('-')
                      : item?.props?.name || i
                  }
                >
                  <Form.Item {...item.props}>
                    {typeof item.component === 'function'
                      ? item.component(form)
                      : item.component}
                  </Form.Item>
                </Col>
              )}
            </Form.Item>
          )
        })}
        {children}
      </Row>
    </Form>
  )
}

export default ZForm

import { ModalProps } from 'antd'

export interface IProps extends ModalProps {
  data: { [key: string]: any }
}

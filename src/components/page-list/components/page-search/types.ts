import { Col, RowProps } from 'antd';
export interface IProps extends RowProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}
export interface IPageSearch extends IProps {
  Left: typeof Col;
  Right: typeof Col;
}

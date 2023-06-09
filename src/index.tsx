import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from './App'
import './index.less'

dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(<App />)

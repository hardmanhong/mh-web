import ReactDOM from 'react-dom/client'
import App from './App'
import './index.less'
import { ThemeProvider } from './provider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

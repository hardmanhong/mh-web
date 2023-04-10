import DarkIcon from './dark-icon'
import LightIcon from './light-icon'
import { Switch } from 'antd'
import { useTheme } from '@/provider'
import './style.less'

const ThemeSwitch = () => {
  const [theme, setTheme] = useTheme()
  const onChange = (value: boolean) => {
    const theme = value ? 'dark' : 'light'
    setTheme(theme)
  }
  return (
    <div className='theme-switch'>
      <Switch
        className={`button-switch ${theme}`}
        checkedChildren={
          <span className='theme-icon dark'>
            <DarkIcon />
          </span>
        }
        unCheckedChildren={
          <span className='theme-icon light'>
            <LightIcon />
          </span>
        }
        onChange={onChange}
        checked={theme === 'dark'}
      />
    </div>
  )
}

export default ThemeSwitch

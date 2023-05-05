import { Switch } from 'antd'
import { useThemeStore } from '@/store'
import DarkIcon from './dark-icon'
import LightIcon from './light-icon'
import './style.less'

const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeStore()
  const onChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
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
  )
}

export default ThemeSwitch

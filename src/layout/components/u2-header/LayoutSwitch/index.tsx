import { InteractionOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { useLayoutStore } from '@/store'

const LayoutSwitch = () => {
  const { layout, setLayout } = useLayoutStore()
  const onChange = () => {
    const theme = layout === 'tabs' ? 'normal' : 'tabs'
    setLayout(theme)
  }
  return (
    <Switch
      onChange={onChange}
      checked={layout === 'tabs'}
      checkedChildren={<InteractionOutlined />}
    />
  )
}

export default LayoutSwitch

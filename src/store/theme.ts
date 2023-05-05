import { create } from 'zustand'

export const LIGHT_THEME = {
  colorPrimary: 'rgb(236, 124, 25)'
}
export const DARK_THEME = {
  colorPrimaryBg: '#291b11',
  colorPrimaryBgHover: '#412612',
  colorPrimaryBorder: '#553316',
  colorPrimaryBorderHover: '#754316',
  colorPrimaryHover: '#e3913e',
  colorPrimary: '#cc6c18',
  colorPrimaryActive: '#a05817',
  colorPrimaryTextHover: '#e3913e',
  colorPrimaryText: '#cc6c18',
  colorPrimaryTextActive: '#a05817',
  colorSuccessBg: '#162312',
  colorSuccessBgHover: '#1d3712',
  colorSuccessBorder: '#274916',
  colorSuccessBorderHover: '#306317',
  colorSuccessHover: '#306317',
  colorSuccess: '#49aa19',
  colorSuccessActive: '#3c8618',
  colorSuccessTextHover: '#6abe39',
  colorSuccessText: '#49aa19',
  colorSuccessTextActive: '#3c8618',
  colorWarningBg: '#2b2111',
  colorWarningBgHover: '#443111',
  colorWarningBorder: '#594214',
  colorWarningBorderHover: '#7c5914',
  colorWarningHover: '#7c5914',
  colorWarning: '#d89614',
  colorWarningActive: '#aa7714',
  colorWarningTextHover: '#e8b339',
  colorWarningText: '#d89614',
  colorWarningTextActive: '#aa7714',

  // 基础背景色
  colorErrorBg: '#2c1618',
  colorErrorBgHover: '#451d1f',
  colorErrorBorder: '#5b2526',
  colorErrorBorderHover: '#7e2e2f',
  colorErrorHover: '#e86e6b',
  colorError: '#dc4446',
  colorErrorActive: '#ad393a',
  colorErrorTextHover: '#e86e6b',
  colorErrorText: '#dc4446',
  colorErrorTextActive: '#ad393a',
  colorInfoBg: '#111a2c',
  colorInfoBgHover: '#112545',
  colorInfoBorder: '#15325b',
  colorInfoBorderHover: '#15417e',
  colorInfoHover: '#15417e',
  colorInfo: '#1668dc',
  colorInfoActive: '#1554ad',
  colorInfoTextHover: '#3c89e8',
  colorInfoText: '#1668dc',
  colorInfoTextActive: '#1554ad',
  colorText: 'rgba(255, 255, 255, 0.85)',
  colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
  colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
  colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
  colorBorder: '#424242',
  colorBorderSecondary: '#303030',
  colorFill: 'rgba(255, 255, 255, 0.18)',
  colorFillSecondary: 'rgba(255, 255, 255, 0.12)',
  colorFillTertiary: 'rgba(255, 255, 255, 0.08)',
  colorFillQuaternary: 'rgba(255, 255, 255, 0.04)',
  colorBgContainer: '#141414',
  colorBgElevated: '#1f1f1f',
  colorBgLayout: '#000000',
  colorBgSpotlight: '#424242',
  colorBgMask: 'rgba(0, 0, 0, 0.45)'
}

const THEME_KEY = '__U2_THEME__'
const defaultValue = window.localStorage.getItem(THEME_KEY) || 'dark'

type Theme = 'light' | 'dark'

type State = {
  theme: Theme
}
type Action = {
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<State & Action>((set) => ({
  theme: defaultValue as Theme,
  setTheme: (theme: Theme) =>
    set(() => {
      document.querySelector('body')!.className = theme
      window.localStorage.setItem(THEME_KEY, theme)
      return { theme }
    })
}))

export default useThemeStore

import { useCallback } from 'react'
import createContext from '../createContext'

interface ILinkAttr {
  type: string
  rel: string
  id: string
  href: string
}
type ITheme = 'light' | 'dark'
const THEME_KEY = '__U2_THEME__'
const defaultValue = window.localStorage.getItem(THEME_KEY) || 'dark'

const [ThemeProvider, useGetTheme, useSetTheme] = createContext(
  defaultValue as ITheme
)
const useTheme = (): [
  ITheme,
  React.Dispatch<React.SetStateAction<ITheme | undefined>>
] => [useGetTheme(), useSetTheme()]
const useInitTheme = (id: string, href: string) => {
  const createStyle = useCallback(() => {
    const customTheme = document.querySelector<HTMLLinkElement>(id)
    if (customTheme) {
      customTheme.href = href
      return
    }
    const linkElement = document.createElement('link')

    const attributes: ILinkAttr = {
      type: 'text/css',
      rel: 'stylesheet',
      id: id.replace('#', ''),
      href
    }
    Object.keys(attributes).forEach((key) => {
      linkElement[key as keyof ILinkAttr] = attributes[key as keyof ILinkAttr]
    })
    document.head.appendChild(linkElement)
  }, [])

  const removeStyle = useCallback(() => {
    const element = document.querySelector(id)
    if (element) {
      element.parentNode!.removeChild(element)
    }
  }, [])
  const toggle = useCallback((theme: ITheme) => {
    if (theme === 'dark') {
      createStyle()
    } else {
      removeStyle()
    }
    document.querySelector('body')!.className = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [])
  return toggle
}
export { ThemeProvider, useInitTheme, useTheme, useGetTheme, useSetTheme }

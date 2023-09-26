import dark from './dark/index'
import light from './light/index'
import './style/element.scss'

const themeMap = { dark, light }

export function setTheme(type) {
  const root = document.querySelector(':root')
  const theme = themeMap[type]
  for (const key in theme) {
    root.style.setProperty(key, theme[key])
  }
}

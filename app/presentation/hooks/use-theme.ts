import { useContext } from "react"
import { DefaultTheme, ThemeContext } from "styled-components"

export const useTheme = (): DefaultTheme => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeContext")
  }

  return context
}

import { useContext } from "react"
import { TranslateContext } from "../contexts"

export const useTranslate = () => {
  const context = useContext(TranslateContext)

  if (!context) {
    throw new Error("useTranslate must be used within a TranslateContext")
  }

  return context
}

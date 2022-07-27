import I18n from "i18n-js"
import { TxKeyPath } from "~/presentation/main/i18"

export type TranslateProviderProps = {}

export type TranslateContextProps = {
  format: (key: TxKeyPath, options?: I18n.TranslateOptions) => string
  setLanguage: (language: "en" | "es") => void
  locale: string
}

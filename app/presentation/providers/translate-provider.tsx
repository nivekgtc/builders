import React, { useCallback, useEffect, useState } from "react"

import { TranslateContext } from "~/presentation/contexts"
import { translate, TxKeyPath } from "../main/i18n"
import i18n from "i18n-js"
import { loadString, saveString } from "~/application/common/utils/storage"

const TranslateProvider: React.FC = ({ children }) => {
  // TODO: change to useReducer
  const [locale, setLocale] = useState<string>("en")

  const setCurrentLocale = async (locale: string, save = true) => {
    setLocale(locale)
    i18n.locale = locale
    save && (await saveString("language", locale))
  }

  useEffect(() => {
    ;(async () => {
      const currentLocale = (await loadString("language")) || "en"

      i18n.locale = currentLocale
      setCurrentLocale(currentLocale, false)
    })()
  }, [])

  const format = useCallback(
    (key: TxKeyPath, options?: i18n.TranslateOptions) => translate(key, options),
    [locale, i18n.locale],
  )

  const setLanguage = (language: "en" | "es") => {
    setCurrentLocale(language)
  }

  return (
    <TranslateContext.Provider value={{ format, setLanguage, locale }}>
      {children}
    </TranslateContext.Provider>
  )
}

export default TranslateProvider

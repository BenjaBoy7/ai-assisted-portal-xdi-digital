import { useEffect } from 'react'

export const useDocumentDirection = (language: string) => {
  useEffect(() => {
    const isArabic = language === 'ar'

    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])
}

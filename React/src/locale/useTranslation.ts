import { useCallback } from 'react'
import { localeStore } from '@/modules'

export default function useTranslation() {
  const t = localeStore((s) => s.t)

  const translate = useCallback(
    (key: string, values?: Record<string, unknown>) => t(key, values),
    [t]
  )

  return { t: translate }
}

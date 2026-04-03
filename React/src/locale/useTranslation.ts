import IoC from '@/ioc'
import { SERVICES, type ILocaleService } from '@/types'

const localeService = IoC.getOrCreateInstance<ILocaleService>(SERVICES.LOCALE)

export default function useTranslation() {
  const { locale, t } = localeService.getLocaleHook()

  return { t, locale }
}

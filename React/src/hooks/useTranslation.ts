import IoC from '@/ioc'
import { SERVICES, type ILocaleService } from '@/types'

const localeService = IoC.getOrCreateInstance<ILocaleService>(SERVICES.LOCALE)

export function useTranslation() {
  const { t } = localeService.getHook()

  return { t }
}

import { Suspense, useEffect } from 'react'
import { useTranslation } from '@/hooks'
import IoC from '@/ioc'
import { type ICatsService, SERVICES } from '@/types'
import { Button } from '@/views/components'

function Cats() {
  const catsService = IoC.getOrCreateInstance<ICatsService>(SERVICES.CATS)

  const { t } = useTranslation()

  const cats = catsService.getCats()
  const catImageUrl = catsService.getCatImageUrl()

  useEffect(() => {
    catsService.fetchCatImage()

    return () => {
      IoC.cleanUp(SERVICES.CATS)
    }
  }, [])

  function addCat() {
    catsService.addCat()
  }

  function removeCat() {
    catsService.removeCat()
  }

  function handleImageClick() {
    catsService.fetchCatImage()
  }

  return (
    <Suspense fallback={null}>
      <section id="center">
        {catImageUrl && (
          <div className="flex justify-center">
            <img
              src={catImageUrl}
              className="w-[300px] h-[300px] object-cover rounded-lg cursor-pointer mb-6"
              alt="Random cat"
              onClick={handleImageClick}
            />
          </div>
        )}
        <div></div>
        <span>
          {t('pages.cats.hasCats', {
            name: catsService.userName(),
            count: cats
          })}
        </span>
        <Button onClick={() => addCat()}>{t('pages.cats.addCat')}</Button>
        <Button onClick={() => removeCat()}>{t('pages.cats.removeCat')}</Button>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </Suspense>
  )
}

export default Cats

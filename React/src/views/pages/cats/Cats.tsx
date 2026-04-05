import { Suspense, useEffect, useState } from 'react'
import { useLocale } from '@/hooks'
import IoC from '@/ioc'
import { type CatsService } from '@/modules'
import { SERVICES } from '@/types'
import { Button, Image } from '@/views/components'

function Cats() {
  const catsService = IoC.getOrCreateInstance<CatsService>(SERVICES.CATS)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const { t } = useLocale()

  const cats = catsService.getCats()
  const catImageUrl = catsService.getCatImageUrl()

  async function loadCatImage() {
    setIsImageLoading(true)

    await catsService.fetchCatImage()

    setIsImageLoading(false)
  }

  useEffect(() => {
    void loadCatImage()

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
    void loadCatImage()
  }

  return (
    <Suspense fallback={null}>
      <section id="center">
        <div className="flex justify-center mb-6">
          <Image
            src={catImageUrl}
            alt="Random cat"
            isLoading={isImageLoading}
            width={300}
            height={300}
            className="cursor-pointer"
            onClick={handleImageClick}
          />
        </div>
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

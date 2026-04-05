import type { ImgHTMLAttributes, SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import './Image.css'

interface ImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'height' | 'width'
> {
  src: string | null
  alt: string
  isLoading?: boolean
  width?: number
  height?: number
  imageClassName?: string
}

export default function Image({
  src,
  alt,
  isLoading = false,
  width = 300,
  height = 300,
  className = '',
  imageClassName = '',
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [isImageReady, setIsImageReady] = useState(false)
  const shellRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsImageReady(false)
  }, [src, isLoading])

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    setIsImageReady(true)
    onLoad?.(event)
  }

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    setIsImageReady(false)
    onError?.(event)
  }

  if (!src && !isLoading) {
    return null
  }

  return (
    <div
      ref={shellRef}
      className={`image-shell ${className}`}
      style={{ width, height }}
      data-loading={isLoading || !isImageReady}
    >
      <div className="image-placeholder" aria-hidden="true" />
      {src && (
        <img
          src={src}
          alt={alt}
          className={`image-element ${imageClassName}`}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  )
}

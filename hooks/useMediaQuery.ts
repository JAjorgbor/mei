'use client'

import { useEffect, useState } from 'react'

const screens = {
  sm: 640, // @media (min-width: 640px)
  md: 768, // @media (min-width: 768px)
  lg: 1024, // @media (min-width: 1024px)
  xl: 1280, // @media (min-width: 1280px)
  '2xl': 1536, // @media (min-width: 1536px)
} as const

// Type of the keys = "sm" | "md" | "lg" | "xl" | "2xl"
type Breakpoint = keyof typeof screens

interface UseMediaQueryProps {
  maxWidth: Breakpoint | number
}

export default function useMediaQuery(
  maxWidth: UseMediaQueryProps['maxWidth']
): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = (): void => {
      if (typeof maxWidth == 'number')
        setIsMobile(window.innerWidth <= maxWidth)
      else setIsMobile(window.innerWidth <= screens[maxWidth])
    }
    // on initial render determine screen size
    handleResize()
    window.addEventListener('resize', handleResize)
    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  }, [maxWidth])
  return isMobile
}

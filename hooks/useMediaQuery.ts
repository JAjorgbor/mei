'use client'

import { useEffect, useState } from 'react'

interface UseMediaQueryProps {
  maxWidth: number;
}

export default function useMediaQuery(maxWidth: UseMediaQueryProps['maxWidth']): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= maxWidth);
    };
    // on initial render determine screen size
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth]);
  return isMobile;
}

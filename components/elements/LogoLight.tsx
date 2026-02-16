import Image from 'next/image'
import React from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

const LogoLight: React.FC<LogoProps> = ({
  width = 80,
  height = 80,
  className = '',
}) => {
  return (
    <Image
      src='/logo.png'
      alt='Mie Logo'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  )
}

export default LogoLight

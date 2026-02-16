import Image from 'next/image'
import React from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

const LogoDark: React.FC<LogoProps> = ({
  width = 80,
  height = 80,
  className = '',
}) => {
  return (
    <Image
      src='/logo-dark.png'
      alt='Mie Logo Dark'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  )
}

export default LogoDark

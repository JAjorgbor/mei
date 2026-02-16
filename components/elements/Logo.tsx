import React from 'react'
import LogoLight from './LogoLight'
import LogoDark from './LogoDark'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  width = 80,
  height = 80,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <LogoLight width={width} height={height} className='dark:hidden block' />
      <LogoDark width={width} height={height} className='hidden dark:block' />
    </div>
  )
}

export default Logo

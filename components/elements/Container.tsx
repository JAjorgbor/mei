import { FC, ReactNode, ElementType } from 'react'

interface ContainerProps {
  children: ReactNode
  width?:
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
    | 'full'
  className?: string
  as?: ElementType
}

const Container: FC<ContainerProps> = ({
  children,
  width = '7xl',
  className = '',
  as: Component = 'section',
}) => {
  const widthClass = {
    xl: 'lg:max-w-xl',
    '2xl': 'lg:max-w-2xl',
    '3xl': 'lg:max-w-3xl',
    '4xl': 'lg:max-w-4xl',
    '5xl': 'lg:max-w-5xl',
    '6xl': 'lg:max-w-6xl',
    '7xl': 'lg:max-w-7xl',
    '8xl': 'lg:max-w-8xl',
    '9xl': 'lg:max-w-9xl',
    full: 'lg:w-full',
  }[width]

  return (
    <Component
      className={`max-w-[98vw] ${widthClass} ${
        width !== 'full' ? 'p-3 sm:p-5 md:px-7' : ''
      } mx-auto ${className}`}
    >
      {children}
    </Component>
  )
}

export default Container

'use client'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@heroui/react'
import { LockIcon } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import Logo from '@/components/elements/Logo'

export interface BaseDrawerProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface DrawerWrapperProps {
  isOpen: boolean
  isLock?: boolean
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full'
  setIsOpen: (value: boolean) => void
  onOpenChange?: (value: boolean) => void
  type?: 'danger' | 'success' | 'info' | 'warning'
  className?: string
  hideCloseButton?: boolean
  hideLogo?: boolean
  headerFullWidth?: boolean
  showHeaderBorder?: boolean
  lightBg?: boolean
  children: ReactNode
  title?: ReactNode
  logo?: ReactNode
  footer?: ReactNode
}

const DrawerWrapper: FC<DrawerWrapperProps> = ({
  isOpen,
  onOpenChange = () => null,
  setIsOpen,
  size = 'md',
  type = 'primary',
  isLock = false,
  hideCloseButton = false,
  hideLogo = false,
  showHeaderBorder = true,
  className = '',
  headerFullWidth = true,
  children,
  title,
  footer,
  logo = <Logo width={80} height={40} />,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      size={size}
      onOpenChange={(value) => {
        setIsOpen(value)
        onOpenChange(value)
      }}
      backdrop='blur'
      classNames={{
        wrapper: 'z-[199]',
        backdrop: 'z-[199] backdrop-blur-md bg-black/30',
        base: `bg-background/80 dark:bg-zinc-900/90 backdrop-blur-xl border-l border-white/20 dark:border-white/10 shadow-2xl ${className}`,
        header: `px-6 py-4 flex items-center justify-center ${showHeaderBorder ? 'border-b border-default-100/50' : ''}`,
        body: 'px-6 py-4',
        footer: 'px-6 py-4 border-t border-default-100/50 bg-default-50/50',
        closeButton:
          'top-6 right-6 hover:bg-default-100 transition-colors bg-default-50/50 backdrop-blur-md rounded-full p-2 border border-default-200',
      }}
      hideCloseButton={hideCloseButton}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            x: 100,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <DrawerContent>
        <>
          <DrawerHeader>
            <div
              className={`flex flex-col gap-1 items-center justify-center text-center ${
                headerFullWidth ? 'w-full' : ''
              }`}
            >
              {!hideLogo && (
                <div className='p-3 bg-primary/10 rounded-2xl mb-2 text-primary shadow-inner'>
                  {isLock ? <LockIcon size={24} /> : logo}
                </div>
              )}
              {title && (
                <h3 className='text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 tracking-tight leading-tight'>
                  {title}
                </h3>
              )}
            </div>
          </DrawerHeader>

          <DrawerBody className='overflow-auto'>
            <div className='w-full opacity-100 transition-opacity duration-300'>
              {children}
            </div>
          </DrawerBody>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </>
      </DrawerContent>
    </Drawer>
  )
}
export default DrawerWrapper

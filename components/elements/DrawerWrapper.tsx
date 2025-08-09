'use client'

import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Drawer } from 'vaul'

export interface BaseDrawerProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title?: ReactNode
  isDissmisible?: boolean
}

export default function DrawerWrapper({
  isOpen,
  setIsOpen,
  children,
  isDissmisible = false,
  title,
}: BaseDrawerProps & { children: ReactNode }) {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(value) => setIsOpen(value)}
      dismissible={isDissmisible}
    >
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-foreground/40' />
        <Drawer.Content className='bg-background h-fit fixed bottom-0 left-0 right-0 outline-none z-[400] rounded-t-3xl'>
          <div className='p-4 space-y-4'>
            {title && (
              <h3 className='font-semibold text-lg text-center'>{title}</h3>
            )}
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

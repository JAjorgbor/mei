import BottomNavigation from '@/components/scaffold/main/portal/BottomNavigation'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}

export default Layout

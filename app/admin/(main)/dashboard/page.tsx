'use client'
import DashboardStatsSection from '@/components/admin/dashboard/DashboardStatsSection'
import DashboardSummary from '@/components/admin/dashboard/DashboardSummary'
import Container from '@/components/elements/Container'
import { Button } from '@heroui/react'
import React from 'react'

const Page = () => {
  return (
    <Container>
      <div className='space-y-4'>
        <DashboardStatsSection />
        <DashboardSummary />
      </div>
    </Container>
  )
}

export default Page

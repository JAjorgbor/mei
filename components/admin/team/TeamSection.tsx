'use client'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import React from 'react'

const TeamSection = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Team</h1>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/dashboard/team'>Team</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  )
}

export default TeamSection

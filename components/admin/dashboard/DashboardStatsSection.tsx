'use clieint'
import { currencyFormatter } from '@/app/utils/currencyFormatter'
import { Card, CardBody } from '@heroui/react'
import {
  BookOpen,
  DollarSign,
  FileText,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import React, { ReactNode } from 'react'

const DashboardStatsSection = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <StatsCard
        title='Total Chapters'
        value='24'
        icon={<BookOpen className='text-primary' />}
        change='+3'
        positive={true}
      />
      <StatsCard
        title='Total Pages'
        value='78'
        icon={<FileText className='text-primary' />}
        change='+8.2%'
        positive={true}
      />
      <StatsCard
        title='Readers'
        value='842'
        icon={<Users className='text-primary' />}
        change='+5.1%'
        positive={true}
      />
      <StatsCard
        title='Revenue'
        value={currencyFormatter(15000)}
        icon={<span className='text-primary !text-2xl'>₦</span>}
        change='-2.4%'
        positive={false}
      />
    </div>
  )
}

export default DashboardStatsSection

interface StatsCardProps {
  title: string
  value: string
  icon: ReactNode
  change: string
  positive: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  positive,
}) => {
  return (
    <Card>
      <CardBody>
        <div className='flex justify-between items-start'>
          <div>
            <p className='text-default-500'>{title}</p>
            <h3 className='text-2xl font-bold mt-1'>{value}</h3>
          </div>
          <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
            {icon}
          </div>
        </div>
        <div className='mt-4 flex items-center'>
          {positive ? (
            <TrendingUp className={'text-success'} />
          ) : (
            <TrendingDown className={'text-danger'} />
          )}
          <span
            className={`ml-1 text-sm ${
              positive ? 'text-success' : 'text-danger'
            }`}
          >
            {change}
          </span>
          <span className='ml-1 text-sm text-default-500'>vs last month</span>
        </div>
      </CardBody>
    </Card>
  )
}

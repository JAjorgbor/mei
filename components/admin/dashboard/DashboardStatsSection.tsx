'use client'
import { currencyFormatter } from '@/app/utils/currencyFormatter'
import useGetDashboardStats from '@/hooks/requests/useGetDashboardStats'
import { Card, CardBody, Skeleton } from '@heroui/react'
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
  const { dashboardStats } = useGetDashboardStats()
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {dashboardStats ? (
        <>
          <StatsCard
            title='Total Revenue'
            value={`${currencyFormatter(
              Number(dashboardStats?.revenueAnalytics?.totalRevenue)
            )}`}
            icon={<span className='text-primary !text-2xl'>₦</span>}
            change={`${dashboardStats?.revenueAnalytics?.revenueChange}%`}
            changeType={dashboardStats?.revenueAnalytics?.changeType!}
          />
          <StatsCard
            title='Total Chapters'
            value={`${dashboardStats?.chapterAnalytics?.totalChapters}`}
            icon={<BookOpen className='text-primary' />}
            change={`${dashboardStats?.chapterAnalytics?.chapterChange}%`}
            changeType={dashboardStats?.chapterAnalytics?.changeType!}
          />
          <StatsCard
            title='Total Pages'
            value={`${dashboardStats?.pageAnalytics?.totalpages}`}
            icon={<FileText className='text-primary' />}
            change={`${dashboardStats?.pageAnalytics?.pageChange}%`}
            changeType={dashboardStats?.pageAnalytics?.changeType!}
          />
          <StatsCard
            title='Total Readers'
            value={`${dashboardStats?.readerAnalytics?.totalReaders}`}
            icon={<Users className='text-primary' />}
            change={`${dashboardStats?.readerAnalytics?.readerChange}%`}
            changeType={dashboardStats?.readerAnalytics?.changeType!}
          />
        </>
      ) : (
        Array(4)
          .fill(null)
          .map((_, index) => (
            <Card key={index}>
              <CardBody>
                <div className='flex gap-3 items-center'>
                  <Skeleton className='size-14 rounded' />

                  <div className='space-y-3'>
                    <Skeleton className='w-32 h-5 rounded' />
                    <Skeleton className='w-28 h-3 rounded' />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
      )}
    </div>
  )
}

export default DashboardStatsSection

interface StatsCardProps {
  title: string
  value: string
  icon: ReactNode
  change: string
  changeType: string
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
}) => {
  const changeTypeMap: Record<string, string> = {
    increase: '+',
    decrease: '-',
    'no change': '',
  }
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
          {changeType == 'increase' ? (
            <TrendingUp className={'text-success'} />
          ) : changeType == 'decrease' ? (
            <TrendingDown className={'text-danger'} />
          ) : null}
          <span
            className={`ml-1 text-sm ${
              changeType == 'increase'
                ? 'text-success'
                : changeType == 'decrease'
                ? 'text-danger'
                : 'text-warning'
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

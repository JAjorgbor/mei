'use client'
import { IDashboardStats } from '@/api-utils/admin/interfaces/dashboard.interface'
import { getDashboardStats } from '@/api-utils/admin/requests/dashboard.requests'
import useSWR from 'swr'

export default function useGetDashboardStats() {
  const fetcher = async () => {
    const { data } = await getDashboardStats()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IDashboardStats>(
    `/api/admin/dashboardStats`,
    fetcher
  )
  return {
    dashboardStats: data,
    dashboardStatsError: error,
    dashboardStatsLoading: isLoading,
    mutateDashboardStats: mutate,
  }
}

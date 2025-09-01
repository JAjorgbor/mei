'use client'

import { IPaymentBundle } from '@/api-utils/admin/interfaces/payment-bundle.interfaces'
import { getPaymentBundles } from '@/api-utils/admin/requests/payment-bundle.requests'
import useSWR from 'swr'

export default function useGetAllPaymentBundles() {
  const fetcher = async () => {
    const { data } = await getPaymentBundles()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IPaymentBundle[]>(
    `/api/payment-bundles`,
    fetcher
  )
  return {
    allPaymentBundles: data,
    allPaymentBundlesError: error,
    allPaymentBundlesLoading: isLoading,
    mutateAllPaymentBundles: mutate,
  }
}

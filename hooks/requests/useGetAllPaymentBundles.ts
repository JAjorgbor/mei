'use client'

import { IPaymentBundle } from '@/api-utils/global-interfaces/payment-bundle.interfaces'
import { getPaymentBundles } from '@/api-utils/admin/requests/payment-bundle.requests'
import useSWR from 'swr'
import { IList } from '@/api-utils/global-interfaces/lists.interace'

export default function useGetAllPaymentBundles(limit = 6, page = 1) {
  const fetcher = async () => {
    const { data } = await getPaymentBundles(limit, page)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IList<IPaymentBundle>>(
    `/api/payment-bundles?limit=${limit}&page=${page}`,
    fetcher,
  )
  return {
    allPaymentBundles: data,
    allPaymentBundlesError: error,
    allPaymentBundlesLoading: isLoading,
    mutateAllPaymentBundles: mutate,
  }
}

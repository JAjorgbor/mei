'use client'

import { setHeaderNavigation } from '@/features/headerSlice'
import { useAppDispatch } from '@/features/store'
import { useEffect } from 'react'

export default function useSetHeaderNavigation(payload: {
  title: string
  backLink: string
}) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setHeaderNavigation(payload))
  }, [])
}

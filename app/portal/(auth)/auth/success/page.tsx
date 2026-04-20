import { Metadata } from 'next'
import AuthSuccessClient from '@/components/portal/auth/AuthSuccessClient'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Authentication Successful | Portal',
  description: 'Completing your sign-in process...',
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessClient />
    </Suspense>
  )
}

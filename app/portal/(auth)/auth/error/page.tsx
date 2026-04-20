import { Metadata } from 'next'
import AuthErrorClient from '@/components/portal/auth/AuthErrorClient'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Authentication Error | Portal',
  description: 'Something went wrong during the sign-in process.',
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorClient />
    </Suspense>
  )
}

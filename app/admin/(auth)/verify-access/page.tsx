import VerifyAccessForm from '@/components/admin/auth/VerifyAccessForm'
import Container from '@/components/elements/Container'
import { Suspense } from 'react'

export const metadata = {
  title: 'Verify Access',
}

export default function VerifyAccessPage() {
  return (
    <Container className=''>
      <div className='w-full h-screen grid place-items-center'>
        <div className='max-w-sm w-full'>
          <Suspense>
            <VerifyAccessForm />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}

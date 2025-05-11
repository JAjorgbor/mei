import LoginForm from '@/components/admin/auth/LoginForm'
import Container from '@/components/elements/Container'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Container className=''>
      <div className='w-full h-screen grid place-items-center'>
        <div className='max-w-sm w-full'>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}

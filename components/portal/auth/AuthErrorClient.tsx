'use client'

import Container from '@/components/elements/Container'
import { Button, Card, CardBody } from '@heroui/react'
import { AlertCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthErrorClient() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const router = useRouter()

  return (
    <Container>
      <div className='py-20 flex justify-center'>
        <div className='w-full max-w-md'>
          <Card className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-default-100 shadow-2xl rounded-[2.5rem] overflow-hidden'>
            <CardBody className='p-8 flex flex-col items-center text-center'>
              <div className='size-16 bg-danger/10 rounded-full flex items-center justify-center mb-6'>
                <AlertCircle className='size-8 text-danger' />
              </div>

              <h1 className='text-2xl font-black tracking-tighter leading-none text-foreground uppercase mb-2'>
                Authentication Error
              </h1>
              <span className='text-[10px] uppercase font-black text-danger tracking-widest mb-6'>
                Process Failed
              </span>

              <p className='text-sm text-default-500 mb-8 font-medium'>
                {error === 'missing_code' ? 'The authentication code is missing. Please try signing in again.' : 
                 error === 'exchange_failed' ? 'Failed to exchange authentication code for tokens. Please try again.' :
                 error || 'An unexpected error occurred during the authentication process. Please try again.'}
              </p>

              <div className='w-full space-y-3'>
                <Button
                  onPress={() => router.push('/portal')}
                  color='primary'
                  fullWidth
                  className='font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl'
                >
                  Back to Login
                </Button>
                
                <Link
                  href='/contact'
                  className='text-xs font-bold text-default-400 hover:text-primary transition-colors uppercase tracking-widest block py-2'
                >
                  Contact Support
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  )
}

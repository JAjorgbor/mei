'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { googleExchange } from '@/api-utils/portal/requests/auth.requests'
import {
  PORTAL_ACCESS_KEY,
  PORTAL_REFRESH_KEY,
  PORTAL_USER_ID,
} from '@/api-utils/portal/request-adapter'
import Cookies from 'js-cookie'
import Container from '@/components/elements/Container'
import { Card, CardBody } from '@heroui/react'
import { CheckCircle } from 'lucide-react'

export default function AuthSuccessClient() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const code = params.get('code')
    const callbackPath = params.get('redirect_path')

    if (!code) {
      router.replace('/portal/auth/error?message=missing_code')
      return
    }

    async function exchange() {
      try {
        const { data } = await googleExchange(code as string)
        const { accessToken, refreshToken, ...userPayload } = data

        // Set Cookies following project pattern
        Cookies.set(PORTAL_ACCESS_KEY, accessToken)
        Cookies.set(PORTAL_REFRESH_KEY, refreshToken, { expires: 60 })
        Cookies.set(PORTAL_USER_ID, userPayload.userId, { expires: 60 })

        // Only navigate if the path looks safe.
        const safePath =
          callbackPath &&
          callbackPath.startsWith('/') &&
          !callbackPath.startsWith('//')
            ? callbackPath
            : '/portal/dashboard'

        router.replace(safePath)
      } catch (error: any) {
        console.error('Exchange failed:', error)
        router.replace('/portal?error=exchange_failed')
      }
    }

    exchange()
  }, [])

  return (
    <Container>
      <div className='py-20 flex justify-center'>
        <div className='w-full max-w-md'>
          <Card className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-default-100 shadow-2xl rounded-[2.5rem] overflow-hidden'>
            <CardBody className='p-8 flex flex-col items-center text-center'>
              <div className='size-16 bg-success/10 rounded-full flex items-center justify-center mb-6'>
                <CheckCircle className='size-8 text-success animate-pulse' />
              </div>

              <h1 className='text-2xl font-black tracking-tighter leading-none text-foreground uppercase mb-2'>
                Completing Sign In
              </h1>
              <span className='text-[10px] uppercase font-black text-success tracking-widest mb-6'>
                Please Wait
              </span>

              <p className='text-sm text-default-500 mb-8 font-medium'>
                We are finalizing your authentication. You will be redirected
                momentarily.
              </p>

              <div className='w-full space-y-3'>
                <p className='text-[10px] text-default-400 uppercase font-bold tracking-widest py-2'>
                  Exchanging credentials...
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  )
}

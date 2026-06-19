'use client'
import { login, verifyAccess } from '@/api-utils/admin/requests/auth.requests'
import Cookies from 'js-cookie'
import TimerCountDown from '@/components/elements/TimerCountDown'
import { addToast, Button, Card, CardBody, InputOtp } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCcw } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ADMIN_ACCESS_KEY,
  ADMIN_REFRESH_KEY,
} from '@/api-utils/admin/request-adapter'
import Logo from '@/components/elements/Logo'

const schema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(6, 'OTP is incomplete'),
})

type FormFields = z.infer<typeof schema>

const VerifyAccessForm = () => {
  const searchParams = useSearchParams()
  const [keepLoading, setkeepLoading] = useState(false)
  const [countDown, setCountDown] = useState(60000)

  const adminEmail = Cookies.get('adminUserEmail') || ''
  const adminPassword = Cookies.get('adminUserPassword') || ''
  const accessToken = Cookies.get(ADMIN_ACCESS_KEY)

  const [allowOTPResend, setAllowOTPResend] = useState<boolean>(true)
  const [resendOtpLoading, setResendOtpLoading] = useState(false)

  const callbackPath = searchParams.get('callbackPath') || '/admin/dashboard'
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const router = useRouter()

  const handleOTPResend = async () => {
    if (!adminEmail || !adminPassword) {
      addToast({
        title: 'Authentication data missing. Please log in again.',
        color: 'danger',
      })
      router.push('/admin')
      return
    }

    setResendOtpLoading(true)
    try {
      const { data } = await login({
        email: adminEmail,
        password: adminPassword,
      })

      Cookies.set(ADMIN_ACCESS_KEY, data.accessToken)
      Cookies.set(ADMIN_REFRESH_KEY, data.refreshToken, { expires: 60 })

      addToast({
        title: 'OTP has been resent. Please check your email!',
        color: 'success',
      })
      setAllowOTPResend(false)
    } catch (error: any) {
      addToast({
        title: 'Something went wrong. Please try again later.',
        color: 'danger',
      })
      console.error(error)
    } finally {
      setResendOtpLoading(false)
    }
  }

  const handleSubmit = async (formData: FormFields) => {
    try {
      await verifyAccess({
        otp: formData.otp,
        access_token: accessToken || '',
      })

      Cookies.set('verifyAdminAccess', 'verified')

      // Cleanup temporary credentials
      Cookies.remove('adminUserEmail')
      Cookies.remove('adminUserPassword')

      setkeepLoading(true)
      router.push(callbackPath)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
      console.log(error)
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-default-100 shadow-2xl rounded-[2.5rem]'>
        <CardBody className='p-8 overflow-hidden'>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <div className='space-y-6'>
              <div className='flex flex-col gap items-center space-y-4 mb-2'>
                <div className='p-3 bg-primary/10 rounded-2xl'>
                  <Logo width={64} height={64} />
                </div>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-black tracking-tighter leading-none text-foreground'>
                    VERIFY ACCESS
                  </h1>
                  <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
                    Two-Factor Authentication
                  </span>
                </div>
              </div>
              <p className='text-sm text-center text-default-500'>
                Provide the code that was sent to <br />
                <span className='font-bold text-foreground'>{adminEmail}</span>
              </p>
              <div className='gap-6 flex flex-col items-center pt-2'>
                <InputOtp
                  length={6}
                  variant='bordered'
                  value={formMethods.watch('otp')}
                  onValueChange={(value) => formMethods.setValue('otp', value)}
                  size='lg'
                  color='primary'
                  errorMessage={formMethods.formState.errors.otp?.message}
                  isInvalid={!!formMethods.formState.errors.otp}
                  classNames={{
                    segmentWrapper: 'gap-3',
                    segment:
                      'w-12 h-14 text-xl border-default-200 bg-background/50 rounded-xl',
                  }}
                />
                <Button
                  fullWidth
                  color='primary'
                  className='font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl'
                  type='submit'
                  isLoading={formMethods.formState.isSubmitting || keepLoading}
                >
                  Verify OTP
                </Button>
              </div>
              <div className='flex justify-center pt-2'>
                <button
                  type='button'
                  onClick={() =>
                    addToast({
                      title: 'Please wait...',
                      promise: handleOTPResend(),
                      timeout: 1000,
                    })
                  }
                  disabled={resendOtpLoading || !allowOTPResend}
                  className={`text-sm text-default-400 !font-medium inline-flex gap-2 items-center hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <RefreshCcw
                    size={14}
                    className={resendOtpLoading ? 'animate-spin' : ''}
                  />
                  Resend OTP
                  {!allowOTPResend && (
                    <span className='font-bold text-primary'>
                      {' '}
                      in{' '}
                      <TimerCountDown
                        time={countDown}
                        onComplete={() => {
                          setAllowOTPResend(true)
                          setCountDown(60000)
                        }}
                        onTick={(timeObj: any) => {
                          setCountDown(timeObj.seconds * 1000)
                        }}
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default VerifyAccessForm

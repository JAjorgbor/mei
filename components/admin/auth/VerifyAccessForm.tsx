'use client'
import { login, verifyAccess } from '@/api-utils/admin/requests/auth.requests'
import TimerCountDown from '@/components/elements/TimerCountDown'
import { addToast, Button, Card, CardBody, InputOtp } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenIcon, RefreshCcw } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const [loadingToastData, setloadingToastData] = useState({
    message: 'Please wait...',
    color: 'default',
  })
  const [allowOTPResend, setAllowOTPResend] = useState<boolean>(true)
  const [resendOtpLoading, setResendOtpLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const { data: session, update: updateSession } = useSession()
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const router = useRouter()
  const handleOTPResend = async () => {
    setResendOtpLoading(true)
    try {
      const { data } = await login({
        email: session?.user?.email,
        password: session?.user?.password,
      })
      await signIn('credentials', {
        redirect: false,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userData: JSON.stringify(session?.user),
      })
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
        access_token: session?.accessToken,
      })
      await updateSession({ verifyAdminAccess: 'verified' })
      setkeepLoading(true)
      router.push(callbackUrl)
    } catch (error: any) {
      addToast({
        title:
          error?.response?.data?.detail ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
      console.log(error)
    }
  }
  return (
    <Card>
      <CardBody className='overflow-hidden'>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className='space-y-4'>
            <div className='flex flex-col gap items-center'>
              <BookOpenIcon className='text-primary text-2xl' />
              <h1 className='text-2xl font-bold'>Verify Access</h1>
            </div>
            <p className='text-sm text-center'>
              Provide the code that was sent to <br />
              <span className='font-bold'>{session?.user?.email}</span>
            </p>
            <div className='gap-4 flex flex-col items-center'>
              <InputOtp
                length={6}
                variant='underlined'
                value={formMethods.watch('otp')}
                onValueChange={(value) => formMethods.setValue('otp', value)}
                size='lg'
                color='primary'
                errorMessage={formMethods.formState.errors.otp?.message}
                isInvalid={!!formMethods.formState.errors.otp}
              />
              <Button
                fullWidth
                color='primary'
                type='submit'
                isLoading={formMethods.formState.isSubmitting || keepLoading}
              >
                Verify OTP
              </Button>
            </div>
            <div className='flex justify-center'>
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
                className={`text-sm text-gray-400 !font-normal inline-flex gap-1 items-center hover:text-secondary disabled:cursor-not-allowed`}
              >
                <RefreshCcw size={15} />
                Resend OTP
                {!allowOTPResend && (
                  <>
                    <span>
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
                  </>
                )}{' '}
              </button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default VerifyAccessForm

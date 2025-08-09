'use client'
import { login } from '@/api-utils/admin/requests/auth.requests'
import Container from '@/components/elements/Container'
import TimerCountDown from '@/components/elements/TimerCountDown'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { addToast, Button, InputOtp } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCcw } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(6, 'OTP is incomplete'),
})

type FormFields = z.infer<typeof schema>

const VerifyOTPSection = () => {
  useSetHeaderNavigation({ title: 'Verify OTP', backLink: '/portal/dashboard' })

  const searchParams = useSearchParams()
  const [keepLoading, setkeepLoading] = useState(false)
  const [countDown, setCountDown] = useState(60000)
  const [loadingToastData, setloadingToastData] = useState({
    message: 'Please wait...',
    color: 'default',
  })
  const [allowOTPResend, setAllowOTPResend] = useState<boolean>(true)
  const [resendOtpLoading, setResendOtpLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/portal/dashboard'
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
      sessionStorage.setItem('accessToken', data.accessToken)
      sessionStorage.setItem('refreshToken', data.accessToken)
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
      //   await verifyAccess({
      //     otp: formData.otp,
      //     access_token: session?.accessToken,
      //   })
      //   await updateSession({ verifyAdminAccess: 'verified' })
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
    <Container>
      <form
        onSubmit={formMethods.handleSubmit(handleSubmit)}
        className='max-w-sm mx-auto'
      >
        <div className='space-y-4'>
          <p className='text-sm'>
            Provide the code that was sent to{' '}
            {/* <span className='font-bold'>{session?.user?.email}</span> */}
            <span className='font-bold'>email@example.com</span>
          </p>
          <div className='space-y-4'>
            <InputOtp
              length={6}
              //   variant='bordered'
              value={formMethods.watch('otp')}
              onValueChange={(value) => formMethods.setValue('otp', value)}
              size='lg'
              color='secondary'
              errorMessage={formMethods.formState.errors.otp?.message}
              isInvalid={!!formMethods.formState.errors.otp}
            />
            <p className='text-sm'>
              Didn&apos;t see code? Check spam before resending code
            </p>
            <Button
              fullWidth
              color='secondary'
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
    </Container>
  )
}

export default VerifyOTPSection

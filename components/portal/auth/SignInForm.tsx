'use client'
import { GOOGLE_SIGN_IN_URL } from '@/api-utils/admin/requests/portal.auth.requests'
import {
  PORTAL_ACCESS_KEY,
  PORTAL_REFRESH_KEY,
  PORTAL_USER_ID,
} from '@/api-utils/portal/request-adapter'
import { loginUser } from '@/api-utils/portal/requests/auth.requests'
import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody, CardHeader } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  provider: z.string(),
})

type FormFields = z.infer<typeof schema>

const SignInForm = () => {
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { provider: 'credentials' },
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const oauthErrorMessage = searchParams.get('error')
  const callbackPath = searchParams.get('callbackPath') || '/portal/dashboard'
  const [keepLoading, setKeepLoading] = useState(false)

  useEffect(() => {
    if (oauthErrorMessage)
      addToast({
        description: decodeURIComponent(oauthErrorMessage),
        color: 'danger',
      })

    const params = new URLSearchParams(searchParams.toString())

    // Remove the "error" param (or any param you want)
    params.delete('error')

    // Build new URL
    const newUrl = `/portal?${params.toString()}`

    // Push to router (updates URL without full reload)
    router.replace(newUrl)
  }, [oauthErrorMessage])

  const handleGoogleSignIn = async () => {
    window.location.href = `${GOOGLE_SIGN_IN_URL}&redirect_path=${callbackPath}`
  }
  const handleSubmit = async (formData: FormFields) => {
    try {
      const { data } = await loginUser(formData)
      console.log(data)
      const { accessToken, refreshToken, ...userPayload } = data
      Cookies.set(PORTAL_ACCESS_KEY, accessToken)
      Cookies.set(PORTAL_REFRESH_KEY, refreshToken, {
        expires: 60,
      })
      Cookies.set(PORTAL_USER_ID, userPayload._id, {
        expires: 60,
      })

      router.push(`${callbackPath}`)
      setKeepLoading(true)
    } catch (error: any) {
      console.log(error)
      addToast({
        title:
          error?.response?.data?.detail ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
      })
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-default-100 shadow-2xl rounded-[2.5rem] overflow-hidden'>
        <CardBody className='p-8'>
          <div className='flex flex-col gap items-center text-center space-y-2 mb-6'>
            <h1 className='text-2xl font-black tracking-tighter leading-none text-foreground'>
              WELCOME BACK
            </h1>
            <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
              The Journey Continues
            </span>
          </div>

          <div className='space-y-6'>
            <Button
              startContent={
                <Image
                  src='/google-logo.svg'
                  alt='google logo'
                  width={80}
                  height={80}
                  className='!size-5'
                />
              }
              color='primary'
              variant='flat'
              className='bg-default-100 hover:bg-default-200 text-foreground font-bold h-12 rounded-2xl transition-colors w-full'
              onPress={handleGoogleSignIn}
            >
              Continue with Google
            </Button>

            <div className='flex gap-4 items-center text-xs uppercase font-bold tracking-widest text-default-400'>
              <hr className='flex-1 border-default-200' />
              <span>Or Email</span>
              <hr className='flex-1 border-default-200' />
            </div>

            <form
              className='space-y-4'
              onSubmit={formMethods.handleSubmit(handleSubmit)}
            >
              <InputField
                label='Email Address'
                type='email'
                placeholder='email@example.com'
                register={formMethods.register('email')}
                errorMessage={formMethods?.formState?.errors?.email?.message}
              />
              <InputField
                label='Password'
                type='password'
                register={formMethods.register('password')}
                errorMessage={formMethods?.formState?.errors?.password?.message}
              />

              <div className='flex justify-end'>
                <Link
                  href='/portal/forgot-password'
                  className='text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type='submit'
                color='primary'
                fullWidth
                className='font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl block mt-2'
                isLoading={formMethods.formState.isSubmitting || keepLoading}
              >
                Sign In To Portal
              </Button>
            </form>

            <p className='text-sm text-center font-medium text-default-500 pt-2'>
              Don&apos;t have an account?{' '}
              <Link
                href='/portal/sign-up'
                className='text-primary font-bold hover:underline transition-all'
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default SignInForm

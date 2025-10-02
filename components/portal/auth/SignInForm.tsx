'use client'
import {
  PORTAL_ACCESS_KEY,
  PORTAL_REFRESH_KEY,
} from '@/api-utils/portal/request-adapter'
import { loginUser } from '@/api-utils/portal/requests/auth.requests'
import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody, CardHeader } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { Mail } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
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
  const callbackUrl = searchParams.get('callbackUrl') || '/portal/dashboard'
  const [keepLoading, setKeepLoading] = useState(false)

  useEffect(() => {
    if (oauthErrorMessage)
      addToast({
        title: decodeURIComponent(oauthErrorMessage),
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
    Cookies.remove('isSignup')
    const result: any = await signIn('google', {
      redirect: false,
      redirectTo: callbackUrl,
    })

    console.log(result)
    window.location.href = result.url
    if (result?.error) {
      console.error('Google sign-in failed:', result.error)
      addToast({ title: 'Google sign-in failed', color: 'danger' })
      // show toast or error message here
    }
  }
  const handleSubmit = async (formData: FormFields) => {
    try {
      const { data } = await loginUser(formData)
      const { accessToken, refreshToken, ...userPayload } = data
      sessionStorage.setItem(PORTAL_ACCESS_KEY, accessToken)
      sessionStorage.setItem(PORTAL_REFRESH_KEY, refreshToken)
      await signIn('credentials', {
        redirect: false,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: JSON.stringify({
          ...userPayload,
          ...formData,
          userType: 'user',
        }),
      })
      router.push(`${callbackUrl}`)
      setKeepLoading(true)
    } catch (error: any) {
      console.log(error)
      // addToast({
      //   title:
      //     error?.response?.data?.detail ||
      //     error?.message ||
      //     'Something went wrong. Please try again later',
      //   color: 'danger',

      // })
    }
  }

  return (
    <Card className='max-w-sm mx-auto'>
      <CardHeader className='w-full text-lg font-semibold justify-center'>
        Welcome Back
      </CardHeader>
      <CardBody>
        <div className='space-y-6'>
          <p className='text-center text-sm'>
            Continue your journey through this remarkable story
          </p>
          <Button
            startContent={<Mail size={20} />}
            color='primary'
            variant='bordered'
            fullWidth
            onPress={handleGoogleSignIn}
          >
            Continue with Google
          </Button>
          <div className='flex gap-2 items-center text-sm'>
            <hr className='flex-1' />
            OR CONTINUE WITH EMAIL
            <hr className='flex-1' />
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
            <p>
              <Link
                href='/portal/forgot-password'
                className='text-sm text-primary text-end'
              >
                Forgot your password?
              </Link>
            </p>
            <Button
              type='submit'
              color='primary'
              fullWidth
              className='block'
              isLoading={formMethods.formState.isSubmitting || keepLoading}
            >
              Sign In
            </Button>
          </form>
          <p className='text-sm text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/portal/sign-up' className='text-primary underline'>
              Sign up
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default SignInForm

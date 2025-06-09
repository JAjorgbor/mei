'use client'
import { signIn, useSession } from 'next-auth/react'
import Cookies from 'js-cookie'
import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { login } from '@/api-utils/admin/requests/auth.requests'
import { verify } from 'crypto'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginSchema = z.infer<typeof loginSchema>
const LoginForm = () => {
  const [keepLoading, setKeepLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'

  const formMethods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const { data: session } = useSession()
  console.log(session)
  const handleSubmit = async (formData: LoginSchema) => {
    try {
      const { data } = await login(formData)

      const { accessToken, refreshToken, ...userPayload } = data

      const authJsRes: any = await signIn('credentials', {
        redirect: false,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: JSON.stringify({
          ...userPayload,
          ...formData,
          verifyAdminAccess: 'not-verified',
          role: 'admin',
        }),
      })
      console.log('authJsRes', authJsRes)
      // const res = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/admin/sign-in`,
      //   data
      // )
      // if (res?.error) {
      //   throw new Error('Invalid credentials')
      // }
      // console.log(res)
      router.push(`/admin/verify-access?callbackUrl=${callbackUrl}`)
      Cookies.set('verifyAdminAccess', 'verified')
      setKeepLoading(true)
    } catch (error: any) {
      addToast({
        title:
          error?.response?.data?.detail ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
      })
      console.log(error)
    }
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardBody>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <div className='space-y-4'>
              <div className='flex flex-col gap items-center'>
                <BookOpenIcon className='text-primary text-2xl' />
                <h1 className='text-2xl font-bold'>Mie Admin</h1>
              </div>
              <InputField
                label='Email Address'
                placeholder='admin@mie.com'
                type='email'
                register={formMethods.register('email')}
                errorMessage={formMethods.formState.errors.email?.message}
              />
              <InputField
                label='Password'
                type='password'
                register={formMethods.register('password')}
                errorMessage={formMethods.formState.errors.password?.message}
              />

              <Button
                color='primary'
                className='w-full'
                type='submit'
                isLoading={formMethods.formState.isSubmitting || keepLoading}
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginForm

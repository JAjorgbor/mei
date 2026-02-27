'use client'
import {
  ADMIN_ACCESS_KEY,
  ADMIN_REFRESH_KEY,
} from '@/api-utils/admin/request-adapter'
import { login } from '@/api-utils/admin/requests/auth.requests'
import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from '@/components/elements/Logo'

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
  const handleSubmit = async (formData: LoginSchema) => {
    try {
      const { data } = await login(formData)

      const { accessToken, refreshToken, ...userPayload } = data
      sessionStorage.setItem(ADMIN_ACCESS_KEY, accessToken)
      sessionStorage.setItem(ADMIN_REFRESH_KEY, refreshToken)
      await signIn('credentials', {
        redirect: false,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: JSON.stringify({
          ...userPayload,
          ...formData,
          verifyAdminAccess: 'not-verified',
          userType: 'admin',
        }),
      })
      router.push(`/admin/verify-access?callbackUrl=${callbackUrl}`)
      Cookies.set('verifyAdminAccess', 'not-verified')
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
    <div className='space-y-4 w-full max-w-md mx-auto'>
      <Card className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-default-100 shadow-2xl rounded-[2.5rem] overflow-hidden'>
        <CardBody className='p-8'>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <div className='space-y-6'>
              <div className='flex flex-col gap items-center space-y-4 mb-2'>
                <div className='p-3 bg-primary/10 rounded-2xl'>
                  <Logo width={64} height={64} />
                </div>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-black tracking-tighter leading-none text-foreground'>
                    MEI ADMIN
                  </h1>
                  <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
                    Secure Access
                  </span>
                </div>
              </div>

              <div className='space-y-4 pt-2'>
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
              </div>

              <Button
                color='primary'
                className='w-full font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl'
                type='submit'
                isLoading={formMethods.formState.isSubmitting || keepLoading}
              >
                Sign In To Control Center
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginForm

'use client'
import { signIn } from 'next-auth/react'

import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const handleSubmit = async (data: LoginSchema) => {
    try {
      const res: any = await signIn('credentials', {
        ...data,
        role: 'admin',
        redirect: false,
      })
      if (res.error) {
        throw new Error(res.error)
      }
      console.log(res)
      router.push(callbackUrl)
      setKeepLoading(true)
    } catch (error: any) {
      addToast({ title: 'Invalid credentials', color: 'danger' })
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
                <h1 className='text-2xl font-bold'>Mei Admin</h1>
              </div>
              <InputField
                label='Email Address'
                placeholder='admin@mei.com'
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

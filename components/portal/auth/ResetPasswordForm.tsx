'use client'
import { resetPassword } from '@/api-utils/portal/requests/auth.requests'
import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    email: z.string().email('Invalid email address'),
    otp: z.string().length(6, 'OTP must be exactly 6 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormFields = z.infer<typeof schema>

const ResetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
  })

  const handleSubmit = async (formData: FormFields) => {
    try {
      await resetPassword(formData)
      addToast({
        title: 'Password reset successful',
        color: 'success',
      })
      router.push('/portal')
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
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
          <div className='flex flex-col items-center text-center space-y-2 mb-6'>
            <h1 className='text-2xl font-black tracking-tighter leading-none text-foreground uppercase'>
              Reset Password
            </h1>
            <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
              Secure Your Account
            </span>
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
              disabled={!!email}
            />

            <InputField
              label='OTP Code'
              type='text'
              placeholder='Enter 6-digit code'
              register={formMethods.register('otp')}
              errorMessage={formMethods?.formState?.errors?.otp?.message}
              maxLength={6}
            />

            <InputField
              label='New Password'
              type='password'
              placeholder='••••••••'
              register={formMethods.register('password')}
              errorMessage={formMethods?.formState?.errors?.password?.message}
            />

            <InputField
              label='Confirm New Password'
              type='password'
              placeholder='••••••••'
              register={formMethods.register('confirmPassword')}
              errorMessage={
                formMethods?.formState?.errors?.confirmPassword?.message
              }
            />

            <Button
              type='submit'
              color='primary'
              fullWidth
              className='font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl mt-4'
              isLoading={formMethods.formState.isSubmitting}
            >
              Reset Password
            </Button>

            <div className='text-center pt-2'>
              <Button
                variant='light'
                onPress={() => router.push('/portal')}
                className='text-xs font-bold text-default-500 hover:text-primary transition-colors uppercase tracking-widest'
              >
                Back to Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default ResetPasswordForm

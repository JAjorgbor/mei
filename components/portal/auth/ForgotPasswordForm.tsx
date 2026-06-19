'use client'
import { forgotPassword } from '@/api-utils/portal/requests/auth.requests'
import InputField from '@/components/elements/InputField'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormFields = z.infer<typeof schema>

const ForgotPasswordForm = () => {
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const handleSubmit = async (formData: FormFields) => {
    try {
      await forgotPassword(formData)
      addToast({
        title: 'OTP sent to your email',
        color: 'success',
      })
      router.push(`/portal/reset-password?email=${formData.email}`)
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
              Forgot Password
            </h1>
            <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
              Recover Your Account
            </span>
          </div>

          <form
            className='space-y-6'
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            <p className='text-sm text-center text-default-500'>
              Enter your email address and we&apos;ll send you an OTP to reset
              your password.
            </p>

            <InputField
              label='Email Address'
              type='email'
              placeholder='email@example.com'
              register={formMethods.register('email')}
              errorMessage={formMethods?.formState?.errors?.email?.message}
            />

            <Button
              type='submit'
              color='primary'
              fullWidth
              className='font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl'
              isLoading={formMethods.formState.isSubmitting}
            >
              Send OTP
            </Button>

            <div className='text-center'>
              <Button
                variant='light'
                onPress={() => router.back()}
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

export default ForgotPasswordForm

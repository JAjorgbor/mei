'use client'

import InputField from '@/components/elements/InputField'
import Cookies from 'js-cookie'
import {
  addToast,
  Button,
  Card,
  CardBody,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/api-utils/portal/requests/auth.requests'
import { GOOGLE_SIGN_IN_URL } from '@/api-utils/admin/requests/portal.auth.requests'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    agreeToTerms: z.boolean().refine((val) => val, {
      message: 'You must agree to the Terms of Service and Privacy Policy',
    }),
    provider: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

type FormFields = z.infer<typeof signUpSchema>

const SignUpForm = () => {
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { provider: 'credentials' },
  })

  const router = useRouter()
  const [keepLoading, setKeepLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    window.location.href = `${GOOGLE_SIGN_IN_URL}&redirectPath=/portal/dashboard`
  }

  const handleSubmit = async (formData: FormFields) => {
    try {
      const payload: Partial<FormFields> = { ...formData }
      delete payload.confirmPassword
      delete payload.agreeToTerms
      await registerUser(payload)
      router.push('/portal/dashboard')
    } catch (error: any) {
      console.error(error)
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
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
              JOIN THE JOURNEY
            </h1>
            <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
              Create Your Account
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
              Sign up with Google
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
              <div className='grid md:grid-cols-2 gap-4'>
                <InputField
                  label='First Name'
                  type='text'
                  isName
                  placeholder='John'
                  register={formMethods.register('firstName')}
                  errorMessage={
                    formMethods?.formState?.errors?.firstName?.message
                  }
                />
                <InputField
                  label='Last Name'
                  type='text'
                  isName
                  placeholder='Doe'
                  register={formMethods.register('lastName')}
                  errorMessage={
                    formMethods?.formState?.errors?.lastName?.message
                  }
                />
              </div>
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
              <InputField
                label='Confirm Password'
                type='password'
                register={formMethods.register('confirmPassword')}
                errorMessage={
                  formMethods?.formState?.errors?.confirmPassword?.message
                }
              />
              <InputField
                label={
                  <>
                    I agree to the{' '}
                    <Link
                      className='text-primary hover:text-primary/80 transition-colors underline font-medium'
                      href='/terms-of-service'
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      className='text-primary hover:text-primary/80 transition-colors underline font-medium'
                      href='/privacy-policy'
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
                type='checkbox'
                value={formMethods.watch('agreeToTerms')}
                onChange={(value: boolean) =>
                  formMethods.setValue('agreeToTerms', value)
                }
                errorMessage={
                  formMethods?.formState?.errors?.agreeToTerms?.message
                }
              />
              <Button
                type='submit'
                color='primary'
                fullWidth
                className='font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl block mt-4'
                isLoading={formMethods.formState.isSubmitting || keepLoading}
              >
                Create Account
              </Button>
            </form>

            <p className='text-sm text-center font-medium text-default-500 pt-2'>
              Already have an account?{' '}
              <Link
                href='/portal'
                className='text-primary font-bold hover:underline transition-all'
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default SignUpForm

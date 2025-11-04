'use client'
import InputField from '@/components/elements/InputField'
import Cookies from 'js-cookie'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@heroui/react'
import { Mail, Router } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/api-utils/portal/requests/auth.requests'
import Image from 'next/image'

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
    Cookies.set('isSignup', 'true')
    const result: any = await signIn('google', {
      redirect: false,
      callbackUrl: '/portal/dashboard',
    })

    if (result?.error) {
      console.error('Google sign-in failed:', result.error)
      addToast({ title: 'Google sign-in failed', color: 'danger' })
      return
    }

    // Only redirect if we have a URL and no error
    if (result?.url) {
      // Small delay to ensure the session is properly initialized
      setTimeout(() => {
        window.location.href = result.url
      }, 100)
    }
  }
  const handleSubmit = async (formData: FormFields) => {
    try {
      const payload: Partial<FormFields> = formData
      delete payload.confirmPassword
      delete payload.agreeToTerms
      const res = await registerUser(payload)
      console.log(res)
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
    <Card className='max-w-sm mx-auto'>
      <CardHeader className='w-full text-lg font-semibold justify-center'>
        Join The Journey
      </CardHeader>
      <CardBody>
        <div className='space-y-6'>
          <p className='text-center text-sm'>
            Create your account to access this remarkable story
          </p>
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
            variant='bordered'
            fullWidth
            onPress={handleGoogleSignIn}
          >
            Sign up with Google
          </Button>
          <div className='flex gap-2 items-center text-sm'>
            <hr className='flex-1' />
            OR SIGN UP WITH EMAIL
            <hr className='flex-1' />
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
                errorMessage={formMethods?.formState?.errors?.lastName?.message}
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
                    className='text-primary underline'
                    href='/terms-of-service'
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    className='text-primary underline'
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
              className='block'
              isLoading={formMethods.formState.isSubmitting || keepLoading}
            >
              Create Account
            </Button>
          </form>
          <p className='text-sm text-center'>
            Already have an account?{' '}
            <Link href='/portal' className='text-primary underline'>
              Sign in
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  )
}

export default SignUpForm

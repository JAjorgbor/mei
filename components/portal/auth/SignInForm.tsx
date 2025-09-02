'use client'
import InputField from '@/components/elements/InputField'
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
import React from 'react'
import { useForm } from 'react-hook-form'

const SignInForm = () => {
  const formMethods = useForm()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    const result: any = await signIn('google', {
      //   redirect: false,
      callbackUrl: '/portal/dashboard',
    })

    console.log(result)

    if (result?.error) {
      console.error('Google sign-in failed:', result.error)
      addToast({ title: 'Google sign-in failed', color: 'danger' })
      // show toast or error message here
    } else {
      router.push('/portal/dashboard')
      console.log('success')
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
          <form className='space-y-4'>
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
            <Button type='submit' color='primary' fullWidth className='block'>
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

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

const SignUpForm = () => {
  const formMethods = useForm()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    const result: any = await signIn('google', {
      //   redirect: false,
      callbackUrl: '/portal/dashboard?isNew=true',
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
        Join The Journey
      </CardHeader>
      <CardBody>
        <div className='space-y-6'>
          <p className='text-center text-sm'>
            Create your account to access this remarkable story
          </p>
          <Button
            startContent={<Mail size={20} />}
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
          <form className='space-y-4'>
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
            <Button type='submit' color='primary' fullWidth className='block'>
              Create Account
            </Button>
          </form>
          <p className='text-sm text-center'>
            Already have an account?
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

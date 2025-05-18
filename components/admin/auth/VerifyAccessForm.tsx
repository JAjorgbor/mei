'use client'
import { addToast, Button, Card, CardBody, InputOtp } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpenIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(4, 'OTP is incomplete'),
})

type FormFields = z.infer<typeof schema>

const VerifyAccessForm = () => {
  const searchParams = useSearchParams()
  const [keepLoading, setkeepLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const { data: session, update: updateSession } = useSession()
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const router = useRouter()

  const handleSubmit = async (formData: FormFields) => {
    try {
      console.log('afad')
      const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.otp == '1234') {
            resolve('success')
          } else {
            reject(new Error('Invalid OTP'))
          }
        }, 500)
      })
      console.log(res)
      await updateSession({ verifyAdminAccess: 'verified' })
      setkeepLoading(true)
      router.push(callbackUrl)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
    }
  }
  useEffect(() => {
    const subscribe = formMethods.watch((values) => console.log(values))
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <Card>
      <CardBody>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className='space-y-4'>
            <div className='flex flex-col gap items-center'>
              <BookOpenIcon className='text-primary text-2xl' />
              <h1 className='text-2xl font-bold'>Verify Access</h1>
            </div>
            <p className='text-sm text-center'>
              Provide the code that was sent to <br />
              <span className='font-bold'>{session?.user?.email}</span>
            </p>
            <div className='gap-4 flex flex-col items-center'>
              <InputOtp
                length={4}
                variant='underlined'
                value={formMethods.watch('otp')}
                onValueChange={(value) => formMethods.setValue('otp', value)}
                size='lg'
                color='primary'
                errorMessage={formMethods.formState.errors.otp?.message}
                isInvalid={!!formMethods.formState.errors.otp}
              />
              <Button
                color='primary'
                fullWidth
                type='submit'
                isLoading={formMethods.formState.isSubmitting || keepLoading}
              >
                Verify OTP
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default VerifyAccessForm

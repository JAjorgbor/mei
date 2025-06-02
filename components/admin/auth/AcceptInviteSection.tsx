'use client'
import { acceptInvite } from '@/api-utils/admin/requests/team.requests'
import { uploadToCloudinary } from '@/api-utils/general.requests'
import InputField from '@/components/elements/InputField'
import {
  addToast,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightIcon, BookOpenIcon, CameraIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    avatar: z
      .any()
      .refine((file) => file && file.length > 0, 'Avatar is required'),
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(1, 'First name is required'),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .min(1, 'Last name is required'),
    email: z
      .string({ required_error: 'Email address is required' })
      .email()
      .min(1, 'Email address is required'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password'],
      })
    }
  })

type FormFields = z.infer<typeof schema>

const AcceptInviteSection = () => {
  const [avatarPreview, setAvatarPreview] = useState('')
  const router = useRouter()
  const [keepLoading, setkeepLoading] = useState(false)

  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const fileInputRef = useRef<any>(null)

  const watchAvatar = formMethods.watch('avatar')

  useEffect(() => {
    if (watchAvatar && watchAvatar[0]) {
      const file = watchAvatar[0]
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    } else {
      setAvatarPreview('')
    }
  }, [watchAvatar])

  const handleSubmit = async (formData: FormFields) => {
    try {
      const { confirmPassword, ...payload } = formData
      // Upload avatar to cloudinary
      const { data } = await uploadToCloudinary({
        file: payload.avatar,
        public_id: `mie-novel/admin/avatars/${payload.firstName}_${payload.lastName}`,
      })
      payload.avatar = data.secure_url
      // Accept admin invite
      const res = await acceptInvite(payload)

      const { accessToken, refreshToken, ...userPayload } = res.data

      await signIn('credentials', {
        redirect: false,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: JSON.stringify({
          ...userPayload,
          ...payload,
          verifyAdminAccess: 'not-verified',
          role: 'admin',
        }),
      })
      router.push('/admin/verify-access')
      setkeepLoading(true)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.detail ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
      console.error(error)
    }
  }

  return (
    <Card>
      <CardHeader className='block'>
        <div className='flex flex-col gap items-center text-center'>
          <BookOpenIcon className='text-primary text-2xl' />
          <h1 className='text-2xl font-bold'>Accept Invite</h1>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='flex gap-4 justify-center md:col-span-2'>
              <label className='flex flex-col gap-3 items-center'>
                <input
                  accept='image/*'
                  type='file'
                  {...formMethods.register('avatar')}
                  className='hidden'
                  ref={(e) => {
                    const { ref: registerRef } = formMethods.register('avatar')
                    registerRef(e)
                    fileInputRef.current = e
                  }}
                />
                <Avatar size='lg' src={avatarPreview} />
                <button
                  className='p-1 py-0.5 text-sm rounded-md bg-secondary text-white flex gap-2 items-center'
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Avatar
                  <CameraIcon size={18} />
                </button>
                {formMethods.formState.errors.avatar && (
                  <p className='text-sm text-red-400'>
                    {String(formMethods.formState.errors.avatar?.message)}
                  </p>
                )}
              </label>
            </div>
            <InputField
              type='text'
              isName
              register={formMethods.register('firstName')}
              placeholder='John'
              label='Firt Name'
              isRequired
              errorMessage={formMethods.formState.errors.firstName?.message}
            />
            <InputField
              type='text'
              isName
              placeholder='Doe'
              register={formMethods.register('lastName')}
              label='Last Name'
              isRequired
              errorMessage={formMethods.formState.errors.lastName?.message}
            />
            <InputField
              type='email'
              register={formMethods.register('email')}
              placeholder='johndoe@example.com'
              label='Email'
              className='md:col-span-2'
              isRequired
              errorMessage={formMethods.formState.errors.email?.message}
            />
            <InputField
              type='password'
              register={formMethods.register('password')}
              placeholder='●●●●●●'
              label='Password'
              className='md:col-span-2'
              isRequired
              errorMessage={formMethods.formState.errors.password?.message}
            />
            <InputField
              type='password'
              register={formMethods.register('confirmPassword')}
              placeholder='●●●●●●'
              label='Confirm Password'
              className='md:col-span-2'
              isRequired
              errorMessage={
                formMethods.formState.errors.confirmPassword?.message
              }
            />
            <Button
              className='md:col-span-2'
              endContent={<ArrowRightIcon size={18} />}
              color='primary'
              type='submit'
              isLoading={formMethods.formState.isSubmitting || keepLoading}
            >
              Proceed
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default AcceptInviteSection

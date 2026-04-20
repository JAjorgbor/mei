'use client'
import Cookies from 'js-cookie'
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
import { ArrowRightIcon, CameraIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Logo from '@/components/elements/Logo'
import {
  ADMIN_ACCESS_KEY,
  ADMIN_REFRESH_KEY,
} from '@/api-utils/admin/request-adapter'

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
        folder: `mie-novel/admin/avatars/`,
      })
      payload.avatar = data.secure_url
      // Accept admin invite
      const res = await acceptInvite(payload)

      const { accessToken, refreshToken, ...userPayload } = res.data

      // Set Tokens in Cookies
      Cookies.set(ADMIN_ACCESS_KEY, accessToken)
      Cookies.set(ADMIN_REFRESH_KEY, refreshToken, { expires: 60 })

      // Store user info for VerifyAccessForm
      Cookies.set('adminUserEmail', payload.email)
      Cookies.set('adminUserPassword', payload.password)
      Cookies.set('verifyAdminAccess', 'not-verified')

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
    <div className='w-full max-w-md mx-auto'>
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
                    ACCEPT INVITE
                  </h1>
                  <span className='text-[10px] uppercase font-black text-primary tracking-widest mt-1'>
                    Complete Registration
                  </span>
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div className='flex gap-4 justify-center md:col-span-2 mb-2'>
                  <label className='flex flex-col gap-3 items-center group cursor-pointer'>
                    <input
                      accept='image/*'
                      type='file'
                      {...formMethods.register('avatar')}
                      className='hidden'
                      ref={(e) => {
                        const { ref: registerRef } =
                          formMethods.register('avatar')
                        registerRef(e)
                        fileInputRef.current = e
                      }}
                    />
                    <div className='relative'>
                      <Avatar
                        size='lg'
                        src={avatarPreview}
                        className='w-20 h-20 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all'
                      />
                      <div className='absolute bottom-0 right-0 bg-secondary text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform'>
                        <CameraIcon size={14} />
                      </div>
                    </div>
                    <span className='text-xs font-bold text-default-500 uppercase tracking-widest group-hover:text-primary transition-colors'>
                      Upload Photo
                    </span>
                    {formMethods.formState.errors.avatar && (
                      <p className='text-xs text-danger font-medium'>
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
                  label='First Name'
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
                  className='md:col-span-2 mt-2 font-bold h-12 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.2)] rounded-2xl'
                  endContent={<ArrowRightIcon size={16} />}
                  color='primary'
                  type='submit'
                  isLoading={formMethods.formState.isSubmitting || keepLoading}
                >
                  Proceed To Dashboard
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default AcceptInviteSection

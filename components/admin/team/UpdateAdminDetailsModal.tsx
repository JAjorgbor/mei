'use client'
import { updateAdmin } from '@/api-utils/admin/requests/admin.requests'
import { urlToFile } from '@/app/utils/urlToFile'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import InputField from '@/components/elements/InputField'
import useGetAdmin from '@/hooks/requests/useGetAdmin'
import { addToast, Avatar, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CameraIcon } from 'lucide-react'
import { useEffect, useRef, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  avatar: z
    .any()
    .refine((file) => file && file.length > 0, 'Avatar is required'),
})

type FormFields = z.infer<typeof schema>

const UpdateAdminDetailsModal: FC<BaseModalProps> = ({ isOpen, setIsOpen }) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const fileInputRef = useRef<any>(null)
  const { admin, mutateAdmin } = useGetAdmin()
  const watchAvatar = formMethods.watch('avatar')
  const [avatarPreview, setAvatarPreview] = useState('')
  useEffect(() => {
    if (watchAvatar && watchAvatar[0]) {
      const file = watchAvatar[0]
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    } else {
      setAvatarPreview('')
    }
  }, [watchAvatar])

  useEffect(() => {
    if (admin) {
      formMethods.reset({
        firstName: admin.firstName,
        lastName: admin.lastName,
      })
      ;(async () => {
        const file = await urlToFile(admin.avatar, 'avatar', 'image/jpeg')
        formMethods.setValue('avatar', [file])
        const previewUrl = URL.createObjectURL(file)
        setAvatarPreview(previewUrl)
      })()
    }
  }, [admin])

  const handleSubmit = async (formData: FormFields) => {
    try {
      const res = await updateAdmin(formData)
      console.log(res)
      addToast({
        title: 'Admin details updated succesfully',
        severity: 'success',
        color: 'success',
      })
      mutateAdmin()
      setIsOpen(false)
    } catch (error: any) {
      addToast({
        title: error?.data?.details
          ? JSON.stringify(error?.data?.details)
          : error?.message || 'Something went wrong. Please try again later.',
        severity: 'danger',
        color: 'danger',
      })
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Update Admin Details'
      footer={
        <div className='flex gap-3 justify-end'>
          <Button
            size='sm'
            onPress={() => setIsOpen(false)}
            color='danger'
            disabled={formMethods.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button
            size='sm'
            type='submit'
            form='update-admin-details-form'
            color='primary'
            isLoading={formMethods.formState.isSubmitting}
          >
            Submit
          </Button>
        </div>
      }
    >
      <form
        onSubmit={formMethods.handleSubmit(handleSubmit)}
        id='update-admin-details-form'
      >
        <div className='space-y-4'>
          <div className='flex gap-4 justify-center'>
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
            type='text'
            isName
            placeholder='admin@example.com'
            register={{ value: admin?.email }}
            label='Email'
            disabled
            isRequired
          />
        </div>
      </form>
    </ModalWrapper>
  )
}
export default UpdateAdminDetailsModal

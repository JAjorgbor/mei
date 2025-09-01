'use client'
import { createPaymentBundle } from '@/api-utils/admin/requests/payment-bundle.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import InputField from '@/components/elements/InputField'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  bundleType: z
    .string({ required_error: 'Bundle type is required' })
    .min(1, 'Bundle type is required'),
  numberOfstars: z
    .number({
      required_error: 'Number of stars is required',
      invalid_type_error: 'Number of stars is required',
    })
    .min(1, 'Number of stars must be at least 1'),
  amount: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price is required',
  }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
})

type FormFields = z.infer<typeof schema>

const CreatePaymentBundleModal: FC<BaseModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })

  const handleSubmit = async (formData: FormFields) => {
    try {
      await createPaymentBundle(formData)
      formMethods.reset()
      addToast({
        title: 'Payment bundle created successfully',
        severity: 'success',
        color: 'success',
      })
      setIsOpen(false)
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

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Create Payment Bundle'
      footer={
        <div className='flex gap-4 justify-end'>
          <Button
            onPress={() => {
              formMethods.reset({ bundleType: '' })
              setIsOpen(false)
            }}
            size='sm'
            color='danger'
            variant='ghost'
          >
            Cancel
          </Button>
          <Button
            size='sm'
            type='submit'
            form='create-payment-bundle-form'
            color='primary'
            isLoading={formMethods.formState.isSubmitting}
          >
            Create
          </Button>
        </div>
      }
    >
      <form
        id='create-payment-bundle-form'
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <div className='grid md:grid-cols-2 gap-3'>
          <InputField
            type='number'
            label='Number of Stars'
            className='md:col-span-2'
            placeholder='5'
            isRequired
            register={formMethods.register('numberOfstars', {
              valueAsNumber: true,
            })}
            errorMessage={formMethods.formState.errors.numberOfstars?.message}
          />
          <InputField
            type='amount'
            label='Price'
            className='md:col-span-2'
            placeholder={'2,000'}
            startContent={'₦'}
            isRequired
            value={formMethods.watch('amount')}
            onChange={(value) => formMethods.setValue('amount', value)}
            errorMessage={formMethods.formState.errors.amount?.message}
          />

          <InputField
            type='select'
            label='Bundle Type'
            isRequired
            className='md:col-span-2'
            onChange={(value) => formMethods.setValue('bundleType', value)}
            value={formMethods.watch('bundleType')}
            errorMessage={formMethods.formState.errors.bundleType?.message}
            placeholder='Select Bundle Type'
            options={[
              { value: 'cash', label: 'Cash' },
              { value: 'purchaseOfBooks', label: 'Purchase of Books' },
              {
                value: 'transferringStarsToOtherUsers',
                label: 'Transferring Stars to Other Users',
              },
              { value: 'cashPromo', label: 'Cash Promo' },
              { value: 'bookPromo', label: 'Book Promo' },
            ]}
          />
          <InputField
            type='textarea'
            label='Description'
            className='md:col-span-2'
            placeholder='Describe this bundle plan...'
            isRequired
            register={formMethods.register('description')}
            errorMessage={formMethods.formState.errors.description?.message}
          />
        </div>
      </form>
    </ModalWrapper>
  )
}
export default CreatePaymentBundleModal

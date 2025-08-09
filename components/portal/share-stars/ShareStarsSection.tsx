'use client'
import Container from '@/components/elements/Container'
import InputField from '@/components/elements/InputField'
import ConfirmShareStarsDrawer from '@/components/portal/share-stars/ConfirmShareStarsDrawer'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = (max: number) =>
  z.object({
    email: z.string().email(),
    numberOfStars: z
      .number({
        required_error: 'Please provide a number',
        // invalid_type_error: 'Please provide a number',
      })
      .min(1, 'Minimum value is 2')
      .refine((val) => val < max, {
        message: `The value entered exceeds your available balance of ${max} stars.`,
      }),
  })

const ShareStarsSection = () => {
  const schemaValue = schema(30)
  type FormFields = z.infer<typeof schemaValue>

  const [showConfirmationDrawer, setShowConfirmationDrawer] = useState(false)

  useSetHeaderNavigation({
    title: 'Share Stars',
    backLink: '/portal/profile',
  })

  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schemaValue),
    defaultValues: { numberOfStars: 1 },
  })
  console.log(formMethods.watch())
  return (
    <Container width='xl'>
      <form
        noValidate
        className='space-y-44'
        onSubmit={formMethods.handleSubmit(() =>
          setShowConfirmationDrawer(true)
        )}
      >
        <div className='space-y-5'>
          <div className='space-y-3'>
            <InputField
              type='email'
              label='Recipient Email Address'
              isRequired
              register={formMethods.register('email')}
              placeholder='email@example.com'
              errorMessage={formMethods.formState.errors.email?.message}
            />
            <p className='text-sm'>
              Warning: Sharing stars is an irreversible action.
            </p>
          </div>
          <InputField
            type='number'
            label='Number of Stars'
            isRequired
            register={formMethods.register('numberOfStars', {
              valueAsNumber: true,
            })}
            errorMessage={formMethods.formState.errors.numberOfStars?.message}
          />
        </div>
        <Button type='submit' color='secondary' fullWidth>
          Save
        </Button>
      </form>
      <ConfirmShareStarsDrawer
        isOpen={showConfirmationDrawer}
        setIsOpen={setShowConfirmationDrawer}
        isLoading={formMethods.formState.isSubmitting}
        starCount={formMethods.watch('numberOfStars')}
      />
    </Container>
  )
}

export default ShareStarsSection

import { inviteTeamMember } from '@/api-utils/admin/requests/team.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import InputField from '@/components/elements/InputField'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string({ required_error: 'Email address is required' }).email(),
})

type FormFields = z.infer<typeof schema>

const InviteTeamMemberModal: FC<BaseModalProps> = ({ isOpen, setIsOpen }) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })

  const handleSubmit = async (formData: FormFields) => {
    try {
      await inviteTeamMember(formData)
      console.log(formData)
      //   formMethods.reset()
      addToast({ color: 'success', title: 'Team member invited successfully' })
      setIsOpen(false)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.detail ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
      console.log(error)
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      size='sm'
      setIsOpen={setIsOpen}
      title='Invite Team Member'
      footer={
        <div className='flex justify-end gap-4'>
          <Button
            color='danger'
            variant='ghost'
            size='sm'
            onPress={() => addToast({ title: 'fafa', timeout: 100000 })}
          >
            Cancel
          </Button>
          <Button
            color='secondary'
            size='sm'
            type='submit'
            form='invite-team-member-form'
            isLoading={formMethods.formState.isSubmitting}
          >
            Invite
          </Button>
        </div>
      }
    >
      <form
        id='invite-team-member-form'
        noValidate
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <InputField
          type='email'
          register={formMethods.register('email')}
          placeholder='email@example.com'
          label='Email'
          isRequired
          errorMessage={formMethods.formState.errors.email?.message}
        />
      </form>
    </ModalWrapper>
  )
}
export default InviteTeamMemberModal

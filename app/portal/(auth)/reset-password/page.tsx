import Container from '@/components/elements/Container'
import ResetPasswordForm from '@/components/portal/auth/ResetPasswordForm'

export const metadata = {
  title: 'Reset Password',
}

export default function ResetPasswordPage() {
  return (
    <Container>
      <div className='py-20'>
        <ResetPasswordForm />
      </div>
    </Container>
  )
}

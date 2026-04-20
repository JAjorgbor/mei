import Container from '@/components/elements/Container'
import ForgotPasswordForm from '@/components/portal/auth/ForgotPasswordForm'

export const metadata = {
  title: 'Forgot Password',
}

export default function ForgotPasswordPage() {
  return (
    <Container>
      <div className='py-20'>
        <ForgotPasswordForm />
      </div>
    </Container>
  )
}

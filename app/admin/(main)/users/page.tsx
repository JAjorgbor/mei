import UsersSection from '@/components/admin/users/UsersSection'
import Container from '@/components/elements/Container'

export const metadata = { title: 'Users' }

export default function UsersPage() {
  return (
    <Container className='space-y-4'>
      <h3 className='text-3xl font-bold'>Users</h3>
      <UsersSection />
    </Container>
  )
}

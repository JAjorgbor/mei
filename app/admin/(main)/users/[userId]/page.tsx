import ManageUserSection from '@/components/admin/users/ManageUserSection'
import Container from '@/components/elements/Container'

export const metadata = { title: 'Manage User' }

export default function ManageUserPage() {
  return (
    <Container className='space-y-4'>
      <h3 className='text-3xl font-bold'>Manage User</h3>
      <ManageUserSection />
    </Container>
  )
}

import ManagePageSection from '@/components/admin/chapters/ManagePageSection'
import Container from '@/components/elements/Container'

export default function ManagePage() {
  return (
    <Container>
      <div className='space-y-4'>
        <h3 className='text-3xl font-bold'>Manage Page</h3>
        <ManagePageSection />
      </div>
    </Container>
  )
}

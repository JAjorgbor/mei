import AddPageSection from '@/components/admin/chapters/AddPageSection'
import Container from '@/components/elements/Container'

export default function AddPage() {
  return (
    <Container>
      <div className='space-y-4'>
        <h3 className='text-3xl font-bold'>Add Page</h3>
        <AddPageSection />
      </div>
    </Container>
  )
}

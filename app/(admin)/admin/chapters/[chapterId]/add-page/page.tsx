import Container from '@/components/elements/Container'

import dynamic from 'next/dynamic'

const AddPageSection = dynamic(
  () => import('@/components/admin/chapters/AddPageSection'),
  { ssr: false }
)

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

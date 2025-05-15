import Container from '@/components/elements/Container'

import dynamicImport from 'next/dynamic'

export const dynamic = 'force-dynamic'

const AddPageSection = dynamicImport(
  () => import('@/components/admin/chapters/AddPageSection'),
  { ssr: false }
)
export const runtime = 'edge'
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

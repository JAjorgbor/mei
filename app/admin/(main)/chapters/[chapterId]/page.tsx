import ManageChapterSection from '@/components/admin/chapters/ManageChapterSection'
import Container from '@/components/elements/Container'

export const runtime = 'edge'

export default function ChapterPage() {
  return (
    <Container>
      <div className='space-y-4'>
        <h3 className='font-bold text-3xl'>Manage Chapter</h3>
        <ManageChapterSection />
      </div>
    </Container>
  )
}

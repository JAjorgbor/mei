import ViewChapterSection from '@/components/admin/chapters/ViewChapterSection'
import Container from '@/components/elements/Container'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export default function ChapterPage() {
  return (
    <Container>
      <ViewChapterSection />
    </Container>
  )
}

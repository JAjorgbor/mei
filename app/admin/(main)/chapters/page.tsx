import ChaptersSection from '@/components/admin/chapters/ChaptersSection'
import Container from '@/components/elements/Container'

export const metadata = { title: 'Chapters' }

export default function ChaptersPage() {
  return (
    <Container>
      <div className='space-y-4'>
        <h3 className='text-3xl font-bold'>Chapters</h3>

        <ChaptersSection />
      </div>
    </Container>
  )
}

'use client'
import ChaptersSection from '@/components/admin/dashboard/chapters/ChaptersSection'
import Container from '@/components/elements/Container'

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

import ChaptersSection from '@/components/admin/dashboard/chapters/ChaptersSection'
import Container from '@/components/elements/Container'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'

export default function ChaptersPage() {
  return (
    <Container>
      <div className='space-y-6'>
        <div className='space-y-'>
          <h3 className='text-3xl font-bold'>Chapters</h3>
          <Breadcrumbs variant='light'>
            <BreadcrumbItem>Admin</BreadcrumbItem>
            <BreadcrumbItem>Chapters</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <ChaptersSection />
      </div>
    </Container>
  )
}

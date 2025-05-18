import DashboardStatsSection from '@/components/admin/dashboard/DashboardStatsSection'
import DashboardSummary from '@/components/admin/dashboard/DashboardSummary'
import Container from '@/components/elements/Container'

export const metadata = {
  title: 'Dashboard',
}

const Page = () => {
  return (
    <Container>
      <div className='space-y-4'>
        <DashboardStatsSection />
        <DashboardSummary />
      </div>
    </Container>
  )
}

export default Page

import TeamSection from '@/components/admin/team/TeamSection'
import Container from '@/components/elements/Container'

export const metadata = { title: 'Team' }

export default function TeamPage() {
  return (
    <Container>
      <TeamSection />
    </Container>
  )
}

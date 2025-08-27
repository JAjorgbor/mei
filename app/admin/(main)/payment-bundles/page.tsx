import PaymentBundlesSection from '@/components/admin/payment-bundles/PaymentBundlesSection'
import Container from '@/components/elements/Container'

export const metadata = {
  title: 'Payment Bundles',
}

export default function PaymentBudlePage() {
  return (
    <Container>
      <div className='space-y-4'>
        <h3 className='text-3xl font-bold'>Payments</h3>
        <PaymentBundlesSection />
      </div>
    </Container>
  )
}

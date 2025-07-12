import Container from '@/components/elements/Container'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className='flex justify-between items-center py-8 text-sm'>
          <div>&copy; {moment().year()} Mie</div>
          <div className='flex gap-4'>
            <Link href='#'>Privacy Policy</Link>
            <Link href='#'>Terms & Conditions</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

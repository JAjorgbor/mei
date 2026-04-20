import Container from '@/components/elements/Container'
import moment from 'moment'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className='flex justify-center items-center py-8 text-sm text-foreground-400'>
          <div>Copyright &copy; {moment().year()} by Maya Angelou.</div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

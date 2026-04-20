'use client'
import React from 'react'
import Container from '../elements/Container'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='py-6 border-t border-default-100 bg-background'>
      <Container>
        <div className='flex justify-center items-center text-default-400 text-sm'>
          <p>Copyright © {currentYear} by Maya Angelou.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

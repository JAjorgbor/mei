'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@heroui/react'
import Link from 'next/link'
import Container from '../elements/Container'

const CTA = () => {
  return (
    <section className='py-24 relative overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-secondary/5 rounded-full blur-[150px]' />
      </div>

      <Container className='relative z-10'>
        <div className='bg-default-100/50 backdrop-blur-xl border border-default-200 rounded-[3rem] p-4 md:p-20 text-center space-y-8'>
          <h2 className='text-4xl  md:text-7xl font-playfair font-bold max-w-4xl mx-auto'>
            Join the inner{' '}
            <span className='text-secondary italic'>circle.</span>
          </h2>
          <p className='text-xl text-default-500 max-w-2xl mx-auto leading-relaxed'>
            Subscribe to unlock every chapter, every secret, and every echo of
            this ongoing story. Your support keeps the resonance alive.
          </p>
          <div className='pt-6'>
            <Button
              size='lg'
              color='secondary'
              radius='full'
              className='py-6 px-8 md:px-12 md:py-8 font-semibold md:text-xl hover:scale-105 transition-transform'
              as={Link}
              href='/portal'
            >
              Start Your Subscription
            </Button>
          </div>
          <p className='text-default-400 text-sm'>
            Cancel anytime. Every chapter is yours to keep.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default CTA

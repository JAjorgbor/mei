'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@heroui/react'
import Link from 'next/link'
import Container from '../elements/Container'

const Hero = () => {
  return (
    <section className='relative min-h-[90dvh] flex items-center justify-center overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]' />
      </div>

      <Container className='relative z-10 flex flex-col items-center justify-center text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='max-w-4xl space-y-10 flex flex-col items-center'
        >
          <div className='space-y-6 flex flex-col items-center'>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium tracking-wider uppercase'
            >
              An Intimate Chronicle
            </motion.span>
            
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-playfair font-bold leading-tight'>
              One Soul. <br />A Thousand <span className='text-secondary'>Echoes</span>.
            </h1>
            
            <p className='text-lg md:text-xl lg:text-2xl text-default-500 max-w-2xl leading-relaxed italic'>
              "I am sharing the parts of me I once kept hidden. This is not just a book; it is my resonance, my truth, and my invitation to you."
            </p>
          </div>

          <div className='flex items-center justify-center gap-4 pt-4'>
            <Button
              size='lg'
              color='secondary'
              radius='full'
              className='px-8 py-6 font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-secondary/20'
              as={Link}
              href='/portal'
            >
              Unlock the Story
            </Button>
            <Button
              size='lg'
              variant='bordered'
              radius='full'
              className='px-8 py-6 font-semibold text-lg hover:bg-default-100 transition-colors'
              as={Link}
              href='/about'
            >
              The Inspiration
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Hero

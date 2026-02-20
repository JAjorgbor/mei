'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@heroui/react'
import Link from 'next/link'
import Container from '../elements/Container'

const Hero = () => {
  return (
    <section className='relative min-h-[90dvh] flex items-center overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]' />
      </div>

      <Container className='relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium tracking-wider uppercase'
              >
                An Intimate Chronicle
              </motion.span>
              <h1 className='text-6xl md:text-7xl font-playfair font-bold leading-tight'>
                One Soul. <br />A Thousand{' '}
                <span className='text-secondary'>Echoes</span>.
              </h1>
              <p className='text-xl text-default-500 max-w-lg leading-relaxed italic'>
                "I am sharing the parts of me I once kept hidden. This is not
                just a book; it is my resonance, my truth, and my invitation to
                you."
              </p>
            </div>

            <div className='flex flex-wrap gap-4'>
              <Button
                size='lg'
                color='secondary'
                radius='full'
                className='px-8 font-semibold text-lg hover:scale-105 transition-transform'
                as={Link}
                href='/portal'
              >
                Unlock the Story
              </Button>
              <Button
                size='lg'
                variant='bordered'
                radius='full'
                className='px-8 font-semibold text-lg hover:bg-default-100 transition-colors'
                as={Link}
                href='/about'
              >
                The Inspiration
              </Button>
            </div>

            <div className='flex items-center gap-6 pt-4'>
              <div className='flex -space-x-3'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='w-10 h-10 rounded-full border-2 border-background bg-default-200 flex items-center justify-center overflow-hidden'
                  >
                    <img
                      src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${i}`}
                      alt='reader'
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
              <p className='text-sm text-default-400'>
                Join <span className='font-bold text-foreground'>5,000+</span>{' '}
                readers following this journey
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='relative hidden lg:block'
          >
            <div className='relative aspect-[3/4] w-full max-w-[400px] mx-auto group flex items-center'>
              {/* Specialized Book Cover Effect */}
              <div className='absolute inset-0 bg-secondary/20 blur-3xl rounded-full scale-110 group-hover:bg-secondary/30 transition-colors' />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className='relative z-20 bg-card rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-default-200 overflow-hidden transform group-hover:scale-105 transition-transform duration-500'
              >
                {/* This represents a premium book cover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10' />
                <img
                  src='/logo.png'
                  alt='Echoes Visual'
                  className='w-full h-full object-cover p-20 grayscale brightness-125'
                />
                <div className='absolute bottom-8 left-8 right-8 z-20 text-white'>
                  <p className='text-xs uppercase tracking-widest opacity-70 mb-2'>
                    Autobiographical Series
                  </p>
                  <h3 className='text-3xl font-playfair font-bold'>
                    The First Resonace
                  </h3>
                </div>
              </motion.div>

              {/* Decorative "Echo" lines */}
              <div className='absolute -right-8 top-1/4 space-y-2 opacity-30'>
                <div className='w-24 h-[1px] bg-secondary' />
                <div className='w-16 h-[1px] bg-secondary' />
                <div className='w-20 h-[1px] bg-secondary' />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero

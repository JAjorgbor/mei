'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Container from '../elements/Container'

const stats = [
  { label: 'Weekly Readers', value: '10K+' },
  { label: 'Unveiled Chapters', value: '150+' },
  { label: 'Global Resonances', value: '1M+' },
  { label: 'Years of Story', value: '12+' },
]

const Stats = () => {
  return (
    <section className='py-20 bg-primary text-primary-foreground overflow-hidden relative'>
      {/* Abstract Patterns */}
      <div className='absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent animate-[shimmer_5s_infinite]' />
        <div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent animate-[shimmer_7s_infinite]' />
      </div>

      <Container>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-12 text-center'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className='space-y-2'
            >
              <div className='text-4xl md:text-5xl font-playfair font-bold text-secondary'>
                {stat.value}
              </div>
              <div className='text-sm md:text-base uppercase tracking-widest opacity-70'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Stats

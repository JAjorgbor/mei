'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  Feather,
  Shield,
  Zap,
  Globe,
  MessageSquare,
  PenTool,
  Lock, // Added Lock icon
} from 'lucide-react'
import Container from '../elements/Container'

const features = [
  {
    icon: <PenTool className='w-8 h-8' />,
    title: 'Weekly Chronicles',
    description:
      'New chapters of the journey are released every week, exclusive to the Echoes inner circle.',
  },
  {
    icon: <Lock className='w-8 h-8' />,
    title: 'Hidden Truths',
    description:
      'Access the most personal entries that have never been shared on social media or public blogs.',
  },
  {
    icon: <MessageSquare className='w-8 h-8' />,
    title: 'Direct Resonance',
    description:
      'Engage in deep, thoughtful discussions directly with me through private comment threads.',
  },
  {
    icon: <Zap className='w-8 h-8' />,
    title: 'Instant Access',
    description:
      'Be the first to read raw drafts and "echoes" before they are refined into the final collection.',
  },
  {
    icon: <Shield className='w-8 h-8' />,
    title: 'Respectful Space',
    description:
      'A premium, ad-free environment designed for deep reading and focused reflection.',
  },
  {
    icon: <Globe className='w-8 h-8' />,
    title: 'Legacy Access',
    description:
      'Unlock my entire archive of stories, letters, and insights from the very beginning.',
  },
]

const Features = () => {
  return (
    <section className='py-24 bg-default-50/50'>
      <Container>
        <div className='text-center max-w-3xl mx-auto mb-20 space-y-4'>
          <h2 className='text-4xl md:text-5xl font-playfair font-bold'>
            The Cost of <span className='text-secondary'>Integrity</span>
          </h2>
          <p className='text-default-500 text-lg'>
            Echoes isn't a social network. It's an intimate subscription to a
            life's work. Your support allows the story to remain raw, honest,
            and independent.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className='p-8 rounded-3xl bg-background border border-default-200 hover:border-secondary transition-all hover:shadow-xl group'
            >
              <div className='w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold mb-3 font-playfair'>
                {feature.title}
              </h3>
              <p className='text-default-500 leading-relaxed'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Features

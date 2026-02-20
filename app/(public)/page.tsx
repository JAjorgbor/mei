'use client'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Stats from '@/components/landing/Stats'
import CTA from '@/components/landing/CTA'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <main className='min-h-screen bg-background'>
      <Hero />
      <Stats />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}

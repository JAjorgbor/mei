'use client'
import React from 'react'
import Container from '../elements/Container'
import Logo from '../elements/Logo'
import Link from 'next/link'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='py-12 border-t border-default-100 bg-background'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          <div className='col-span-1 md:col-span-2 space-y-6'>
            <Logo width={100} height={50} />
            <p className='text-default-500 max-w-sm leading-relaxed'>
              Echoes is the official home for my personal chronicles and deep
              reflections. A dedicated space for those who value truth, depth,
              and the resonance of a life well-lived.
            </p>
            <div className='flex gap-4'>
              <Link
                href='#'
                className='w-10 h-10 rounded-full border border-default-200 flex items-center justify-center text-default-400 hover:text-secondary hover:border-secondary transition-all'
              >
                <Twitter size={18} />
              </Link>
              <Link
                href='#'
                className='w-10 h-10 rounded-full border border-default-200 flex items-center justify-center text-default-400 hover:text-secondary hover:border-secondary transition-all'
              >
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className='font-bold mb-6'>Platform</h4>
            <ul className='space-y-4 text-default-500'>
              <li>
                <Link
                  href='/portal'
                  className='hover:text-secondary transition-colors'
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='hover:text-secondary transition-colors'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-secondary transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-secondary transition-colors'
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold mb-6'>Legal</h4>
            <ul className='space-y-4 text-default-500'>
              <li>
                <Link
                  href='#'
                  className='hover:text-secondary transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-secondary transition-colors'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-secondary transition-colors'
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-secondary transition-colors'
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-8 border-t border-default-100 flex flex-col md:flex-row justify-between items-center gap-4 text-default-400 text-sm'>
          <p>© {currentYear} Echoes. All rights reserved.</p>
          <div className='flex gap-8'>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Status
            </Link>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Sitemap
            </Link>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

'use client'
import Container from '@/components/elements/Container'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Button, Card, CardBody } from '@heroui/react'
import { Key, KeySquare, LogOut, SunMoon } from 'lucide-react'
import Link from 'next/link'

const SettingsSection = () => {
  useSetHeaderNavigation({
    title: 'Settings & Privacy',
    backLink: '/portal/profile',
  })
  return (
    <Container>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card
          as={Link}
          className='hover:bg-foreground hover:!text-background'
          href='/portal/settings/theme'
        >
          <CardBody>
            <div className='flex gap-3 items-center'>
              <div className='px-3'>
                <SunMoon size={30} />
              </div>
              <div className='space-y-1'>
                <h3>Theme Settings</h3>
                <p className='text-foreground-400'>
                  Do you prefer a dark color scheme or a light color scheme
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          as={Link}
          className='hover:bg-foreground hover:!text-background'
          href='/portal/settings/password'
        >
          <CardBody>
            <div className='flex gap-3 items-center'>
              <div className='px-3'>
                <KeySquare size={30} />
              </div>
              <div className='space-y-1'>
                <h3>Change Password</h3>
                <p className='text-foreground-400'>
                  Can&apos;t remember previous password? or scared of a password
                  leak
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          as={Button}
          className='hover:bg-foreground hover:!text-background'
        >
          <CardBody>
            <div className='flex gap-3 items-center'>
              <div className='px-3'>
                <LogOut size={30} />
              </div>
              <div className='space-y-1'>
                <h3>Log Out</h3>
                <p className='text-foreground-400'>Remove credentials</p>
                <p>
                  <br />
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          as={Button}
          className='hover:bg-foreground hover:!text-background'
        >
          <CardBody>
            <div className='flex gap-3 items-center'>
              <div className='px-3'>
                <LogOut size={30} />
              </div>
              <div className='space-y-1'>
                <h3>Delete Account</h3>
                <p className='text-foreground-400 text-wrap'>
                  Delete all data associated with this account permenently
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  )
}

export default SettingsSection

'use client'
import Container from '@/components/elements/Container'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Card, CardBody, Button, CardHeader, Chip } from '@heroui/react'
import { Check, Star, Zap } from 'lucide-react'

const SubscribeSection = () => {
  useSetHeaderNavigation({
    title: 'Subscribe',
    backLink: '/portal/profile',
  })

  // Dummy packages
  const packages = [
    {
      name: 'Basic',
      price: '$4.99',
      duration: 'per month',
      description: 'Unlock 10 premium chapters per month.',
      features: [
        'Access to basic author room',
        '10 premium chapters',
        'Ads supported',
      ],
      icon: <Star size={24} className='text-amber-500' />,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      duration: 'per month',
      description: 'Unlimited chapters and exclusive early access.',
      features: [
        'Unlimited chapters',
        'Ad-free experiencing',
        'Early access to new releases',
        'Exclusive author room content',
      ],
      icon: <Zap size={24} className='text-secondary' />,
      popular: true,
    },
  ]

  return (
    <Container className='space-y-8 pb-12'>
      <div className='flex flex-col items-center justify-center text-center space-y-4 pt-8'>
        <h1 className='text-3xl md:text-5xl font-black tracking-tighter'>
          Choose Your Journey
        </h1>
        <p className='text-default-500 max-w-lg'>
          Unlock exclusive chapters, ad-free reading, and premium author room
          content. Upgrade your experience today.
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
        {packages.map((pkg, idx) => (
          <Card
            key={idx}
            className={`bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border ${pkg.popular ? 'border-secondary shadow-[0_0_30px_rgba(236,72,153,0.2)]' : 'border-default-200'} shadow-2xl rounded-[2.5rem] overflow-hidden relative`}
          >
            {pkg.popular && (
              <div className='absolute top-0 inset-x-0 flex justify-center'>
                <Chip
                  size='sm'
                  color='secondary'
                  className='rounded-b-xl rounded-t-none font-black uppercase tracking-widest text-[10px]'
                >
                  Most Popular
                </Chip>
              </div>
            )}
            <CardHeader className='flex flex-col items-center pt-8 pb-4 space-y-2'>
              <div className='p-4 bg-default-100 dark:bg-zinc-800 rounded-full mb-2'>
                {pkg.icon}
              </div>
              <h3 className='text-2xl font-black'>{pkg.name}</h3>
              <div className='flex items-baseline gap-1'>
                <span className='text-4xl font-black text-primary'>
                  {pkg.price}
                </span>
                <span className='text-sm text-default-500 font-medium'>
                  /{pkg.duration.split(' ')[1]}
                </span>
              </div>
              <p className='text-center text-sm text-default-500 max-w-xs mt-2'>
                {pkg.description}
              </p>
            </CardHeader>
            <CardBody className='px-8 pb-8 flex flex-col justify-between space-y-8'>
              <ul className='space-y-4'>
                {pkg.features.map((feat, fidx) => (
                  <li key={fidx} className='flex items-center gap-3'>
                    <div className='p-1 bg-primary/10 rounded-full text-primary'>
                      <Check size={14} />
                    </div>
                    <span className='text-sm font-medium'>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                color={pkg.popular ? 'secondary' : 'primary'}
                variant={pkg.popular ? 'shadow' : 'flat'}
                className='w-full font-bold h-12 text-sm uppercase tracking-widest rounded-2xl'
              >
                Choose {pkg.name}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default SubscribeSection

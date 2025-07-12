import Container from '@/components/elements/Container'
import { Card, CardBody } from '@heroui/react'
import { Lock } from 'lucide-react'
import Image from 'next/image'

const ChaptersSection = () => {
  return (
    <Container>
      <div className='grid md:grid-cols-3 gap-4'>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <Card
              className='flex flex-row md:flex-col items-stretch'
              key={index}
            >
              <CardBody className='p-0 w-1/3 md:w-full'>
                <Image
                  alt='cover image'
                  src='https://dummyimage.com/300x300'
                  height={300}
                  width={300}
                  className='w-full object-cover h-56'
                />
              </CardBody>
              <CardBody className='w-2/3 md:w-full  space-y-3'>
                <div className='flex flex-row justify-between items-center'>
                  <h3 className='text-xl'>Chapter 1: The rising star</h3>
                  <button>
                    <Lock size={18} />
                  </button>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Tempore quae provident excepturi
                </p>
              </CardBody>
            </Card>
          ))}
      </div>
    </Container>
  )
}

export default ChaptersSection

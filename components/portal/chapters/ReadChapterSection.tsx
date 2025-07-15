'use client'
import Container from '@/components/elements/Container'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { Eye, Heart, MessageSquareText } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

const ReadChapterSection = () => {
  const { chapterId } = useParams()
  useSetHeaderNavigation({
    title: 'Chapter Label',
    backLink: `/portal/chapters/${chapterId}`,
  })
  return (
    <Container>
      <div className='max-w-2xl mx-auto space-y-6'>
        <Navbar
          shouldHideOnScroll
          classNames={{ base: 'bg-transparent top-16 backdrop-blur-0 z-10' }}
        >
          <NavbarContent
            justify='center'
            className='flex justify-center w-full'
          >
            <NavbarItem className='w-full'>
              <ChapterStats />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className='space-y-6'>
          {Array(7)
            .fill(null)
            .map((_, index) => (
              <Card key={index} radius='none'>
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat architecto aperiam, modi reiciendis, tempore ab rerum
                  accusantium quia exercitationem eligendi sit enim provident
                  vel qui quasi placeat perferendis tempora commodi? Consequatur
                  sapiente maiores natus necessitatibus aspernatur iusto culpa
                  nihil tenetur, doloremque vel reiciendis odit omnis dicta a
                  maxime, laborum quo obcaecati assumenda nisi esse quae
                  adipisci minus magni in. Nemo.
                  <br />
                  Consectetur ducimus delectus dignissimos, necessitatibus
                  laborum itaque vel earum. Praesentium voluptate animi, eius
                  voluptatibus est explicabo assumenda velit, beatae adipisci
                  illum ea. Amet dolorem vel, consequuntur dolor enim explicabo
                  saepe! Mollitia aliquam, at laudantium dolorem magnam modi
                  placeat eum? Adipisci porro, quam mollitia atque quos
                  praesentium nostrum ullam laudantium iusto quia tenetur
                  temporibus. Ut necessitatibus fugiat repudiandae, ex ipsa
                  vitae.
                  <br />
                  Maiores doloremque inventore voluptas? Ea, natus dignissimos!
                  Aliquam reprehenderit possimus pariatur maiores animi, nam
                  repellendus modi enim exercitationem ducimus delectus vero
                  fugit sint fuga ex. Repellat cum repudiandae consequatur!
                  Illum.
                  <br />
                  Consectetur ducimus delectus dignissimos, necessitatibus
                  laborum itaque vel earum. Praesentium voluptate animi, eius
                  voluptatibus est explicabo assumenda velit, beatae adipisci
                  illum ea. Amet dolorem vel, consequuntur dolor enim explicabo
                  saepe! Mollitia aliquam, at laudantium dolorem magnam modi
                  placeat eum? Adipisci porro, quam mollitia atque quos
                  praesentium nostrum ullam laudantium iusto quia tenetur
                  temporibus. Ut necessitatibus fugiat repudiandae, ex ipsa
                  vitae.
                  <br />
                  Maiores doloremque inventore voluptas? Ea, natus dignissimos!
                  Aliquam reprehenderit possimus pariatur maiores animi, nam
                  repellendus modi enim exercitationem ducimus delectus vero
                  fugit sint fuga ex. Repellat cum repudiandae consequatur!
                  Illum.
                  <br />
                </CardBody>
                <CardFooter>
                  <div className='text-center text-sm text-foreground-600 w-full'>
                    {index + 1}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
        <ChapterStats />
      </div>
    </Container>
  )
}

export default ReadChapterSection

const ChapterStats = () => {
  return (
    <div className='flex justify-center gap-4 w-full'>
      <Button
        size='sm'
        startContent={<MessageSquareText size={15} />}
        variant='bordered'
        className='bg-background'
        color='primary'
        radius='full'
      >
        40
      </Button>
      <Button
        size='sm'
        startContent={<Heart size={15} />}
        variant='bordered'
        className='bg-background'
        color='primary'
        radius='full'
      >
        300
      </Button>
      <Button
        size='sm'
        startContent={<Eye size={15} />}
        variant='bordered'
        className='bg-background'
        color='primary'
        radius='full'
      >
        2.7K
      </Button>
    </div>
  )
}

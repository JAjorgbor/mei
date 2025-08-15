'use client'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import Container from '@/components/elements/Container'
import { setFontSize, setTheme } from '@/features/headerSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import {
  Button,
  Card,
  CardBody,
  Radio,
  RadioGroup,
  Switch,
} from '@heroui/react'
import { ALargeSmallIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeSection = () => {
  useSetHeaderNavigation({
    title: 'Theme Settings',
    backLink: '/portal/settings',
  })
  const { theme: reduxTheme, fontSize } = useAppSelector(
    (state) => state.header
  )
  const themeMap = {
    light: {
      icon: <SunIcon size={30} />,
      title: 'Light Mode',
      subHeading: 'Prefers light colors',
    },
    dark: {
      icon: <MoonIcon size={30} />,
      title: 'Dark Mode',
      subHeading: 'Prefers dark colors',
    },
    system: {
      icon: <MonitorIcon size={30} />,
      title: 'System Default',
      subHeading: 'Use system default theme preference',
    },
  }
  const [showThemeSwitchModal, setShowThemeSwitchModal] = useState(false)
  const dispatch = useAppDispatch()
  const [fontIsLarge, setFontIsLarge] = useState(true)
  useEffect(() => {
    setFontIsLarge(fontSize == 'large')
  }, [fontSize])
  return (
    <Container>
      <div className='grid md:grid-cols-3 gap-5'>
        <Card
          className='hover:bg-foreground hover:!text-background'
          as={Button}
        >
          <CardBody
            onClick={() => {
              console.log('adaf')
              setShowThemeSwitchModal(true)
            }}
          >
            <div className='flex gap-3 items-center'>
              <div className='px-3'>{themeMap[reduxTheme].icon}</div>
              <div className='space-y-1'>
                <h3>{themeMap[reduxTheme].title}</h3>
                <p className='text-foreground-400'>
                  {themeMap[reduxTheme].subHeading}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className='hover:bg-foreground hover:!text-background'>
          <CardBody>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <div className='px-3'>{<ALargeSmallIcon size={35} />}</div>
                <div className='space-y-1'>
                  <h3>Large Base Font Size</h3>
                  <p className='text-foreground-400 text-sm'>
                    Prefers bolder and bigger texts
                  </p>
                </div>
              </div>
              <Switch
                color='secondary'
                isSelected={fontIsLarge}
                onValueChange={(value) => {
                  setFontIsLarge(value)
                  dispatch(setFontSize(value ? 'large' : 'normal'))
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <ThemeSwitchModal
        isOpen={showThemeSwitchModal}
        setIsOpen={setShowThemeSwitchModal}
      />
    </Container>
  )
}

export default ThemeSection

export const ThemeSwitchModal = ({ isOpen, setIsOpen }: BaseModalProps) => {
  const { theme: reduxTheme } = useAppSelector((state) => state.header)
  const dispatch = useAppDispatch()
  return (
    <ModalWrapper title='Switch Theme' isOpen={isOpen} setIsOpen={setIsOpen}>
      <RadioGroup
        onValueChange={(value) => dispatch(setTheme(value))}
        value={reduxTheme}
        classNames={{ wrapper: 'gap-8 py-3 items-center' }}
      >
        <Radio
          value='light'
          classNames={{
            base: 'border border-default-100 data-[selected]:border-primary rounded-lg max-w-full w-full',
            labelWrapper: 'w-full',
            label: 'flex justify-between w-full items-center',
          }}
        >
          Light
          <SunIcon size={18} />
        </Radio>
        <Radio
          value='dark'
          classNames={{
            base: 'border border-default-100 data-[selected]:border-primary rounded-lg max-w-full w-full',
            labelWrapper: 'w-full',
            label: 'flex justify-between w-full items-center',
          }}
        >
          Dark
          <MoonIcon size={18} />
        </Radio>
        <Radio
          value='system'
          classNames={{
            base: 'border border-default-100 data-[selected]:border-primary rounded-lg max-w-full w-full',
            labelWrapper: 'w-full',
            label: 'flex justify-between w-full items-center',
          }}
        >
          System
          <MonitorIcon size={18} />
        </Radio>
      </RadioGroup>
    </ModalWrapper>
  )
}

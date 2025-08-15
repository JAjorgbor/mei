'use client'
import { setTheme } from '@/features/headerSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ThemeSwitch = () => {
  const [themeState, setThemeState] = useState('')
  const { theme: reduxTheme } = useAppSelector((state) => state.header)
  useEffect(() => {
    setThemeState(reduxTheme)
  }, [reduxTheme])
  const dispatch = useAppDispatch()
  return (
    <Dropdown className='min-w-max text-foreground'>
      <DropdownTrigger>
        {themeState && (
          <button
            aria-label='switch theme'
            className='switcher group relative p-1.5 rounded-full before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 lg:flex'
          >
            {themeState == 'light' ? (
              <SunIcon className='transistion relative m-auto size-[1rem]  duration-300 group-hover:rotate-180 group-hover:fill-yellow-400 fill-gray-300' />
            ) : themeState == 'dark' ? (
              <MoonIcon className='transistion relative m-auto size-[1rem] fill-gray-500 duration-300 group-hover:-rotate-90 group-hover:fill-blue-900 ' />
            ) : (
              <MonitorIcon className='transistion relative m-auto size-[1rem] fill-gray-500 duration-300 group-hover:fill-secondary  ' />
            )}
          </button>
        )}
      </DropdownTrigger>
      <DropdownMenu selectedKeys={'dark'}>
        <DropdownItem
          key='light'
          startContent={<SunIcon size={16} />}
          onPress={() => dispatch(setTheme('light'))}
          className={`${themeState == 'light' ? 'text-secondary' : ''}`}
        >
          Light
        </DropdownItem>
        <DropdownItem
          key='dark'
          startContent={<MoonIcon size={16} />}
          onPress={() => dispatch(setTheme('dark'))}
          className={`${themeState == 'dark' ? 'text-secondary' : ''}`}
        >
          Dark
        </DropdownItem>
        <DropdownItem
          key='system'
          startContent={<MonitorIcon size={16} />}
          onPress={() => dispatch(setTheme('system'))}
          className={`${themeState == 'system' ? 'text-secondary' : ''}`}
        >
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ThemeSwitch

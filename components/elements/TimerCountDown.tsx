'use client'
import type { FC } from 'react'
import Countdown from 'react-countdown'

interface TimerCountDownProps {
  onComplete?: () => void
  time: number
  onTick?: any
}

const TimerCountDown: FC<TimerCountDownProps> = ({
  onComplete,
  time = 6000,
  onTick = () => null,
}) => {
  // Define a custom formatting function to format the remaining time
  const formatTime = ({
    minutes,
    seconds,
  }: {
    minutes: number
    seconds: number
  }) => {
    // Ensure that minutes and seconds are two digits each
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }
  return (
    <>
      <Countdown
        date={Date.now() + time}
        onComplete={onComplete}
        onTick={onTick}
        renderer={({ minutes, seconds }) => formatTime({ minutes, seconds })}
      />
    </>
  )
}
export default TimerCountDown

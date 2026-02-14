'use client'
import { useAppSelector } from '@/features/store'
import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'

interface CanvasPageRendererProps {
  htmlContent: string
  className?: string // styles for the HTML content
}

export default function CanvasPageRenderer({
  htmlContent,
  className,
}: CanvasPageRendererProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  const { theme: reduxTheme } = useAppSelector((state) => state.header)

  const renderCanvas = async () => {
    const wrapper = wrapperRef.current
    const source = sourceRef.current
    const out = canvasRef.current
    if (!wrapper || !source || !out) return

    setLoading(true)

    try {
      // Let React paint + layout settle
      await new Promise((r) => requestAnimationFrame(() => r(null)))
      await document.fonts.ready

      // Ensure the hidden source has a real width (same as wrapper)
      const cssW = Math.max(
        1,
        Math.floor(wrapper.getBoundingClientRect().width),
      )
      source.style.width = `${cssW}px`

      // Avoid margin-collapse / clipped bottoms by using padding
      source.style.paddingBottom = '8px'

      const dpr = window.devicePixelRatio || 1

      // Render snapshot
      const snap = await html2canvas(source, {
        backgroundColor: null,
        scale: dpr,
        logging: false,
        useCORS: true,
      })

      const ctx = out.getContext('2d')
      if (!ctx) return

      // Canvas pixel size (device pixels)
      out.width = snap.width
      out.height = snap.height

      // Canvas CSS size (CSS pixels)
      const cssH = Math.max(1, Math.ceil(snap.height / dpr)) + 4 // safety buffer
      wrapper.style.height = `${cssH}px`
      out.style.width = `${cssW}px`
      out.style.height = `${cssH}px`

      ctx.clearRect(0, 0, out.width, out.height)
      ctx.drawImage(snap, 0, 0)
    } catch (error) {
      console.error('Canvas rendering failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const t = setTimeout(renderCanvas, 50)
    return () => clearTimeout(t)
  }, [htmlContent])

  useEffect(() => {
    // re-render if wrapper width changes
    const ro = new ResizeObserver(() => renderCanvas())
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [reduxTheme])

  return (
    <div ref={wrapperRef} className='relative block w-full'>
      {/* Off-screen renderable HTML: no duplication */}
      <div
        ref={sourceRef}
        aria-hidden='true'
        className={`absolute left-[-10000px] text-foreground top-0 pointer-events-none select-none ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Visible canvas */}
      <canvas ref={canvasRef} className='block w-full' />

      {loading && (
        <div className='absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 animate-pulse rounded' />
      )}
    </div>
  )
}

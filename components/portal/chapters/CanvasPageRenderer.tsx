'use client'
import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'

interface CanvasPageRendererProps {
  htmlContent: string
  className?: string
}

const CanvasPageRenderer: React.FC<CanvasPageRendererProps> = ({
  htmlContent,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  const renderCanvas = async () => {
    if (!containerRef.current || !canvasRef.current) return
    setLoading(true)

    // Wait for fonts to load
    await document.fonts.ready

    try {
      const element = containerRef.current
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: window.devicePixelRatio || 1,
        logging: false,
        useCORS: true,
      })

      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        canvasRef.current.width = canvas.width
        canvasRef.current.height = canvas.height
        // We don't force width/height style here to let CSS handle responsiveness if needed,
        // but typically we want it to match the rendered size.
        // Actually for retina, we need to set style width = actual width.
        canvasRef.current.style.width = `${element.offsetWidth}px`
        canvasRef.current.style.height = `${element.offsetHeight}px`

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(canvas, 0, 0)
      }
    } catch (error) {
      console.error('Canvas rendering failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial render
    const timeout = setTimeout(renderCanvas, 100)
    return () => clearTimeout(timeout)
  }, [htmlContent])

  useEffect(() => {
    // Re-render on resize
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(renderCanvas, 300)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <div className={`relative w-full ${className || ''}`}>
      {/* Source Content - Hidden but takes up space */}
      <div
        ref={containerRef}
        className=' pointer-events-none select-none'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Canvas Layer */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

      {/* Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 animate-pulse rounded' />
      )}
    </div>
  )
}

export default CanvasPageRenderer

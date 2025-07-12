export default function handleScreenshot() {
  const isMac = navigator.platform.toUpperCase().includes('MAC')

  const blurOverlay = document.getElementById('screenshot-blur-overlay') as any
  blurOverlay.id = 'screenshot-blur-overlay'
  blurOverlay.classList.add('hidden')
  document.body.appendChild(blurOverlay)

  function activateBlur(reason = '') {
    console.warn('Blur activated due to:', reason)
    blurOverlay.classList.remove('hidden')
  }

  function deactivateBlur() {
    blurOverlay.classList.add('hidden')
  }

  // Detect common screenshot keys
  window.addEventListener('keydown', (e) => {
    const combo = [
      e.ctrlKey ? 'Ctrl' : '',
      e.altKey ? 'Alt' : '',
      e.metaKey ? 'Meta' : '', // Cmd key on Mac
      e.shiftKey ? 'Shift' : '',
      e.key,
    ]
      .filter(Boolean)
      .join('+')

    const macShortcuts = [
      'Meta+Shift+3',
      'Meta+Shift+4',
      'Meta+Shift+5',
      'Meta+Shift+6',
    ]

    const winShortcuts = ['PrintScreen', 'Ctrl+PrintScreen', 'Alt+PrintScreen']

    const screenshotCombos = isMac ? macShortcuts : winShortcuts

    if (screenshotCombos.includes(combo) || e.key === 'PrintScreen') {
      activateBlur('Screenshot key detected: ' + combo)
    }
  })

  // Detect focus loss / hidden tab
  window.addEventListener('blur', () => activateBlur('Tab lost focus'))
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      activateBlur('Tab became hidden')
    }
  })

  // Optional: basic DevTools detection (via resize trick)
  let devToolsOpen = false
  const threshold = 160

  setInterval(() => {
    const widthExceeded = window.outerWidth - window.innerWidth > threshold
    const heightExceeded = window.outerHeight - window.innerHeight > threshold
    const devToolsNow = widthExceeded || heightExceeded

    if (devToolsNow && !devToolsOpen) {
      devToolsOpen = true
      activateBlur('DevTools opened')
    } else if (!devToolsNow && devToolsOpen) {
      devToolsOpen = false
      deactivateBlur()
    }
  }, 1000)

  // Optional: Unblur on refocus
  window.addEventListener('focus', () => {
    deactivateBlur()
  })
}

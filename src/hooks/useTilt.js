import { useEffect } from 'react'
import { prefersReducedMotion } from '../utils/animations'

const TILT_TARGETS = '.card,.cat,.fact'

// Cards tilt towards the mouse, and the hero picture follows it
export function useTilt() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer:fine)')

    const onMove = (e) => {
      if (prefersReducedMotion() || !finePointer.matches) return

      const card = e.target.closest?.(TILT_TARGETS)
      if (card) {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        card.style.setProperty('--tx', (x * 2 - 1).toFixed(2))
        card.style.setProperty('--ty', (y * 2 - 1).toFixed(2))
        card.style.setProperty('--mx', x * 100 + '%')
        card.style.setProperty('--my', y * 100 + '%')
      }

      const hero = e.target.closest?.('.hero')
      if (hero) {
        const r = hero.getBoundingClientRect()
        hero.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(2))
        hero.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(2))
      }
    }

    const onOut = (e) => {
      const card = e.target.closest?.(TILT_TARGETS)
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty('--tx', 0)
        card.style.setProperty('--ty', 0)
      }
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerout', onOut)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
    }
  }, [])
}

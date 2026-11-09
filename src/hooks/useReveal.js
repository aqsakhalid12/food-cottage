import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion } from '../utils/animations'

// Everything that fades in when it scrolls into view
const SELECTOR =
  '.ph .wrap,.hero .wrap>*,section h2,.card,.cat,.fact,.panel,.oc,.ln,.list,.split,.tw,.mapcard,.cta .wrap,.tabs,.tools'

const observer =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('on')
              observer.unobserve(entry.target)
            }
          }),
        { threshold: 0.1 }
      )
    : null

// Mark the matching elements inside `root` so they fade in one after another
export function revealIn(root) {
  if (!observer || !root || prefersReducedMotion()) return

  const countPerParent = new Map()
  root.querySelectorAll(SELECTOR).forEach((el) => {
    if (el.classList.contains('rv')) return
    const parent = el.parentElement
    const position = countPerParent.get(parent) || 0
    countPerParent.set(parent, position + 1)

    el.style.setProperty('--d', Math.min(position, 8) * 70 + 'ms')
    el.classList.add('rv')
    observer.observe(el)
  })
}

// Runs the reveal on every page change
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    revealIn(document.getElementById('app'))
  }, [pathname])
}

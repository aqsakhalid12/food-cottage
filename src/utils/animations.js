// Small animation helpers shared by the app

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A small dot flies from the clicked button to the Cart button in the header
export function flyToCart(fromEl) {
  const cartButton = document.querySelector('.cartb')
  if (prefersReducedMotion() || !fromEl || !cartButton || !fromEl.animate) return

  const from = fromEl.getBoundingClientRect()
  const to = cartButton.getBoundingClientRect()
  const dot = document.createElement('i')
  dot.className = 'fly'
  document.body.appendChild(dot)

  const at = (rect, scale, opacity) => ({
    transform: `translate(${rect.left + rect.width / 2 - 10}px,${rect.top + rect.height / 2 - 10}px) scale(${scale})`,
    opacity,
  })

  dot
    .animate([at(from, 1, 1), at(to, 0.3, 0.3)], { duration: 700, easing: 'cubic-bezier(.4,-.3,.6,1)' })
    .onfinish = () => dot.remove()
}

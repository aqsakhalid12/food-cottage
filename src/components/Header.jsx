import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from './Logo'

const LINKS = [
  ['menu', 'Menu'],
  ['reserve', 'Reserve'],
  ['about', 'About'],
  ['contact', 'Contact'],
  ['location', 'Location'],
  ['profile', 'Profile'],
]

export default function Header() {
  const { dark, toggleMode, cartCount, bump } = useApp()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const seg = pathname.split('/')[1] || 'home'
  const isCurrent = (to) => seg === to || (seg === 'item' && to === 'menu')

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // close on Escape / outside click
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => { if (!e.target.closest('#nl,.bg')) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <header>
      <nav aria-label="Main">
        <Link className="brand" to="/">
          <Logo />
          <span>Food cottage</span>
        </Link>

        <ul id="nl" className={open ? 'open' : ''}>
          {LINKS.map(([to, label]) => (
            <li key={to}>
              <Link to={'/' + to} aria-current={isCurrent(to) ? 'page' : undefined}>{label}</Link>
            </li>
          ))}
        </ul>

        <button
          className="mode"
          onClick={toggleMode}
          aria-pressed={dark}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <svg className="m-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
          </svg>
          <svg className="m-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>

        <Link className="cartb" to="/cart" aria-label="Cart">
          Cart
          <span id="cc" key={bump} className={bump ? 'pop' : ''} hidden={!cartCount}>{cartCount}</span>
        </Link>

        <button
          className="bg"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nl"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  )
}

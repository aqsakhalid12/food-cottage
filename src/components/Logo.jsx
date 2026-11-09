import { useApp } from '../context/AppContext'

// Brand logo image. Switches to the dark version in dark mode.
export default function Logo() {
  const { dark } = useApp()
  return <img src={dark ? '/images/logo/logo-dark.png' : '/images/logo/logo.png'} alt="" />
}

import { Link } from 'react-router-dom'

const TABS = ['about', 'contact', 'location']

// About / Contact / Location switcher under the page title
export default function SubTabs({ active }) {
  return (
    <div className="wrap" style={{ paddingTop: 16 }}>
      <div className="tabs">
        {TABS.map((tab) => (
          <Link key={tab} className="tab" to={'/' + tab} aria-pressed={tab === active} style={{ textDecoration: 'none' }}>
            {tab[0].toUpperCase() + tab.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  )
}

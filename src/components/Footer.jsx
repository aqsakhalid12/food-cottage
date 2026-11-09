import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

const EXPLORE = [['menu', 'Menu'], ['reserve', 'Reserve a table'], ['cart', 'Cart'], ['profile', 'My account']]
const COMPANY = [['about', 'About us'], ['contact', 'Contact'], ['location', 'Location'], ['admin', 'Staff dashboard']]

export default function Footer() {
  const { pathname } = useLocation()
  const seg = pathname.split('/')[1] || 'home'
  const cur = (to) => (seg === to || (seg === 'item' && to === 'menu') ? 'page' : undefined)

  const List = ({ items }) => (
    <ul>
      {items.map(([to, label]) => (
        <li key={to}><Link to={'/' + to} aria-current={cur(to)}>{label}</Link></li>
      ))}
    </ul>
  )

  return (
    <footer>
      <div className="wrap fg">
        <div>
          <Link className="brand" to="/">
            <Logo />
            <span>Food cottage</span>
          </Link>
          <p style={{ marginTop: 10 }}>Real food, cooked fresh every morning. Dine in, takeaway or delivery.</p>
        </div>
        <div><h3>Explore</h3><List items={EXPLORE} /></div>
        <div><h3>Company</h3><List items={COMPANY} /></div>
        <div>
          <h3>Open daily</h3>
          <p>11:00 am to 11:00 pm</p>
          <p>+92 000 0000000</p>
          <p>hello@foodcottage.example</p>
        </div>
      </div>
      <div className="wrap fb">
        <span>© 2026 Food cottage</span>
        <span>Made fresh, every day.</span>
      </div>
    </footer>
  )
}

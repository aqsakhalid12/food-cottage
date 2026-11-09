import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/menu'
import ArtImage from '../components/ArtImage'
import FoodCard from '../components/FoodCard'
import FoodRow from '../components/FoodRow'

const FEATURED_IDS = [4, 2, 7, 13]

export default function Home() {
  const { menu, dark, setFilters } = useApp()
  const navigate = useNavigate()

  const popular = menu.filter((m) => m.popular).slice(0, 4)
  const featured = FEATURED_IDS.map((id) => menu.find((m) => m.id === id)).filter(Boolean)

  // Category button: open the menu with that category selected
  const openCategory = (cat) => {
    setFilters((f) => ({ ...f, cat }))
    navigate('/menu')
  }

  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div>
            <h1>Real food.<br /><span>Zero fuss.</span></h1>
            <p>Food cottage cooks honest meals from scratch every morning. Big portions, fair prices, and nothing on the plate that doesn’t need to be there.</p>
            <div className="row">
              <Link className="btn" to="/menu">Order now</Link>
              <Link className="btn red" to="/reserve">Book a table</Link>
            </div>
          </div>
          <div className="heroart">
            <ArtImage src="/images/menu/cottage-burger.png" alt="Cottage burger" eager />
            <div className="sticker">Cooked fresh daily</div>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <h2>Welcome to Food cottage</h2>
          <div className="split">
            <div>
              <h3>Small kitchen, big plates</h3>
              <p>Food cottage started as one stove and one rule: cook it like it’s for family.</p>
              <p>Sauces, bread and marinades are made in-house every day. Eat with us, take it away, or have it delivered within 5 km.</p>
              <Link className="btn" to="/about">Our story</Link>
            </div>
            <div className="pic">
              <ArtImage
                src={dark ? '/images/logo/logo-dark.png' : '/images/logo/logo.png'}
                alt="Food cottage logo"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Browse by category</h2>
          <div className="cats">
            {CATEGORIES.map((cat, i) => (
              <button key={cat} className={`cat a${i % 4}`} onClick={() => openCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Popular dishes</h2>
          <div className="grid">
            {popular.map((item, i) => <FoodCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Featured menu</h2>
          <div className="list">
            {featured.map((item) => <FoodRow key={item.id} item={item} />)}
          </div>
          <p style={{ marginTop: 32 }}><Link className="btn" to="/menu">See the full menu</Link></p>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Planning a night out?</h2>
          <Link className="btn" to="/reserve">Reserve a table</Link>
        </div>
      </section>
    </>
  )
}

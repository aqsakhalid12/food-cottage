import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/menu'
import { filterDishes } from '../utils/helpers'
import { revealIn } from '../hooks/useReveal'
import PageHeader from '../components/PageHeader'
import FoodCard from '../components/FoodCard'

export default function Menu() {
  const { menu, filters, setFilters } = useApp()
  const { q, cat, veg, hot, sort } = filters

  const update = (changes) => setFilters((f) => ({ ...f, ...changes }))
  const dishes = filterDishes(menu, filters)

  // Cards fade in again when the category changes
  useEffect(() => {
    revealIn(document.getElementById('mg'))
  }, [cat])

  return (
    <>
      <PageHeader title="The menu" text="Cooked to order. Add dishes to your cart and check out in a minute." />

      <section>
        <div className="wrap">
          <div className="tools">
            <input
              type="search"
              placeholder="Search dishes"
              aria-label="Search dishes"
              value={q}
              onChange={(e) => update({ q: e.target.value })}
            />
            <select aria-label="Sort dishes" value={sort} onChange={(e) => update({ sort: e.target.value })}>
              <option value="pop">Most popular</option>
              <option value="lo">Price, low to high</option>
              <option value="hi">Price, high to low</option>
            </select>
            <label className="chk">
              <input type="checkbox" checked={veg} onChange={(e) => update({ veg: e.target.checked })} />
              Vegetarian
            </label>
            <label className="chk">
              <input type="checkbox" checked={hot} onChange={(e) => update({ hot: e.target.checked })} />
              Spicy
            </label>
          </div>

          <div className="tabs">
            {['All', ...CATEGORIES].map((c) => (
              <button key={c} className="tab" aria-pressed={cat === c} onClick={() => update({ cat: c })}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid" id="mg">
            {dishes.length ? (
              dishes.map((item, i) => <FoodCard key={item.id} item={item} index={i} />)
            ) : (
              <p>No dishes match. Try a different search or filter.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

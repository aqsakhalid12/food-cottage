import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { EXTRAS } from '../data/menu'
import { formatPrice, largeUpcharge, linePrice } from '../utils/helpers'
import { flyToCart } from '../utils/animations'
import FoodImage from '../components/FoodImage'
import Tags from '../components/Tags'

export default function ItemDetail() {
  const { id } = useParams()
  const { getItem } = useApp()
  const item = getItem(id)

  if (!item) {
    return (
      <section>
        <div className="wrap">
          <h2>Dish not found</h2>
          <Link className="btn" to="/menu">Back to menu</Link>
        </div>
      </section>
    )
  }

  // key resets the form when you open a different dish
  return <ItemForm key={item.id} item={item} />
}

function ItemForm({ item }) {
  const { addToCart } = useApp()
  const buttonRef = useRef(null)

  const [size, setSize] = useState('Regular')
  const [selected, setSelected] = useState([])
  const [spice, setSpice] = useState('Medium')
  const [note, setNote] = useState('')
  const [qty, setQty] = useState(1)

  const options = EXTRAS[item.category]
  // keep extras in menu order so the same choices always make the same cart line
  const extras = options.map((e) => e.name).filter((name) => selected.includes(name))
  const total = linePrice(item, size, extras) * qty

  const toggleExtra = (name) =>
    setSelected((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]))

  const changeQty = (delta) => setQty((q) => Math.min(20, Math.max(1, q + delta)))

  const handleSubmit = (e) => {
    e.preventDefault()
    addToCart(item.id, {
      size,
      extras,
      spice: item.spicy ? spice : undefined,
      note: note.trim(),
      qty,
    })
    flyToCart(buttonRef.current)
  }

  return (
    <section>
      <div className="wrap">
        <p><Link to="/menu">Back to menu</Link></p>

        <div className="lay">
          <div>
            <FoodImage item={item} />
            <h3 style={{ margin: '26px 0 12px' }}>Ingredients</h3>
            <div>
              {item.ingredients.map((x) => <span key={x} className="chip">{x}</span>)}
            </div>
          </div>

          <form className="panel" onSubmit={handleSubmit}>
            <h1 className="dh">{item.name}</h1>
            <div><Tags item={item} /></div>
            <p>{item.description}</p>

            <fieldset>
              <legend>Size</legend>
              <label className="opt">
                <input type="radio" name="size" value="Regular" checked={size === 'Regular'} onChange={() => setSize('Regular')} />
                Regular<b>{formatPrice(item.price)}</b>
              </label>
              <label className="opt">
                <input type="radio" name="size" value="Large" checked={size === 'Large'} onChange={() => setSize('Large')} />
                Large<b>+ {formatPrice(largeUpcharge(item))}</b>
              </label>
            </fieldset>

            {item.spicy && (
              <>
                <label htmlFor="sp">Spice level</label>
                <select id="sp" name="sp" value={spice} onChange={(e) => setSpice(e.target.value)}>
                  <option>Mild</option>
                  <option>Medium</option>
                  <option>Hot</option>
                </select>
              </>
            )}

            <fieldset>
              <legend>Extras</legend>
              {options.map((extra) => (
                <label key={extra.name} className="opt">
                  <input
                    type="checkbox"
                    name="ex"
                    value={extra.name}
                    checked={selected.includes(extra.name)}
                    onChange={() => toggleExtra(extra.name)}
                  />
                  {extra.name}<b>{extra.price ? '+ ' + formatPrice(extra.price) : 'Free'}</b>
                </label>
              ))}
            </fieldset>

            <label htmlFor="nt">Special instructions</label>
            <textarea
              id="nt"
              name="nt"
              rows="2"
              placeholder="No onions, sauce on the side"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="qrow">
              <div className="qty">
                <button type="button" onClick={() => changeQty(-1)} aria-label="Fewer">−</button>
                <output id="qv">{qty}</output>
                <button type="button" onClick={() => changeQty(1)} aria-label="More">+</button>
              </div>
              <button className="btn" type="submit" id="ab" ref={buttonRef} disabled={!item.available}>
                Add to cart, {formatPrice(total)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

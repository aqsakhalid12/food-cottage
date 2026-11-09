import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { cartTotals, formatPrice } from '../utils/helpers'
import PageHeader from '../components/PageHeader'
import FoodImage from '../components/FoodImage'
import SummaryRows from '../components/SummaryRows'

export default function Cart() {
  const { cart, getItem, changeQty, removeLine } = useApp()

  if (!cart.length) {
    return (
      <>
        <PageHeader title="Your cart" />
        <section>
          <div className="wrap">
            <div className="panel">
              <h3 style={{ marginBottom: 14 }}>Your cart is empty</h3>
              <p>Add something good from the menu.</p>
              <Link className="btn" to="/menu">Browse the menu</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Your cart" />
      <section>
        <div className="wrap lay">
          <div>
            {cart.map((line, i) => {
              const item = getItem(line.id)
              // e.g. "Large, Medium, Extra cheese, “no onions”"
              const details = [line.size, line.spice, ...line.extras, line.note && `“${line.note}”`]
                .filter(Boolean)
                .join(', ')

              return (
                <div className="ln" key={line.key}>
                  <FoodImage item={item} index={i} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{details}</p>
                    <div className="qty">
                      <button onClick={() => changeQty(i, -1)} aria-label="Fewer">−</button>
                      <output>{line.q}</output>
                      <button onClick={() => changeQty(i, 1)} aria-label="More">+</button>
                    </div>
                  </div>
                  <div className="lr">
                    <span className="price">{formatPrice(line.unit * line.q)}</span>
                    <button className="lk" onClick={() => removeLine(i)}>Remove</button>
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="panel">
            <h3 style={{ marginBottom: 14 }}>Summary</h3>
            <SummaryRows totals={cartTotals(cart, 'Pickup')} />
            <p style={{ marginTop: 12 }}>Delivery fee is added at checkout.</p>
            <Link className="btn" to="/checkout" style={{ display: 'block', textAlign: 'center' }}>Checkout</Link>
          </aside>
        </div>
      </section>
    </>
  )
}

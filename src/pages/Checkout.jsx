import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { DELIVERY_FEE } from '../data/menu'
import { cartTotals, formatPrice } from '../utils/helpers'
import PageHeader from '../components/PageHeader'
import SummaryRows from '../components/SummaryRows'
import Cart from './Cart'

export default function Checkout() {
  const { cart, getItem, user, placeOrder } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: user.address,
    notes: '',
    mode: 'Delivery',
    payment: 'Cash',
  })
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  // Nothing to check out: show the empty cart page
  if (!cart.length) return <Cart />

  const delivery = form.mode === 'Delivery'

  const handleSubmit = (e) => {
    e.preventDefault()
    placeOrder(form)
    navigate('/confirmed')
  }

  return (
    <>
      <PageHeader title="Checkout" />
      <section>
        <div className="wrap lay">
          <form id="ck" className="panel" onSubmit={handleSubmit}>
            <h3>Your details</h3>
            <label htmlFor="k1">Full name</label>
            <input id="k1" name="n" required value={form.name} onChange={set('name')} />
            <label htmlFor="k2">Phone</label>
            <input id="k2" name="p" type="tel" required value={form.phone} onChange={set('phone')} />
            <label htmlFor="k3">Email</label>
            <input id="k3" name="e" type="email" value={form.email} onChange={set('email')} />

            <fieldset>
              <legend>How would you like it?</legend>
              <label className="opt">
                <input type="radio" name="m" value="Delivery" checked={delivery} onChange={set('mode')} />
                Delivery<b>{formatPrice(DELIVERY_FEE)}</b>
              </label>
              <label className="opt">
                <input type="radio" name="m" value="Pickup" checked={!delivery} onChange={set('mode')} />
                Pickup<b>Free</b>
              </label>
            </fieldset>

            <div id="ad" hidden={!delivery}>
              <label htmlFor="k4">Delivery address</label>
              <input id="k4" name="a" required={delivery} value={form.address} onChange={set('address')} />
              <label htmlFor="k5">Delivery notes</label>
              <input id="k5" name="dn" placeholder="Landmark or gate code" value={form.notes} onChange={set('notes')} />
            </div>

            <fieldset>
              <legend>Payment</legend>
              <label className="opt">
                <input type="radio" name="pm" value="Cash" checked={form.payment === 'Cash'} onChange={set('payment')} />
                Cash on delivery or pickup
              </label>
              <label className="opt">
                <input type="radio" name="pm" value="Card" checked={form.payment === 'Card'} onChange={set('payment')} />
                Card on delivery or pickup
              </label>
            </fieldset>

            <p style={{ marginTop: 22 }}><button className="btn" type="submit">Place order</button></p>
          </form>

          <aside className="panel">
            <h3 style={{ marginBottom: 14 }}>Order summary</h3>
            <div id="sm">
              {cart.map((line) => (
                <div className="sr" key={line.key}>
                  <span>{line.q} × {getItem(line.id).name}</span>
                  <span>{formatPrice(line.unit * line.q)}</span>
                </div>
              ))}
              <SummaryRows totals={cartTotals(cart, form.mode)} />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

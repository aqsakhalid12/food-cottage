import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES, ORDER_STATUSES } from '../data/menu'
import { formatDate, formatPrice } from '../utils/helpers'
import PageHeader from '../components/PageHeader'
import Badge from '../components/Badge'

const TABS = ['orders', 'menu', 'reservations']
const ORDER_FILTERS = ['All', ...ORDER_STATUSES, 'Cancelled']
const ORDER_OPTIONS = [...ORDER_STATUSES, 'Cancelled']
const RESERVATION_OPTIONS = ['Confirmed', 'Seated', 'Completed', 'Cancelled']

export default function Admin() {
  const { orders } = useApp()
  const [tab, setTab] = useState('orders')

  const activeOrders = orders.filter((o) => !['Completed', 'Cancelled'].includes(o.status)).length
  const revenue = orders.filter((o) => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)

  return (
    <>
      <PageHeader title="Admin dashboard" text="Staff only. Manage orders, menu and bookings." />
      <section>
        <div className="wrap">
          <div className="three" style={{ marginBottom: 36 }}>
            <div className="fact"><h3>{orders.length}</h3><p>Total orders</p></div>
            <div className="fact"><h3>{activeOrders}</h3><p>Active orders</p></div>
            <div className="fact"><h3>{formatPrice(revenue)}</h3><p>Revenue</p></div>
          </div>

          <div className="tabs">
            {TABS.map((t) => (
              <button key={t} className="tab" aria-pressed={tab === t} onClick={() => setTab(t)}>
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'orders' && <OrdersTab />}
          {tab === 'menu' && <MenuTab />}
          {tab === 'reservations' && <ReservationsTab />}
        </div>
      </section>
    </>
  )
}

function OrdersTab() {
  const { orders, setOrderStatus } = useApp()
  const [filter, setFilter] = useState('All')
  const shown = orders.filter((o) => filter === 'All' || o.status === filter)

  return (
    <>
      <div className="tabs">
        {ORDER_FILTERS.map((s) => (
          <button key={s} className="tab" aria-pressed={filter === s} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="tw">
        <table>
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Items</th><th>Type</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {shown.map((o) => (
              <tr key={o.id}>
                <td>{o.id}<br />{o.date}</td>
                <td>{o.customer}</td>
                <td>
                  {o.items.map((i, n) => (
                    <span key={n}>{n > 0 && <br />}{i.qty} × {i.name}</span>
                  ))}
                </td>
                <td>{o.type}</td>
                <td>{formatPrice(o.total)}</td>
                <td>
                  <Badge status={o.status} />
                  <select
                    value={o.status}
                    aria-label={`Status for ${o.id}`}
                    onChange={(e) => setOrderStatus(o.id, e.target.value)}
                  >
                    {ORDER_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// Price box: saves when you leave the field or press Enter
function PriceInput({ item }) {
  const { setDishPrice } = useApp()
  const [value, setValue] = useState(item.price)

  const save = () => {
    if (Number(value) !== item.price) setDishPrice(item.id, value)
  }

  return (
    <input
      type="number"
      min="0"
      step="10"
      value={value}
      aria-label={`Price for ${item.name}`}
      style={{ width: 110 }}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
    />
  )
}

function MenuTab() {
  const { menu, toggleAvailable, addDish } = useApp()
  const [form, setForm] = useState({ name: '', category: CATEGORIES[0], price: '', description: '' })
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    addDish(form)
    setForm({ name: '', category: CATEGORIES[0], price: '', description: '' })
  }

  return (
    <>
      <div className="tw">
        <table>
          <thead>
            <tr><th>Dish</th><th>Category</th><th>Price (Rs.)</th><th>Availability</th></tr>
          </thead>
          <tbody>
            {menu.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.category}</td>
                <td><PriceInput item={m} /></td>
                <td>
                  <button className={`btn sm${m.available ? '' : ' red'}`} onClick={() => toggleAvailable(m.id)}>
                    {m.available ? 'Available' : 'Sold out'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form id="mf" className="panel" style={{ marginTop: 32, maxWidth: 560 }} onSubmit={handleSubmit}>
        <h3>Add a dish</h3>
        <label htmlFor="m1">Name</label>
        <input id="m1" name="n" required value={form.name} onChange={set('name')} />
        <label htmlFor="m2">Category</label>
        <select id="m2" name="c" value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <label htmlFor="m3">Price (Rs.)</label>
        <input id="m3" name="p" type="number" min="0" required value={form.price} onChange={set('price')} />
        <label htmlFor="m4">Description</label>
        <input id="m4" name="d" value={form.description} onChange={set('description')} />
        <p style={{ marginTop: 16 }}><button className="btn sm" type="submit">Add dish</button></p>
      </form>
    </>
  )
}

function ReservationsTab() {
  const { reservations, setReservationStatus } = useApp()

  return (
    <div className="tw">
      <table>
        <thead>
          <tr><th>Ref</th><th>Guest</th><th>When</th><th>Party</th><th>Status</th></tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.ref}>
              <td>{r.ref}</td>
              <td>{r.customer}</td>
              <td>{formatDate(r.date)}, {r.time}</td>
              <td>{r.guests}</td>
              <td>
                <Badge status={r.status} />
                <select
                  value={r.status}
                  aria-label={`Status for ${r.ref}`}
                  onChange={(e) => setReservationStatus(r.ref, e.target.value)}
                >
                  {RESERVATION_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

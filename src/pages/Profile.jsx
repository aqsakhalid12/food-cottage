import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatDate } from '../utils/helpers'
import PageHeader from '../components/PageHeader'
import Badge from '../components/Badge'
import OrderCard from '../components/OrderCard'

export default function Profile() {
  const { user, setUser, orders, reservations } = useApp()
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState(false)
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const myOrders = orders.filter((o) => o.mine)
  const myReservations = reservations.filter((r) => r.mine)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser(form)
    setSaved(true)
  }

  return (
    <>
      <PageHeader title="My account" text={`Welcome back, ${user.name}.`} />
      <section>
        <div className="wrap lay2">
          <form id="pf" className="panel" onSubmit={handleSubmit}>
            <h3>Profile</h3>
            <div className="av">{form.name[0] || '?'}</div>
            <label htmlFor="u1">Name</label>
            <input id="u1" name="n" value={form.name} onChange={set('name')} />
            <label htmlFor="u2">Phone</label>
            <input id="u2" name="p" value={form.phone} onChange={set('phone')} />
            <label htmlFor="u3">Email</label>
            <input id="u3" name="e" value={form.email} onChange={set('email')} />
            <label htmlFor="u4">Delivery address</label>
            <input id="u4" name="a" value={form.address} onChange={set('address')} />
            <p style={{ marginTop: 18 }}><button className="btn sm" type="submit">Save profile</button></p>
            <div className="ok" hidden={!saved}>Profile saved.</div>
          </form>

          <div>
            <h3 className="sh">Order history</h3>
            {myOrders.length ? myOrders.map((o) => <OrderCard key={o.id} order={o} />) : <p>No orders yet.</p>}

            <h3 className="sh">Reservations</h3>
            {myReservations.length ? (
              myReservations.map((r) => (
                <div className="oc" key={r.ref}>
                  <div className="oh">
                    <h3>{formatDate(r.date)}, {r.time}</h3>
                    <Badge status={r.status} />
                  </div>
                  <p>{r.guests} guests, ref {r.ref}</p>
                </div>
              ))
            ) : (
              <p>No reservations yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

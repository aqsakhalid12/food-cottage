import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatDate, todayISO } from '../utils/helpers'
import PageHeader from '../components/PageHeader'

const TIME_SLOTS = ['12:00 pm', '1:00 pm', '2:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm']

export default function Reserve() {
  const { user, addReservation } = useApp()

  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone)
  const [requests, setRequests] = useState('')
  const [booked, setBooked] = useState(null)

  const changeGuests = (delta) => setGuests((g) => Math.min(10, Math.max(1, g + delta)))

  const handleSubmit = (e) => {
    e.preventDefault()
    setBooked(addReservation({ name, date, time, guests }))
  }

  return (
    <>
      <PageHeader title="Book a table" text="Reserve for lunch or dinner. You’ll get a reference straight away." />
      <section>
        <div className="wrap lay">
          <form id="rf" className="panel" onSubmit={handleSubmit}>
            <h3>Reservation details</h3>

            <label htmlFor="rd">Date</label>
            <input id="rd" name="d" type="date" required min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} />

            <fieldset>
              <legend>Time</legend>
              <div className="slots">
                {TIME_SLOTS.map((slot) => (
                  <label className="slot" key={slot}>
                    <input type="radio" name="t" value={slot} required checked={time === slot} onChange={() => setTime(slot)} />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label>Guests</label>
            <div className="qty">
              <button type="button" onClick={() => changeGuests(-1)} aria-label="Fewer guests">−</button>
              <output id="gv">{guests}</output>
              <button type="button" onClick={() => changeGuests(1)} aria-label="More guests">+</button>
            </div>

            <label htmlFor="rn">Name</label>
            <input id="rn" name="n" required value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="rp">Phone</label>
            <input id="rp" name="p" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="ro">Occasion or requests</label>
            <textarea id="ro" name="o" rows="2" value={requests} onChange={(e) => setRequests(e.target.value)} />

            <p style={{ marginTop: 20 }}><button className="btn" type="submit">Reserve table</button></p>

            <div id="rok">
              {booked && (
                <div className="ok">
                  Table booked. Reference {booked.ref}: {formatDate(booked.date)} at {booked.time} for {booked.guests}.
                </div>
              )}
            </div>
          </form>

          <aside className="panel">
            <h3 style={{ marginBottom: 14 }}>Good to know</h3>
            <p>Open daily, 11:00 am to 11:00 pm.</p>
            <p>Tables are held for 15 minutes.</p>
            <p>For groups over 10, please call us.</p>
          </aside>
        </div>
      </section>
    </>
  )
}

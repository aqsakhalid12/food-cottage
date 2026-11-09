import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SubTabs from '../components/SubTabs'

const EMPTY = { name: '', contact: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm(EMPTY)
  }

  return (
    <>
      <PageHeader title="Contact" text="Questions, feedback or a group booking? Write to us." />
      <SubTabs active="contact" />

      <section style={{ paddingTop: 16 }}>
        <div className="wrap">
          <div className="split">
            <div>
              <h3>Say hello</h3>
              <p>+92 000 0000000<br />hello@foodcottage.example</p>
              <p>Instagram and Facebook: @foodcottage</p>
              <h3 style={{ margin: '28px 0 12px' }}>Catering</h3>
              <p>We cook for parties, offices and events. Tell us the date and number of guests.</p>
            </div>

            <div>
              <form id="ct" onSubmit={handleSubmit}>
                <label htmlFor="c1" style={{ marginTop: 0 }}>Name</label>
                <input id="c1" required value={form.name} onChange={set('name')} />
                <label htmlFor="c2">Email or phone</label>
                <input id="c2" required value={form.contact} onChange={set('contact')} />
                <label htmlFor="c3">Message</label>
                <textarea id="c3" rows="4" required value={form.message} onChange={set('message')} />
                <p style={{ marginTop: 18 }}><button className="btn red" type="submit">Send message</button></p>
                <div className="ok" hidden={!sent}>Message sent. We’ll reply soon.</div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

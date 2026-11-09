import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PageHeader from '../components/PageHeader'
import OrderTracker from '../components/OrderTracker'
import SummaryRows from '../components/SummaryRows'

export default function Confirmed() {
  const { lastOrder: order } = useApp()

  // Opened directly without placing an order
  if (!order) return <Navigate to="/" replace />

  return (
    <>
      <PageHeader title="Order confirmed" text={`Thank you, ${order.customer}. We’ve got your order.`} />
      <section>
        <div className="wrap lay">
          <div className="panel">
            <h3 style={{ marginBottom: 14 }}>Order {order.id}</h3>
            <p>
              {order.type === 'Delivery'
                ? 'Estimated delivery: 40 to 50 minutes.'
                : 'Ready for pickup in about 20 minutes.'}
            </p>
            <OrderTracker order={order} />
            <p className="row" style={{ marginTop: 28 }}>
              <Link className="btn" to="/profile">Order history</Link>
              <Link className="btn red" to="/menu">Order more</Link>
            </p>
          </div>

          <aside className="panel">
            <h3 style={{ marginBottom: 14 }}>Summary</h3>
            {order.items.map((i, n) => (
              <div className="sr" key={`${i.id}-${n}`}><span>{i.qty} × {i.name}</span></div>
            ))}
            <SummaryRows totals={order} />
            <p style={{ marginTop: 12 }}>Payment: {order.payment}</p>
          </aside>
        </div>
      </section>
    </>
  )
}

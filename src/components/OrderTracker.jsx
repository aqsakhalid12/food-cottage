import { ORDER_STATUSES } from '../data/menu'
import Badge from './Badge'

// Step-by-step progress: Received > Preparing > Ready > Completed
export default function OrderTracker({ order }) {
  if (order.status === 'Cancelled') return <p><Badge status="Cancelled" /></p>

  const current = ORDER_STATUSES.indexOf(order.status)
  const isDone = (step) => step < current || order.status === 'Completed'

  return (
    <ol className="trk">
      {ORDER_STATUSES.map((status, step) => (
        <li key={status} className={isDone(step) ? 'dn' : step === current ? 'nw' : ''}>
          <span>{isDone(step) ? '✓' : step + 1}</span>
          {status}
        </li>
      ))}
    </ol>
  )
}

import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import Badge from './Badge'
import OrderTracker from './OrderTracker'

// One past or active order on the Profile page
export default function OrderCard({ order }) {
  const { addToCart } = useApp()
  const navigate = useNavigate()
  const finished = ['Completed', 'Cancelled'].includes(order.status)

  const reorder = () => {
    order.items.forEach((i) => addToCart(i.id, { qty: i.qty }))
    navigate('/cart')
  }

  return (
    <div className="oc">
      <div className="oh">
        <h3>{order.id}</h3>
        <Badge status={order.status} />
      </div>
      <p>{order.date}, {order.type}</p>
      <p>{order.items.map((i) => `${i.qty} × ${i.name}`).join(', ')}</p>
      <div className="pr">
        <span className="price">{formatPrice(order.total)}</span>
        <button className="btn sm" onClick={reorder}>Reorder</button>
      </div>
      {!finished && <OrderTracker order={order} />}
    </div>
  )
}

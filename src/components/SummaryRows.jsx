import { formatPrice } from '../utils/helpers'

// Subtotal / tax / delivery / total rows. Works with cart totals or a saved order.
export default function SummaryRows({ totals }) {
  const { subtotal, tax, fee, total } = totals
  return (
    <>
      <div className="sr"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      <div className="sr"><span>Service tax (5%)</span><span>{formatPrice(tax)}</span></div>
      {fee > 0 && <div className="sr"><span>Delivery</span><span>{formatPrice(fee)}</span></div>}
      <div className="sr tt"><span>Total</span><span>{formatPrice(total)}</span></div>
    </>
  )
}

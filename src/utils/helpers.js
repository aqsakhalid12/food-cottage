import { EXTRAS, DELIVERY_FEE, TAX_RATE } from '../data/menu'

// 850 -> "Rs. 850"
export const formatPrice = (n) => 'Rs. ' + Number(n).toLocaleString('en-US')

// Extra cost of the "Large" size: 25% of the price, rounded to the nearest 10
export const largeUpcharge = (item) => Math.round((item.price * 0.25) / 10) * 10

// Price of one cart line: base + size + chosen extras
export const linePrice = (item, size, extras) => {
  const sizeCost = size === 'Large' ? largeUpcharge(item) : 0
  const extrasCost = extras.reduce((sum, name) => {
    const extra = EXTRAS[item.category].find((e) => e.name === name)
    return sum + (extra ? extra.price : 0)
  }, 0)
  return item.price + sizeCost + extrasCost
}

// Totals for the cart. Delivery adds a fee; tax is on the subtotal.
export const cartTotals = (cart, mode) => {
  const subtotal = cart.reduce((sum, line) => sum + line.unit * line.q, 0)
  const fee = mode === 'Delivery' && subtotal ? DELIVERY_FEE : 0
  const tax = Math.round(subtotal * TAX_RATE)
  return { subtotal, fee, tax, total: subtotal + fee + tax }
}

// "2026-11-12" -> "Thu 12 Nov"
export const formatDate = (iso) =>
  new Date(iso + 'T00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

// Today as "YYYY-MM-DD" (used as the minimum date in the reserve form)
export const todayISO = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// Menu page: apply search, category, veg/spicy filters and sorting
export const filterDishes = (menu, { q, cat, veg, hot, sort }) => {
  const search = q.toLowerCase()
  const list = menu.filter(
    (m) =>
      (cat === 'All' || m.category === cat) &&
      (!veg || m.veg) &&
      (!hot || m.spicy) &&
      (m.name + m.description + m.category).toLowerCase().includes(search)
  )

  if (sort === 'lo') list.sort((a, b) => a.price - b.price)
  else if (sort === 'hi') list.sort((a, b) => b.price - a.price)
  else list.sort((a, b) => Number(b.popular) - Number(a.popular))
  return list
}

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { MENU, INITIAL_ORDERS, INITIAL_RESERVATIONS, INITIAL_USER } from '../data/menu'
import { linePrice, cartTotals } from '../utils/helpers'

const DEFAULT_FILTERS = { q: '', cat: 'All', veg: false, hot: false, sort: 'pop' }

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  // ---------- theme ----------
  const [dark, setDark] = useState(() => document.documentElement.dataset.mode === 'dark')

  const toggleMode = () => {
    const root = document.documentElement
    root.classList.add('themeanim')
    if (dark) delete root.dataset.mode
    else root.dataset.mode = 'dark'
    try { localStorage.setItem('fc-mode', dark ? 'light' : 'dark') } catch (e) {}
    setTimeout(() => root.classList.remove('themeanim'), 450)
    setDark(!dark)
  }

  // ---------- toast ----------
  const [toast, setToast] = useState({ msg: '', show: false })
  const toastTimer = useRef()

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  // ---------- app data ----------
  const [menu, setMenu] = useState(MENU)
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS)
  const [user, setUser] = useState(INITIAL_USER)
  const [lastOrder, setLastOrder] = useState(null) // shown on the "Order confirmed" page
  const counters = useRef({ order: 1045, reservation: 103 })

  // Menu page filters (kept here so Home can pre-select a category)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const getItem = (id) => menu.find((m) => m.id === Number(id))

  // ---------- cart ----------
  const [cart, setCart] = useState([])
  const [bump, setBump] = useState(0) // changes => cart badge "pop" animation replays
  const cartCount = cart.reduce((sum, line) => sum + line.q, 0)

  // Add an item. Same item + same options = one line with a higher quantity.
  const addToCart = (id, { size = 'Regular', extras = [], spice, note = '', qty = 1 } = {}) => {
    const item = getItem(id)
    if (!item || !item.available) return

    const spiceLevel = spice ?? (item.spicy ? 'Medium' : '')
    const key = [id, size, extras.join(), spiceLevel, note].join('|')

    setCart((prev) =>
      prev.some((l) => l.key === key)
        ? prev.map((l) => (l.key === key ? { ...l, q: l.q + qty } : l))
        : [...prev, { key, id, size, extras, spice: spiceLevel, note, q: qty, unit: linePrice(item, size, extras) }]
    )
    setBump((b) => b + 1)
    showToast(`${item.name} added to cart`)
  }

  // Change quantity by +1 / -1. Quantity below 1 removes the line.
  const changeQty = (index, delta) => {
    setCart((prev) =>
      prev.map((l, i) => (i === index ? { ...l, q: l.q + delta } : l)).filter((l) => l.q >= 1)
    )
    setBump((b) => b + 1)
  }

  const removeLine = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
    setBump((b) => b + 1)
  }

  // ---------- checkout ----------
  const placeOrder = ({ name, phone, email, address, mode, payment }) => {
    const totals = cartTotals(cart, mode)
    const order = {
      id: 'FC-' + counters.current.order++,
      mine: true,
      customer: name,
      items: cart.map((l) => ({ id: l.id, name: getItem(l.id).name, qty: l.q })),
      subtotal: totals.subtotal,
      fee: totals.fee,
      tax: totals.tax,
      total: totals.total,
      status: 'Received',
      type: mode,
      payment,
      date: 'Today',
    }

    setUser({ name, phone, email, address: address || user.address })
    setOrders((prev) => [order, ...prev])
    setLastOrder(order)
    setCart([])
    setBump((b) => b + 1)
    return order
  }

  // ---------- reservations ----------
  const addReservation = ({ name, date, time, guests }) => {
    const reservation = {
      ref: 'TB-' + counters.current.reservation++,
      mine: true,
      customer: name,
      date,
      time,
      guests,
      status: 'Confirmed',
    }
    setReservations((prev) => [...prev, reservation])
    return reservation
  }

  // ---------- admin actions ----------
  const setOrderStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))

  const setReservationStatus = (ref, status) =>
    setReservations((prev) => prev.map((r) => (r.ref === ref ? { ...r, status } : r)))

  const setDishPrice = (id, price) => {
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, price: Math.max(0, Number(price) || 0) } : m)))
    showToast('Price updated')
  }

  const toggleAvailable = (id) =>
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m)))

  const addDish = ({ name, category, price, description }) =>
    setMenu((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((m) => m.id)) + 1,
        name,
        category,
        price: Number(price),
        description: description || 'Fresh from our kitchen.',
        ingredients: ['Ask our team'],
        veg: false,
        spicy: false,
        popular: false,
        available: true,
      },
    ])

  return (
    <Ctx.Provider
      value={{
        dark, toggleMode,
        toast, showToast,
        menu, getItem, filters, setFilters,
        cart, cartCount, bump, addToCart, changeQty, removeLine,
        placeOrder, lastOrder,
        orders, setOrderStatus,
        reservations, addReservation, setReservationStatus,
        user, setUser,
        setDishPrice, toggleAvailable, addDish,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

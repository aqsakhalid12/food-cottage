import { useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { useReveal } from './hooks/useReveal'
import { useTilt } from './hooks/useTilt'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ItemDetail from './pages/ItemDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmed from './pages/Confirmed'
import Reserve from './pages/Reserve'
import About from './pages/About'
import Contact from './pages/Contact'
import Location from './pages/Location'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

function Shell() {
  const { pathname } = useLocation()
  useTilt()
  useReveal()

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <main id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmed" element={<Confirmed />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Shell />
      </AppProvider>
    </HashRouter>
  )
}

import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import { flyToCart } from '../utils/animations'

// One line of the "Featured menu" list on the Home page
export default function FoodRow({ item }) {
  const { addToCart } = useApp()

  const handleAdd = (e) => {
    addToCart(item.id)
    flyToCart(e.currentTarget)
  }

  return (
    <div className="rw">
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <span className="price">{formatPrice(item.price)}</span>
      <button className="btn sm" onClick={handleAdd}>Add</button>
    </div>
  )
}

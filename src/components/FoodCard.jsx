import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import { flyToCart } from '../utils/animations'
import FoodImage from './FoodImage'
import Tags from './Tags'

export default function FoodCard({ item, index }) {
  const { addToCart } = useApp()
  const link = `/item/${item.id}`

  const handleAdd = (e) => {
    addToCart(item.id)
    flyToCart(e.currentTarget)
  }

  return (
    <article className={`card${item.available ? '' : ' off'}`}>
      <Link to={link} aria-label={`${item.name} details`}>
        <FoodImage item={item} index={index} />
      </Link>

      <div className="cb">
        <h3><Link to={link}>{item.name}</Link></h3>
        <div><Tags item={item} /></div>
        <p>{item.description}</p>

        <div className="pr">
          <span className="price">{formatPrice(item.price)}</span>
          {item.available ? (
            <button className="btn sm" onClick={handleAdd}>Add</button>
          ) : (
            <span className="chip">Sold out</span>
          )}
        </div>
      </div>
    </article>
  )
}

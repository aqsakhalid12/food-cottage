import { CATEGORY_IMAGE } from '../data/menu'
import ArtImage from './ArtImage'

// Dish picture. If the dish has no picture (or it fails), the category picture is used.
export default function FoodImage({ item, index = 0 }) {
  const fallback = CATEGORY_IMAGE[item.category]

  const showFallback = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = fallback
  }

  return <ArtImage src={item.img || fallback} alt={item.name} index={index} onError={showFallback} />
}

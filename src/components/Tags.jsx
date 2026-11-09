// "Veg" and "Spicy" chips for a dish
export default function Tags({ item }) {
  return (
    <>
      {item.veg && <span className="chip">Veg</span>}
      {item.spicy && <span className="chip hot">Spicy</span>}
    </>
  )
}

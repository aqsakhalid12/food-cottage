// Title band at the top of every page
export default function PageHeader({ title, text }) {
  return (
    <div className="ph">
      <div className="wrap">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </div>
  )
}

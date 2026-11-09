// A picture inside the colored rounded box. `index` picks the box color.
export default function ArtImage({ src, alt = '', index = 0, eager = false, onError }) {
  return (
    <span className={`art a${index % 4}`}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={onError} />
    </span>
  )
}

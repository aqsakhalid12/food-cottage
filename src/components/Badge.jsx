// Colored status label (Received, Ready, Confirmed ...)
export default function Badge({ status }) {
  return <span className={`badge b-${status}`}>{status}</span>
}

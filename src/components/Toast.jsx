import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div id="toast" role="status" aria-live="polite" className={toast.show ? 'show' : ''}>
      {toast.msg}
    </div>
  )
}

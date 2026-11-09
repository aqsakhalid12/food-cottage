import { useApp } from '../context/AppContext'
import PageHeader from '../components/PageHeader'
import SubTabs from '../components/SubTabs'

export default function Location() {
  const { dark } = useApp()
  const logo = dark ? '/images/logo/logo-dark.png' : '/images/logo/logo.png'

  return (
    <>
      <PageHeader title="Find us" text="Come hungry." />
      <SubTabs active="location" />

      <section style={{ paddingTop: 16 }}>
        <div className="wrap">
          <div className="mapcard">
            {/* Stylised map. Colors come from the theme, so it follows light/dark mode. */}
            <svg viewBox="0 0 800 380" role="img" aria-label="Stylised map showing the Food cottage location">
              <rect className="mp-bg" width="800" height="380" />
              <path className="mp-water" d="M650 0h150v380H690c-34-80 28-142-12-204s-40-112-28-176z" />
              <rect className="mp-park" x="50" y="40" width="210" height="120" rx="26" />
              <g className="mp-blk">
                <rect x="50" y="250" width="130" height="90" rx="14" />
                <rect x="200" y="250" width="110" height="90" rx="14" />
                <rect x="390" y="250" width="110" height="90" rx="14" />
                <rect x="520" y="250" width="110" height="90" rx="14" />
                <rect x="290" y="40" width="190" height="100" rx="14" />
                <rect x="500" y="40" width="130" height="100" rx="14" />
              </g>
              <path className="mp-ro" d="M0 200H800M345 0V380" />
              <path className="mp-r" d="M0 200H800M345 0V380" />
              <path className="mp-dash" d="M0 200H800M345 0V380" />
              <text className="mp-t" x="60" y="196">Main Street</text>
              <text className="mp-t" x="356" y="360">Market Road</text>
              <text className="mp-t" x="76" y="104">Cottage Park</text>
              <circle className="mp-ring" cx="385" cy="148" r="12" />
              <image href={logo} x="337" y="48" width="96" height="96" />
              <rect className="mp-tag" x="325" y="152" width="120" height="28" rx="14" />
              <text className="mp-tagt" x="385" y="171" textAnchor="middle">Food cottage</text>
            </svg>

            <div className="mapinfo">
              <h3>Food cottage</h3>
              <p>Your street address, Your city</p>
              <div className="row">
                <a className="btn sm" href="https://www.google.com/maps/search/?api=1&query=Food+cottage" target="_blank" rel="noopener noreferrer">Get directions</a>
                <a className="btn sm red" href="tel:+920000000000">Call us</a>
              </div>
            </div>
          </div>

          <div className="three">
            <div className="fact"><h3>Hours</h3><p>Monday to Sunday<br />11:00 am to 11:00 pm</p></div>
            <div className="fact"><h3>Address</h3><p>Your street address<br />Your city</p></div>
            <div className="fact"><h3>Getting here</h3><p>Street parking outside. Delivery within 5 km.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

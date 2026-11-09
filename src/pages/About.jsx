import { CATEGORIES, CATEGORY_IMAGE } from '../data/menu'
import PageHeader from '../components/PageHeader'
import SubTabs from '../components/SubTabs'
import ArtImage from '../components/ArtImage'

export default function About() {
  return (
    <>
      <PageHeader title="About us" text="One stove, one rule: cook it like it’s for family." />
      <SubTabs active="about" />

      <section style={{ paddingTop: 16 }}>
        <div className="wrap">
          <div className="split">
            <div>
              <h3>How it started</h3>
              <p>Food cottage began as a tiny kitchen serving the neighbours. People came back, and brought friends.</p>
              <p>We still cook in small batches, buy fresh every day and keep the menu short enough to do well.</p>
            </div>
            <div className="pic">
              <ArtImage src={CATEGORY_IMAGE.Mains} alt="Karahi bowl" index={1} />
            </div>
          </div>

          <div className="three" style={{ marginTop: 40 }}>
            <div className="fact"><h3>Fresh</h3><p>Ingredients are bought daily and prepped in our own kitchen.</p></div>
            <div className="fact"><h3>Fair</h3><p>Clear prices, big portions and no hidden extras.</p></div>
            <div className="fact"><h3>Hot</h3><p>Food goes from the pass straight to you.</p></div>
          </div>

          <div className="strip" style={{ marginTop: 40 }}>
            {CATEGORIES.map((cat, i) => (
              <ArtImage key={cat} src={CATEGORY_IMAGE[cat]} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import { Fragment } from 'react'

/** Pecah teks jadi kata-kata yang muncul satu per satu (efek "mask reveal"). */
const words = (text, offset = 0) =>
  text.split(' ').filter(Boolean).map((word, i) => (
    <Fragment key={offset + i}><span className="w"><span style={{ '--i': offset + i }}>{word}</span></span>{' '}</Fragment>
  ))

export default function Section({ id, eyebrow, title, accent, sub, tone = '', children }) {
  return (
    <section id={id} className={`sec ${tone}`.trim()}>
      <div className="wrap">
        <header className="head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 aria-label={`${title} ${accent}`}>
            <span aria-hidden="true">{words(title)}<em>{words(accent, title.split(' ').length)}</em></span>
          </h2>
          {sub && <p className="sub">{sub}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

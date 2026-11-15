const ITEMS = [
  'SPSS & SmartPLS',
  'Linux & Server',
  'Web & App Development',
  'Network & Cloud',
  'SQL & Database',
  'IoT & App Inventor',
  'Skripsi & Jurnal',
  'Fix Turnitin',
  'PPT & Formatting',
  'Konsultasi IT',
]

/** Ticker berjalan; berhenti saat di-hover. */
export default function Marquee() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...ITEMS, ...ITEMS].map((text, i) => <span key={i}>{text}<b>✦</b></span>)}
      </div>
    </div>
  )
}

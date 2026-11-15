import { useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import { PRICING_TABS, PRICING_TIERS } from '@/data'
import { buildWhatsAppLink } from '@/utils/whatsapp'

export default function Pricing() {
  const [tab, setTab] = useState(PRICING_TABS[0])

  return (
    <Section id="harga" tone="tint" eyebrow="Paket & Harga" title="Harga jelas," accent="tanpa drama."
      sub="Pilih kategori, lalu pilih paket yang pas. Harga final menyesuaikan tingkat kesulitan dan deadline.">
      <MotionConfig reducedMotion="user">
        <div className="ptabs" role="tablist" aria-label="Kategori layanan">
          {PRICING_TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab.id === t.id} className="ptab" onClick={() => setTab(t)}>
              {tab.id === t.id && (
                <motion.span layoutId="ptab-pill" className="pill" transition={{ type: 'spring', duration: 0.4 }} />
              )}
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        <motion.div key={tab.id} className="pgrid" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          {PRICING_TIERS[tab.id].map((tier) => (
            <article key={tier.name} className={`card ptier${tier.popular ? ' popular' : ''}${tier.highlighted ? ' highlight' : ''}`}>
              <h3>
                {tier.name}
                {tier.popular && <span className="pbadge">Terlaris</span>}
              </h3>
              <p className="pdesc">{tier.desc}</p>
              <p className="pprice">
                {tier.from ? <><small>Mulai</small> {tier.from}</> : tier.price}
              </p>
              <ul className="pfeat">
                {tier.features.map((f) => <li key={f}><BadgeCheck size={16} />{f}</li>)}
              </ul>
              <Button
                variant={tier.highlighted ? 'alt' : tier.popular ? 'primary' : 'ghost'}
                href={buildWhatsAppLink(`Halo fix.beres, saya tertarik paket "${tier.name}" (${tab.name}).`)}
              >
                {tier.cta} <ArrowRight size={16} />
              </Button>
            </article>
          ))}
        </motion.div>
      </MotionConfig>
    </Section>
  )
}

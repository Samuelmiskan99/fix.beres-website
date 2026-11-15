import { Clock, Flame, ShieldCheck, Zap } from 'lucide-react'
import { CONTACT } from '@/data'
import { burst } from '@/utils/confetti'

const URGENCY_MODES = [
  {
    id: 'reguler',
    label: 'Reguler',
    eta: '> 3 Hari',
    desc: 'Pengerjaan bertahap & bebas konsultasi santai.',
    icon: Clock,
  },
  {
    id: 'prioritas',
    label: 'Prioritas',
    eta: '1 – 3 Hari',
    desc: 'Antrean diutamakan dengan update progres harian.',
    icon: Zap,
  },
  {
    id: 'express',
    label: 'Express',
    eta: '< 24 Jam',
    desc: 'Kejar deadline mepet, langsung dikerjakan malam ini.',
    icon: Flame,
  },
]

export default function ContactCta({ urgency, onSelectUrgency }) {
  const handleSelect = (id, e) => {
    onSelectUrgency(id)
    const r = e.currentTarget.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top + r.height / 2, 12)
  }

  return (
    <div className="c-card">
      <div className="c-card-top">
        <span className="c-step-badge">01 · MODE PENGERJAAN</span>
        <h3 className="c-card-title">
          fix.<span>beres</span>
        </h3>
        <p className="c-card-sub">
          {CONTACT.tagline} Pilih estimasi waktu yang sesuai dengan target deadline kamu.
        </p>
      </div>

      <div className="c-mode-list" role="radiogroup" aria-label="Pilih mode kecepatan">
        {URGENCY_MODES.map((m) => {
          const Icon = m.icon
          const isSelected = urgency === m.id
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`c-mode-item ${isSelected ? 'active' : ''}`}
              onClick={(e) => handleSelect(m.id, e)}
            >
              <div className="c-mode-ic">
                <Icon size={17} />
              </div>
              <div className="c-mode-info">
                <div className="c-mode-head">
                  <strong>{m.label}</strong>
                  <span className="c-mode-eta">{m.eta}</span>
                </div>
                <small>{m.desc}</small>
              </div>
            </button>
          )
        })}
      </div>

      <div className="c-clean-footer">
        <ShieldCheck size={16} />
        <span>100% Privasi Terjaga &amp; Garansi Revisi</span>
      </div>
    </div>
  )
}

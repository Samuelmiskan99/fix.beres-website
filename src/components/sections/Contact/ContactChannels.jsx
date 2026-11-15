import { useState } from 'react'
import { Check, Copy, ExternalLink, FileUp, MessageCircle, PhoneCall } from 'lucide-react'
import { CONTACT } from '@/data'
import { burst } from '@/utils/confetti'
import { buildWhatsAppLink, GENERAL_INQUIRY } from '@/utils/whatsapp'

const CHANNELS = [
  {
    id: 'wa',
    icon: MessageCircle,
    title: 'WhatsApp Konsultasi',
    value: CONTACT.display,
    copyValue: CONTACT.display,
    actionLabel: 'Chat',
    href: buildWhatsAppLink(GENERAL_INQUIRY),
  },
  {
    id: 'phone',
    icon: PhoneCall,
    title: 'Telepon / Hotline',
    value: '+62 819-5694-944',
    copyValue: '+628195694944',
    actionLabel: 'Panggil',
    href: `tel:+${CONTACT.whatsapp}`,
  },
  {
    id: 'files',
    icon: FileUp,
    title: 'Kirim Dataset / Modul',
    value: 'SPSS · SmartPLS · Code · PDF',
    copyValue: 'Halo fix.beres, saya ingin mengirim file tugas/dataset untuk dicek estimasinya.',
    actionLabel: 'Kirim File',
    href: buildWhatsAppLink('Halo fix.beres, saya mau kirim file tugas/dataset untuk dicek estimasinya.'),
  },
]

export default function ContactChannels() {
  const [activeId, setActiveId] = useState('wa')
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (channel, event) => {
    event.stopPropagation()
    navigator.clipboard?.writeText(channel.copyValue)
    setCopiedId(channel.id)
    const r = event.currentTarget.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top, 16)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="c-card">
      <div className="c-card-top">
        <span className="c-step-badge">02 · KONTAK LANGSUNG</span>
        <h3 className="c-card-title">Jalur Cepat</h3>
        <p className="c-card-sub">
          Klik kartu untuk menyalin kontak atau langsung terhubung dengan tim kami.
        </p>
      </div>

      <div className="c-ch-list" role="list">
        {CHANNELS.map((ch) => {
          const Icon = ch.icon
          const isSelected = activeId === ch.id
          const isCopied = copiedId === ch.id

          return (
            <div
              key={ch.id}
              role="listitem"
              tabIndex={0}
              className={`c-ch-clean ${isSelected ? 'active' : ''}`}
              onClick={() => setActiveId(ch.id)}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActiveId(ch.id))
              }
            >
              <div className="c-ch-ic">
                <Icon size={18} />
              </div>

              <div className="c-ch-main">
                <span className="c-ch-label">{ch.title}</span>
                <strong className="c-ch-val">{ch.value}</strong>
              </div>

              <div className="c-ch-inline-btns">
                <button
                  type="button"
                  className={`c-mini-btn ${isCopied ? 'copied' : ''}`}
                  onClick={(e) => handleCopy(ch, e)}
                  title="Salin"
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <a
                  className="c-mini-btn primary"
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{ch.actionLabel}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <div className="c-clean-footer">
        <span className="c-online-dot" />
        <span>Tim Online · Rata-rata balasan &lt; 5 menit</span>
      </div>
    </div>
  )
}

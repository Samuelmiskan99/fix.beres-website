import { useRef, useState } from 'react'
import { ArrowUp, MessageCircle, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { CONTACT, NAV } from '@/data'
import { scrollToSection } from '@/utils/scroll'
import { buildWhatsAppLink, GENERAL_INQUIRY } from '@/utils/whatsapp'

/**
 * Footer Minimalis dengan Efek 3D Tilt Halus (Tanpa teks raksasa yang berlebihan).
 */
export default function Footer() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 })

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / Math.max(1, r.width)
    const py = (e.clientY - r.top) / Math.max(1, r.height)
    setTilt({
      rx: (0.5 - py) * 8,
      ry: (px - 0.5) * 10,
      mx: px * 100,
      my: py * 100,
    })
  }

  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 })
  }

  return (
    <footer className="foot-min">
      <div className="wrap">
        <div
          ref={cardRef}
          className="foot-min-3d-bar"
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          style={{
            '--rx': `${tilt.rx.toFixed(2)}deg`,
            '--ry': `${tilt.ry.toFixed(2)}deg`,
            '--mx': `${tilt.mx.toFixed(1)}%`,
            '--my': `${tilt.my.toFixed(1)}%`,
          }}
        >
          {/* Baris Atas: Brand Kiri + Link Navigasi Minimalis + Tombol Ke Atas */}
          <div className="foot-min-top">
            <div className="foot-min-brand">
              <a
                href="#beranda"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('beranda')
                }}
                className="foot-min-logo"
              >
                <i>fb</i>
                <span>
                  fix.<b>beres</b>
                </span>
              </a>
              <p>{CONTACT.tagline}</p>
            </div>

            <div className="foot-min-links">
              {NAV.map(({ id, label }) => (
                <button key={id} type="button" onClick={() => scrollToSection(id)}>
                  {label}
                </button>
              ))}
            </div>

            <div className="foot-min-cta">
              <a
                href={buildWhatsAppLink(GENERAL_INQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="foot-min-wa"
              >
                <MessageCircle size={15} />
                <span>{CONTACT.display}</span>
              </a>
              <button
                type="button"
                className="foot-min-up"
                onClick={() => scrollToSection('beranda')}
                aria-label="Kembali ke atas"
                title="Kembali ke atas"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

          {/* Baris Bawah: Copyright & Badge Kecil */}
          <div className="foot-min-bottom">
            <span>© {new Date().getFullYear()} fix.beres. All rights reserved.</span>
            <div className="foot-min-badges">
              <span><Zap size={13} /> Cepat & Rapi</span>
              <span><ShieldCheck size={13} /> 100% Rahasia</span>
              <span><Sparkles size={13} /> Siaga 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

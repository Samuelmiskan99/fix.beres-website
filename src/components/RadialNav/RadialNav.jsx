import { useEffect, useRef, useState } from 'react'
import { Home, Wrench, MessageSquareHeart, Tag, Rocket, Menu, X } from 'lucide-react'

const ARC_ITEMS = [
  { id: 'beranda', label: 'Beranda', icon: Home, color: '#22c55e' },
  { id: 'layanan', label: 'Layanan', icon: Wrench, color: '#d946ef' },
  { id: 'portofolio', label: 'Testimoni', icon: MessageSquareHeart, color: '#0ea5e9' },
  { id: 'harga', label: 'Harga', icon: Tag, color: '#f59e0b' },
  { id: 'kontak', label: 'Kontak', icon: Rocket, color: '#14b8a6' },
]

// Sweet-Spot Geometri:
// Tetap dekat ke tombol X (Radius 104px), tapi rentang sudut 106° (-98° s/d 8°)
// memberi ruang kosong ~12px di antara tiap lingkaran agar tidak dempet.
const RADIUS = 104
const START_ANGLE = -98
const END_ANGLE = 8

export default function RadialNav({ active, onNavigate }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!navRef.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      {open && (
        <div
          className="cnav-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        ref={navRef}
        className={`cnav-corner ${open ? 'is-open' : ''}`}
        aria-label="Menu utama"
      >
        {/* Garis Busur Presisi (Diameter 208px) */}
        <div className="cnav-single-arc" aria-hidden="true" />

        {ARC_ITEMS.map((item, index) => {
          const Icon = item.icon
          const total = ARC_ITEMS.length
          const angleDeg =
            START_ANGLE + (index * (END_ANGLE - START_ANGLE)) / (total - 1)
          const angleRad = (angleDeg * Math.PI) / 180

          const x = (Math.cos(angleRad) * RADIUS).toFixed(2)
          const y = (Math.sin(angleRad) * RADIUS).toFixed(2)
          const isActive = active === item.id

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              tabIndex={open ? 0 : -1}
              className={`cnav-item ${isActive ? 'active' : ''}`}
              style={{
                '--nx': `${x}px`,
                '--ny': `${y}px`,
                '--ncol': item.color,
                transitionDelay: open ? `${index * 28}ms` : '0ms',
              }}
              onClick={() => {
                onNavigate(item.id)
                setOpen(false)
              }}
            >
              <Icon size={16} strokeWidth={2.1} />
              <span className="cnav-tip">{item.label}</span>
            </button>
          )
        })}

        {/* Tombol Utama di Titik Pusat (0, 0) */}
        <button
          type="button"
          className="cnav-center"
          aria-label={open ? 'Tutup menu' : 'Buka menu navigasi'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={21} strokeWidth={2.3} /> : <Menu size={20} strokeWidth={2.2} />}
        </button>
      </nav>
    </>
  )
}
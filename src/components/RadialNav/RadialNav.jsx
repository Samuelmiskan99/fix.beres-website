import { useEffect, useRef, useState } from 'react'
import { Home, Wrench, MessageSquareHeart, Tag, Rocket, Sun, Moon, Menu, X } from 'lucide-react'

// Geometri Presisi untuk 6 Tombol (5 Menu + 1 Theme Toggle):
// Radius 114px + Sudut 110° (-100° s/d 10°) + Diameter 34px = Celah ~10px antar tombol (Anti-Dempet)
const RADIUS = 114
const START_ANGLE = -100
const END_ANGLE = 10

export default function RadialNav({ active, onNavigate, theme = 'dark', onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const isDark = theme === 'dark'

  const arcItems = [
    { id: 'beranda', label: 'Beranda', icon: Home, color: '#22c55e', type: 'nav' },
    { id: 'layanan', label: 'Layanan', icon: Wrench, color: '#d946ef', type: 'nav' },
    { id: 'portofolio', label: 'Testimoni', icon: MessageSquareHeart, color: '#0ea5e9', type: 'nav' },
    { id: 'harga', label: 'Harga', icon: Tag, color: '#f59e0b', type: 'nav' },
    { id: 'kontak', label: 'Kontak', icon: Rocket, color: '#14b8a6', type: 'nav' },
    {
      id: 'theme-toggle',
      label: isDark ? 'Mode Terang' : 'Mode Gelap',
      icon: isDark ? Sun : Moon,
      color: '#eab308',
      type: 'theme',
    },
  ]

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
        {/* Garis Busur Presisi (Diameter 228px) */}
        <div className="cnav-single-arc" aria-hidden="true" />

        {arcItems.map((item, index) => {
          const Icon = item.icon
          const total = arcItems.length
          const angleDeg =
            START_ANGLE + (index * (END_ANGLE - START_ANGLE)) / (total - 1)
          const angleRad = (angleDeg * Math.PI) / 180

          const x = (Math.cos(angleRad) * RADIUS).toFixed(2)
          const y = (Math.sin(angleRad) * RADIUS).toFixed(2)
          const isActive = active === item.id

          const handleClick = (e) => {
            if (item.type === 'theme') {
              onToggleTheme?.(e)
            } else {
              onNavigate?.(item.id)
              setOpen(false)
            }
          }

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
                transitionDelay: open ? `${index * 26}ms` : '0ms',
              }}
              onClick={handleClick}
            >
              <Icon size={15} strokeWidth={2.2} />
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
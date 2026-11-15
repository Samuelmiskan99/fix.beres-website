import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NAV } from '@/data'

// Warna neon tiap tombol melingkar persis seperti referensi gambar
const NEON_COLORS = [
  '#22c55e', // Atas - Hijau Neon
  '#d946ef', // Kanan Atas - Magenta
  '#0ea5e9', // Kanan - Biru Cyan
  '#f59e0b', // Kanan Bawah - Oranye Amber
  '#a855f7', // Bawah - Ungu Neon
  '#14b8a6', // Kiri Bawah - Toska/Teal
  '#f43f5e', // Kiri - Merah Pink
  '#eab308', // Kiri Atas - Kuning Neon
]

/**
 * Circular 360° Neon Radial Menu (Sesuai Referensi Gambar):
 * - Saat tertutup: Hanya 1 tombol bulat single button.
 * - Saat diklik: Tombol tengah berubah jadi "✕" dengan lingkaran putih,
 *   dan 8 menu melingkar 360 derajat di sekelilingnya dengan border & ikon warna-warni neon.
 */
export default function RadialNav({ active, onNavigate, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const isDark = theme === 'dark'

  // Gabungkan 7 menu utama + 1 tombol ganti tema agar pas 8 item melingkar simetris 360 derajat
  const ringItems = [
    ...NAV.slice(0, 7).map((item, idx) => ({
      ...item,
      color: NEON_COLORS[idx % NEON_COLORS.length],
      action: () => {
        onNavigate(item.id)
        setOpen(false)
      },
    })),
    {
      id: 'theme-switch',
      label: isDark ? 'Mode Terang' : 'Mode Gelap',
      icon: isDark ? Sun : Moon,
      color: NEON_COLORS[7],
      action: (e) => {
        onToggleTheme?.(e)
      },
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

  const RADIUS = 98 // Jarak sebaran lingkaran luar dari tombol tengah

  return (
    <>
      {open && <div className="cnav-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}

      <nav
        ref={navRef}
        className={`cnav ${open ? 'is-open' : ''}`}
        aria-label="Menu navigasi melingkar"
      >
        {/* 8 Item Melingkar 360 Derajat Mengelilingi Tombol Tengah */}
        {ringItems.map((item, index) => {
          const Icon = item.icon
          const total = ringItems.length
          // Mulai dari -90 derajat (pukul 12 tepat di atas) lalu memutar searah jarum jam
          const angleDeg = -90 + (index * 360) / total
          const angleRad = (angleDeg * Math.PI) / 180
          const x = Math.round(Math.cos(angleRad) * RADIUS)
          const y = Math.round(Math.sin(angleRad) * RADIUS)
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
                transitionDelay: open ? `${index * 35}ms` : '0ms',
              }}
              onClick={item.action}
            >
              <Icon size={21} strokeWidth={2} />
              <span className="cnav-tip">{item.label}</span>
            </button>
          )
        })}

        {/* Tombol Utama di Tengah (Single Button -> Berubah jadi X saat terbuka) */}
        <button
          type="button"
          className="cnav-center"
          aria-label={open ? 'Tutup menu' : 'Buka menu navigasi'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
        </button>
      </nav>
    </>
  )
}

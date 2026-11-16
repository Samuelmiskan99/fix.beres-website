import { useMemo } from 'react'
import CurvedLensCarousel from '@/components/ui/3d-curved-carousel'

function wrapLines(text, maxChars = 30) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars) {
      if (current) lines.push(current.trim())
      current = w
    } else {
      current = (current + ' ' + w).trim()
    }
  }
  if (current) lines.push(current.trim())
  return lines.slice(0, 6)
}

const escapeXml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

function createTestimonialCardUri({
  name,
  role,
  badge,
  title,
  quote,
  highlight,
  hue = 185,
  num = '01',
  isLight = false,
}) {
  const lines = wrapLines(quote, 31)
  const quoteTspans = lines
    .map(
      (line, idx) =>
        `<tspan x="64" dy="${idx === 0 ? 0 : 44}">${escapeXml(line)}</tspan>`
    )
    .join('')

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Palet warna dinamis untuk kartu SVG (Light Mode vs Dark Mode)
  const bgStop1 = isLight ? `hsl(${hue}, 45%, 98%)` : `hsl(${hue}, 38%, 11%)`
  const bgStop2 = isLight ? `hsl(${hue + 8}, 38%, 94%)` : `hsl(${hue + 10}, 32%, 7%)`
  const bgStop3 = isLight ? `hsl(${hue + 15}, 42%, 90%)` : `hsl(${hue + 20}, 40%, 4%)`
  const borderMid = isLight ? '#0f766e' : '#ffffff'
  const gridStroke = isLight ? '#0f172a' : '#ffffff'
  const badgeTextFill = isLight ? `hsl(${hue}, 85%, 28%)` : `hsl(${hue}, 85%, 72%)`
  const titleFill = isLight ? '#0f172a' : '#ffffff'
  const quoteFill = isLight ? '#334155' : '#e2e8f0'
  const highlightFill = isLight ? '#047857' : '#6ee7b7'
  const roleFill = isLight ? '#475569' : '#94a3b8'
  const numFill = isLight ? '#0f172a' : '#ffffff'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgStop1}"/>
      <stop offset="55%" stop-color="${bgStop2}"/>
      <stop offset="100%" stop-color="${bgStop3}"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="65%">
      <stop offset="0%" stop-color="hsl(${hue}, 90%, 55%)" stop-opacity="${isLight ? '0.2' : '0.28'}"/>
      <stop offset="100%" stop-color="hsl(${hue}, 90%, 55%)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 85%, 52%)" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="${borderMid}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="hsl(${hue}, 85%, 45%)" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 85%, 52%)"/>
      <stop offset="100%" stop-color="hsl(${hue + 25}, 80%, 36%)"/>
    </linearGradient>
  </defs>

  <!-- Card Base -->
  <rect width="800" height="1000" rx="36" fill="url(#bg)"/>
  <rect width="800" height="1000" rx="36" fill="url(#glow)"/>
  <rect x="3" y="3" width="794" height="994" rx="34" fill="none" stroke="url(#borderGrad)" stroke-width="3"/>

  <!-- Subtle Grid Lines -->
  <line x1="64" y1="168" x2="736" y2="168" stroke="${gridStroke}" stroke-opacity="0.1" stroke-width="1.5"/>
  <line x1="64" y1="790" x2="736" y2="790" stroke="${gridStroke}" stroke-opacity="0.1" stroke-width="1.5"/>

  <!-- Top Row: Service Badge & Stars -->
  <rect x="64" y="76" width="330" height="54" rx="27" fill="hsl(${hue}, 85%, 45%)" fill-opacity="0.14" stroke="hsl(${hue}, 85%, 45%)" stroke-opacity="0.4" stroke-width="1.5"/>
  <text x="92" y="110" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="22" font-weight="700" fill="${badgeTextFill}">✦ ${escapeXml(badge)}</text>
  <text x="736" y="112" text-anchor="end" font-family="system-ui, sans-serif" font-size="30" fill="#f59e0b" letter-spacing="4">★★★★★</text>

  <!-- Big Decorative Quote Watermark -->
  <text x="58" y="320" font-family="Georgia, serif" font-size="190" fill="hsl(${hue}, 85%, 45%)" fill-opacity="0.14">“</text>

  <!-- Card Headline -->
  <text x="64" y="255" font-family="Outfit, Plus Jakarta Sans, system-ui, sans-serif" font-size="42" font-weight="800" fill="${titleFill}">${escapeXml(title)}</text>

  <!-- Client Testimonial Quote Text -->
  <text x="64" y="340" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="31" font-weight="500" fill="${quoteFill}" fill-opacity="0.95">
    ${quoteTspans}
  </text>

  <!-- Highlight Result Pill -->
  <rect x="64" y="685" width="672" height="68" rx="18" fill="#10b981" fill-opacity="0.14" stroke="#10b981" stroke-opacity="0.42" stroke-width="1.5"/>
  <text x="96" y="728" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="24" font-weight="700" fill="${highlightFill}">✓ ${escapeXml(highlight)}</text>

  <!-- Footer: Client Avatar, Name, Role & Number -->
  <circle cx="110" cy="875" r="46" fill="url(#avatarGrad)"/>
  <text x="110" y="889" text-anchor="middle" font-family="Outfit, system-ui, sans-serif" font-size="34" font-weight="800" fill="#ffffff">${escapeXml(initials)}</text>

  <text x="178" y="868" font-family="Outfit, Plus Jakarta Sans, system-ui, sans-serif" font-size="32" font-weight="800" fill="${titleFill}">${escapeXml(name)}</text>
  <text x="178" y="906" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="23" font-weight="500" fill="${roleFill}">${escapeXml(role)}</text>

  <text x="736" y="892" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="36" font-weight="700" fill="${numFill}" fill-opacity="0.2">#${escapeXml(num)}</text>
</svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const CLIENT_TESTIMONIALS = [
  {
    name: 'Rina',
    role: 'Mahasiswa Manajemen',
    badge: 'Makalah & Tugas Harian',
    title: 'Tepat Waktu',
    quote:
      '“Deadline besok pagi, malamnya sudah beres. Hasilnya rapi, sitasi dan daftar isi sesuai format kampus tanpa perlu edit ulang lagi.”',
    highlight: 'Selesai H-1 sebelum deadline',
    hue: 188,
    num: '01',
  },
  {
    name: 'Dimas Pratama',
    role: 'Mahasiswa Teknik Informatika',
    badge: 'App Inventor & Coding',
    title: 'Rapi Banget',
    quote:
      '“Aplikasi dan logika kodenya berjalan lancar. Penjelasannya runtut, jadi saya paham alurnya dan siap waktu ditanya dosen penguji.”',
    highlight: 'Full panduan + penjelasan kode',
    hue: 198,
    num: '02',
  },
  {
    name: 'Salsa Putri',
    role: 'Mahasiswa Psikologi',
    badge: 'SmartPLS & Olah Data',
    title: 'Anti Ribet',
    quote:
      '“Tinggal kirim dataset lewat WhatsApp, dibalas cepat, hasil olah data outer loading & path coefficient langsung beres lengkap cara bacanya.”',
    highlight: 'Semua indikator valid & reliabel',
    hue: 172,
    num: '03',
  },
  {
    name: 'Bagas Wijaya',
    role: 'Mahasiswa Hukum',
    badge: 'Bab Skripsi & Proposal',
    title: 'Aman Rahasia',
    quote:
      '“Data dan dokumen tugas saya dijaga 100% rahasia, tidak ada yang bocor ke teman sekelas. Revisi dari dosen juga langsung dibantu rapikan.”',
    highlight: 'Privasi klien terjaga penuh',
    hue: 210,
    num: '04',
  },
  {
    name: 'Nadia Rahma',
    role: 'Mahasiswa Akuntansi',
    badge: 'Jurnal & Fix Turnitin',
    title: 'Revisi Cepat',
    quote:
      '“Minta revisi dan penurunan similarity Turnitin malam hari, paginya sudah dikirim ulang dengan bahasa yang tetap enak dibaca.”',
    highlight: 'Turnitin turun dari 38% ke 11%',
    hue: 162,
    num: '05',
  },
  {
    name: 'Fajar Nugroho',
    role: 'Mahasiswa Sistem Informasi',
    badge: 'Linux Server & Database',
    title: 'Harga Jelas',
    quote:
      '“Di awal konsultasi sudah disebut estimasi biaya dan waktunya secara transparan, tidak ada biaya tambahan yang mengejutkan di akhir.”',
    highlight: 'Setup server + dokumentasi lengkap',
    hue: 192,
    num: '06',
  },
  {
    name: 'Aulia Maharani',
    role: 'Mahasiswa Ekonomi',
    badge: 'Full Pendampingan Sidang',
    title: 'Fix Beres',
    quote:
      '“Pendampingan dari awal penyusunan bab sampai persiapan PPT sidang. Semua rapi dan bebas konsultasi kapan saja via WhatsApp.”',
    highlight: 'Lulus sidang tepat waktu',
    hue: 178,
    num: '07',
  },
]

export default function Gallery({ theme = 'dark' }) {
  const isLight = theme === 'light'

  const slides = useMemo(
    () =>
      CLIENT_TESTIMONIALS.map((item) => ({
        kicker: `${item.name} · ${item.role}`,
        title: item.title,
        caption: item.quote.replace(/^“|”$/g, ''),
        image: createTestimonialCardUri({ ...item, isLight }),
        alt: `Testimoni ${item.name} - ${item.title}`,
      })),
    [isLight]
  )

  return (
    <section id="portofolio" aria-label="Testimoni Klien">
      <CurvedLensCarousel
        key={theme}
        slides={slides}
        label="fix.beres — Testimoni Klien"
        height="min(85svh, 760px)"
        background={isLight ? '#f1f7f8' : '#060c0e'}
        ink={isLight ? '#0f172a' : '#f2ede4'}
      />
    </section>
  )
}
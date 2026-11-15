import { Home, Wrench, Sparkles, MessageSquareHeart, Tag, Zap, CircleHelp, Rocket } from 'lucide-react'

export const NAV = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'layanan', label: 'Layanan', icon: Wrench },
  { id: 'keunggulan', label: 'Keunggulan', icon: Sparkles },
  { id: 'portofolio', label: 'Testimoni', icon: MessageSquareHeart },
  { id: 'harga', label: 'Harga', icon: Tag },
  { id: 'cara', label: 'Cara Order', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: CircleHelp },
  { id: 'kontak', label: 'Kontak', icon: Rocket },
]

export const SECTION_IDS = NAV.map((item) => item.id)

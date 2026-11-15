import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { buildWhatsAppLink, GENERAL_INQUIRY } from '@/utils/whatsapp'

/** Header kaca (glass) di atas halaman: logo, tombol konsultasi, dan toggle tema. */
export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="top">
      <div className="wrap">
        <a className="top-logo" href="#beranda" aria-label="fix.beres — ke atas"><i>fb</i>fix.<span>beres</span></a>
        <div className="top-actions">
          <Button size="sm" href={buildWhatsAppLink(GENERAL_INQUIRY)}>Konsultasi <ArrowRight size={16} /></Button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}

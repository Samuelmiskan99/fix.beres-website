import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

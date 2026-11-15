import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

/** Tema 'light' | 'dark'. Nilai awal dibaca dari <html data-theme> (diset di index.html). */
export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* abaikan */ }
  }, [theme])

  // Ganti tema dengan lingkaran yang melebar dari tombol (jika browser mendukung)
  const toggle = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const apply = () => { document.documentElement.dataset.theme = next; flushSync(() => setTheme(next)) }
    const button = event?.currentTarget
    if (!document.startViewTransition || !button || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return apply()
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(.65,0,.3,1)', pseudoElement: '::view-transition-new(root)' },
    ))
  }
  return [theme, toggle]
}

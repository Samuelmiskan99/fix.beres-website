import { NAV } from '@/data'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
let busy = false

/**
 * Pindah ke section dengan transisi halaman: lingkaran warna melebar dari tombol menu,
 * halaman melompat ke tujuan saat layar tertutup, lalu lingkaran menyusut sambil menampilkan nama section.
 */
export const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (!target || busy) return
  if (reduced()) return target.scrollIntoView({ behavior: 'smooth' })
  busy = true

  const origin = `${window.innerWidth <= 960 ? 42 : 48}px calc(100% - ${window.innerWidth <= 960 ? 42 : 48}px)`
  const veil = document.createElement('div')
  veil.className = 'veil'
  veil.innerHTML = `<span>${NAV.find((n) => n.id === id)?.label ?? ''}</span>`
  document.body.append(veil)
  const label = veil.firstChild

  const open = veil.animate(
    [{ clipPath: `circle(0px at ${origin})` }, { clipPath: `circle(150vmax at ${origin})` }],
    { duration: 520, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' },
  )
  open.onfinish = () => {
    target.scrollIntoView({ behavior: 'instant' })
    label.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 300, fill: 'forwards', easing: 'ease-out' })
    setTimeout(() => {
      label.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })
      const close = veil.animate(
        [{ clipPath: 'circle(150vmax at 50% 50%)' }, { clipPath: 'circle(0px at 50% 50%)' }],
        { duration: 620, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' },
      )
      close.onfinish = () => { veil.remove(); busy = false }
    }, 380)
  }
}

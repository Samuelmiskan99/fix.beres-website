import { useEffect } from 'react'

/** Efek kursor global (event delegation): kartu miring 3D + sorot cahaya, tombol "magnetik". */
export default function useInteractions() {
  // Riak saat kartu diklik / disentuh
  useEffect(() => {
    const onClick = (e) => {
      const card = e.target.closest?.('.card')
      if (!card) return
      const r = card.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.left = `${e.clientX - r.left}px`; ripple.style.top = `${e.clientY - r.top}px`
      card.append(ripple)
      ripple.onanimationend = () => ripple.remove()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let card = null, btn = null
    const reset = (el, vars) => el && vars.forEach((name) => el.style.removeProperty(name))

    const onMove = (e) => {
      const nextCard = e.target.closest?.('.card') ?? null
      const nextBtn = e.target.closest?.('.btn') ?? null
      if (nextCard !== card) { reset(card, ['--rx', '--ry']); card = nextCard }
      if (nextBtn !== btn) { reset(btn, ['--bx', '--by']); btn = nextBtn }
      if (card) {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
        card.style.setProperty('--mx', `${px * 100}%`); card.style.setProperty('--my', `${py * 100}%`)
        card.style.setProperty('--ry', `${(px - 0.5) * 10}deg`); card.style.setProperty('--rx', `${(0.5 - py) * 10}deg`)
      }
      if (btn) {
        const r = btn.getBoundingClientRect()
        btn.style.setProperty('--bx', `${(e.clientX - (r.left + r.width / 2)) * 0.22}px`)
        btn.style.setProperty('--by', `${(e.clientY - (r.top + r.height / 2)) * 0.3}px`)
      }
    }
    const onLeave = () => { reset(card, ['--rx', '--ry']); reset(btn, ['--bx', '--by']); card = btn = null }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => { window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave) }
  }, [])
}

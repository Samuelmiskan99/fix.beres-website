import { useEffect } from 'react'

const clamp = (v) => Math.max(0, Math.min(1, v))

/** Memberi tiap section variabel CSS --in (seberapa jauh masuk layar) dan --out (seberapa jauh keluar) untuk efek parallax/fade. */
export default function useScrollFx() {
  useEffect(() => {
    const sections = [...document.querySelectorAll('.sec')]
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      sections.forEach((s) => {
        const r = s.getBoundingClientRect()
        s.style.setProperty('--in', clamp((vh - r.top) / (vh * 0.55)).toFixed(3))
        s.style.setProperty('--out', clamp(-r.top / r.height).toFixed(3))
      })
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])
}

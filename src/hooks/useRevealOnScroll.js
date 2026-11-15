import { useEffect } from 'react'

const TARGETS = '.head, .grid:not(.panel .grid) > .card, .faq .qa, .contact > *'
// Gaya animasi masuk berbeda untuk tiap section
const FX = { layanan: 'up', keunggulan: 'flip', cara: 'left', faq: 'right', kontak: 'zoom' }

/** Elemen muncul dengan animasi (beda tiap section) saat masuk layar. */
export default function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        el.classList.add('in', 'seen') // 'seen' permanen: dipakai animasi kata pada judul
        observer.unobserve(el)
        setTimeout(() => { // bersihkan class supaya hover card tidak ikut ter-delay
          el.classList.remove('reveal', 'in')
          el.style.transitionDelay = ''
        }, 1100)
      }),
      { threshold: 0.15 },
    )
    document.querySelectorAll(TARGETS).forEach((el, index) => {
      el.classList.add('reveal')
      el.dataset.fx = el.matches('.head') ? 'up' : FX[el.closest('section')?.id] ?? 'up'
      el.style.transitionDelay = `${(index % 4) * 80}ms`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
}

import { useEffect, useRef } from 'react'

const clamp = (value, limit = 1) => Math.max(-limit, Math.min(limit, value))

/**
 * Menghasilkan ref { lx, ly, lean } yang diperbarui terus-menerus:
 *  lx / ly : arah pandang robot (-1..1) mengikuti kursor / sentuhan
 *  lean    : kemiringan badan mengikuti kecepatan scroll
 * Saat kursor diam, robot menoleh sendiri.
 */
export default function useMascotMotion(elRef) {
  const motion = useRef({ lx: 0, ly: 0, lean: 0 })

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const pointer = { x: 0, y: 0, last: -Infinity }
    let lastScroll = window.scrollY
    let frame

    const onMove = (event) => {
      const point = event.touches?.[0] ?? event
      Object.assign(pointer, { x: point.clientX, y: point.clientY, last: performance.now() })
    }

    const tick = (now) => {
      const rect = el.getBoundingClientRect()
      const idle = now - pointer.last > 3000
      const m = motion.current
      const targetX = idle ? Math.sin(now / 1400) * 0.7 : clamp((pointer.x - (rect.left + rect.width / 2)) / 320)
      const targetY = idle ? Math.cos(now / 1900) * 0.35 : clamp((pointer.y - (rect.top + rect.height / 2)) / 320)
      m.lx += (targetX - m.lx) * 0.12
      m.ly += (targetY - m.ly) * 0.12
      const delta = window.scrollY - lastScroll
      lastScroll = window.scrollY
      m.lean += (clamp(delta / 6) * 8 - m.lean) * 0.1
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [elRef])

  return motion
}

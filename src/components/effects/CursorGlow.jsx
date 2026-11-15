import { useEffect, useRef } from 'react'

/** Cahaya lembut yang mengikuti kursor (tidak tampil di layar sentuh). */
export default function CursorGlow() {
  const glow = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let frame

    const onMove = (event) => { target.x = event.clientX; target.y = event.clientY }
    const onOver = (event) => dot.current.classList.toggle('big', !!event.target.closest?.('a,button,.card,input,select,textarea'))
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      glow.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      dot.current.style.transform = `translate(${target.x}px, ${target.y}px)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver)
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

/** Hujan konfeti kecil dari titik (x, y) layar, warnanya satu hue tema. */
export function burst(x, y, count = 30) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < count; i++) {
    const el = document.createElement('i')
    Object.assign(el.style, {
      position: 'fixed', left: `${x}px`, top: `${y}px`, width: '8px', height: '8px', borderRadius: '2px',
      background: `hsl(var(--h) 80% ${40 + Math.random() * 35}%)`, zIndex: 100, pointerEvents: 'none',
    })
    document.body.append(el)
    const angle = Math.random() * Math.PI * 2, dist = 70 + Math.random() * 150
    el.animate(
      [{ transform: 'translate(0,0) rotate(0)', opacity: 1 },
       { transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist + 90}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }],
      { duration: 800 + Math.random() * 600, easing: 'cubic-bezier(.2,.8,.3,1)' },
    ).onfinish = () => el.remove()
  }
}

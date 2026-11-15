const BASE = { w: 400, h: 420 } // ukuran viewBox karakter
const COMPACT_BREAKPOINT = 1060
const RIGHT_GAP = { hero: 56, corner: 20, contact: 48 }

/** Hitung posisi (translate) & ukuran maskot untuk satu pose di viewport tertentu. */
export function getPlacement(pose, viewportWidth) {
  const compact = viewportWidth <= COMPACT_BREAKPOINT
  const anchor = compact ? 'corner' : pose.anchor
  const scale = compact
    ? 0.45
    : anchor === 'hero'
      ? Math.min(pose.scale, (viewportWidth - 780) / BASE.w) // jangan menimpa teks hero di layar sempit
      : pose.scale
  const w = BASE.w * scale
  const h = BASE.h * scale
  const y = {
    hero: '15vh',
    corner: `calc(100vh - ${h + 24}px)`,
    contact: `calc(100vh - ${h + 24}px)`,
  }[anchor]

  return { x: `calc(100vw - ${w + RIGHT_GAP[anchor]}px)`, y, size: { w, h } }
}

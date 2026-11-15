import { lazy, Suspense, useRef } from 'react'
import { MASCOT_POSES } from '@/data'
import useMascotMotion from '@/hooks/useMascotMotion'
import useWindowWidth from '@/hooks/useWindowWidth'
import { getPlacement } from '@/utils/mascot'

const OrbCanvas = lazy(() => import('./OrbCanvas'))

/** Objek 3D melayang: pindah & berubah bentuk sesuai section yang sedang aktif. */
export default function Mascot({ section, theme }) {
  const ref = useRef(null)
  const viewportWidth = useWindowWidth()
  const motion = useMascotMotion(ref)

  const pose = MASCOT_POSES[section] ?? MASCOT_POSES.beranda
  const { x, y, size } = getPlacement(pose, viewportWidth)

  return (
    <div ref={ref} className={`mascot ${pose.anchor === 'hero' ? 'is-hero' : ''}`}
      style={{ transform: `translate(${x}, ${y})`, width: size.w, height: size.h }}>
      <div className="mascot-aura" aria-hidden="true" />
      <div className="mascot-shadow" aria-hidden="true" />
      <div className="mascot-say" key={section}>{pose.say}</div>
      <div className="mascot-float">
        <Suspense fallback={null}>
          <OrbCanvas pose={pose} theme={theme} motion={motion} />
        </Suspense>
      </div>
    </div>
  )
}

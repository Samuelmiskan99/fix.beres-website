import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createOrb } from './createMolecule'

/** Kanvas WebGL: klik = letupan, drag = putar dengan inersia. */
export default function OrbCanvas({ pose, theme, motion, onPulse }) {
  const host = useRef(null)
  const live = useRef(pose)
  const orbRef = useRef(null)
  live.current = pose

  useEffect(() => {
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }) } catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(400, 420, false)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    host.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    const sun = new THREE.DirectionalLight('#ffffff', 1.6)
    sun.position.set(3, 4, 6)
    scene.add(sun)
    const camera = new THREE.PerspectiveCamera(30, 400 / 420, 0.1, 50)
    camera.position.set(0, 0, 9)

    const orb = createOrb()
    orb.applyTheme(document.documentElement.dataset.theme || 'light')
    scene.add(orb.root)
    orbRef.current = orb

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches // lebih lambat, bukan berhenti
    let frame, last = performance.now()
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      orb.update(dt, (calm ? now * 0.4 : now) / 1000, live.current, motion.current)
      renderer.render(scene, camera)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    // interaksi: drag untuk memutar, klik untuk letupan
    const el = renderer.domElement
    let drag = null
    const down = (e) => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; el.setPointerCapture(e.pointerId) }
    const move = (e) => {
      if (!drag) return
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y
      drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy)
      orb.input.velY = dx * 0.6; orb.input.velX = dy * 0.6
    }
    const up = () => { if (drag && drag.moved < 6) { orb.input.pulse = 1; onPulse?.() } drag = null }
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up)

    return () => {
      cancelAnimationFrame(frame)
      orbRef.current = null
      orb.dispose(); env.dispose(); pmrem.dispose()
      renderer.dispose(); renderer.forceContextLoss(); el.remove()
    }
  }, [motion, onPulse])

  useEffect(() => { orbRef.current?.applyTheme(theme) }, [theme])
  return <div ref={host} className="robot" />
}

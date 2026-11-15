import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * TornadoVortex — Full-Bleed 3D WebGL Particle Vortex & Spiral Horizon Floor
 * Dirancang menyerupai pusaran partikel Cronos: corong lebar di langit-langit atas,
 * leher pusaran rapat di tengah, dan pusaran cincin konsentris di lantai bawah.
 * Bereaksi interaktif saat mouse digerakkan.
 */
export default function TornadoVortex({ theme = 'dark' }) {
  const hostRef = useRef(null)
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120)
    camera.position.set(0, 0.2, 13.2)

    const group = new THREE.Group()
    scene.add(group)

    const PARTICLE_COUNT = 14000
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const meta = new Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 68% corong tornado utama, 32% cincin lantai cakrawala bawah
      const isFloor = i >= PARTICLE_COUNT * 0.68
      if (!isFloor) {
        const hNorm = Math.random() // 0 = dasar leher bawah, 1 = mulut corong atas
        const ribbonIdx = i % 28
        const angle = (ribbonIdx / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.18
        // Profil hiperbolik ala Cronos: sempit di bawah (hNorm ~ 0.12), membuka lebar eksponensial ke atas
        const throat = 0.85
        const upperSpread = Math.pow(Math.max(0, hNorm - 0.08), 1.85) * 9.2
        const lowerFoot = Math.pow(Math.max(0, 0.16 - hNorm), 2.0) * 16.0
        const radius = (throat + upperSpread + lowerFoot) * (0.9 + Math.random() * 0.2)
        const y = -4.3 + hNorm * 10.6
        const speed = (0.75 + (1 - Math.abs(hNorm - 0.25)) * 1.35) * (0.92 + Math.random() * 0.16)

        meta[i] = {
          isFloor: false,
          hNorm,
          angle,
          speed,
          baseRadius: radius,
          baseY: y,
          bright: 0.4 + Math.random() * 0.6,
        }
      } else {
        // Lantai bergelombang spiral konsentris di bagian bawah
        const ringStep = (i % 40) / 40
        const rNorm = Math.pow(ringStep + (Math.random() - 0.5) * 0.02, 0.85)
        const radius = 0.85 + Math.max(0.01, rNorm) * 12.5
        const angle = Math.random() * Math.PI * 2
        const speed = 1.45 / (0.65 + radius * 0.28)
        const dome = Math.exp(-Math.pow((radius - 2.2) * 0.45, 2)) * 0.42
        const y = -4.55 + dome + (Math.random() - 0.5) * 0.05

        meta[i] = {
          isFloor: true,
          hNorm: 0,
          angle,
          speed,
          baseRadius: radius,
          baseY: y,
          bright: Math.max(0.15, (1 - rNorm * 0.72) * (0.45 + Math.random() * 0.55)),
        }
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const spriteCanvas = document.createElement('canvas')
    spriteCanvas.width = 32
    spriteCanvas.height = 32
    const ctx = spriteCanvas.getContext('2d')
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(255,255,255,0.75)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 32, 32)
    const spriteTex = new THREE.CanvasTexture(spriteCanvas)

    const mat = new THREE.PointsMaterial({
      size: 0.075,
      map: spriteTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)
    group.add(points)

    // Garis serat ulir (vortex filaments) agar siluet corong tampak tegas seperti gambar Cronos
    const RING_COUNT = 34
    const RING_SEGMENTS = 72
    const linePositions = new Float32Array(RING_COUNT * RING_SEGMENTS * 2 * 3)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#a7f3d0'),
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
    })
    const vortexLines = new THREE.LineSegments(lineGeo, lineMat)
    group.add(vortexLines)

    const applyThemeColors = (currentTheme) => {
      const isDark = currentTheme === 'dark'
      mat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending
      mat.opacity = isDark ? 0.9 : 0.65
      mat.size = isDark ? 0.075 : 0.088
      lineMat.opacity = isDark ? 0.13 : 0.1
      lineMat.color.set(isDark ? '#99f6e4' : '#0f766e')

      const colAttr = geo.attributes.color
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const m = meta[i]
        if (isDark) {
          const tealHint = m.isFloor ? 0.18 : 0.12 + m.hNorm * 0.22
          const r = (1 - tealHint * 0.5) * m.bright
          const g = (1 - tealHint * 0.06) * m.bright
          const b = 1.0 * m.bright
          colAttr.setXYZ(i, r, g, b)
        } else {
          const b = m.bright * 0.45
          colAttr.setXYZ(i, 0.05 * b, 0.28 * b, 0.34 * b)
        }
      }
      colAttr.needsUpdate = true
    }

    applyThemeColors(themeRef.current)

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0, lastX: 0, lastY: 0 }

    const onPointerMove = (e) => {
      const rect = host.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      const nx = ((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1
      const ny = -(((clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1)
      const dx = nx - pointer.lastX
      const dy = ny - pointer.lastY
      pointer.speed = Math.min(2.8, pointer.speed + Math.hypot(dx, dy) * 3.5)
      pointer.lastX = nx
      pointer.lastY = ny
      pointer.targetX = Math.max(-1.25, Math.min(1.25, nx))
      pointer.targetY = Math.max(-1.25, Math.min(1.25, ny))
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('touchmove', onPointerMove, { passive: true })

    const resize = () => {
      const w = Math.max(1, host.clientWidth)
      const h = Math.max(1, host.clientHeight)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    let raf = 0
    let lastTime = performance.now()
    let elapsed = 0

    const animate = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      pointer.x += (pointer.targetX - pointer.x) * 0.075
      pointer.y += (pointer.targetY - pointer.y) * 0.075
      pointer.speed *= 0.94

      const spinBoost = 1 + pointer.speed * 0.9
      elapsed += dt * spinBoost

      const posAttr = geo.attributes.position
      const cursorWorldX = pointer.x * 5.5
      const cursorWorldY = pointer.y * 4.2

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const m = meta[i]
        const theta = m.angle + elapsed * m.speed + (m.isFloor ? 0 : m.hNorm * 4.2)

        if (!m.isFloor) {
          const bend = Math.pow(m.hNorm, 1.3)
          const swayX =
            Math.sin(elapsed * 0.8 + m.hNorm * 3.2) * 0.28 + pointer.x * 2.5 * bend
          const swayZ =
            Math.cos(elapsed * 0.65 + m.hNorm * 2.6) * 0.22 + pointer.y * 1.2 * bend

          const dyCursor = m.baseY - cursorWorldY
          const wave = Math.exp(-(dyCursor * dyCursor) / 3.0) * (0.24 + pointer.speed * 0.25)
          const r = m.baseRadius * (1 + wave * Math.sin(theta * 3 + elapsed * 4))

          posAttr.setXYZ(
            i,
            swayX + Math.cos(theta) * r,
            m.baseY + Math.sin(theta * 2 + elapsed) * 0.04,
            swayZ + Math.sin(theta) * r
          )
        } else {
          const x = Math.cos(theta) * m.baseRadius + pointer.x * 0.35
          const z = Math.sin(theta) * m.baseRadius
          const distCursor = Math.hypot(x - cursorWorldX, m.baseY - cursorWorldY)
          const ripple = Math.sin(distCursor * 2.4 - elapsed * 4) * 0.07 * Math.exp(-distCursor * 0.22)
          posAttr.setXYZ(i, x, m.baseY + ripple, z)
        }
      }
      posAttr.needsUpdate = true

      // Update cincin serat ulir tornado
      const lAttr = lineGeo.attributes.position
      let ptr = 0
      for (let rIdx = 0; rIdx < RING_COUNT; rIdx++) {
        const hNorm = rIdx / (RING_COUNT - 1)
        const y = -4.3 + hNorm * 10.5
        const throat = 0.85
        const upperSpread = Math.pow(Math.max(0, hNorm - 0.08), 1.85) * 9.1
        const lowerFoot = Math.pow(Math.max(0, 0.16 - hNorm), 2.0) * 15.5
        const radius = throat + upperSpread + lowerFoot
        const bend = Math.pow(hNorm, 1.3)
        const cx = Math.sin(elapsed * 0.8 + hNorm * 3.2) * 0.28 + pointer.x * 2.5 * bend
        const cz = Math.cos(elapsed * 0.65 + hNorm * 2.6) * 0.22 + pointer.y * 1.2 * bend
        const rot = elapsed * 0.9 + hNorm * 3.5

        for (let s = 0; s < RING_SEGMENTS; s++) {
          const a1 = rot + (s / RING_SEGMENTS) * Math.PI * 2
          const a2 = rot + ((s + 0.65) / RING_SEGMENTS) * Math.PI * 2
          lAttr.setXYZ(ptr++, cx + Math.cos(a1) * radius, y, cz + Math.sin(a1) * radius)
          lAttr.setXYZ(ptr++, cx + Math.cos(a2) * radius, y, cz + Math.sin(a2) * radius)
        }
      }
      lAttr.needsUpdate = true

      group.rotation.x = 0.14 + pointer.y * 0.1
      group.rotation.z = -pointer.x * 0.07

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    const mo = new MutationObserver(() => {
      const domTheme = document.documentElement.dataset.theme || 'dark'
      applyThemeColors(domTheme)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchmove', onPointerMove)
      geo.dispose()
      mat.dispose()
      spriteTex.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="tornado-stage" ref={hostRef} aria-hidden="true">
      <div className="tornado-vignette" />
    </div>
  )
}

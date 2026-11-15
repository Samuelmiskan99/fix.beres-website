import * as THREE from 'three'

const hsl = (h, s, l) => new THREE.Color().setHSL(h / 360, s, l, THREE.SRGBColorSpace)
const damp = (a, b, k) => a + (b - a) * k
const PALETTE = {
  light: { atom: [0.78, 0.42], atomB: [0.85, 0.62], bond: [0.2, 0.55], orbit: [0.8, 0.36], dust: [0.9, 0.5] },
  dark: { atom: [0.82, 0.5], atomB: [0.9, 0.72], bond: [0.2, 0.7], orbit: [0.85, 0.6], dust: [0.95, 0.7] },
}

// 8 atom: 0–5 membentuk cincin, 6 menempel di 0, 7 menempel di 3 (mirip benzena + 2 gugus)
const BONDS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [3, 7]]
const CLOSE_BOND = 5 // ikatan 5–0 hanya ada pada layout yang melingkar
const ring = (i, r, z = 0) => [Math.cos((i * Math.PI) / 3) * r, Math.sin((i * Math.PI) / 3) * r, z]
const LAYOUTS = {
  ring: { closed: 1, p: [...[0, 1, 2, 3, 4, 5].map((i) => ring(i, 1.2)), [2.15, 0, 0], [-2.15, 0, 0]] },
  chair: { closed: 1, p: [...[0, 1, 2, 3, 4, 5].map((i) => ring(i, 1.15, i % 2 ? -0.5 : 0.5)), [2.1, 0.25, 0.9], [-2.1, -0.25, -0.9]] },
  sphere: { closed: 1, p: Array.from({ length: 8 }, (_, i) => {
    const y = 1 - (i / 7) * 2, r = Math.sqrt(1 - y * y), a = i * 2.4
    return [Math.cos(a) * r * 1.3, y * 1.3, Math.sin(a) * r * 1.3]
  }) },
  chain: { closed: 0, p: (() => {
    const xs = { 6: -1.9, 0: -1.3, 1: -0.65, 2: 0, 3: 0.65, 4: 1.3, 5: 1.9 }
    const q = []
    for (const i of [0, 1, 2, 3, 4, 5, 6]) q[i] = [xs[i], (i % 2 ? 0.3 : -0.3), 0]
    q[7] = [xs[3], 1.15, 0.2]
    return q
  })() },
  helix: { closed: 0, p: (() => {
    const q = []
    for (let i = 0; i < 6; i++) q[i] = [Math.cos(i * 1.15) * 0.95, (2.5 - i) * 0.62 - 0.1, Math.sin(i * 1.15) * 0.95]
    q[6] = [q[0][0] * 1.7, q[0][1] + 0.3, q[0][2] * 1.7]
    q[7] = [q[3][0] * 1.7, q[3][1] - 0.2, q[3][2] * 1.7]
    return q
  })() },
}
const ATOM_R = [0.3, 0.26, 0.3, 0.26, 0.3, 0.26, 0.2, 0.2]

/** Molekul 3D: atom + ikatan yang berpindah susunan, cincin orbit elektron, bereaksi pada kursor, drag, dan klik. */
export function createOrb() {
  const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--h')) || 190
  const root = new THREE.Group()
  const core = new THREE.Group()
  root.add(core)

  const mat = (o) => new THREE.MeshPhysicalMaterial({ roughness: 0.2, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.15, ...o })
  const atomMat = mat(), atomBMat = mat(), bondMat = mat({ roughness: 0.4, clearcoat: 0.3 })
  const atomGeo = new THREE.SphereGeometry(1, 40, 28)
  const bondGeo = new THREE.CylinderGeometry(0.07, 0.07, 1, 16, 1, true)

  const atoms = ATOM_R.map((r, i) => { const m = new THREE.Mesh(atomGeo, i > 5 ? atomBMat : atomMat); core.add(m); return m })
  const bonds = BONDS.map(() => { const m = new THREE.Mesh(bondGeo, bondMat); core.add(m); return m })

  // cincin orbit elektron
  const orbitMat = new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.4 })
  const orbits = [0, 1, 2].map((i) => {
    const pivot = new THREE.Group()
    pivot.rotation.set(i * 1.1 + 0.4, i * 0.7, i * 0.4)
    const r = 2.55 + i * 0.16
    pivot.add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, 140), orbitMat))
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), orbitMat)
    pivot.add(bead); pivot.userData = { bead, r }
    pivot.scale.setScalar(0.001); core.add(pivot)
    return pivot
  })

  // debu cahaya
  const N = 100
  const dust = new Float32Array(N * 3)
  const seeds = Array.from({ length: N }, () => ({ a: Math.random() * 6.28, b: Math.acos(2 * Math.random() - 1), r: 2.2 + Math.random() * 0.9, s: 0.15 + Math.random() * 0.4 }))
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3))
  const dustMat = new THREE.PointsMaterial({ size: 0.05, transparent: true, opacity: 0.85, depthWrite: false })
  root.add(new THREE.Points(dustGeo, dustMat))

  const applyTheme = (theme) => {
    const p = PALETTE[theme] ?? PALETTE.light
    atomMat.color = hsl(hue, ...p.atom); atomBMat.color = hsl(hue, ...p.atomB); bondMat.color = hsl(hue, ...p.bond)
    orbitMat.color = hsl(hue, ...p.orbit); dustMat.color = hsl(hue, ...p.dust)
  }

  const cur = LAYOUTS.ring.p.map((p) => [...p])
  const st = { closed: 1, spin: 0.35 }
  const pos = atoms.map(() => new THREE.Vector3())
  const target = new THREE.Vector3(), q = new THREE.Quaternion(), tmp = new THREE.Vector3(), dir = new THREE.Vector3()
  const Y = new THREE.Vector3(0, 1, 0)
  const input = { pulse: 0, dragX: 0, dragY: 0, velX: 0, velY: 0 }

  const update = (dt, t, pose, motion) => {
    const k = 1 - Math.exp(-dt * 3.2)
    const layout = LAYOUTS[pose.layout] ?? LAYOUTS.ring
    st.closed = damp(st.closed, layout.closed, k); st.spin = damp(st.spin, pose.spin, k)
    input.pulse = Math.max(0, input.pulse - dt * 1.3)

    input.velX *= Math.exp(-dt * 2.5); input.velY *= Math.exp(-dt * 2.5)
    input.dragX += input.velX * dt; input.dragY += input.velY * dt
    core.rotation.y = t * st.spin + input.dragY + motion.lx * 0.5
    core.rotation.x = Math.sin(t * 0.5) * 0.18 + input.dragX + motion.ly * 0.35
    root.rotation.z = -motion.lean * 0.01
    root.position.y = Math.sin(t * 1.3) * 0.08
    root.scale.setScalar(0.8 * (1 + input.pulse * 0.1 * Math.sin(input.pulse * 14)))

    // arah kursor dalam ruang molekul → atom terdekat menggembung ke arah kursor
    target.set(motion.lx * 0.9, -motion.ly * 0.9, 1).normalize()
    q.copy(core.quaternion).invert(); target.applyQuaternion(q)

    atoms.forEach((atom, i) => {
      for (let a = 0; a < 3; a++) cur[i][a] = damp(cur[i][a], layout.p[i][a], k)
      const p = pos[i].set(cur[i][0], cur[i][1], cur[i][2])
      const len = Math.max(p.length(), 0.001)
      const near = Math.max(0, tmp.copy(p).divideScalar(len).dot(target)) ** 3
      const jig = Math.sin(t * 1.8 + i * 1.7) * 0.05
      p.multiplyScalar(1 + near * 0.22 + jig + input.pulse * 0.28 * Math.sin(input.pulse * 9 + i))
      atom.position.copy(p)
      atom.scale.setScalar(ATOM_R[i] * (1 + near * 0.35 + input.pulse * 0.25))
    })

    bonds.forEach((bond, i) => {
      const [a, b] = BONDS[i]
      dir.subVectors(pos[b], pos[a])
      const len = Math.max(dir.length(), 0.001)
      const w = i === CLOSE_BOND ? st.closed : 1
      bond.visible = w > 0.03
      bond.position.addVectors(pos[a], pos[b]).multiplyScalar(0.5)
      bond.quaternion.setFromUnitVectors(Y, dir.divideScalar(len))
      bond.scale.set(w, len, w)
    })

    orbits.forEach((o, i) => {
      const s = damp(o.scale.x, i < pose.orbits ? 1 : 0.001, 1 - Math.exp(-dt * 6))
      o.scale.setScalar(s); o.visible = s > 0.02
      o.rotation.z += dt * (0.4 + i * 0.25)
      const ang = t * (1.1 + i * 0.4)
      o.userData.bead.position.set(Math.cos(ang) * o.userData.r, Math.sin(ang) * o.userData.r, 0)
    })

    for (let i = 0; i < N; i++) {
      const d = seeds[i], a = d.a + t * d.s
      const r = d.r + input.pulse * 3 * d.s * 2
      tmp.set(Math.sin(d.b) * Math.cos(a), Math.cos(d.b) + Math.sin(t * d.s + i) * 0.1, Math.sin(d.b) * Math.sin(a)).multiplyScalar(r)
      dust[i * 3] = tmp.x; dust[i * 3 + 1] = tmp.y; dust[i * 3 + 2] = tmp.z
    }
    dustGeo.attributes.position.needsUpdate = true
  }

  const dispose = () => {
    atomGeo.dispose(); bondGeo.dispose(); dustGeo.dispose()
    ;[atomMat, atomBMat, bondMat, orbitMat, dustMat].forEach((m) => m.dispose())
    orbits.forEach((o) => o.children.forEach((c) => c.geometry.dispose()))
  }
  return { root, input, applyTheme, update, dispose }
}

// Procedural bouquet: Damask roses built from petal patches, rose leaves, tubular stems, thorns.
export function buildBouquet(THREE, scene, M = 6) {
  const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x), sm = x => { x = cl(x); return x * x * (3 - 2 * x) },
    ph = (t, a, b) => cl((t - a) / (b - a)), mx = (a, b, t) => a + (b - a) * t, UP = new THREE.Vector3(0, 1, 0)
  const g = new THREE.Group(); g.position.y = -2; g.visible = false; scene.add(g)
  scene.add(new THREE.AmbientLight(0x7a4a4a, 1.1))
  const key = new THREE.DirectionalLight(0xffe2c4, 2.6); key.position.set(3, 5, 6); scene.add(key)
  const rim = new THREE.DirectionalLight(0x8fb0ff, 1.4); rim.position.set(-5, 2, -4); scene.add(rim)
  const heads = [[0, 2.5, 0], [-.95, 1.95, .25], [1, 2, -.1], [-.45, 1.3, .55], [.5, 1.25, .5]].map(a => new THREE.Vector3(...a))
  const SC = [.56, .5, .52, .48, .48]
  const L = [[3, .5, .03], [4, .55, .08], [5, .62, .13], [6, .7, .19], [8, .78, .26]], OPEN = [.1, .3, .5, .75, 1.05]
  const PV = (M + 1) * (M + 1), NP = L.reduce((s, l) => s + l[0], 0), one = []
  for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) { const a = i * (M + 1) + j, c = a + M + 1; one.push(a, a + 1, c, a + 1, c + 1, c) }
  const IDX = []; for (let p = 0; p < NP; p++) one.forEach(x => IDX.push(x + p * PV))
  const roseMat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: .5, metalness: .05 })
  const green = new THREE.MeshStandardMaterial({ color: 0x2c5a2b, roughness: .6 })
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f6a33, emissive: 0x08240e, side: THREE.DoubleSide, roughness: .45 })
  const thornGeo = new THREE.ConeGeometry(.025, .1, 5), thornMat = new THREE.MeshStandardMaterial({ color: 0x5a2a20 })
  // serrated leaflet, folded along its midrib
  const leaf = (() => {
    const N = 14, pts = []; for (let i = 0; i <= N; i++) { const s = i / N; pts.push([.23 * Math.sin(Math.PI * Math.pow(s, .75)) + (i % 2 ? .018 : 0) * Math.sin(Math.PI * s), s]) }
    const sh = new THREE.Shape(); pts.forEach(([w, s], i) => i ? sh.lineTo(w, s) : sh.moveTo(w, s)); for (let i = N; i >= 0; i--) sh.lineTo(-pts[i][0], pts[i][1])
    const gm = new THREE.ShapeGeometry(sh), p = gm.attributes.position
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); p.setZ(i, Math.abs(x) * .7 + y * y * .12) }
    gm.computeVertexNormals(); return gm
  })()
  // petals wrapped around the flower axis; open: 0 = tight bud, 1 = full Damask bloom
  function fill(pos, col, open) {
    let o = 0
    L.forEach(([n, Hh, r0], li) => {
      const q = li / 4, tilt = mx(-.05 - .2 * q, OPEN[li], open)
      for (let p = 0; p < n; p++) {
        const phi = p / n * 6.2832 + li * .9, span = 6.2832 / n * 1.7
        for (let i = 0; i <= M; i++) for (let j = 0; j <= M; j++) {
          const u = i / M - .5, v = j / M, sh = Math.pow(Math.sin(Math.PI * (.22 + .78 * v)), .35), A = phi + u * span * sh,
            rw = Math.max(.012, r0 + v * Hh * Math.sin(tilt) + open * Math.pow(v, 2.4) * .22 * (q + .2)),
            Y = v * Hh * (.8 + .2 * open) * Math.cos(tilt) - open * Math.pow(v, 2.4) * .12 * (q + .3) + open * .025 * Math.sin(u * 14 + li) * v * v
          pos[o] = rw * Math.cos(A); pos[o + 1] = Y; pos[o + 2] = rw * Math.sin(A)
          if (col) { const s2 = (.7 + .3 * q) * (1 - .08 * Math.abs(Math.sin(u * 10))), e = sm((v - .85) / .15) * .12; col[o] = (.3 + .5 * v) * s2 + e; col[o + 1] = (.02 + .03 * v) * s2 + e * .5; col[o + 2] = (.05 + .04 * v) * s2 + e * .5 }
          o += 3
        }
      }
    })
  }
  const stems = heads.map((h, j) => {
    const sd = Math.sign(h.x || 1), V = (x, y, z) => new THREE.Vector3(x, y, z)
    const curve = new THREE.CatmullRomCurve3([V(h.x * .12, 0, 0), V(h.x * .25, h.y * .35, h.z * .3 + sd * .12), V(h.x * .7, h.y * .72, h.z * .75 - sd * .08), h.clone()])
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, .04, 6), green); g.add(tube)
    const lv = [.3, .5, .72].map((u, k) => {
      const grp = new THREE.Group(), az = (k % 2 ? 1 : -1) * (1.3 + Math.random() * .5) + (h.x > 0 ? .4 : -.4)
      ;[[0, 0, .55], [.9, .12, .38], [-.9, .12, .38]].forEach(([r, y, len]) => { const m = new THREE.Mesh(leaf, leafMat); m.scale.setScalar(len); m.rotation.z = r; m.position.y = y; grp.add(m) })
      grp.position.copy(curve.getPoint(u)); grp.rotation.order = 'YXZ'; grp.rotation.set(1, az, 0); grp.scale.setScalar(0); g.add(grp); return { grp, u }
    })
    const th = [.18, .38, .58].map((u, k) => { const m = new THREE.Mesh(thornGeo, thornMat); m.position.copy(curve.getPoint(u)); m.rotation.z = (k % 2 ? 1 : -1) * 1.3; m.rotation.y = k * 2; m.scale.setScalar(0); g.add(m); return { m, u } })
    const pivot = new THREE.Group(); pivot.position.copy(h); pivot.visible = false; g.add(pivot)
    const geo = new THREE.BufferGeometry(), pos = new Float32Array(NP * PV * 3), col = new Float32Array(NP * PV * 3)
    fill(pos, col, 0); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.setIndex(IDX)
    const mesh = new THREE.Mesh(geo, roseMat); mesh.quaternion.setFromUnitVectors(UP, curve.getTangent(1)); mesh.scale.setScalar(SC[j])
    const cx = new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 8), green); cx.scale.y = .7; cx.position.y = -.03; mesh.add(cx); pivot.add(mesh)
    return { j, tube, total: tube.geometry.index.count, lv, th, pivot, geo, pos, open: -1 }
  })
  return {
    heads,
    update(t) {
      const v = t >= 39 && t < 70; g.visible = v; if (!v) return
      g.rotation.z = -Math.sin(t * .9) * .014 * (1 - ph(t, 64, 66)); g.scale.setScalar(1 - sm(ph(t, 66, 70)))
      stems.forEach(s => {
        const j = s.j, pr = sm(ph(t, 39 + j * .5, 45 + j * .5)), o = sm(ph(t, 44 + j * .8, 51 + j * .8)), vis = pr > .97
        s.tube.geometry.setDrawRange(0, Math.floor(s.total * pr / 6) * 6)
        s.lv.forEach(l => l.grp.scale.setScalar(sm(ph(pr, l.u, l.u + .2))))
        s.th.forEach(l => l.m.scale.setScalar(sm(ph(pr, l.u, l.u + .1))))
        s.pivot.visible = vis && t < 66; s.pivot.scale.setScalar(1 - sm(ph(t, 64, 66)))
        if (vis && Math.abs(o - s.open) > .003) { s.open = o; fill(s.pos, null, o); s.geo.attributes.position.needsUpdate = true; s.geo.computeVertexNormals() }
        s.pivot.rotation.z = Math.sin(t * 1.3 + j) * .03; s.pivot.rotation.x = Math.cos(t * 1.1 + j) * .02
      })
    }
  }
}

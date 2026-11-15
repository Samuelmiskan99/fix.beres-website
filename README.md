# fix.beres

Website jasa bantuan tugas — React + Vite + Three.js (molekul 3D interaktif), menu radial berbentuk popup.

## Menjalankan
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
```

## Struktur
```
src/
├─ data/          isi konten (kontak, layanan, FAQ, dll) ← edit di sini
├─ components/
│  ├─ ui/         Button, Card, Logo
│  ├─ layout/     Section, Footer
│  ├─ RadialNav/  menu radial (popup)
│  ├─ mascot/     molekul 3D yang berubah susunan (createMolecule, OrbCanvas, Mascot)
│  ├─ effects/    CursorGlow
│  └─ sections/   Hero, Services, Perks, Steps, Faq, Contact
├─ hooks/         useActiveSection, useMediaQuery
├─ utils/         helper WhatsApp & scroll
└─ styles/        CSS per komponen (index.css meng-import semuanya)
```

## Yang biasa diubah
- Nomor WA, tagline → `src/data/contact.js`
- Layanan → `src/data/solutions.js`
- Satu-satunya warna: `--h` (hue 0–360) di `src/styles/base.css`. Mode terang/gelap otomatis mengikuti, termasuk objek 3D
- Susunan molekul/ucapan per section → `src/data/mascot.js`

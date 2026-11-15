// Bentuk molekul per section. layout: ring | chair | sphere | chain | helix ; orbits = jumlah cincin orbit elektron
const base = { anchor: 'corner', scale: 0.62, layout: 'ring', spin: 0.35, orbits: 0 }

// id harus sama dengan data/navigation.js
export const MASCOT_POSES = {
  beranda:    { ...base, anchor: 'hero', scale: 1.05, layout: 'ring', orbits: 2, say: 'Halo! Putar, colek, atau klik molekulku ⚛️' },
  layanan:    { ...base, layout: 'chair', orbits: 1, say: 'Pilih solusi yang kamu butuh, sisanya kami bereskan 🛠️' },
  keunggulan: { ...base, layout: 'sphere', spin: 0.8, say: 'Cepat, rapi, dan 100% rahasia 🔒' },
  cara:       { ...base, layout: 'chain', spin: 0.5, orbits: 3, say: 'Cuma 4 langkah, centang satu-satu ⚡' },
  faq:        { ...base, layout: 'helix', spin: 0.6, say: 'Ada yang bikin bingung? Tanya aja 🤔' },
  kontak:     { ...base, anchor: 'contact', scale: 0.85, layout: 'ring', spin: 0.9, orbits: 2, say: 'Yuk chat sekarang, kami tunggu! 📲' },
}

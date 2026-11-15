<div align="center">

# ⚡ fix.beres — Your Solution Delivery

**Deadline? Tenang. Fix beres.**  
*Platform landing page interaktif untuk layanan asistensi IT, olah data statistik (SPSS / SmartPLS), dan pendampingan akademik profesional.*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_React-0.462-F56565)](https://lucide.dev/)

</div>

---

## ✨ Fitur Utama & Sorotan UI/UX

* **🌪️ 3D Interactive Tornado Vortex Hero (`Three.js` / WebGL)**  
  Latar belakang *full-bleed* berisi 14.000+ partikel bercahaya dan serat ulir (*vortex filaments*) yang melengkung, berakselerasi, serta menciptakan gelombang riak secara *real-time* mengikuti pergerakan kursor mouse maupun sentuhan layar.
* **🗂️ Cue Collapsing Cards Accordion (`Layanan`)**  
  5 kartu akordeon horizontal interaktif dengan transisi `flex` mulus yang menampilkan cakupan layanan: **IT & Engineering** (Linux, Server, Network, Web/App/IoT, SQL), **Data & Statistik** (SPSS & SmartPLS), **College & Skripsi**, **Turnitin & PPT Slide**, serta **Consultant**.
* **🎞️ 3D Curved Lens Testimonial Carousel (`WebGL Shader`)**  
  Carousel kartu testimoni klien berbasis teks *dark-glass* yang dirender di atas satu kanvas WebGL dengan efek lengkungan lensa (*curved lens distortion*), *chromatic aberration* di tepi kartu, dan fisika *spring* saat digeser (*drag*, *flick*, atau tombol navigasi).
* **⚙️ Interactive Order Pipeline & Live Terminal (`Cara Order`)**  
  Simulator 4 langkah order yang dilengkapi tombol **Simulasi Alur (Auto-Play)**, indikator progres menyala, ledakan konfeti saat selesai, serta *Live Terminal Preview* yang memperlihatkan simulasi pengerjaan di tiap tahap.
* **🔍 2-Column FAQ Explorer & Quick Ask Card (`FAQ`)**  
  Dilengkapi filter kategori instan, kotak pencarian langsung (*live search*), badge topik, serta kartu *Quick Ask* berisi template pertanyaan sekali klik menuju WhatsApp.
* **📲 3-Column Interactive Contact & Instant Brief (`Kontak`)**  
  Terdiri dari pemilih **Mode Pengerjaan** (*Reguler*, *Prioritas*, *Express*), **Jalur Kontak Cepat** dengan fitur *Copy to Clipboard* berkonfeti, dan **Form Order Instan** dengan *Skill Chips* yang otomatis merangkai pesan WhatsApp terstruktur.
* **🧭 360° Circular Neon Ring Navbar & Minimalist 3D Footer**  
  Tombol navigasi mengambang (*single-button trigger*) di bawah layar yang mekar 360 derajat menjadi 8 tombol neon saat diklik, dipadukan dengan kartu footer 3D minimalis yang miring halus mengikuti kursor.

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework & Bundler** | React 18, Vite 5 (ESBuild) |
| **3D & WebGL Graphics** | Three.js (`TornadoVortex`), Custom WebGL GLSL Shaders (`CurvedLensCarousel`) |
| **Animasi & Transisi** | Framer Motion, View Transitions API, Web Animations API |
| **Styling & Theming** | Custom CSS Variables (`--h` single-hue token system), Dark/Light Mode, Glassmorphism |
| **Ikonografi** | Lucide React |

---

## 📂 Struktur Proyek

```text
fix-beres/
├── public/
│   └── portfolio/                         # Aset gambar portofolio statis
├── src/
│   ├── components/
│   │   ├── effects/
│   │   │   ├── CursorGlow.jsx             # Sorot cahaya mengikuti kursor
│   │   │   └── ScrollProgress.jsx         # Bar progres scroll di atas layar
│   │   ├── layout/
│   │   │   ├── Footer.jsx                 # Minimalist 3D Tilt Footer
│   │   │   ├── Marquee.jsx                # Ticker berjalan (SPSS, SmartPLS, Linux, dll.)
│   │   │   └── Section.jsx                # Wrapper section dengan animasi judul per kata
│   │   ├── RadialNav/
│   │   │   └── RadialNav.jsx              # 360° Circular Neon Ring Navigation
│   │   ├── sections/
│   │   │   ├── Contact/
│   │   │   │   ├── Contact.jsx            # Layout 3 kolom interaktif
│   │   │   │   ├── ContactCta.jsx         # 01 · Selector Mode Pengerjaan
│   │   │   │   ├── ContactChannels.jsx    # 02 · Jalur Kontak Cepat + Copy to Clipboard
│   │   │   │   └── OrderForm.jsx          # 03 · Form Order Instan + Skill Chips
│   │   │   ├── Hero/
│   │   │   │   └── Hero.jsx               # Hero section dengan Tornado Vortex 3D
│   │   │   ├── Services/
│   │   │   │   └── Services.jsx           # Integrasi Collapsing Cards Accordion
│   │   │   ├── Faq.jsx                    # 2-Column FAQ Explorer + Live Search
│   │   │   ├── Gallery.jsx                # Testimoni Klien (SVG Text Cards + 3D Carousel)
│   │   │   ├── Perks.jsx                  # Keunggulan layanan
│   │   │   ├── Pricing.jsx                # Paket & Harga (IT, Data/Statistik, Akademik)
│   │   │   └── Steps.jsx                  # Interactive Pipeline Simulator + Terminal Preview
│   │   └── ui/
│   │       ├── 3d-curved-carousel.tsx     # Komponen WebGL Curved Lens Carousel
│   │       ├── cue-collapsing-cards-accordion.tsx # Komponen 5-Card Horizontal Accordion
│   │       ├── TornadoVortex.jsx          # Kanvas Three.js Tornado Vortex 14.000 partikel
│   │       ├── Button.jsx                 # Komponen tombol magnetik
│   │       ├── Card.jsx                   # Komponen kartu 3D tilt
│   │       ├── Logo.jsx                   # Brand logo fix.beres
│   │       └── ThemeToggle.jsx            # Tombol ganti tema Dark/Light
│   ├── data/                              # Pusat konfigurasi konten (mudah diedit)
│   │   ├── contact.js                     # Nomor WhatsApp & tagline
│   │   ├── faq.js                         # Daftar kategori & pertanyaan FAQ
│   │   ├── navigation.js                  # Daftar menu navigasi & ID section
│   │   ├── perks.js                       # Data keunggulan
│   │   ├── pricing.js                     # Data paket harga IT, Statistik & Akademik
│   │   ├── solutions.js                   # Data kategori solusi
│   │   └── steps.js                       # Data 4 langkah order & simulasi terminal
│   ├── hooks/                             # Custom React Hooks (scroll, tema, interaksi 3D)
│   ├── styles/                            # Modular CSS per komponen
│   ├── utils/                             # Helper WhatsApp link generator, konfeti & scroll
│   ├── App.jsx                            # Root komponen aplikasi
│   └── main.jsx                           # Entry point React
├── index.html
├── jsconfig.json
├── package.json
└── vite.config.js
```

---

## 🚀 Cara Menjalankan di Lokal (VS Code)

Pastikan **Node.js** (versi 18 atau lebih baru) sudah terpasang di perangkat kamu.

1. **Clone repositori atau ekstrak folder proyek:**
   ```bash
   git clone [https://github.com/username-kamu/fix-beres.git](https://github.com/username-kamu/fix-beres.git)
   cd fix-beres
   ```

2. **Instal seluruh dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server development (Vite):**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` di browser untuk melihat hasilnya.

4. **Build untuk produksi (Deployment):**
   ```bash
   npm run build
   npm run preview
   ```
   Hasil build siap pakai akan tersedia di dalam folder `dist/`.

---

## ⚙️ Panduan Kustomisasi Cepat

Seluruh data teks dan konfigurasi utama dipisahkan di dalam folder `src/data/` agar mudah disesuaikan tanpa perlu mengubah logika komponen:

* **Mengubah Nomor WhatsApp & Tagline:**  
  Edit file `src/data/contact.js`:
  ```javascript
  export const CONTACT = {
    whatsapp: '628195694944',
    display: '0819-5694-944',
    tagline: 'Deadline? Tenang. Fix beres.',
  }
  ```
* **Mengubah Daftar Harga & Paket:**  
  Edit file `src/data/pricing.js`.
* **Mengubah Isi Testimoni Klien:**  
  Edit array `CLIENT_TESTIMONIALS` di dalam `src/components/sections/Gallery.jsx`.
* **Mengganti Nuansa Warna Utama Website:**  
  Buka `src/styles/base.css` dan ubah variabel `--h` (nilai *Hue* `0`–`360` pada `:root`). Seluruh aksen warna mode gelap maupun terang akan otomatis menyesuaikan.

---

## 🌐 Deployment

Proyek ini berupa *Static SPA (Single Page Application)* berbasis Vite sehingga dapat langsung di-*deploy* secara gratis ke:
* **Vercel:** Import repositori GitHub → *Framework Preset*: `Vite` → *Build Command*: `npm run build` → *Output Directory*: `dist`.
* **Netlify / Cloudflare Pages:** Gunakan perintah build `npm run build` dan direktori publikasi `dist`.

---

<div align="center">
  <sub>© 2026 <b>fix.beres</b> — Dibuat untuk kemudahan akademik & teknikalmu.</sub>
</div>
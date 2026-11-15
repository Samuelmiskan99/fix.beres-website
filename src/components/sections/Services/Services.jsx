import { BarChart3, Compass, Cpu, GraduationCap, ScanSearch } from 'lucide-react'
import Section from '@/components/layout/Section'
import CollapsingCards from '@/components/ui/cue-collapsing-cards-accordion'
import { buildWhatsAppLink } from '@/utils/whatsapp'

const SERVICE_CARDS = [
  {
    idx: 1,
    wordmark: 'IT & Engineering',
    title: 'IT & Technical — Linux, Server, Network, Web & Database',
    desc: 'Bantuan pengerjaan dan troubleshooting konfigurasi Linux/Server, jaringan, cloud, pembuatan web/aplikasi, IoT, hingga SQL database.',
    tags: ['Linux & Server', 'Network & Cloud', 'Web / App / IoT', 'SQL Database'],
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    href: buildWhatsAppLink('Halo fix.beres, saya mau konsultasi tugas IT & Technical (Server/Linux/Coding/Network/Database).'),
    ctaLabel: 'Tanya IT Solution',
    icon: <Cpu size={18} />,
  },
  {
    idx: 2,
    wordmark: 'SPSS & SmartPLS',
    title: 'Data & Statistik — Olah Data SPSS, SmartPLS & Interpretasi',
    desc: 'Olah data kuesioner & sekunder menggunakan SPSS, SmartPLS (SEM-PLS), atau Excel lengkap dengan uji validitas, reliabilitas, dan penjelasan Bab IV.',
    tags: ['SPSS Statistik', 'SmartPLS (SEM-PLS)', 'Uji Validitas & Regresi', 'Interpretasi Output'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    href: buildWhatsAppLink('Halo fix.beres, saya mau konsultasi Olah Data Statistik (SPSS / SmartPLS).'),
    ctaLabel: 'Tanya Olah Data',
    icon: <BarChart3 size={18} />,
  },
  {
    idx: 3,
    wordmark: 'College & Skripsi',
    title: 'College Solution — Skripsi, Proposal, Jurnal & Makalah',
    desc: 'Pendampingan penyusunan Bab Skripsi, Proposal, Artikel Jurnal SINTA, hingga Makalah & Essay dengan referensi terpercaya.',
    tags: ['Bab Skripsi & Proposal', 'Jurnal Ilmiah', 'Makalah & Essay'],
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    href: buildWhatsAppLink('Halo fix.beres, saya mau konsultasi College Solution (Skripsi/Jurnal/Makalah).'),
    ctaLabel: 'Tanya Akademik',
    icon: <GraduationCap size={18} />,
  },
  {
    idx: 4,
    wordmark: 'Turnitin & Slide',
    title: 'Academic Polish — Fix Turnitin, Formatting & PPT Slide',
    desc: 'Menurunkan plagiasi Turnitin secara natural, merapikan format dokumen & Mendeley, serta membuat PPT Slide presentasi sidang yang rapi.',
    tags: ['Fix Turnitin', 'Formatting & Mendeley', 'PPT Slide Sidang'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    href: buildWhatsAppLink('Halo fix.beres, saya mau tanya Fix Turnitin / Formatting / PPT Slide.'),
    ctaLabel: 'Tanya Turnitin & PPT',
    icon: <ScanSearch size={18} />,
  },
  {
    idx: 5,
    wordmark: 'Consultant',
    title: 'Consultant & General — Bimbingan Privat Segala Jurusan',
    desc: 'Diskusi langsung dengan helper untuk bedah kode, cara baca hasil SPSS/SmartPLS, atau bimbingan tugas harian semua jurusan.',
    tags: ['Sesi Privat Online', 'Bedah Data & Kode', 'Semua Jurusan'],
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    href: buildWhatsAppLink('Halo fix.beres, saya mau konsultasi privat untuk tugas saya.'),
    ctaLabel: 'Jadwalkan Sesi',
    icon: <Compass size={18} />,
  },
]

export default function Services() {
  return (
    <Section
      id="layanan"
      eyebrow="Layanan"
      title="Pilih solusi"
      accent="yang kamu butuhkan"
      sub="Mulai dari tugas IT, Olah Data SPSS/SmartPLS, hingga Karya Ilmiah—semua beres di satu tempat."
    >
      <CollapsingCards cards={SERVICE_CARDS} />
    </Section>
  )
}

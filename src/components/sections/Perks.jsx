import { useState } from 'react'
import {
  Zap,
  Lock,
  Users,
  Timer,
  CalendarClock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react'
import Section from '@/components/layout/Section'
import { buildWhatsAppLink, GENERAL_INQUIRY } from '@/utils/whatsapp'

const PERK_ITEMS = [
  {
    num: '01',
    icon: Zap,
    title: 'Cepat & Rapi',
    desc: 'Pengerjaan terstruktur untuk kode, olah data, dan dokumen akademik yang siap dikumpulkan.',
    metaLeft: 'SLA Ketepatan Waktu',
    metaRight: '99.4% On-Time',
  },
  {
    num: '02',
    icon: Lock,
    title: '100% Rahasia',
    desc: 'Identitas kampus, dataset penelitian, dan file tugasmu dijaga ketat tanpa pernah dipublikasikan.',
    metaLeft: 'Proteksi Data Klien',
    metaRight: 'End-to-End Aman',
  },
  {
    num: '03',
    icon: Users,
    title: 'Tim Profesional',
    desc: 'Dieksekusi langsung oleh praktisi IT, analis statistik SPSS/SmartPLS, dan akademisi berpengalaman.',
    metaLeft: 'IT · Statistik · Skripsi',
    metaRight: 'Verified Helper',
  },
  {
    num: '04',
    icon: Timer,
    title: 'Respons Kilat',
    desc: 'Admin dan tim teknis siaga membalas pesan serta mengecek estimasi tugasmu tanpa antre lama.',
    metaLeft: 'Rata-rata Balasan',
    metaRight: '< 3 Menit',
  },
  {
    num: '05',
    icon: CalendarClock,
    title: 'Konsultasi Fleksibel',
    desc: 'Waktu diskusi, bimbingan, dan penjelasan alur menyesuaikan penuh dengan jadwal luangmu.',
    metaLeft: 'Pagi · Sore · Malam',
    metaRight: 'Siaga 24/7',
  },
  {
    num: '06',
    icon: ShieldCheck,
    title: 'Order Sat-Set',
    desc: 'Tanpa registrasi akun yang rumit—cukup kirim instruksi lewat WhatsApp, langsung kami kerjakan.',
    metaLeft: 'Garansi Revisi Penuh',
    metaRight: 'Chat WhatsApp',
    isCta: true,
  },
]

export default function Perks() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <Section
      id="keunggulan"
      tone="tint"
      eyebrow="Kenapa fix.beres"
      title="Kerjaan banyak?"
      accent="Tetap tenang."
      sub="Enam standar layanan kami untuk memastikan tugas IT, statistik, dan akademikmu tuntas tanpa kendala."
    >
      <div className="perks-minimal-grid">
        {PERK_ITEMS.map((item, idx) => {
          const Icon = item.icon
          const isActive = activeIdx === idx

          return (
            <article
              key={item.num}
              className={`perk-min-card ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
            >
              <div className="perk-min-top">
                <div className="perk-min-ic">
                  <Icon size={19} strokeWidth={2} />
                </div>
                <span className="perk-min-num">{item.num}</span>
              </div>

              <div className="perk-min-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="perk-min-foot">
                <span className="perk-meta-left">{item.metaLeft}</span>
                {item.isCta ? (
                  <a
                    href={buildWhatsAppLink(GENERAL_INQUIRY)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="perk-meta-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{item.metaRight}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <strong className="perk-meta-right">{item.metaRight}</strong>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
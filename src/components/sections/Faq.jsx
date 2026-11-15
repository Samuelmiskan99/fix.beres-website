import { useState } from 'react'
import { ArrowUpRight, HelpCircle, MessageCircle, Search, ShieldCheck, Sparkles } from 'lucide-react'
import Section from '@/components/layout/Section'
import { FAQ_CATEGORIES, FAQ_ITEMS } from '@/data'
import { buildWhatsAppLink } from '@/utils/whatsapp'

/**
 * Interactive FAQ Explorer:
 * - Dilengkapi Filter Kategori, Pencarian Instan, Badge tiap pertanyaan,
 *   serta Kartu Bantuan Cepat di sebelah kanan agar layout seimbang & tidak kosong.
 */
export default function Faq() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id)
  const [activeCat, setActiveCat] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = activeCat === 'all' || item.cat === activeCat
    const matchQuery =
      !query.trim() ||
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <Section
      id="faq"
      tone="tint"
      eyebrow="FAQ"
      title="Pertanyaan"
      accent="yang sering muncul"
      sub="Cari jawaban cepat seputar pengerjaan IT, SPSS/SmartPLS, sistem pembayaran, hingga jaminan garansi."
    >
      <div className="faq-layout">
        {/* Kolom Kiri: Filter, Search & Akordeon Interaktif */}
        <div className="faq-main">
          <div className="faq-controls">
            <div className="faq-cats" role="tablist" aria-label="Filter kategori FAQ">
              {FAQ_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCat === c.id}
                  className={`faq-cat-btn ${activeCat === c.id ? 'on' : ''}`}
                  onClick={() => setActiveCat(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="faq-search">
              <Search size={15} />
              <input
                type="search"
                placeholder="Cari topik (mis. SPSS, revisi, DP)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Cari pertanyaan FAQ"
              />
            </div>
          </div>

          <div className="faq-list">
            {filtered.length === 0 ? (
              <div className="faq-empty">
                <p>Pertanyaan tidak ditemukan. Langsung tanyakan ke admin via WhatsApp yuk!</p>
              </div>
            ) : (
              filtered.map((item, idx) => {
                const isOpen = openId === item.id
                return (
                  <div key={item.id} className={`qa ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                    >
                      <span className="qa-num">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="qa-q-text">{item.q}</span>
                      {item.badge && <em className="qa-badge">{item.badge}</em>}
                      <span className="qa-plus" aria-hidden="true" />
                    </button>
                    <div className="qa-body">
                      <div>
                        <p>{item.a}</p>
                        {item.ctaText && (
                          <a
                            href={buildWhatsAppLink(`Halo fix.beres, saya mau tanya terkait: "${item.q}"`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="qa-inline-cta"
                          >
                            <span>{item.ctaText}</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Kolom Kanan: Interactive Quick Ask & Trust Card (Mengisi ruang kosong di kanan) */}
        <aside className="faq-aside">
          <div className="card faq-helper-card">
            <div className="faq-helper-top">
              <span className="faq-helper-pill">
                <Sparkles size={13} /> Respon &lt; 5 Menit
              </span>
              <div className="faq-helper-ic">
                <HelpCircle size={22} />
              </div>
            </div>

            <h3>Masih punya pertanyaan khusus?</h3>
            <p>
              Setiap tugas punya instruksi dosen yang berbeda. Kirimkan saja soal atau dataset kamu untuk kami cek gratis tanpa komitmen order.
            </p>

            <div className="faq-quick-prompts">
              <span className="faq-prompt-label">Klik untuk tanya cepat ke WA:</span>
              <a
                href={buildWhatsAppLink('Halo fix.beres, boleh cek estimasi harga & waktu untuk tugas saya?')}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-prompt-chip"
              >
                💬 “Boleh cek estimasi harga tugas saya?”
              </a>
              <a
                href={buildWhatsAppLink('Halo fix.beres, saya mau konsultasi olah data SPSS / SmartPLS.')}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-prompt-chip"
              >
                📊 “Bisa bantu olah data SPSS / SmartPLS?”
              </a>
              <a
                href={buildWhatsAppLink('Halo fix.beres, saya butuh bantuan tugas IT / Coding untuk deadline dekat.')}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-prompt-chip"
              >
                💻 “Bisa bantu debug coding / server Linux?”
              </a>
            </div>

            <a
              href={buildWhatsAppLink('Halo fix.beres, saya mau tanya-tanya dulu soal tugas saya.')}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-wa-cta"
            >
              <MessageCircle size={17} />
              <span>Tanya Admin Sekarang</span>
            </a>

            <div className="faq-helper-foot">
              <ShieldCheck size={15} />
              <span>Konsultasi &amp; Cek Soal 100% Gratis</span>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  )
}

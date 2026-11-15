/**
 * Cue Foundations · Collapsing Cards Accordion
 * ────────────────────────────────────────────
 * A five-image horizontal accordion where hovering a card expands it with smooth flex transitions while others collapse to vertical wordmarks.
 *
 * Original Cue ID: cue115
 * Category: Gallery & Images
 * ────────────────────────────────────────────
 */

import { useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export type CollapsingCardItem = {
  idx: number;
  wordmark: string;
  title: string;
  desc?: string;
  tags?: string[];
  img: string;
  href?: string;
  ctaLabel?: string;
  icon?: ReactNode;
};

export const DEFAULT_CARDS: CollapsingCardItem[] = [
  {
    idx: 1,
    wordmark: "Technical",
    title: "Technical — Server, Linux, Coding & Database",
    desc: "Konfigurasi Linux/Server, jaringan, pembuatan web & aplikasi, hingga perancangan SQL database dengan kode rapi.",
    tags: ["Server & Linux", "Web & App Coding", "Database & SQL"],
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Tanya Technical",
  },
  {
    idx: 2,
    wordmark: "College",
    title: "College — Skripsi, Proposal, Jurnal & Makalah",
    desc: "Pendampingan penyusunan bab demi bab, metodologi penelitian, naskah publikasi jurnal, hingga makalah & essay.",
    tags: ["Bab Skripsi", "Jurnal Ilmiah", "Makalah & Essay"],
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Tanya College",
  },
  {
    idx: 3,
    wordmark: "Data & Turnitin",
    title: "Data & Turnitin — Olah Data, Parafrase & Formatting",
    desc: "Olah data SmartPLS/SPSS lengkap interpretasi, penurunan similarity Turnitin secara natural, dan perapian dokumen.",
    tags: ["SmartPLS & SPSS", "Fix Turnitin", "Formatting & PPT"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Tanya Data & Dokumen",
  },
  {
    idx: 4,
    wordmark: "General",
    title: "General — Bimbingan Tugas Harian & Segala Jurusan",
    desc: "Bingung mulai dari mana? Kami bantu bimbingan tugas harian, analisis proyek, dan resume untuk semua jurusan.",
    tags: ["Tugas Harian", "Semua Jurusan", "Analisis Proyek"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Tanya General",
  },
  {
    idx: 5,
    wordmark: "Consultant",
    title: "Consultant — Diskusi Online & Arahan Tiap Langkah",
    desc: "Ngobrol langsung secara online dengan helper profesional, jadwal fleksibel, dibimbing sampai kamu benar-benar paham.",
    tags: ["Sesi Privat Online", "Jadwal Fleksibel", "Full Arahan"],
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Jadwalkan Sesi",
  },
];

type CollapsingCardsProps = {
  cards?: CollapsingCardItem[];
};

export default function CollapsingCards({ cards = DEFAULT_CARDS }: CollapsingCardsProps) {
  const [activeIdx, setActiveIdx] = useState(1);
  const total = String(cards.length).padStart(2, "0");

  return (
    <>
      <style>{CSS}</style>
      <div className="cc-cards" role="region" aria-label="Kategori Layanan">
        {cards.map((c) => {
          const isActive = activeIdx === c.idx;
          return (
            <div
              key={c.idx}
              className={`cc-card ${isActive ? "active" : ""}`}
              onMouseEnter={() => setActiveIdx(c.idx)}
              onClick={() => setActiveIdx(c.idx)}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIdx(c.idx);
                }
              }}
            >
              <div className="cc-img" style={{ backgroundImage: `url('${c.img}')` }} />
              <div className="cc-v-title">{c.wordmark}</div>
              <div className="cc-content">
                <div className="cc-top-row">
                  <div className="cc-idx">
                    {String(c.idx).padStart(2, "0")} / {total}
                  </div>
                  {c.icon && <div className="cc-badge-ic">{c.icon}</div>}
                </div>

                <div className="cc-meta">
                  <div className="cc-info-block">
                    {c.tags && c.tags.length > 0 && (
                      <div className="cc-tags">
                        {c.tags.map((tag) => (
                          <span key={tag} className="cc-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="cc-title">{c.title}</div>
                    {c.desc && <p className="cc-desc">{c.desc}</p>}
                  </div>

                  <a
                    href={c.href || "#kontak"}
                    target={c.href?.startsWith("http") ? "_blank" : undefined}
                    rel={c.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="cc-cta"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{c.ctaLabel || "Konsultasi"}</span>
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const CSS = `
/* Scoped Collapsing Cards Accordion — tidak mengubah body/html global agar halaman tetap bisa di-scroll */
.cc-cards {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 1280px;
  height: 520px;
  margin-inline: auto;
}

.cc-card {
  position: relative;
  flex: 0.68;
  min-width: 84px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.75s cubic-bezier(0.2, 1, 0.3, 1),
              border-color 0.35s ease,
              box-shadow 0.35s ease;
  will-change: flex;
  background: #12181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cc-card:hover,
.cc-card.active {
  border-color: hsl(var(--h, 190) 85% 58% / 0.55);
  box-shadow: 0 24px 55px -16px rgba(0, 0, 0, 0.75),
              0 0 28px -8px hsl(var(--h, 190) 85% 50% / 0.25);
}

.cc-card.active {
  flex: 3.1;
}

.cc-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.06);
  transition: transform 0.9s cubic-bezier(0.2, 1, 0.3, 1),
              filter 0.75s cubic-bezier(0.2, 1, 0.3, 1);
  filter: grayscale(40%) brightness(0.52);
}

.cc-card.active .cc-img {
  transform: scale(1);
  filter: grayscale(0%) brightness(0.82);
}

.cc-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(4, 12, 16, 0.92) 0%,
    rgba(6, 18, 24, 0.58) 42%,
    rgba(6, 18, 24, 0.18) 70%,
    rgba(4, 12, 16, 0.52) 100%
  );
  pointer-events: none;
}

.cc-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.cc-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.cc-idx {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.76);
  font-weight: 600;
}

.cc-badge-ic {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  place-items: center;
  color: hsl(var(--h, 190) 85% 65%);
}

.cc-meta {
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.cc-info-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 520px;
}

.cc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease 0.1s,
              transform 0.45s cubic-bezier(0.2, 1, 0.3, 1) 0.1s;
}

.cc-card.active .cc-tags {
  opacity: 1;
  transform: translateY(0);
}

.cc-tag-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(20, 184, 166, 0.2);
  border: 1px solid rgba(94, 234, 212, 0.4);
  color: #99f6e4;
  backdrop-filter: blur(6px);
}

.cc-title {
  font-family: Outfit, "Plus Jakarta Sans", sans-serif;
  font-size: 23px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #ffffff;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.14s,
              transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0.14s;
}

.cc-card.active .cc-title {
  opacity: 1;
  transform: translateY(0);
}

.cc-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.18s,
              transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0.18s;
}

.cc-card.active .cc-desc {
  opacity: 1;
  transform: translateY(0);
}

.cc-v-title {
  position: absolute;
  left: 24px;
  bottom: 24px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  transition: opacity 0.25s ease;
  z-index: 2;
  white-space: nowrap;
}

.cc-card.active .cc-v-title {
  opacity: 0;
  pointer-events: none;
}

.cc-cta {
  flex-shrink: 0;
  font-size: 11.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #042f2e;
  background: #5eead4;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.2s,
              transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0.2s,
              background-color 0.2s ease;
}

.cc-cta:hover {
  background: #ffffff;
}

.cc-card.active .cc-cta {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .cc-cards {
    height: 460px;
  }
  .cc-title {
    font-size: 19px;
  }
  .cc-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 680px) {
  .cc-cards {
    flex-direction: column;
    height: 640px;
    gap: 8px;
  }
  .cc-card {
    flex: 0.85;
    min-height: 58px;
  }
  .cc-card.active {
    flex: 3.4;
  }
  .cc-v-title {
    writing-mode: horizontal-tb;
    transform: none;
    left: 18px;
    bottom: 16px;
  }
  .cc-content {
    padding: 16px 18px;
  }
  .cc-desc {
    font-size: 12.5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cc-card,
  .cc-img,
  .cc-title,
  .cc-desc,
  .cc-tags,
  .cc-cta,
  .cc-v-title {
    transition-duration: 0.15s !important;
  }
}
`;

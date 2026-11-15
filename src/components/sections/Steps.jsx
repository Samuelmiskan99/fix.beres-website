import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, CheckCircle2, Play, RotateCcw, Sparkles, Terminal } from 'lucide-react'
import Section from '@/components/layout/Section'
import { STEPS } from '@/data'
import { burst } from '@/utils/confetti'
import { scrollToSection } from '@/utils/scroll'
import { buildWhatsAppLink, GENERAL_INQUIRY } from '@/utils/whatsapp'

/**
 * Interactive Connected Pipeline Stepper:
 * - Klik kartu langkah untuk melihat simulasi tahapan & menandai selesai
 * - Dilengkapi garis pipa progres menyala, tombol "Simulasi Otomatis", & Live Terminal Preview
 */
export default function Steps() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [done, setDone] = useState(() => new Set([0]))
  const [autoPlaying, setAutoPlaying] = useState(false)
  const stageRef = useRef(null)

  const handleSelectStep = (index, event) => {
    setActiveIdx(index)
    setDone((prev) => {
      const next = new Set(prev)
      for (let i = 0; i <= index; i++) next.add(i)
      if (next.size === STEPS.length && prev.size !== STEPS.length && event?.currentTarget) {
        const r = event.currentTarget.getBoundingClientRect()
        burst(r.left + r.width / 2, r.top, 65)
      }
      return next
    })
  }

  const toggleSingleDone = (index, event) => {
    event.stopPropagation()
    setDone((prev) => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      if (next.size === STEPS.length && prev.size !== STEPS.length) {
        const r = stageRef.current?.getBoundingClientRect()
        if (r) burst(r.left + r.width / 2, r.top + 80, 70)
      }
      return next
    })
  }

  const startAutoPlay = () => {
    setAutoPlaying(true)
    setActiveIdx(0)
    setDone(new Set([0]))
  }

  const resetSteps = () => {
    setAutoPlaying(false)
    setActiveIdx(0)
    setDone(new Set([0]))
  }

  useEffect(() => {
    if (!autoPlaying) return
    const timer = setTimeout(() => {
      if (activeIdx < STEPS.length - 1) {
        const nextIdx = activeIdx + 1
        setActiveIdx(nextIdx)
        setDone((prev) => {
          const next = new Set(prev)
          next.add(nextIdx)
          if (next.size === STEPS.length) {
            const r = stageRef.current?.getBoundingClientRect()
            if (r) burst(r.left + r.width / 2, r.top + 80, 75)
          }
          return next
        })
      } else {
        setAutoPlaying(false)
      }
    }, 1100)
    return () => clearTimeout(timer)
  }, [autoPlaying, activeIdx])

  const currentStep = STEPS[activeIdx] ?? STEPS[0]
  const progressRatio = done.size / STEPS.length

  return (
    <Section
      id="cara"
      eyebrow="Cara Order"
      title="Empat langkah,"
      accent="langsung beres"
      sub="Klik tiap tahap di bawah atau jalankan simulasi untuk melihat betapa sat-setnya alur pengerjaan kami."
    >
      <div className="steps-interactive-wrap" ref={stageRef}>
        {/* Top Control Bar: Progress Pipeline & Tombol Simulasi */}
        <div className="steps-toolbar">
          <div className="steps-progress-info">
            <div className="steps-progress-track">
              <span style={{ transform: `scaleX(${progressRatio})` }} />
            </div>
            <small>
              {done.size === STEPS.length
                ? '🎉 Semua tahap selesai! Tugasmu Fix Beres!'
                : `${done.size} dari ${STEPS.length} langkah aktif — klik kartu untuk eksplorasi`}
            </small>
          </div>

          <div className="steps-toolbar-btns">
            <button
              type="button"
              className={`steps-sim-btn ${autoPlaying ? 'playing' : ''}`}
              onClick={startAutoPlay}
              disabled={autoPlaying}
            >
              <Play size={14} />
              <span>{autoPlaying ? 'Menjalankan Simulasi…' : 'Simulasi Alur'}</span>
            </button>
            <button
              type="button"
              className="steps-reset-btn"
              onClick={resetSteps}
              title="Ulangi langkah"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* 4 Kartu Langkah dengan Garis Koneksi Interaktif */}
        <div className="steps-pipeline-grid">
          {STEPS.map((item, index) => {
            const isActive = activeIdx === index
            const isCompleted = done.has(index)

            return (
              <article
                key={item.title}
                className={`card step-node-card ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-done' : ''}`}
                onClick={(e) => handleSelectStep(index, e)}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleSelectStep(index, e))
                }
              >
                <div className="step-node-top">
                  <button
                    type="button"
                    className="step-num-btn"
                    onClick={(e) => toggleSingleDone(index, e)}
                    title="Centang langkah ini"
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> : index + 1}
                  </button>
                  <span className="step-eta-pill">{item.eta}</span>
                </div>

                <span className="step-kicker-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <div className="step-node-foot">
                  <span>Langkah {item.step}</span>
                  <ArrowRight size={14} className="step-arrow-ic" />
                </div>
              </article>
            )
          })}
        </div>

        {/* Live Simulation Spotlight Panel di Bawah Kartu */}
        <div className="step-spotlight-panel" key={currentStep.step}>
          <div className="step-spotlight-left">
            <div className="step-spotlight-badge">
              <Sparkles size={14} />
              <span>TAHAP {currentStep.step} · {currentStep.tag.toUpperCase()}</span>
            </div>
            <h4>{currentStep.title}</h4>
            <p>{currentStep.detail}</p>
            <div className="step-spotlight-actions">
              {activeIdx < STEPS.length - 1 ? (
                <button
                  type="button"
                  className="step-next-btn"
                  onClick={(e) => handleSelectStep(activeIdx + 1, e)}
                >
                  <span>Lanjut ke Tahap {STEPS[activeIdx + 1].step}</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <a
                  href={buildWhatsAppLink(GENERAL_INQUIRY)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="step-next-btn finish"
                >
                  <span>Mulai Order via WhatsApp</span>
                  <ArrowRight size={15} />
                </a>
              )}
              <button
                type="button"
                className="step-jump-btn"
                onClick={() => scrollToSection('kontak')}
              >
                Isi Form Brief
              </button>
            </div>
          </div>

          <div className="step-spotlight-terminal">
            <div className="terminal-bar">
              <div className="terminal-dots">
                <i /><i /><i />
              </div>
              <span><Terminal size={12} /> {currentStep.previewTitle}</span>
            </div>
            <div className="terminal-body">
              {currentStep.previewLines.map((line, i) => (
                <div key={i} className="terminal-line">
                  <CheckCircle2 size={14} />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

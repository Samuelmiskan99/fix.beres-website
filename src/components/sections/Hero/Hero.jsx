import { ArrowRight, Lock, Sparkles, Timer, Zap } from 'lucide-react'
import { motion, MotionConfig } from 'framer-motion'
import Button from '@/components/ui/Button'
import TornadoVortex from '@/components/ui/TornadoVortex'
import { scrollToSection } from '@/utils/scroll'
import { buildWhatsAppLink, GENERAL_INQUIRY } from '@/utils/whatsapp'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

const TRUST = [[Zap, 'Cepat & Rapi'], [Lock, '100% Rahasia'], [Timer, 'Respons cepat']]

export default function Hero({ theme }) {
  return (
    <section id="beranda" className="sec hero hero-tornado">
      {/* 3D Interactive Tornado Vortex Background */}
      <TornadoVortex theme={theme} />

      <MotionConfig reducedMotion="user">
        <div className="wrap hero-center">
          <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <a
                className="badge"
                href={buildWhatsAppLink(GENERAL_INQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="dot" /> YOUR SOLUTION DELIVERY <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.h1 variants={item}>
              Deadline? <span>Tenang.</span>
              <br />
              Fix beres.
            </motion.h1>

            <motion.p className="lead" variants={item}>
              Solusi tugas IT, analisis data, dan akademik anti-ribet karya tim profesional. Pengerjaan cepat, rapi, &amp; 100% rahasia biar kamu tenang, tugasmu Fix Beres!
            </motion.p>

            <motion.div className="actions hero-actions" variants={item}>
              <Button href={buildWhatsAppLink(GENERAL_INQUIRY)}>
                Konsultasi via WhatsApp <ArrowRight size={18} />
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('layanan')}>
                <Sparkles size={16} /> Lihat Layanan
              </Button>
            </motion.div>

            <motion.ul className="trust hero-trust" variants={item}>
              {TRUST.map(([Icon, label]) => (
                <li key={label}>
                  <Icon size={15} />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </MotionConfig>
    </section>
  )
}

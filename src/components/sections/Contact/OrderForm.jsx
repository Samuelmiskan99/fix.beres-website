import { useState } from 'react'
import { Send } from 'lucide-react'
import { burst } from '@/utils/confetti'
import { buildWhatsAppLink } from '@/utils/whatsapp'

const SKILL_CHIPS = [
  'SPSS / SmartPLS',
  'Linux & Server',
  'Web & App Coding',
  'Network & Cloud',
  'SQL & Database',
  'Skripsi & Jurnal',
  'Fix Turnitin',
]

const SOLUTION_OPTIONS = [
  'Technical & IT Solution',
  'Data & Statistik (SPSS / SmartPLS)',
  'College & Academic Solution',
  'General & Consultant Solution',
]

const INITIAL_VALUES = { name: '', solution: SOLUTION_OPTIONS[0], deadline: '', detail: '' }

export default function OrderForm({ urgency = 'reguler' }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [selectedTags, setSelectedTags] = useState(['SPSS / SmartPLS'])

  const handleChange = (field) => (event) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }))

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const urgencyLabel = {
    reguler: 'Reguler (> 3 Hari)',
    prioritas: 'Prioritas (1-3 Hari)',
    express: 'Express (< 24 Jam)',
  }[urgency] || 'Reguler'

  const handleSubmit = (event) => {
    event.preventDefault()
    const composedMessage = [
      'Halo fix.beres! 👋',
      `Nama: ${values.name || '-'}`,
      `Kategori: ${values.solution}`,
      `Kecepatan: ${urgencyLabel}`,
      `Deadline: ${values.deadline || '-'}`,
      selectedTags.length > 0 ? `Topik/Skill: ${selectedTags.join(', ')}` : null,
      `Detail: ${values.detail || '-'}`,
    ]
      .filter(Boolean)
      .join('\n')

    const r = event.currentTarget.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top + 40, 45)
    window.open(buildWhatsAppLink(composedMessage), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="c-card c-form" onSubmit={handleSubmit}>
      <div className="c-card-top">
        <span className="c-step-badge">03 · FORM SINGKAT</span>
        <h3 className="c-card-title">Order Instan</h3>
      </div>

      <div className="c-fields">
        <div className="c-field-row">
          <div className="c-field">
            <label htmlFor="c-name">Nama</label>
            <input
              id="c-name"
              placeholder="Nama kamu"
              value={values.name}
              onChange={handleChange('name')}
              required
            />
          </div>

          <div className="c-field">
            <label htmlFor="c-deadline">Deadline</label>
            <input
              id="c-deadline"
              type="date"
              value={values.deadline}
              onChange={handleChange('deadline')}
            />
          </div>
        </div>

        <div className="c-field">
          <label htmlFor="c-solution">Kategori Solusi</label>
          <select
            id="c-solution"
            value={values.solution}
            onChange={handleChange('solution')}
          >
            {SOLUTION_OPTIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-field">
          <span className="c-label-text">Pilih Skill / Kebutuhan:</span>
          <div className="c-tags-wrap">
            {SKILL_CHIPS.map((tag) => {
              const active = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  className={`c-tag-btn ${active ? 'on' : ''}`}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        <div className="c-field">
          <label htmlFor="c-detail">Catatan Singkat</label>
          <textarea
            id="c-detail"
            rows="2"
            placeholder="Ceritakan singkat tugasmu…"
            value={values.detail}
            onChange={handleChange('detail')}
          />
        </div>
      </div>

      <button type="submit" className="c-submit-btn">
        <span>Kirim via WhatsApp</span>
        <Send size={16} />
      </button>
    </form>
  )
}

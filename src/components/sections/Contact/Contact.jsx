import { useState } from 'react'
import Section from '@/components/layout/Section'
import { CONTACT } from '@/data'
import ContactCta from './ContactCta'
import ContactChannels from './ContactChannels'
import OrderForm from './OrderForm'

export default function Contact() {
  const [urgency, setUrgency] = useState('reguler')

  return (
    <Section
      id="kontak"
      tone="dark"
      eyebrow="Kontak Kami"
      title="Siap"
      accent="diberesin?"
      sub={`Konsultasikan tugas IT, SPSS/SmartPLS, atau akademikmu ke ${CONTACT.display}.`}
    >
      <div className="contact-grid-3">
        <ContactCta urgency={urgency} onSelectUrgency={setUrgency} />
        <ContactChannels />
        <OrderForm urgency={urgency} />
      </div>
    </Section>
  )
}

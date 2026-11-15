import Section from '@/components/layout/Section'
import Card from '@/components/ui/Card'
import { PERKS } from '@/data'

export default function Perks() {
  return (
    <Section id="keunggulan" tone="tint" eyebrow="Kenapa fix.beres" title="Kerjaan banyak?" accent="Tetap tenang.">
      <div className="grid c3">
        {PERKS.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="perk" title={title} badge={<Icon size={24} />}>{desc}</Card>
        ))}
      </div>
    </Section>
  )
}

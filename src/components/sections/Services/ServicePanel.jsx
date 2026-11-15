import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { buildWhatsAppLink } from '@/utils/whatsapp'

export default function ServicePanel({ solution }) {
  const isNumbered = solution.id === 'college' // College Solution memakai badge angka

  return (
    <div className={`panel t-${solution.id}`} key={solution.id}>
      <p className="intro">{solution.intro}</p>
      <div className="grid c3">
        {solution.items.map(({ icon: Icon, title, desc }, index) => (
          <Card key={title} style={{ '--i': index }} title={title} badge={isNumbered ? index + 1 : <Icon size={24} />}>
            {desc}
          </Card>
        ))}
      </div>
      <Button href={buildWhatsAppLink(`Halo fix.beres, saya mau tanya ${solution.name}.`)}>
        Tanya {solution.name} <ArrowRight size={18} />
      </Button>
    </div>
  )
}

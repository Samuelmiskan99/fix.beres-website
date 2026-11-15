import { SOLUTIONS } from '@/data'

export default function ServiceTabs({ activeId, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {SOLUTIONS.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          role="tab"
          aria-selected={activeId === id}
          className={activeId === id ? 'on' : ''}
          onClick={() => onChange(id)}
        >
          <Icon size={18} />
          {name}
        </button>
      ))}
    </div>
  )
}

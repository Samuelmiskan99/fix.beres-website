export default function Card({ badge, badgeClassName = 'ic', title, className = '', children, ...rest }) {
  return (
    <article className={`card ${className}`.trim()} {...rest}>
      {badge != null && <div className={badgeClassName}>{badge}</div>}
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

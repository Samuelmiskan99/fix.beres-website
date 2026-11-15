const VARIANTS = { primary: '', ghost: 'ghost', alt: 'alt' }

/** Tombol / link. Mendukung default export maupun named export { Button }. */
export function Button({ variant = 'primary', size, href, children, ...props }) {
  const className = `btn ${VARIANTS[variant] ?? ''} ${size === 'sm' ? 'sm' : ''}`.replace(/\s+/g, ' ').trim()

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return <button className={className} {...props}>{children}</button>
}

export default Button

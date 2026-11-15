import { CONTACT } from '@/data'

export default function Logo({ light = false }) {
  return (
    <div className={`logo ${light ? 'light' : ''}`}>
      <b>fix.<span>beres</span></b>
      <small>{CONTACT.tagline}</small>
    </div>
  )
}

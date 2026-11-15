import { CONTACT } from '@/data'

export const GENERAL_INQUIRY = 'Halo fix.beres, saya mau konsultasi tugas.'

export const buildWhatsAppLink = (message) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`

/** Susun pesan order dari isi form. */
export const formatOrderMessage = ({ name, solution, deadline, detail }) =>
  [
    'Halo fix.beres!',
    `Nama: ${name || '-'}`,
    `Layanan: ${solution}`,
    `Deadline: ${deadline || '-'}`,
    `Detail: ${detail || '-'}`,
  ].join('\n')

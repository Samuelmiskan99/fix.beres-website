export const FAQ_CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'order', label: 'Order & Waktu' },
  { id: 'tech', label: 'IT & Olah Data' },
  { id: 'garansi', label: 'Garansi & Privasi' },
]

export const FAQ_ITEMS = [
  {
    id: 'cara-order',
    cat: 'order',
    q: 'Bagaimana cara order dan apakah harus bayar penuh di awal?',
    a: 'Langsung sat-set: chat via WhatsApp atau isi form singkat di bawah. Kami cek kebutuhanmu dan berikan estimasi harga gratis. Pembayaran fleksibel bisa DP dulu, pelunasan setelah ada progres/selesai.',
    badge: 'Proses < 5 Menit',
    ctaText: 'Order Sekarang',
  },
  {
    id: 'spss-smartpls',
    cat: 'tech',
    q: 'Apakah olah data SPSS / SmartPLS sudah termasuk interpretasi Bab IV?',
    a: 'Ya, lengkap! Kamu tidak hanya menerima file output mentah (.spv / proyek SmartPLS), tapi juga tabel rapi beserta narasi penjelasan uji validitas, reliabilitas, asumsi klasik, hingga uji hipotesis yang siap dimasukkan ke Bab IV.',
    badge: 'SPSS & SmartPLS',
    ctaText: 'Konsultasi Data',
  },
  {
    id: 'tugas-it',
    cat: 'tech',
    q: 'Kalau tugas coding, Linux Server, atau aplikasi error, apakah dijelaskan alurnya?',
    a: 'Pasti! Setiap pengerjaan Web, App Inventor, Python, SQL Database, maupun konfigurasi Linux/Jaringan selalu dilengkapi dokumentasi langkah kerja dan penjelasan logika kode supaya kamu lancar saat demo atau ditanya dosen.',
    badge: 'Full Dokumentasi',
    ctaText: 'Tanya Tugas IT',
  },
  {
    id: 'deadline-mepet',
    cat: 'order',
    q: 'Deadline saya besok pagi (< 24 jam), apakah masih bisa dibantu?',
    a: 'Bisa banget! Pilih mode "Express" saat chat admin. Tim kami siaga 24/7 untuk langsung mengeksekusi tugas kejar tayang malam ini juga tanpa mengorbankan kerapian.',
    badge: 'Express 24 Jam',
    ctaText: 'Cek Slot Express',
  },
  {
    id: 'privasi-aman',
    cat: 'garansi',
    q: 'Apakah identitas, file tugas, dan dataset saya dijamin aman?',
    a: '100% rahasia. Nama, kampus, dokumen skripsi, kode program, maupun dataset penelitianmu tidak akan pernah dipublikasikan atau dibagikan ke pihak mana pun.',
    badge: '100% Confidential',
  },
  {
    id: 'garansi-revisi',
    cat: 'garansi',
    q: 'Bagaimana kalau ada revisi dari dosen atau hasil belum sesuai?',
    a: 'Tenang, ada garansi revisi gratis sesuai kesepakatan awal! Cukup kirimkan catatan revisi dari dosenmu, tim kami langsung bantu perbaiki sampai tuntas.',
    badge: 'Free Revisi',
  },
]

// Backward compatibility export
export const FAQ = FAQ_ITEMS.map((item) => [item.q, item.a])

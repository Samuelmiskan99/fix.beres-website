export const PRICING_TABS = [
  { id: 'technical', name: 'IT, Data & Statistik' },
  { id: 'college', name: 'Skripsi & Akademik' },
]

const CUSTOM = {
  name: 'Custom / Express', price: 'Hubungi kami', desc: 'Deadline < 24 jam atau proyek kompleks', cta: 'Chat Admin', highlighted: true,
  features: ['Cek estimasi gratis', 'Prioritas pengerjaan malam ini', 'Pendampingan sampai sidang', 'Dijamin 100% rahasia'],
}

export const PRICING_TIERS = {
  technical: [
    { name: 'Tugas IT & Linux', from: 'Rp 75rb', desc: 'Linux, Server, Jaringan, Cloud & SQL', cta: 'Pilih paket',
      features: ['Konfigurasi rapi', 'Langkah kerja dijelaskan', '1x revisi minor', 'Dijamin rahasia'] },
    { name: 'SPSS & SmartPLS', from: 'Rp 150rb', desc: 'Olah data statistik + interpretasi lengkap', cta: 'Pilih paket', popular: true,
      features: ['Uji validitas & reliabilitas', 'Regresi / SEM-PLS / Hipotesis', 'Output + narasi Bab IV', 'Free tanya jawab hasil'] },
    { name: 'Web, App & IoT', from: 'Rp 200rb', desc: 'Pembuatan web, App Inventor & tugas akhir', cta: 'Pilih paket',
      features: ['Source code rapi & bersih', 'Bantuan setup / deploy', '2x revisi fitur', 'Dokumentasi penggunaan'] },
    CUSTOM,
  ],
  college: [
    { name: 'Tugas Harian', from: 'Rp 50rb', desc: 'Makalah, essay, resume & PPT slide', cta: 'Pilih paket',
      features: ['Pengerjaan cepat', 'Format sesuai kampus', '1x revisi minor', 'Dijamin rahasia'] },
    { name: 'Turnitin & Formatting', from: 'Rp 100rb', desc: 'Parafrase plagiasi & rapikan dokumen', cta: 'Pilih paket', popular: true,
      features: ['Parafrase natural & rapi', 'Daftar isi & Mendeley otomatis', 'Cek skor Turnitin akhir', 'Siap kumpul'] },
    { name: 'Skripsi & Jurnal', from: 'Rp 500rb', desc: 'Per bab, dari proposal sampai publikasi', cta: 'Pilih paket',
      features: ['Pendampingan metodologi', 'Referensi jurnal relevan', 'Revisi sesuai dosen', 'Jadwal diskusi fleksibel'] },
    CUSTOM,
  ],
}

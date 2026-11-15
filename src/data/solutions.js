import { Server, Code, Database, BarChart3, Target, FileText, BookOpen, Presentation, LayoutTemplate, Lightbulb, Users, ClipboardCheck, Video, MessageCircle, CalendarClock, UserCheck, GraduationCap, Cpu, Compass, ScanSearch } from 'lucide-react'

export const SOLUTIONS = [
  { id: 'technical', name: 'Technical & IT Solution', icon: Cpu, intro: 'Stuck di tugas Server, Linux, Jaringan, Cloud, Coding, Database, atau IoT? Konsultasikan semua kendala IT kamu di sini.',
    items: [
      { icon: Server, title: 'Linux, Server & Jaringan', desc: 'Konfigurasi Linux, server, routing/firewall, Docker, dan cloud.' },
      { icon: Code, title: 'Web, Mobile & IoT Coding', desc: 'Pembuatan web, App Inventor, Python, JavaScript, dan tugas akhir IT.' },
      { icon: Database, title: 'Database & Sistem Informasi', desc: 'Perancangan ERD, query SQL, optimasi database, dan arsitektur sistem.' },
    ] },
  { id: 'data', name: 'Data & Statistik (SPSS / SmartPLS)', icon: BarChart3, intro: 'Olah data penelitian kuantitatif cepat, valid, dan lengkap dengan interpretasi siap sidang.',
    items: [
      { icon: BarChart3, title: 'Olah Data SPSS & SmartPLS', desc: 'Uji validitas, reliabilitas, regresi, SEM-PLS, hingga uji hipotesis.' },
      { icon: FileText, title: 'Interpretasi & Bab IV', desc: 'Penjelasan output tabel dan grafik secara runtut sesuai pedoman kampus.' },
      { icon: Database, title: 'Rapikan Dataset & Kuesioner', desc: 'Cleaning data responden agar lulus uji asumsi klasik maupun outer/inner model.' },
    ] },
  { id: 'college', name: 'College & Academic Solution', icon: GraduationCap, intro: 'Cepat, tepat, dan akurat! Pendampingan untuk semua kebutuhan penulisan akademik kamu.',
    items: [
      { icon: Target, title: 'Bab Skripsi & Proposal', desc: 'Menyusun ide, merapikan alur pembahasan, dan mengembangkan metodologi.' },
      { icon: BookOpen, title: 'Jurnal, Makalah & Essay', desc: 'Menyusun artikel jurnal, makalah, dan mencari referensi kredibel.' },
      { icon: ScanSearch, title: 'Fix Turnitin & Formatting', desc: 'Parafrase penurunan plagiasi, perapian format dokumen, dan PPT Slide.' },
    ] },
  { id: 'general', name: 'General & Consultant Solution', icon: Compass, intro: 'Apa pun jurusanmu, bisa kita bantu dengan diskusi langsung bersama helper.',
    items: [
      { icon: ClipboardCheck, title: 'Bimbingan Tugas Harian', desc: 'Pendampingan langkah demi langkah untuk tugas kuliah semua jurusan.' },
      { icon: Video, title: 'Konsultasi Privat Online', desc: 'Ngobrol langsung secara online untuk bedah kode, data, atau materi sidang.' },
      { icon: UserCheck, title: 'Review Proyek & Dokumen', desc: 'Evaluasi dan perbaikan cepat sebelum tugas dikumpulkan ke dosen.' },
    ] },
]

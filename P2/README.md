# Website Profil Sekolah SMA Negeri 15 Surabaya ("Libels")

Dokumentasi resmi proyek website profil **SMA Negeri 15 Surabaya** ("Libels") yang dikembangkan berdasarkan spesifikasi **Product Requirements Document (PRD)** pada `PemWeb/P2/requirements.md`.

---

## 1. Identitas Institusi
* **Nama Sekolah**: SMA Negeri 15 Surabaya
* **Sebutan / Julukan**: Libels
* **Motto Resmi**: *"Llego A Ganar"* (Datang Untuk Menang)
* **Kepala Sekolah**: Johanes Mardijono, S.Pd., M.M.
* **Akreditasi**: A (Unggul) &bull; NPSN: 20532252
* **Predikat Lingkungan**: Sekolah Adiwiyata Mandiri
* **Alamat**: Jl. Menanggal Selatan No. 103, Gayungan, Kota Surabaya, Jawa Timur 60234
* **Kontak**: Telepon (031) 8290473 | Email: `sman15sby@yahoo.co.id`
* **Media Sosial**: Instagram `@15libels` | Website Resmi: `https://sman15-sby.sch.id/`

---

## 2. Fitur & Pemenuhan PRD (Functional Requirements)

| Kode FR | Modul & Fitur | Halaman Terkait | Status Keterpenuhan |
| :--- | :--- | :--- | :--- |
| **FR-01** | **Beranda (Home)**: Hero section *"Llego A Ganar"*, Quick Access bar, Sambutan Kepala Sekolah, Statistik animated counter, Berita terbaru, Footer terpadu | `index.html` | Selesai & Teruji |
| **FR-02** | **Profil Sekolah**: Sejarah sekolah, Visi resmi, 10 Indikator Visi, 11 Butir Misi strategis, Bagan Struktur Organisasi Pimpinan & WaKa, Direktori Dewan Guru dengan filter rumpun, Fasilitas Sarpras | `pages/profil.html` | Selesai & Teruji |
| **FR-03** | **Akademik**: Kurikulum Merdeka Fase E & F, Program Unggulan (KIR, Riset, Intensif UTBK), Tabel Jadwal Pembelajaran Harian, Tabel Kalender Akademik 2026/2027, Prestasi Akademik | `pages/akademik.html` | Selesai & Teruji |
| **FR-04** | **Kesiswaan**: MPK & OSIS Libels, Event Akbar (Libels Party, Libels Cup, Supporter Liberan / DBL East Java Series), 28+ Ekstrakurikuler dalam 4 rumpun keahlian | `pages/kesiswaan.html` | Selesai & Teruji |
| **FR-05** | **Warta & Berita**: Katalog berita & pengumuman, fitur pencarian teks real-time, filter kategori warta, pop-up modal pembaca detail artikel tanpa reload halaman | `pages/berita.html` | Selesai & Teruji |
| **FR-06** | **Galeri Dokumentasi**: Filter foto multi-kategori (Libels Party, Prestasi, Fasilitas, Ekstrakurikuler, Upacara, Laboratorium), Lightbox modal viewer dengan tombol navigasi Prev/Next dan keyboard shortcut (Esc, Arrow) | `pages/galeri.html` | Selesai & Teruji |
| **FR-07** | **PPDB Online 2026**: Informasi kuota & 5 jalur masuk (Zonasi, Prestasi Rapor, Afirmasi, Mutasi, Prestasi Lomba), Diagram alur step-by-step, checklist berkas persyaratan, accordion interaktif FAQ, CTA pendaftaran | `pages/ppdb.html` | Selesai & Teruji |
| **FR-08** | **Kontak & Pengaduan**: Informasi kontak lengkap, jam operasional kantor, peta interaktif Google Maps kawasan Gayungan, formulir hubungi kami tervalidasi dengan toast feedback sukses | `pages/kontak.html` | Selesai & Teruji |

---

## 3. Konsep Desain & Estetika Institusional
Sesuai arahan dan identitas resmi sekolah:
1. **Minim Gradien & Bebas Efek Glow (Zero Gradient, Zero Glow)**:
   - Menghindari gradien mencolok dan neon box-shadow.
   - Menggunakan *solid color blocking* yang formal, berwibawa, dan elegan khas website instansi pendidikan terakreditasi A.
2. **Palet Warna Resmi**:
   - **Deep Libels Navy** (`#0F2C59` & `#081D3D`) sebagai warna utama header, banner, dan footer.
   - **Solid Warm Gold** (`#D97706` & `#B45309`) sebagai aksen penegas, tombol CTA, badge, dan garis identitas.
   - **Clean Surfaces** (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`) dengan border halus (`#E2E8F0`) untuk keterbacaan artikel yang nyaman.
3. **Tipografi Modern & Resmi**:
   - Heading menggunakan font *Outfit* yang tegas dan presisi.
   - Konten teks isi menggunakan *Plus Jakarta Sans* yang ergonomis dan mudah dibaca di berbagai resolusi layar.
4. **Responsif & Mobile Friendly**:
   - Tampilan adaptif penuh untuk Desktop, Tablet, dan Smartphone dengan navigasi drawer hamburger interaktif.

---

## 4. Struktur Direktori Berkas (Sesuai Ketentuan PRD Section 13)

```text
PemWeb/P2/
├── index.html                   # Beranda Utama SMAN 15 Surabaya
├── README.md                    # Dokumentasi Proyek Website
├── requirements.md              # Dokumen Spesifikasi PRD
├── pages/                       # Modul Halaman
│   ├── profil.html              # Sejarah, Visi Misi, Struktur Organisasi, Dewan Guru
│   ├── akademik.html            # Kurikulum Merdeka, Jadwal KBM, Kalender Akademik
│   ├── kesiswaan.html           # OSIS, Libels Party, DBL Liberan, Ekstrakurikuler
│   ├── berita.html              # Warta, Pengumuman, Live Search & Filter, Reader Modal
│   ├── galeri.html              # Galeri Dokumentasi Foto & Lightbox Modal Viewer
│   ├── ppdb.html                # Panduan PPDB Jatim, Alur, Syarat, FAQ Accordion
│   └── kontak.html              # Alamat Sekolah, Google Maps, Form Kirim Pesan
├── assets/
│   ├── css/
│   │   └── style.css            # Stylesheet Desain Sistem Institusional (Solid Colors)
│   ├── js/
│   │   └── app.js               # Logika Interaktif Navigasi, Filter, Lightbox, Form, Counter
│   └── images/                  # Seluruh Aset Gambar Tersimpan Secara Lokal
│       ├── SMAN-15-SBY.png      # Logo Resmi SMA Negeri 15 Surabaya
│       ├── pak-jo-2.jpg         # Foto Resmi Kepala Sekolah (Johanes Mardijono, S.Pd., M.M.)
│       ├── waka-kurikulum.jpg   # Foto WaKa Bidang Kurikulum
│       ├── waka-humas.jpg       # Foto WaKa Bidang Humas
│       ├── waka-kesiswaan.jpg   # Foto WaKa Bidang Kesiswaan
│       ├── waka-sarpras.jpg     # Foto WaKa Bidang Sarpras
│       ├── guru-*.jpg           # Foto Profil 12 Dewan Guru Berbagai Rumpun Mata Pelajaran
│       ├── libels-party.jpg     # Dokumentasi Pensi Akbar Libels Party
│       ├── prestasi-basket.jpg  # Dokumentasi Tim Basket Libels & Aksi DBL
│       ├── lab-sains.jpg        # Dokumentasi Praktikum Laboratorium Sains Terpadu
│       ├── perpustakaan.jpg     # Dokumentasi Ruang Baca Perpustakaan Sekolah
│       ├── ekskul-paskibra.jpg  # Dokumentasi Latihan Baris-Berbaris PASLIBELS
│       ├── upacara.jpg          # Dokumentasi Upacara Bendera & KBM Siswa
│       ├── lab-komputer.jpg     # Dokumentasi Laboratorium Komputer ANBK
│       ├── lapangan-olahraga.jpg# Dokumentasi Lapangan Olahraga & Supporter Liberan
│       ├── kbm-kelas.jpg        # Dokumentasi Suasana Pembelajaran Interaktif di Kelas
│       └── berita-fase.jpg      # Dokumentasi Lampiran Pengumuman Kurikulum
└── components/                  # Komponen Modular (Reusable Template Components)
    ├── navbar.html              # Template Navigasi Bar & Top Contact Info
    └── footer.html              # Template Footer Institusi Resmi
```

---

## 5. Panduan Menjalankan Secara Lokal

Website ini dibangun menggunakan arsitektur web standar (HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript) tanpa ketergantungan paket node atau kompilasi build yang rumit.

### Opsi 1: Membuka Langsung di Web Browser
1. Buka File Explorer ke folder `PemWeb/P2/`.
2. Klik ganda pada berkas `index.html`.
3. Website akan langsung terbuka di browser default (Google Chrome, Microsoft Edge, Firefox, dll).

### Opsi 2: Menggunakan Live Server (VS Code / Antigravity)
1. Buka folder `PemWeb/P2` di editor.
2. Klik kanan pada berkas `index.html`, pilih **Open with Live Server**.
3. Website dapat diakses melalui alamat `http://127.0.0.1:5500/index.html`.

### Opsi 3: Menggunakan Python HTTP Server
Jalankan perintah berikut pada terminal di folder `PemWeb/P2`:
```bash
python -m http.server 8000
```
Lalu buka browser di `http://localhost:8000`.

---

## 6. Checklist Acceptance Criteria
- [x] Semua menu utama dapat diakses (`index.html`, `profil.html`, `akademik.html`, `kesiswaan.html`, `berita.html`, `galeri.html`, `ppdb.html`, `kontak.html`).
- [x] Navigasi berfungsi konsisten dan responsif pada mobile serta desktop.
- [x] Konten profil sekolah tersedia lengkap dengan Visi & Misi 11 poin resmi SMAN 15 Surabaya.
- [x] Struktur organisasi pimpinan & wakil kepala sekolah tersaji jelas.
- [x] Berita dan pengumuman dapat disaring dan dicari secara dinamis.
- [x] Galeri dokumentasi dilengkapi filter kategori dan lightbox modal preview resolusi besar.
- [x] Informasi PPDB 2026 lengkap dengan alur flowchart dan accordion FAQ.
- [x] Form kontak berfungsi dengan validasi input dan umpan balik toast sukses.
- [x] Footer informatif dan seragam di seluruh halaman.
- [x] Tidak terdapat broken link antar berkas.
- [x] Desain formal, profesional, tanpa efek glow atau gradien berlebih.

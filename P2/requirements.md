# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Website Profil Sekolah SMA

---

## 1. Informasi Produk

| Item | Detail |
| :--- | :--- |
| **Nama Produk** | Website Profil Sekolah SMA |
| **Jenis Produk** | Website Informasi & Profil Institusi |
| **Target Pengguna** | Siswa, calon siswa, orang tua, guru, alumni, masyarakat |
| **Platform** | Web Responsive |
| **Tujuan** | Menyediakan informasi resmi sekolah secara terstruktur, menarik, dan mudah diakses |

---

## 2. Latar Belakang

Website sekolah menjadi media digital untuk menyampaikan informasi mengenai identitas sekolah, program akademik, kegiatan siswa, prestasi, berita, fasilitas, serta informasi penerimaan peserta didik baru. Website dirancang tidak hanya sebagai *company profile* sekolah, tetapi juga sebagai pusat informasi digital sekolah.

---

## 3. Tujuan Produk

* Menampilkan profil dan identitas sekolah.
* Menyampaikan informasi akademik dan kesiswaan.
* Menampilkan berita dan kegiatan sekolah.
* Menampilkan dokumentasi dalam bentuk galeri.
* Menyediakan informasi PPDB.
* Menyediakan informasi kontak sekolah.
* Memberikan pengalaman pengguna yang responsif pada desktop dan mobile.

---

## 4. Target Pengguna

* **Pengunjung Umum:** Mencari informasi mengenai sekolah, fasilitas, program, dan kontak.
* **Calon Siswa:** Mencari informasi akademik, kegiatan, prestasi, dan PPDB.
* **Orang Tua:** Mencari informasi program sekolah, jadwal, pengumuman, dan kegiatan.
* **Siswa:** Mengakses berita, agenda, pengumuman, dan informasi sekolah.
* **Guru/Staff:** Menyampaikan informasi dan mengelola konten melalui sistem administrasi.

---

## 5. Struktur Website

* **Website Profil Sekolah**
  * **Beranda**
  * **Profil**
    * Sejarah
    * Visi & Misi
    * Struktur Organisasi
    * Sambutan Kepala Sekolah
    * Tenaga Pendidik
    * Sarana & Prasarana
  * **Akademik**
    * Kurikulum
    * Program Unggulan
    * Jadwal Pelajaran
    * Kalender Akademik
    * Ekstrakurikuler
    * Prestasi Akademik
  * **Kesiswaan**
    * OSIS
    * Ekstrakurikuler
    * Prestasi Siswa
    * Kegiatan Siswa
  * **Berita**
  * **Galeri**
  * **PPDB**
  * **Kontak**

---

## 6. Functional Requirements

### FR-01: Beranda
* Header dan navigation
* Hero section: nama sekolah, tagline, foto sekolah, tombol Profil Sekolah, PPDB, Video Profil
* Keunggulan sekolah
* Berita terbaru
* Agenda kegiatan
* Quick access
* Statistik sekolah
* Footer

### FR-02: Profil Sekolah
* Sejarah
* Visi dan misi
* Struktur organisasi
* Sambutan kepala sekolah
* Tenaga pendidik
* Fasilitas
* Identitas sekolah

### FR-03: Akademik
* Kurikulum
* Program unggulan
* Jadwal pelajaran
* Kalender akademik
* Program akademik
* Prestasi akademik

### FR-04: Kesiswaan
* OSIS
* Ekstrakurikuler
* Prestasi siswa
* Kegiatan siswa

### FR-05: Berita
* **Data Berita:** Judul, thumbnail, tanggal, kategori, ringkasan, konten, penulis
* **Fitur:** Search, filter kategori, pagination, detail berita

### FR-06: Galeri
* **Kategori:** Semua, kegiatan, prestasi, fasilitas, ekstrakurikuler, upacara, laboratorium
* Preview gambar ukuran lebih besar (*lightbox/modal*)

### FR-07: PPDB
* Informasi PPDB, persyaratan, jadwal, alur pendaftaran, dokumen, FAQ, link pendaftaran
* **CTA:** DAFTAR SEKARANG

### FR-08: Kontak
* Alamat, telepon, email, jam operasional, Google Maps, formulir kontak, media sosial
* **Form Field:** Nama, email, subjek, pesan

---

## 7. Admin / Content Management

### Admin Dashboard
* Dashboard
* Profil Sekolah
* Berita
* Agenda
* Galeri
* Prestasi
* Program Akademik
* PPDB
* Pengumuman
* Pesan Kontak
* User Management

> **Catatan:** Admin dapat melakukan operasi Create, Read, Update, dan Delete (CRUD) terhadap konten website.

---

## 8. Non-Functional Requirements

### Responsive
* Desktop
* Tablet
* Mobile

### Performance
* Optimasi gambar
* Lazy loading
* Minifikasi aset
* Caching

### Accessibility
* Kontras warna
* Ukuran teks
* Alt text gambar
* Navigasi keyboard
* Struktur heading yang benar

### Security
* Validasi input
* Sanitasi data
* HTTPS
* Autentikasi admin
* Proteksi halaman admin

---

## 9. Teknologi yang Dapat Digunakan

* **Level 1 — Static Website:**
  * HTML + CSS + JavaScript + Bootstrap
* **Level 2 — Dynamic Website:**
  * HTML + CSS + JavaScript + PHP + MySQL + XAMPP/Laragon
* **Level 3 — Modern Web Development:**
  * **Frontend:** HTML, CSS, JavaScript
  * **Backend:** PHP / Node.js
  * **Database:** MySQL / Supabase
  * **Version Control:** Git & GitHub
  * **Deployment:** Vercel / Netlify

---

## 10. Struktur Database

Daftar tabel database:
* `users`
* `schools`
* `teachers`
* `programs`
* `extracurriculars`
* `achievements`
* `news`
* `categories`
* `events`
* `galleries`
* `gallery_categories`
* `announcements`
* `ppdb_information`
* `contacts`

**Relasi Utama:**
* `categories` $\rightarrow$ `news`
* `gallery_categories` $\rightarrow$ `galleries`
* `users` $\rightarrow$ `news`

---

## 11. Prioritas Fitur

### MVP (Minimum Viable Product)
* Beranda
* Profil
* Akademik
* Kesiswaan
* Berita
* Galeri
* PPDB
* Kontak
* Responsive Design

### Pengembangan Berikutnya
* Admin Dashboard
* Database
* Login Admin
* CMS Berita
* CMS Galeri
* Search
* API
* Statistik pengunjung
* Integrasi Google Maps
* Integrasi media sosial

---

## 12. User Flow

### Flow Navigasi Pengunjung

```
Pengunjung
   │
   ▼
Beranda
   ├── Profil
   ├── Akademik
   ├── Kesiswaan
   ├── Berita
   ├── Galeri
   ├── PPDB
   └── Kontak
```

### Contoh Flow Calon Siswa
$$\text{Beranda} \rightarrow \text{Profil Sekolah} \rightarrow \text{Program Unggulan} \rightarrow \text{Prestasi} \rightarrow \text{PPDB} \rightarrow \text{Persyaratan} \rightarrow \text{Daftar}$$

---

## 13. Contoh Struktur Project

```text
school-profile/
├── index.html
├── README.md
├── pages/
│   ├── profil.html
│   ├── akademik.html
│   ├── kesiswaan.html
│   ├── berita.html
│   ├── galeri.html
│   ├── ppdb.html
│   └── kontak.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
└── components/
    ├── navbar.html
    └── footer.html
```

---

## 14. Acceptance Criteria

- [ ] Semua menu utama dapat diakses.
- [ ] Navigasi berfungsi dengan baik.
- [ ] Tampilan responsif pada berbagai ukuran layar.
- [ ] Konten profil sekolah tersedia lengkap.
- [ ] Berita dapat ditampilkan.
- [ ] Galeri dapat ditampilkan.
- [ ] Informasi PPDB tersedia dan jelas.
- [ ] Form kontak dapat digunakan.
- [ ] Footer tersedia pada seluruh halaman.
- [ ] Tidak terdapat *broken link*.
- [ ] Website dapat dijalankan secara lokal.
- [ ] Project dapat disimpan di repositori GitHub.

---

## 15. Konsep Final Project Mahasiswa

> **Tema:** *"Membangun Website Profil Sekolah SMA yang Informatif, Responsive, dan Terintegrasi."*

### Tahapan Pengerjaan:
1. Analisis kebutuhan
2. Sitemap
3. Wireframe
4. UI Design
5. HTML
6. CSS / Bootstrap
7. JavaScript
8. PHP + MySQL
9. Git + GitHub
10. Testing
11. Deployment
12. Showcase

### Output Akhir:
* Website Profil Sekolah
* Source Code
* GitHub Repository
* Database
* Dokumentasi
* Presentation / Showcase
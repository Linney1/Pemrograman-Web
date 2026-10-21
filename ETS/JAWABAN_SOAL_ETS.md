# Jawaban Evaluasi Tengah Semester (ETS) — Pemrograman Web
**Studi Kasus:** LibraryReg — Aplikasi Pendaftaran Anggota Perpustakaan (Perpustakaan ITS)

---

## Soal 1: Deskripsi dan Ruang Lingkup Pekerjaan yang Akan Dibuat

### 1.1 Deskripsi Sistem
**LibraryReg** adalah aplikasi web sisi klien (*front-end web application*) yang dirancang untuk mendigitalisasi proses administrasi pendaftaran dan pengelolaan anggota pada **UPT Perpustakaan Perguruan Tinggi (Perpustakaan ITS)**. Sebelumnya, pendaftaran anggota dilakukan secara manual menggunakan formulir kertas yang menimbulkan berbagai kendala operasional, antara lain:
1. Antrean panjang di loket pendaftaran pada awal semester.
2. Risiko kesalahan pencatatan data (*human error*) akibat tulisan tangan yang sulit terbaca.
3. Kesulitan petugas dalam menelusuri atau memverifikasi informasi anggota secara cepat.
4. Lambatnya proses pembuatan kartu anggota perpustakaan.

Melalui **LibraryReg**, calon anggota (Mahasiswa, Dosen, maupun Tenaga Kependidikan) dapat membaca informasi layanan perpustakaan pada *Landing Page*, melihat daftar anggota, serta melakukan registrasi mandiri pada halaman terpisah (`pendaftaran.html`) agar tampilan tetap bersih dan tidak padat. Sementara itu, petugas perpustakaan (*Admin*) yang masuk melalui fitur **Login Petugas** dapat mengakses fitur **Pengelolaan Data Anggota** secara penuh (melihat detail & kartu anggota digital, mengedit data, serta menghapus data dengan konfirmasi). Seluruh data dikelola secara persisten pada sisi *front-end* memanfaatkan **JavaScript** dan **`localStorage`** peramban (*browser*).

---

### 1.2 Ruang Lingkup Pekerjaan (*Scope of Work*)

#### A. Ruang Lingkup Fungsional (*Functional Scope*)
1. **Pengembangan Landing Page Informasi Perpustakaan (`index.html`):**
   - Menyajikan *Header* dengan identitas visual resmi (`Logo_1.png` Perpustakaan ITS) dan nama aplikasi **LibraryReg**.
   - Menyajikan *Hero Section* berisi proposisi nilai utama, tombol ajakan (*Call-to-Action* menuju halaman `pendaftaran.html` & bagian `#daftar-anggota`), serta pratinjau kartu anggota digital.
   - Menampilkan bagian **Statistik Ilustratif** (jumlah koleksi buku cetak, *e-journal*, anggota aktif, serta penghitung dinamis anggota terdaftar pada `localStorage`).
   - Menampilkan bagian **Tentang Perpustakaan** yang merangkum keunggulan sistem dan fasilitas fisik/digital gedung perpustakaan.
   - Menampilkan bagian **Layanan Perpustakaan** (Sirkulasi Peminjaman, Akses *E-Resources*, Aktivasi & Bebas Pustaka, serta Klinik Literasi).
   - Menampilkan **Footer** yang memuat alamat kontak resmi dan rincian jam operasional layanan.

2. **Pengelolaan Menu Navigasi Responsif:**
   - Mengimplementasikan *Navbar* responsif berbasis **Bootstrap 5** dengan 6 menu utama: **Beranda**, **Tentang Perpustakaan**, **Layanan**, **Daftar Anggota**, **Pendaftaran Anggota** (menuju halaman terpisah `pendaftaran.html`), dan **Login Petugas (Simulasi Antarmuka)**.
   - Menerapkan navigasi *smooth-scrolling* antarbagian pada *Landing Page* serta pembaruan penanda menu aktif (*active state*).

3. **Halaman Terpisah Formulir Pendaftaran Anggota (`pendaftaran.html`):**
   - Memisahkan formulir registrasi ke halaman tersendiri agar antarmuka utama tidak penuh (*crowded*).
   - Menyediakan input terstruktur meliputi: **Nama Lengkap**, **NIM/NIP**, **Program Studi/Unit**, **Alamat Lengkap**, **Nomor Telepon**, **Email**, dan **Jenis Keanggotaan** (*Mahasiswa*, *Dosen*, *Tenaga Kependidikan*).
   - Mengimplementasikan validasi *client-side* menggunakan JavaScript:
     - Validasi seluruh kolom wajib diisi (*required fields*).
     - Validasi format alamat email menggunakan ekspresi reguler (*Regex*).
     - Validasi format nomor telepon (8–15 digit angka).
     - Validasi **keunikan NIM/NIP** terhadap data yang sudah ada di `localStorage` untuk mencegah duplikasi anggota.

4. **Daftar Anggota (Pengunjung) vs. Pengelolaan Anggota (Khusus Admin Petugas):**
   - **Mode Pengunjung Reguler (*Regular User*):** Hanya menampilkan **Daftar Anggota** publik (No, NIM/NIP, Nama Lengkap, Program Studi/Unit, Jenis Keanggotaan, Tanggal Terdaftar) beserta fitur pencarian berdasarkan Nama atau NIM/NIP tanpa tombol aksi pengelolaan.
   - **Mode Admin / Petugas (Setelah *Login Petugas*):** Menampilkan **Daftar & Pengelolaan Data Anggota** lengkap dengan kolom Kontak serta **Aksi Pengelolaan**:
     - **Lihat Detail:** Menampilkan rincian informasi anggota sekaligus kartu anggota digital dalam *Modal*.
     - **Edit Data:** Memperbarui data anggota melalui *Modal Edit* lengkap dengan validasi ulang.
     - **Hapus Data:** Menghapus data anggota yang dilengkapi **dialog konfirmasi hapus**.
     - **Notifikasi & Persistensi:** Menampilkan umpan balik (*alert banner*) keberhasilan maupun kesalahan, serta menyimpan perubahan secara permanen di `localStorage`.

#### B. Ruang Lingkup Teknis & Batasan Sistem (*Technical Scope & Boundaries*)
- **Teknologi:** HTML5 Semantik (`index.html` & `pendaftaran.html`), CSS3 (Pendekatan *Minimalist Flat UI* dengan palet Biru `#0060B6` dan Putih `#FFFFFF` tanpa efek *gradient*), Bootstrap 5.3, Bootstrap Icons, dan Vanilla JavaScript (ES6+).
- **Penyimpanan Data:** Menggunakan `window.localStorage` pada sisi *front-end* untuk menyimpan daftar anggota (`libraryReg_members_v1`) dan status sesi petugas (`libraryReg_staff_logged_in`).

---

## Soal 2: Rancangan Halaman dan Struktur Menu

### 2.1 Struktur Halaman dan Menu Navigasi (*Sitemap & Navigation Hierarchy*)
Aplikasi dirancang dengan struktur 2 halaman utama yang saling terhubung melalui *Navbar* responsif serta *state* hak akses (Pengunjung Reguler vs. Petugas Admin):

```text
LibraryReg Web Application
│
├── 1. Halaman Utama / Landing Page (index.html)
│   ├── [Navbar Sticky-Top Responsif]
│   │   ├── Beranda (#beranda) ──────────────────► Hero Section, CTA, Pratinjau Kartu, & Bar Statistik
│   │   ├── Tentang Perpustakaan (#tentang) ─────► 3 Keunggulan Sistem & 4 Fasilitas Gedung
│   │   ├── Layanan (#layanan) ──────────────────► 4 Kartu Layanan Sirkulasi & Literasi
│   │   ├── Daftar Anggota (#daftar-anggota)
│   │   │   ├── [Mode Pengunjung Biasa] ─────────► Menampilkan "Daftar Anggota" & Pencarian Nama/NIM/NIP
│   │   │   └── [Mode Admin / Petugas] ──────────► Menampilkan "Daftar & Pengelolaan Data Anggota" (CRUD)
│   │   ├── Pendaftaran Anggota (pendaftaran.html)► Berpindah ke Halaman Khusus Registrasi Anggota Baru
│   │   └── Login Petugas (#modalLoginPetugas) ──► Simulasi Login untuk Mengaktifkan Mode Admin
│   │
│   ├── [Komponen Modal Khusus Admin Petugas]
│   │   ├── Modal Detail Anggota (#modalDetailAnggota) ─► Kartu Anggota Digital & Rincian Lengkap
│   │   ├── Modal Edit Anggota (#modalEditAnggota) ─────► Formulir Pembaruan Data Anggota
│   │   └── Modal Hapus Anggota (#modalHapusAnggota) ───► Dialog Konfirmasi Penghapusan Data
│   │
│   └── [Footer] ────────────────────────────────► Identitas Perpustakaan, Navigasi Cepat, Jam Layanan, & Kontak
│
└── 2. Halaman Pendaftaran Anggota Baru (pendaftaran.html)
    ├── [Navbar Sticky-Top Responsif] (Penanda Aktif pada "Pendaftaran Anggota")
    ├── [Breadcrumb & Ringkasan Jumlah Terdaftar]
    ├── [Panel Ketentuan Validasi + Formulir Pendaftaran Digital (Form F-01)]
    └── [Footer]
```

### 2.2 Spesifikasi Rancangan Halaman

| No | Nama Halaman / Bagian | File / ID | Pengguna Sasaran | Komponen Utama & Fungsi |
| :-: | :--- | :--- | :--- | :--- |
| 1 | **Header & Navigasi** | `#mainNavbar` | Semua Pengguna | Logo Perpustakaan ITS (`Logo_1.png`), nama aplikasi, menu navigasi dengan *active indicator*, dan tombol *Login Petugas*. |
| 2 | **Beranda (Hero & Statistik)** | `index.html#beranda` | Pengunjung / Calon Anggota | Judul utama, deskripsi singkat, 2 tombol CTA (*Daftar Anggota Sekarang* & *Lihat Daftar Anggota*), kartu pratinjau anggota, dan 4 metrik statistik. |
| 3 | **Tentang Perpustakaan** | `index.html#tentang` | Pengunjung / Calon Anggota | Penjelasan 3 keunggulan transformasi digital perpustakaan dan 4 fasilitas utama (Ruang Baca, Ruang Diskusi, Wi-Fi/OPAC, *Self-Loan Kiosk*). |
| 4 | **Layanan Perpustakaan** | `index.html#layanan` | Pengunjung / Anggota | 4 kartu informasi layanan: Sirkulasi Peminjaman, Akses *E-Resources*, Aktivasi & Bebas Pustaka, serta Klinik Literasi. |
| 5 | **Daftar Anggota (Mode Reguler)** | `index.html#daftar-anggota` | Pengunjung Biasa | Menampilkan ringkasan kategori, pencarian Nama/NIM/NIP, filter jenis keanggotaan, dan tabel direktori anggota (tanpa tombol Edit/Hapus). |
| 6 | **Pengelolaan Anggota (Mode Admin)** | `index.html#daftar-anggota` | Petugas Perpustakaan (Admin) | Aktif setelah *Login Petugas*; menampilkan judul *Daftar & Pengelolaan Data Anggota*, kolom Kontak, serta tombol aksi *Lihat Detail*, *Edit*, dan *Hapus*. |
| 7 | **Halaman Pendaftaran Anggota** | `pendaftaran.html` | Calon Anggota | Halaman terpisah berisi panduan ketentuan validasi dan formulir 7 kolom input beserta notifikasi keberhasilan/kesalahan. |
| 8 | **Footer** | `<footer>` | Semua Pengguna | Informasi alamat Gedung Perpustakaan ITS, nomor telepon, email, serta jadwal jam buka layanan Senin–Sabtu. |

---

## Soal 3: Desain UI Landing Page

### 3.1 Konsep Visual & Palet Warna (*Minimalist Flat Blue & White*)
Desain antarmuka mengusung gaya **Academic Minimalist Flat UI** yang mengutamakan keterbacaan, ruang kosong (*whitespace*) yang lega, garis batas tegas berukuran `1px`, serta **tanpa efek gradasi (*zero gradient*)** sesuai pedoman identitas Perpustakaan ITS:
- **Warna Primer (ITS Blue):** `#0060B6` (Tombol utama, *stats bar*, aksen garis atas kartu, dan ikon utama).
- **Warna Aksen Lembut (Soft Ice Blue):** `#EBF4FF` dengan *border* `#C2DDFB` (Penanda menu aktif, *badge* kategori, dan latar kotak ikon).
- **Warna Aksen Detail (ITS Gold Accent):** `#E5A000` / `#FEF9E7` (Digunakan secara minimalis pada *badge* kategori Dosen selaras dengan elemen warna logo Perpustakaan ITS).
- **Warna Latar & Permukaan:** Putih murni `#FFFFFF` dan Abu-abu Kebiruan Sangat Muda `#F7FAFC` untuk membedakan antarbagian secara bersih.
- **Warna Teks & Garis Batas:** Biru Tua Gelap `#0F172A` untuk judul, `#475569` untuk teks paragraf, dan `#E2E8F0` untuk garis pembatas (*border*).

### 3.2 Wireframe Tata Letak UI Landing Page (`index.html`) & Halaman Pendaftaran (`pendaftaran.html`)

#### A. Wireframe Landing Page (`index.html`)
![](/Landing-Page.png)

#### B. Wireframe Halaman Terpisah Pendaftaran Anggota (`pendaftaran.html`)
![](/Pendaftaran-Anggota.png)

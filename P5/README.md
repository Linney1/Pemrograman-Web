# Dokumentasi Student Management Dashboard — Pertemuan 5

## Deskripsi Produk

**Student Management** adalah aplikasi web berbasis dashboard untuk pengelolaan data mahasiswa (CRUD) yang dibangun dengan **HTML, CSS, dan JavaScript murni tanpa framework**. Aplikasi ini memungkinkan pengguna (admin akademik, staf administrasi, dosen) mencatat, mencari, mengubah, menghapus, serta melihat data mahasiswa secara efisien dalam satu halaman responsif.

Data tersimpan secara lokal melalui **localStorage**, sehingga tidak akan hilang saat browser direfresh.

---

## Struktur Berkas

```
P5/
├── index.html         # Struktur semantik HTML5 (Navbar, Form, Tabel, Modal, Toast)
├── style.css          # Desain sistem dengan token CSS semantik & responsif
├── script.js          # Logika aplikasi (CRUD, validasi, live search, pagination, storage)
├── requirements.md    # Dokumen spesifikasi kebutuhan produk
└── README.md          # Dokumentasi teknis & panduan penggunaan
```

---

## Cara Menjalankan

Aplikasi ini tidak memerlukan instalasi backend maupun server Node.js.
Cukup buka berkas **`index.html`** langsung menggunakan peramban (Google Chrome, Firefox, Microsoft Edge, Safari, dll).

---

## Desain & Anti-AI Slop Standards

Sesuai panduan *Additional Requirements*, desain dirancang dengan prinsip estetika dan kegunaan nyata:
- **Tipografi Terarah:** Menggunakan **Plus Jakarta Sans** (teks & judul) berpasangan dengan **JetBrains Mono** (NIM, kode, angka numerik). Menghindari *The Inter Default*.
- **Tanpa Gradien SaaS Klise:** Menghindari *Purple-to-Blue Gradient Syndrome*. Seluruh warna solid dan harmonis.
- **Sistem Warna Semantik:** Menggunakan variabel CSS semantik di `:root`:
  - `--color-action-primary` (`#0369a1` cobalt) untuk aksi utama.
  - `--color-feedback-danger` (`#dc2626`) untuk kesalahan validasi dan aksi hapus.
  - `--color-feedback-success` (`#15803d`) untuk konfirmasi data berhasil disimpan.
  - `--color-row-editing-bg` (`#f0f7ff`) dan `--color-row-editing-border` (`#0284c7`) untuk menandai baris yang sedang diedit.
  - *Department Badges* khusus untuk masing-masing dari 6 jurusan.
- **Judul Spesifik:** Menghindari slogan abstrak ("Build the future"). Semua teks lugas dan berkonteks akademis.

---

## Pemenuhan Kebutuhan Fungsional (FR)

| Kode | Kebutuhan | Implementasi |
| :--- | :--- | :--- |
| **FR-01** | **Input NIM** | Wajib diisi, hanya berisi angka (`/^\d+$/`), panjang 5–16 digit, dan divalidasi keunikan NIM terhadap data yang sudah ada (kecuali record yang sedang diedit). Dilengkapi counter panjang karakter. |
| **FR-02** | **Input Nama Lengkap** | Wajib diisi, minimal 3 karakter. |
| **FR-03** | **Pilih Jurusan** | Dropdown memilih 1 dari 6 jurusan: *Sistem Informasi, Teknologi Informasi, Teknik Informatika, Teknik Elektro, Teknik Komputer, Teknik Biomedik*. Wajib dipilih. |
| **FR-04** | **Input Email** | Wajib diisi dan divalidasi menggunakan format regex email standar RFC. |
| **FR-05** | **Validasi Form** | Border input berubah merah (`.is-invalid`), pesan kesalahan muncul tepat di bawah field, dan input yang keliru otomatis difokuskan serta diberi animasi shake halus. Pesan otomatis hilang saat pengguna mulai mengoreksi isian. |
| **FR-06** | **Simpan Data** | Data yang valid ditambahkan ke daftar, disimpan ke localStorage, form dikosongkan, halaman berpindah ke awal untuk meninjau data baru, dan notifikasi toast sukses ditampilkan. |
| **FR-07** | **Reset** | Tombol Reset mengosongkan seluruh isian form dan menghapus pesan error yang aktif. |
| **FR-08** | **Batal** | Membatalkan proses pengisian/edit dan mengembalikan form ke mode tambah data. Jika form sedang terisi (dirty), modal konfirmasi ditampilkan terlebih dahulu untuk mencegah hilangnya input secara tidak sengaja. |
| **FR-09** | **Tampil Data** | Data ditampilkan dalam tabel rapi berisi: Nomor urut terpaginasi, NIM monospace, Nama lengkap, Jurusan dengan badge berwarna, Email, dan Tombol Aksi (Edit & Hapus). |
| **FR-10** | **Edit Data** | Tombol Edit memuat data mahasiswa ke dalam form, judul tombol berubah menjadi "Update" (dengan warna hijau toska), status badge berubah menjadi "Edit Data", banner info edit muncul, dan baris mahasiswa yang bersangkutan pada tabel diberi highlight warna khusus. |
| **FR-11** | **Hapus Data** | Tombol Hapus memicu modal konfirmasi custom ("Apakah Anda yakin ingin menghapus data...?"). Data baru dihapus dari tabel dan localStorage setelah pengguna mengonfirmasi persetujuan. |
| **FR-12** | **Cari Mahasiswa** | Kolom pencarian berjalan real-time saat mengetik (*on input*) mencocokkan NIM, Nama, Jurusan, atau Email. Dilengkapi tombol hapus cepat (✕) dan otomatis mereset paginasi ke halaman 1. |
| **FR-13** | **Pagination** | Menampilkan 5 data per halaman (`ITEMS_PER_PAGE = 5`). Navigasi dinamis dengan tombol « (Prev), angka halaman (1, 2, ...), dan » (Next). Dilengkapi info "Menampilkan X - Y dari Z data". |
| **FR-14** | **Penyimpanan Data** | Seluruh data disimpan di `localStorage` dengan kunci `student_management_data`. Jika storage masih kosong, aplikasi memuat 8 data awal realistis agar fitur tabel dan paginasi langsung terlihat berfungsi. |
| **FR-15** | **Navigasi Tampilan** | Menu header `Home`, `Students`, dan `About` dirancang sebagai elemen visual statis (`pointer-events: none; cursor: default;`) dengan penanda aktif pada menu `Students`. |
| **FR-16** | **Responsive Design** | Menggunakan CSS Grid dan Flexbox. Tampilan otomatis menyesuaikan layar desktop (2 kolom berdampingan), tablet (tata letak adaptif), maupun ponsel pintar (1 kolom bertumpuk dengan tabel scrollable horizontal). |

---

## Struktur Data Mahasiswa (JSON)

```json
{
  "nim": "5025211001",
  "nama": "Ahmad Rizki Pratama",
  "jurusan": "Teknik Informatika",
  "email": "ahmad.rizki@student.its.ac.id"
}
```

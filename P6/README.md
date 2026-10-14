# Dokumentasi Tugas JavaScript — Pertemuan 6

## Deskripsi

Tugas ini berisi dua latihan validasi form JavaScript dalam satu website. Program dibuat hanya menggunakan **HTML, CSS, dan JavaScript** tanpa framework atau library tambahan.

Struktur file:

```
P6/
├── index.html   # Struktur halaman (Beranda, Tugas 1, Tugas 2)
├── style.css    # Tampilan (palet warm off-white + pastel, token warna semantik)
└── script.js    # Logika navigasi & validasi form
```

Cara menjalankan: buka `index.html` langsung di browser.

## Desain

- **Tipografi:** Fraunces (judul), IBM Plex Sans (teks), IBM Plex Mono (label & data).
- **Warna:** latar kertas hangat (`#faf7f2`) dengan aksen pastel. Tidak memakai gradien dekoratif.
- **Token warna semantik** di `:root`, setiap warna punya fungsi:

| Token | Fungsi |
| --- | --- |
| `--color-action-primary` | Tombol utama, fokus, pilihan aktif (terracotta) |
| `--color-feedback-success(-bg)` | Field/email valid (sage) |
| `--color-feedback-error(-bg)` | Pesan error, field tidak valid (rose) |
| `--color-feedback-warning(-bg)` | Saran typo domain (butter) |
| `--color-link` / `--color-feedback-info-bg` | Tautan & aksi sekunder (biru pastel) |
| `--color-highlight-bg` | Sorotan teks yang cocok di autocomplete |

## Interface Utama

Halaman utama (Beranda) menyediakan menu untuk membuka masing-masing tugas. Navigasi juga tersedia di header. Setiap tugas bisa dibuka langsung lewat URL `#tugas1` atau `#tugas2`.

## 1. Form Registration Sederhana

Form registrasi mahasiswa dengan validasi di sisi klien.

**Field & aturan validasi:**

| Field | Aturan |
| --- | --- |
| Nama Lengkap | Wajib, hanya huruf/spasi, minimal 3 karakter |
| NRP / NIM | Wajib, tepat 10 digit angka, tidak boleh duplikat |
| Program Studi | Wajib dipilih |
| Email | Wajib, format email valid (regex) |
| No. HP | Wajib, diawali `08` / `+628`, 10–13 digit |
| Password | Minimal 8 karakter, ada huruf besar, huruf kecil, dan angka |
| Konfirmasi Password | Harus sama dengan password |
| Jenis Kelamin | Wajib dipilih |
| Syarat & Ketentuan | Wajib dicentang |

**Fitur:**

- Rekomendasi nama muncul ketika mengetik (bisa dipilih dengan klik atau tombol panah + Enter).
- Memilih nama otomatis mengisi NRP, program studi, dan email.
- Pesan error tampil di bawah setiap field (validasi saat field ditinggalkan & real-time).
- Indikator kekuatan password dan tombol tampilkan/sembunyikan password.
- Data yang berhasil didaftarkan tampil di panel **Data Terdaftar** dan bisa dihapus.

**Langkah penggunaan:**

1. Ketik beberapa huruf pada kolom nama, lalu pilih dari rekomendasi (atau isi manual).
2. Lengkapi field lainnya.
3. Tekan tombol **Daftar Sekarang**. Jika ada kesalahan, field akan ditandai merah.

## 2. Email Validation Form

Form untuk memeriksa apakah sebuah alamat email valid.

**Fitur:**

- Validasi real-time menggunakan Regular Expression:
  `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$`
- Checklist aturan yang berubah hijau/merah saat mengetik (tanpa spasi, satu `@`, bagian lokal valid, tanpa titik ganda, domain valid, ekstensi minimal 2 huruf).
- Saran perbaikan typo domain (contoh: `gmial.com` → `gmail.com`).
- Riwayat pengecekan beserta statistik jumlah email valid dan tidak valid.
- Validasi banyak email sekaligus (dipisah koma atau baris baru).

**Langkah penggunaan:**

1. Ketik alamat email pada kolom yang tersedia dan perhatikan checklist aturan.
2. Tekan tombol **Validasi Email** untuk melihat hasil dan menyimpannya ke riwayat.
3. Untuk banyak email, isi textarea lalu tekan **Cek Semua**.

## Referensi

- https://www.geeksforgeeks.org/javascript/form-validation-using-javascript/

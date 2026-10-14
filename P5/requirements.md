1. Informasi Produk 
Nama Produk : Student Management
Jenis Produk : Aplikasi web berbasis dashboard untuk pengelolaan data mahasiswa
Target Pengguna : Admin akademik, staf administrasi jurusan, dan dosen pengelola data mahasiswa
Platform : Website (browser desktop, tablet, dan smartphone) dengan teknologi HTML, CSS, dan JavaScript
Tujuan : Mempermudah pencatatan, pencarian, pengubahan dan penghapusan data mahasiswa dalam satu halaman

2. Latar Belakang
Pengelolaan data mahasiswa yang dilakukan secara manual, misalnya lewat buku catatan atau lembar kerja terpisah, sering menimbulkan masalah. Data mudah salah ketik, terduplikasi, sulit dicari, dan tidak terpusat.

Karena itu dibutuhkan aplikasi sederhana yang menyediakan form input terstruktur, tabel data yang rapi, serta fitur pencarian dan pengelolaan data yang cepat. Aplikasi ini dibangun dengan HTML sebagai struktur, CSS sebagai pengatur tampilan, dan JavaScript sebagai logika, sehingga bisa langsung dijalankan di browser tanpa instalasi tambahan. Proyek ini juga menjadi sarana belajar hubungan antara ketiga teknologi tersebut dalam pemrograman web.

3. Tujuan Produk

Menyediakan form input data mahasiswa (NIM, nama, jurusan, email) yang tervalidasi.
Menampilkan seluruh data mahasiswa dalam tabel yang rapi dan mudah dibaca.
Memungkinkan pengguna mengubah dan menghapus data dengan cepat.
Mempercepat pencarian data lewat fitur cari.
Menjaga data tetap rapi lewat pembagian halaman (pagination).
Menghadirkan antarmuka yang konsisten, responsif, dan nyaman digunakan.
4. Struktur Website

Student Management
├── Navbar
│   ├── Logo & judul "Student Management"
│   ├── Menu Home, Students, About (tampilan saja, tidak bisa diklik)
│   └── Ikon profil
└── Konten Utama
    ├── Kartu Kiri: Form Student
    │   ├── Input NIM
    │   ├── Input Nama Lengkap
    │   ├── Dropdown Jurusan
    │   ├── Input Email
    │   └── Tombol Simpan | Batal | Reset
    └── Kartu Kanan: Data Mahasiswa
        ├── Kolom pencarian
        ├── Tabel (No, NIM, Nama, Jurusan, Email, Aksi)
        └── Footer (info jumlah data & pagination)

5. Functional Requirement
FR-01 Input NIM : Wajib diisi, hanya boleh berisi angka, dan tidak boleh sama dengan NIM yang sudah terdaftar.

FR-02 Input Nama Lengkap : Wajib diisi.

FR-03 Pilih Jurusan : Pengguna memilih satu dari 6 jurusan (Sistem Informasi, Teknologi Informasi, Teknik Informatika, Teknik Elektro, Teknik Komputer, Teknik Biomedik) lewat dropdown dan wajib dipilih.

FR-04 Input Email : Wajib diisi dan harus berformat email yang valid.

FR-05 Validasi Form : Sistem menampilkan pesan kesalahan di bawah kolom yang bermasalah dan menandai kolom tersebut dengan border merah.

FR-06 Simpan Data : Data yang valid disimpan ke tabel, lalu form dikosongkan.

FR-07 Reset : Mengosongkan seluruh isian dan pesan kesalahan pada form.

FR-08 Batal : Membatalkan proses edit atau pengisian dan mengembalikan form ke mode tambah data. Jika form sedang terisi, sistem meminta konfirmasi terlebih dahulu.

FR-09 Tampil Data : Menampilkan data mahasiswa dalam tabel yang berisi nomor, NIM, nama, jurusan, email, dan aksi.

FR-10 Edit Data : Tombol edit memuat data ke dalam form, tombol Simpan berubah menjadi Update, dan baris yang sedang diedit diberi penanda warna.

FR-11 Hapus Data : Tombol hapus menghapus data mahasiswa setelah pengguna menyetujui konfirmasi.

FR-12 Cari Mahasiswa : Pencarian berjalan langsung saat pengguna mengetik, berdasarkan NIM, nama, jurusan, atau email.

FR-13 Pagination : Menampilkan 5 data per halaman dengan tombol navigasi « 1 2 3 » dan informasi "Menampilkan X - Y dari Z data".

FR-14 Penyimpanan Data : Data disimpan di localStorage browser sehingga tidak hilang saat halaman dimuat ulang.

FR-15 Navigasi Tampilan : Menu Home, Students, dan About hanya berfungsi sebagai elemen tampilan dan tidak dapat diklik.

FR-16 Responsive Design : Tampilan menyesuaikan ukuran layar, baik desktop, tablet, maupun smartphone.

Additional requirements (untuk menghindari ai slop):
- The Inter Default
Inter is a fine typeface. It was designed for screens and reads well at small sizes. It is also the default font in nearly every AI design tool, component library, and website builder. When you see Inter paired with a system sans-serif fallback and no other typographic choices, that is a strong signal the design was never intentionally styled.

- Purple-to-Blue Gradient Syndrome
AI tools trained on thousands of SaaS landing pages have learned that purple-to-blue gradients are the most "safe" choice. The gradient shows up in hero sections, CTA buttons, and background accents. It is not ugly. It is just omnipresent to the point of meaninglessness.

- Vague, Aspirational Headlines
"Build the future of work." "Your all-in-one platform." "Scale without limits." These headlines say nothing about the actual product because AI generates them by averaging every headline it has seen. Real headlines are specific: Stripe says "Financial infrastructure for the internet." Linear says "Plan and build products." Specificity is the antidote to slop.

- Semantic Color Systems Over Decorative Gradients
AI tools apply color decoratively because they do not understand your brand. They pick what looks good statistically, which means gradients, because gradients test well across the widest audience. The problem is that decorative color carries no meaning.

The best product websites use color semantically. Notion uses a warm, muted palette where color signals function: yellow for highlights, blue for links, red for warnings. Figma uses color to distinguish between editing modes and collaboration states. Stripe uses a deep navy background with precise accent colors that communicate stability and trust.

Build your color system using CSS custom properties with semantic names (--color-action-primary, --color-feedback-success) rather than decorative names (--color-gradient-start). This forces every color choice to serve a purpose.

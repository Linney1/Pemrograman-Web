1. Deskripsi Sistem
Sebuah perpustakaan perguruan tinggi masih melakukan pendaftaran anggota secara manual menggunakan formulir kertas. Proses tersebut menimbulkan beberapa kendala, seperti antrean pendaftaran, kesalahan pencatatan data, kesulitan mencari informasi anggota, dan lambatnya pembuatan kartu anggota.

Untuk mengatasi masalah tersebut, perpustakaan membutuhkan aplikasi web bernama LibraryReg — Aplikasi Pendaftaran Anggota Perpustakaan. LibraryReg menyediakan landing page yang menampilkan informasi perpustakaan, menu navigasi yang terstruktur, formulir pendaftaran anggota secara online, dan halaman pengelolaan data anggota untuk petugas perpustakaan.

Pada tahap pembelajaran ini, mahasiswa berfokus pada front end. Data anggota dapat dikelola sementara menggunakan JavaScript dan localStorage, sehingga mahasiswa dapat mempraktikkan interaksi antarmuka tanpa harus langsung membangun backend atau database server.

2. Identifikasi Kebutuhan Sistem
A. Landing Page
Tujuan: memberikan informasi awal dan mengarahkan pengunjung ke layanan perpustakaan.
•	Header dengan logo dan nama perpustakaan.
•	Hero section dengan judul, deskripsi, dan tombol ajakan.
•	Informasi layanan perpustakaan.
•	Keunggulan dan fasilitas perpustakaan.
•	Statistik ilustratif jumlah koleksi dan anggota.
•	Footer berisi kontak dan informasi jam layanan.

B. Pengelolaan Menu Navigasi
Tujuan: memudahkan pengguna berpindah antarbagian aplikasi.
•	Beranda
•	Tentang Perpustakaan
•	Layanan
•	Daftar Anggota
•	Pendaftaran Anggota
•	Login Petugas (simulasi antarmuka)
Mahasiswa menerapkan navbar responsif Bootstrap, tautan navigasi, navigasi antarhalaman atau bagian, dan penanda menu aktif.

C. Formulir Pendaftaran Anggota
Tujuan: menggantikan formulir kertas dengan formulir digital.
•	Nama lengkap
•	NIM/NIP
•	Program studi
•	Alamat
•	Nomor telepon
•	Email
•	Jenis keanggotaan: mahasiswa, dosen, atau tenaga kependidikan
Formulir memiliki validasi kolom wajib, format email, dan keunikan nomor induk. Setelah berhasil, data ditambahkan ke daftar anggota pada sisi front end.

D. Halaman Pengelolaan Anggota
Tujuan: membantu petugas mengelola data anggota melalui antarmuka web.
•	Menampilkan tabel daftar anggota.
•	Mencari anggota berdasarkan nama atau NIM/NIP.
•	Melihat detail anggota.
•	Mengedit data anggota.
•	Menghapus data dengan dialog konfirmasi.
•	Menampilkan notifikasi keberhasilan atau kesalahan.
•	Menyimpan data pada localStorage agar tetap tersedia setelah halaman dimuat ulang di browser yang sama.

Soal
1. Buat deskripsi dan ruang lingkup pekerjaan yang akan dibuat
2. Buatkan Rancangan Halaman dan Struktur Menu
3. Desain UI Landing Page
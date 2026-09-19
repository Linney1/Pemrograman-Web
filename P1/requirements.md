# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Website CV & Portofolio Peserta Kuliah

- **Mata Kuliah:** Pemrograman Web
- **Jenis Produk:** Static Web / Personal Portfolio
- **Teknologi Utama:** HTML5 + CSS3
- **Target Pengguna:** Dosen, recruiter, teman sekelas, dan pengunjung umum
- **Platform:** Web Browser (Desktop & Mobile)

---

## 1. Latar Belakang
Peserta kuliah perlu memiliki media digital untuk memperkenalkan identitas, kemampuan, pengalaman, tools yang dikuasai, serta karya yang telah dibuat selama mengikuti perkuliahan.

Website CV & Portofolio menjadi proyek praktikum yang menggabungkan konsep:
- **HTML5 & Semantic HTML**
- **CSS3:** Layout, Typography, Responsive Design
- **UI/UX dasar**
- **Information Architecture**

Website dibuat statis, sehingga fokus pembelajaran adalah pada kemampuan menyusun struktur halaman dan menerapkan desain UI/UX menggunakan HTML dan CSS.

---

## 2. Tujuan Produk
Website bertujuan untuk:
1. Menampilkan profil peserta kuliah secara profesional.
2. Menyajikan CV secara ringkas dan mudah dibaca.
3. Menampilkan skillset yang dikuasai.
4. Menampilkan toolset yang digunakan.
5. Menampilkan portofolio atau hasil karya.
6. Menampilkan foto pendukung.
7. Menerapkan prinsip dasar UI/UX.
8. Melatih penggunaan HTML5 semantic dan CSS3.
9. Menghasilkan website yang responsif.

---

## 3. Konsep Produk
**Konsep Utama:** *"Personal Digital Profile"*  
Website bukan sekadar halaman biodata, tetapi menjadi representasi digital mahasiswa.

**Alur Informasi:**
```
IDENTITAS ➔ TENTANG SAYA ➔ SKILLSET ➔ TOOLSET ➔ PENDIDIKAN & PENGALAMAN ➔ PORTOFOLIO ➔ GALERI / DOKUMENTASI ➔ KONTAK
```

---

## 4. Target Pengguna

### Primary User: Dosen
Menggunakan website untuk menilai:
- Struktur HTML
- Kualitas CSS
- Desain UI/UX
- Kelengkapan informasi
- Kualitas portofolio

### Secondary User: Recruiter / Perusahaan
Menggunakan website untuk melihat:
- Profil
- Kemampuan
- Tools
- Pengalaman
- Portfolio

### Tertiary User: Teman, Komunitas, dan Masyarakat Umum
Menggunakan website untuk mengenal profil dan karya peserta.

---

## 5. Struktur Informasi
Website terdiri dari:
- **HOME**
  - Hero / Profile
  - About
  - Skills
  - Toolset
  - Education / Experience
  - Portfolio
  - Gallery
  - Contact

---

## 6. Requirement Fitur

### 6.1 Navbar
Navbar harus menyediakan navigasi menuju bagian utama website.

**Komponen:**
- Logo / nama singkat
- Home
- About
- Skills
- Portfolio
- Contact
- Download CV

**Contoh Tampilan:**
```
[ LOGO ]   Home   About   Skills   Portfolio   Contact   [Download CV]
```

**Requirement:**
- Navigasi mudah ditemukan.
- Menggunakan *anchor link*.
- Posisi konsisten (fixed/sticky disarankan).
- Memiliki *visual state* yang jelas (hover, active).

---

## 7. Hero Section
Hero menjadi bagian pertama yang dilihat pengguna saat membuka website.

**Informasi yang ditampilkan:**
- Foto profil
- Nama lengkap
- Status / profesi
- Deskripsi singkat
- Tombol Call-to-Action (CTA)

**Contoh Mockup:**
```
+-------------------------------------------------------------+
|  HALO, SAYA                                                 |
|  [NAMA LENGKAP]                            [ FOTO PROFIL ]  |
|  Mahasiswa Informatika | Web Developer                      |
|                                                             |
|  Deskripsi singkat mengenai diri dan ketertarikan.          |
|                                                             |
|  [Lihat Portofolio]   [Hubungi Saya]                        |
+-------------------------------------------------------------+
```

**Tujuan UX:**
Dalam beberapa detik pertama pengguna harus memahami: **Siapa pemilik website dan apa yang dia kuasai.**

---

## 8. Identitas & Kontak
Bagian ini menampilkan informasi personal yang relevan.

**Data:**
- Nama
- NIM
- Program studi
- Email
- Nomor telepon
- Kota
- Social media

> **Catatan Privasi:**  
> Mahasiswa tidak wajib menggunakan data pribadi sebenarnya. Untuk tugas kuliah dapat digunakan data dummy, misalnya:
> - **Nama:** Andi Pratama
> - **NIM:** 5020211001
> - **Email:** nama@domain.ac.id
> - **Telepon:** +62 xxx xxxx xxxx

---

## 9. About / Tentang Saya
Berisi deskripsi singkat mengenai peserta.

**Konten Minimal:**
- Background
- Minat
- Bidang yang dipelajari
- Tujuan
- Ketertarikan profesional

**Panjang yang disarankan:** 50 – 100 kata.

---

## 10. Skillset
Skillset menampilkan kemampuan peserta.

**Contoh:**
- HTML: `90%`
- CSS: `85%`
- JavaScript: `80%`
- UI/UX Design: `75%`
- Responsive Design: `85%`

**Requirement:**
- Minimal 5 skill.
- Setiap skill memiliki:
  - Nama skill
  - Level kemampuan
  - Visual indicator (misal: progress bar / meter)

> **Catatan UX:**  
> Progress bar digunakan sebagai representasi visual pemahaman diri, bukan sebagai pengukuran kompetensi akademik yang absolut.

---

## 11. Toolset
Menampilkan software, platform, atau tools yang pernah digunakan.

**Contoh Tools:**
- Visual Studio Code
- Figma
- Git & GitHub
- Chrome DevTools
- Canva
- Notion

**Requirement:**
- Minimal **6 tools**.
- Setiap tool dapat ditampilkan dengan:
  - Icon
  - Nama
  - Kategori

**Contoh Kategori:**
- *Development*
- *Design*
- *Version Control*
- *Productivity*
- *Testing*
- *Documentation*

---

## 12. Pendidikan / Experience
Menampilkan latar belakang akademik atau pengalaman pendukung.

### Pendidikan (Wajib)
**Minimal memuat:**
- Institusi
- Program studi
- Tahun
- Status

*Contoh:*
> **Institut Teknologi XYZ**  
> S1 Teknik Informatika  
> 2024 – Sekarang

### Experience (Opsional / Disarankan)
Disarankan jika peserta memiliki pengalaman dalam:
- Organisasi
- Kepanitiaan
- Freelance
- Internship
- Project
- Kompetisi

---

## 13. Portfolio
Portfolio merupakan bagian utama dari website.

- **Minimal:** 3 project
- **Disarankan:** 4 – 6 project

**Format Card Project:**
```
+------------------------------------+
|          [ FOTO PROJECT ]          |
+------------------------------------+
|  Nama Project                      |
|  Deskripsi singkat project...      |
|  [HTML]  [CSS]  [JavaScript]       |
|                                    |
|  [Lihat Project]                   |
+------------------------------------+
```

**Contoh Project:**
1. Landing Page Kopi Kelapa
2. Task Manager
3. Travel Website
4. Gallery Website

**Informasi Project (Minimal):**
- Judul
- Screenshot / Foto cover
- Deskripsi
- Teknologi yang digunakan
- Link / demo (jika tersedia)

---

## 14. Gallery / Foto Pendukung
Gallery digunakan untuk memperkuat identitas dan dokumentasi perjalanan peserta.

**Contoh Konten:**
- Foto kegiatan
- Foto project
- Dokumentasi praktikum
- Sertifikat
- Workshop
- Organisasi
- Kegiatan akademik

**Jumlah:**
- **Minimal:** 4 foto
- **Disarankan:** 6 – 8 foto

---

## 15. Footer
Footer berfungsi menutup halaman dengan informasi formal.

**Elemen Footer:**
- Copyright & Tahun
- Nama Lengkap
- Social Media link (LinkedIn, GitHub, Instagram)
- Email / Contact info

**Contoh:**
```
© 2026 Nama Lengkap. All rights reserved.
LinkedIn | GitHub | Instagram | Email
```

---

## 16. Requirement UI/UX

### Visual Design
Website harus memiliki:
- Hierarki visual yang jelas
- Typography yang konsisten
- Spacing (margin & padding) yang konsisten
- Alignment yang rapi
- Kontras warna yang baik (accessible)
- Button yang mudah dikenali
- Card yang konsisten

### Prinsip Desain
```
Consistency ➔ Hierarchy ➔ Readability & Accessibility ➔ Usability
```

---

## 17. Responsive Design
Website minimal mendukung tampilan pada 3 kategori breakpoint:
- **Desktop:** $\ge 1024	ext{ px}$
- **Tablet:** $768	ext{ px} - 1023	ext{ px}$
- **Mobile:** $< 768	ext{ px}$

**Contoh Penyesuaian Layout:**
```
   [ DESKTOP ]                     [ MOBILE ]
+---------------+---------------+  +---------------+
|    PROFILE    |    CONTENT    |  |    PROFILE    |
|   (Sidebar/   |  (Main Area)  |  +---------------+
|     Left)     |               |  |    CONTENT    |
+---------------+---------------+  +---------------+
```

---

## 18. Requirement HTML
Mahasiswa wajib menggunakan **HTML5**.

### Struktur yang Disarankan:
```html
<header>
  <nav>
    <!-- Menu navigasi -->
  </nav>
</header>

<main>
  <section id="hero">...</section>
  <section id="about">...</section>
  <section id="skills">...</section>
  <section id="tools">...</section>
  <section id="education">...</section>
  <section id="portfolio">...</section>
  <section id="gallery">...</section>
  <section id="contact">...</section>
</main>

<footer>
  <!-- Informasi footer -->
</footer>
```

### Semantic HTML
Wajib memahami dan menerapkan tag semantik:
- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`

*(Hindari pola "div soup" atau membuat seluruh halaman hanya menggunakan tag `<div>` bertumpuk).*

---

## 19. Requirement CSS
CSS digunakan untuk mengatur:
- Layout & Grid
- Typography
- Color Palette
- Spacing
- Styling Card & Button
- Responsive Design via Media Queries
- Hover & Transition Effects

**Teknik Minimal yang Wajib Digunakan:**
- Flexbox
- CSS Grid
- Media Query
- Pseudo-class (`:hover`, `:active`, `:focus`, dll.)
- CSS Variables (`:root`)

**Contoh Penggunaan CSS Variables:**
```css
:root {
  --primary: #2563eb;
  --text: #172033;
  --background: #f8fafc;
}
```

---

## 20. Requirement Assets
Website membutuhkan asset berupa:
- **Foto Profil:** 1 foto utama
- **Foto Pendukung:** 4 – 8 foto
- **Portfolio Images:** 3 – 6 screenshot
- **Icons:** Dapat menggunakan SVG, icon library (FontAwesome, Lucide, dll.), CSS icon, atau gambar sendiri.

---

## 21. Content Requirement

| Komponen | Minimum |
| :--- | :--- |
| Foto Profil | 1 |
| Identitas | 1 set |
| About | 50 – 100 kata |
| Skillset | 5 |
| Toolset | 6 |
| Pendidikan | 1 |
| Portfolio | 3 |
| Gallery | 4 |
| Social Media | 2 |
| CTA (Call to Action) | 2 |

---

## 22. Functional Requirement
Meskipun website bersifat statis, elemen-elemen berikut harus berfungsi secara interaktif:

- **Navigation Anchor Links:**
  - `Home` ➔ `#hero` / `#home`
  - `About` ➔ `#about`
  - `Skills` ➔ `#skills`
  - `Portfolio` ➔ `#portfolio`
  - `Contact` ➔ `#contact`
- **Email Link:**
  ```html
  <a href="mailto:nama@email.com">Email Saya</a>
  ```
- **Download CV:** Menyediakan file CV dalam format PDF atau link placeholder yang valid.
- **Portfolio:** Setiap card project memiliki tautan/link jika tersedia.

---

## 23. Non-Functional Requirement
Website harus memenuhi kriteria:

### Performance
- Gambar telah dioptimalkan (ukuran file tidak berlebihan).
- Tidak menggunakan asset eksternal yang memperlambat pemuatan halaman.
- Struktur HTML efisien dan bersih.

### Accessibility
- Menambahkan atribut `alt` pada setiap elemen gambar `<img>`.
- Kontras warna teks terhadap latar belakang memadai (WCAG standards).
- Struktur heading berurutan (`h1`, `h2`, `h3`).
- Link dan button mudah dikenali serta dapat diakses melalui keyboard.

### Usability
Pengunjung harus dapat menjawab pertanyaan berikut dengan cepat:
- *Siapa saya?*
- *Apa kemampuan saya?*
- *Tools apa yang saya gunakan?*
- *Apa saja karya yang telah saya buat?*
- *Bagaimana cara menghubungi saya?*

---

## 24. User Journey

```
       [ USER ]
          │
          ▼
   [ LANDING PAGE ]
    Melihat Profil
          │
          ▼
    Mengenal Skill
          │
          ▼
     Melihat Tools
          │
          ▼
   Melihat Portfolio
          │
          ▼
  Melihat Dokumentasi
          │
          ▼
      [ CONTACT ]
          │
          ▼
       [ ACTION ]
```

**Action dapat berupa:**
- Download CV
- View Project
- Kirim Email
- Kunjungi GitHub / LinkedIn

---

## 25. Information Architecture

```
                       ┌─────────────────┐
                       │     WEBSITE     │
                       └────────┬────────┘
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
   [ PROFILE ]              [ SKILLS ]            [ PORTFOLIO ]
   ├── Identity             ├── Skillset          ├── Project
   ├── About                └── Toolset           └── Gallery
   └── Contact
```

---

## 26. Acceptance Criteria
Website dianggap memenuhi requirement apabila seluruh checklist berikut terpenuhi:

### Struktur
- [ ] HTML5 digunakan secara tepat.
- [ ] Semantic HTML diterapkan (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, dll.).
- [ ] Struktur halaman tertata jelas dan teratur.
- [ ] Semua section yang disyaratkan telah tersedia.

### UI / UX
- [ ] Layout konsisten di seluruh halaman.
- [ ] Typography mudah dibaca dengan hierarki yang tepat.
- [ ] Skema warna konsisten dan memiliki kontras yang baik.
- [ ] Tombol CTA terlihat jelas dan interaktif.
- [ ] Komponen card memiliki desain yang konsisten.
- [ ] Navigasi berfungsi mulus (*smooth scrolling* / anchor link).
- [ ] Informasi esensial mudah ditemukan.
- [ ] Website sepenuhnya responsif (Desktop, Tablet, Mobile).
- [ ] Tidak ada layout yang rusak atau terpotong pada layar mobile.

### Content
- [ ] Data identitas tersedia.
- [ ] Bagian About tersedia (50–100 kata).
- [ ] Minimal 5 skill tercantum dengan indikator visual.
- [ ] Minimal 6 tools ditampilkan beserta kategori.
- [ ] Portfolio minimal memuat 3 project dengan deskripsi dan screenshot.
- [ ] Gallery minimal memuat 4 foto dokumentasi pendukung.
- [ ] Bagian Contact dan form/link kontak tersedia.

---

## 27. Deliverables Mahasiswa
Mahasiswa mengumpulkan berkas proyek dengan struktur direktori sebagai berikut:

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── profile.jpg
│   ├── project-01.jpg
│   ├── project-02.jpg
│   └── ...
├── assets/
│   └── ...
├── gallery/
│   └── ...
├── cv/
│   └── cv.pdf
└── README.md
```

**Daftar File Utama:**
1. `index.html`
2. `style.css`
3. Folder `/images`
4. Folder `/assets`
5. `CV.pdf`
6. `README.md`

---

## 28. Rubrik Penilaian

| Aspek Penilaian | Bobot |
| :--- | :---: |
| Struktur HTML & Semantic HTML | 20% |
| CSS & Layout | 20% |
| UI/UX | 20% |
| Responsive Design | 15% |
| Kelengkapan Content | 10% |
| Portfolio & Dokumentasi | 10% |
| Code Quality | 5% |
| **Total** | **100%** |

---

## 29. Learning Outcome
Setelah menyelesaikan proyek ini, mahasiswa diharapkan mampu:
1. Menjelaskan dan menyusun struktur dasar HTML5.
2. Menggunakan elemen-elemen Semantic HTML dengan tepat.
3. Membuat tata letak halaman yang terstruktur menggunakan CSS.
4. Menguasai implementasi Flexbox dan CSS Grid.
5. Membangun desain website yang responsif di berbagai perangkat.
6. Menerapkan prinsip-prinsip dasar UI/UX.
7. Mengorganisasi arsitektur informasi dalam sebuah website.
8. Membuat website profil CV & portofolio statis yang siap dipamerkan.
9. Mengoptimalkan ukuran dan resolusi aset gambar untuk web.
10. Mempublikasikan website ke platform web hosting (misal: GitHub Pages, Vercel, Netlify).

---

## 30. Pengembangan Lanjutan
Proyek ini dapat dikembangkan secara bertahap seiring berjalannya semester dan penambahan keahlian:

```
[ LEVEL 1 ]  HTML Sederhana
     │
     ▼
[ LEVEL 2 ]  HTML + CSS
     │
     ▼
[ LEVEL 3 ]  HTML + CSS + JavaScript (Interaktivitas & Animasi)
     │
     ▼
[ LEVEL 4 ]  Portfolio + Backend + Database (Dynamic Content)
     │
     ▼
[ LEVEL 5 ]  Portfolio + API + Cloud Deployment
     │
     ▼
[ LEVEL 6 ]  AI-Powered Portfolio (Chatbot Assistant / Career Agent)
```

**Alur Evolusi Produk:**
```
Static Portfolio  ➔  Dynamic Portfolio  ➔  CMS Portfolio  ➔  AI Portfolio Assistant / AI Career Agent
```

---

## 31. Prinsip Utama Proyek
> *"Don't design a website only to look good. Design it so the visitor can quickly understand who you are, what you can do, and what you have created."*

Dengan demikian, proyek ini tidak hanya menguji kemampuan koding HTML & CSS, tetapi juga melatih kemampuan mahasiswa dalam merangkum informasi pribadi menjadi pengalaman digital yang terstruktur, komunikatif, dan berdaya guna tinggi (*usable*).
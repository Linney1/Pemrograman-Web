/**
 * =========================================================
 * STUDENT MANAGEMENT — SCRIPT LOGIC
 * Praktikum Pemrograman Web (Pertemuan 5)
 * Dibuat dengan JavaScript murni (Vanilla JS) tanpa framework
 * =========================================================
 */

(function () {
  "use strict";

  /* ---------------- KONSTANTA & STATE ---------------- */
  const STORAGE_KEY = "student_management_data";
  const ITEMS_PER_PAGE = 5;

  // 6 Jurusan resmi sesuai FR-03
  const JURUSAN_RESMI = [
    "Sistem Informasi",
    "Teknologi Informasi",
    "Teknik Informatika",
    "Teknik Elektro",
    "Teknik Komputer",
    "Teknik Biomedik",
  ];

  // Data awal (Seed Data) untuk inisialisasi localStorage pertama kali
  const INITIAL_STUDENTS = [
    {
      nim: "5025211001",
      nama: "Ahmad Rizki Pratama",
      jurusan: "Teknik Informatika",
      email: "ahmad.rizki@student.its.ac.id",
    },
    {
      nim: "5026211015",
      nama: "Siti Nurhaliza Putri",
      jurusan: "Sistem Informasi",
      email: "siti.nurhaliza@student.its.ac.id",
    },
    {
      nim: "5027211032",
      nama: "Budi Santoso Wibowo",
      jurusan: "Teknologi Informasi",
      email: "budi.santoso@student.its.ac.id",
    },
    {
      nim: "5022211045",
      nama: "Farhan Maulana",
      jurusan: "Teknik Elektro",
      email: "farhan.m@student.its.ac.id",
    },
    {
      nim: "5024211019",
      nama: "Dian Anggraini Lestari",
      jurusan: "Teknik Komputer",
      email: "dian.anggraini@student.its.ac.id",
    },
    {
      nim: "5023211028",
      nama: "Jessica Amanda Sari",
      jurusan: "Teknik Biomedik",
      email: "jessica.sari@student.its.ac.id",
    },
    {
      nim: "5025211088",
      nama: "Kevin Kurniawan",
      jurusan: "Teknik Informatika",
      email: "kevin.k@student.its.ac.id",
    },
    {
      nim: "5026211094",
      nama: "Nadia Rahmadani",
      jurusan: "Sistem Informasi",
      email: "nadia.r@student.its.ac.id",
    },
  ];

  // Regex validasi email (FR-04)
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Regex hanya angka untuk NIM (FR-01)
  const NUMERIC_REGEX = /^\d+$/;

  // Application State
  let students = [];
  let editingNim = null; // null jika mode tambah data, berisi string NIM jika sedang diedit (FR-10)
  let searchQuery = ""; // Kata kunci pencarian real-time (FR-12)
  let currentPage = 1; // Halaman aktif saat ini (FR-13)

  /* ---------------- ELEMEN DOM ---------------- */
  const formMahasiswa = document.getElementById("formMahasiswa");
  const inputNim = document.getElementById("inputNim");
  const inputNama = document.getElementById("inputNama");
  const selectJurusan = document.getElementById("selectJurusan");
  const inputEmail = document.getElementById("inputEmail");
  const nimLengthCounter = document.getElementById("nimLengthCounter");

  const errorNim = document.getElementById("errorNim");
  const errorNama = document.getElementById("errorNama");
  const errorJurusan = document.getElementById("errorJurusan");
  const errorEmail = document.getElementById("errorEmail");

  const btnSimpan = document.getElementById("btnSimpan");
  const textBtnSimpan = document.getElementById("textBtnSimpan");
  const btnBatal = document.getElementById("btnBatal");
  const btnReset = document.getElementById("btnReset");

  const formModeBadge = document.getElementById("formModeBadge");
  const editNotification = document.getElementById("editNotification");
  const editNimLabel = document.getElementById("editNimLabel");
  const btnBatalEditQuick = document.getElementById("btnBatalEditQuick");

  const inputSearch = document.getElementById("inputSearch");
  const btnClearSearch = document.getElementById("btnClearSearch");

  const tableBody = document.getElementById("tableBody");
  const emptyState = document.getElementById("emptyState");
  const emptyTitle = document.getElementById("emptyTitle");
  const emptyDesc = document.getElementById("emptyDesc");

  const paginationInfo = document.getElementById("paginationInfo");
  const paginationControls = document.getElementById("paginationControls");
  const statTotalStudents = document.getElementById("statTotalStudents");

  // Elemen Modal Konfirmasi (FR-08, FR-11)
  const modalKonfirmasi = document.getElementById("modalKonfirmasi");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalIconWrapper = document.getElementById("modalIconWrapper");
  const modalBtnBatal = document.getElementById("modalBtnBatal");
  const modalBtnKonfirmasi = document.getElementById("modalBtnKonfirmasi");

  // Container Toast
  const toastContainer = document.getElementById("toastContainer");

  let activeConfirmCallback = null;

  /* ---------------- STORAGE FUNCTIONS (FR-14) ---------------- */
  function loadStudentsFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Gagal membaca dari localStorage, menginisialisasi ulang data.", err);
    }
    // Jika belum ada data di storage, gunakan seed data awal
    saveStudentsToStorage(INITIAL_STUDENTS);
    return [...INITIAL_STUDENTS];
  }

  function saveStudentsToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
      showToast("Gagal menyimpan perubahan ke browser", "error");
    }
  }

  /* ---------------- TOAST NOTIFICATION ---------------- */
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
    } else if (type === "error") {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-message">${escapeHtml(message)}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-hide");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 3000);
  }

  /* ---------------- MODAL KONFIRMASI (FR-08 & FR-11) ---------------- */
  function showConfirmModal({ title, message, confirmText = "Ya, Lanjutkan", isDanger = false, onConfirm }) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalBtnKonfirmasi.textContent = confirmText;

    if (isDanger) {
      modalBtnKonfirmasi.className = "btn btn-danger";
      modalIconWrapper.className = "modal-icon-wrapper danger";
    } else {
      modalBtnKonfirmasi.className = "btn btn-primary";
      modalIconWrapper.className = "modal-icon-wrapper warning";
    }

    activeConfirmCallback = onConfirm;
    modalKonfirmasi.style.display = "flex";
    modalBtnKonfirmasi.focus();
  }

  function closeModal() {
    modalKonfirmasi.style.display = "none";
    activeConfirmCallback = null;
  }

  modalBtnBatal.addEventListener("click", closeModal);

  modalBtnKonfirmasi.addEventListener("click", function () {
    if (typeof activeConfirmCallback === "function") {
      activeConfirmCallback();
    }
    closeModal();
  });

  // Tutup modal jika klik di luar area dialog
  modalKonfirmasi.addEventListener("click", function (e) {
    if (e.target === modalKonfirmasi) {
      closeModal();
    }
  });

  // Tutup modal dengan tombol Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalKonfirmasi.style.display === "flex") {
      closeModal();
    }
  });

  /* ---------------- HELPER UTILITIES ---------------- */
  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getJurusanBadgeClass(jurusan) {
    switch (jurusan) {
      case "Sistem Informasi":
        return "badge-jurusan badge-sistem-informasi";
      case "Teknologi Informasi":
        return "badge-jurusan badge-teknologi-informasi";
      case "Teknik Informatika":
        return "badge-jurusan badge-teknik-informatika";
      case "Teknik Elektro":
        return "badge-jurusan badge-teknik-elektro";
      case "Teknik Komputer":
        return "badge-jurusan badge-teknik-komputer";
      case "Teknik Biomedik":
        return "badge-jurusan badge-teknik-biomedik";
      default:
        return "badge-jurusan";
    }
  }

  function shakeElement(el) {
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }

  /* ---------------- FORM VALIDATION (FR-01 s/d FR-05) ---------------- */
  function setError(inputEl, errorEl, message) {
    inputEl.classList.add("is-invalid");
    errorEl.textContent = message;
    errorEl.classList.add("show");
  }

  function clearError(inputEl, errorEl) {
    inputEl.classList.remove("is-invalid");
    errorEl.textContent = "";
    errorEl.classList.remove("show");
  }

  function clearAllErrors() {
    clearError(inputNim, errorNim);
    clearError(inputNama, errorNama);
    clearError(selectJurusan, errorJurusan);
    clearError(inputEmail, errorEmail);
  }

  // Update NIM length counter
  function updateNimCounter() {
    const len = inputNim.value.length;
    nimLengthCounter.textContent = `${len}/16`;
  }

  // Real-time error clearing saat user mengetik
  inputNim.addEventListener("input", function () {
    updateNimCounter();
    if (inputNim.classList.contains("is-invalid")) {
      validateNimField();
    }
  });

  inputNama.addEventListener("input", function () {
    if (inputNama.classList.contains("is-invalid")) {
      validateNamaField();
    }
  });

  selectJurusan.addEventListener("change", function () {
    if (selectJurusan.classList.contains("is-invalid")) {
      validateJurusanField();
    }
  });

  inputEmail.addEventListener("input", function () {
    if (inputEmail.classList.contains("is-invalid")) {
      validateEmailField();
    }
  });

  // FR-01: Validasi NIM
  function validateNimField() {
    const val = inputNim.value.trim();

    if (!val) {
      setError(inputNim, errorNim, "NIM wajib diisi.");
      return false;
    }

    if (!NUMERIC_REGEX.test(val)) {
      setError(inputNim, errorNim, "NIM hanya boleh berisi angka (tanpa spasi atau huruf).");
      return false;
    }

    if (val.length < 5 || val.length > 16) {
      setError(inputNim, errorNim, "NIM harus memiliki panjang antara 5 hingga 16 digit angka.");
      return false;
    }

    // Cek keunikan NIM (tidak boleh sama dengan mahasiswa lain)
    const isDuplicate = students.some(function (item) {
      // Jika sedang edit, kecualikan mahasiswa yang sedang diedit
      if (editingNim !== null && item.nim === editingNim) {
        return false;
      }
      return item.nim === val;
    });

    if (isDuplicate) {
      setError(inputNim, errorNim, `NIM ${val} sudah terdaftar di sistem. Gunakan NIM lain.`);
      return false;
    }

    clearError(inputNim, errorNim);
    return true;
  }

  // FR-02: Validasi Nama Lengkap
  function validateNamaField() {
    const val = inputNama.value.trim();

    if (!val) {
      setError(inputNama, errorNama, "Nama lengkap wajib diisi.");
      return false;
    }

    if (val.length < 3) {
      setError(inputNama, errorNama, "Nama lengkap terlalu pendek (minimal 3 karakter).");
      return false;
    }

    clearError(inputNama, errorNama);
    return true;
  }

  // FR-03: Validasi Dropdown Jurusan
  function validateJurusanField() {
    const val = selectJurusan.value;

    if (!val || val === "") {
      setError(selectJurusan, errorJurusan, "Jurusan wajib dipilih dari salah satu opsi di bawah.");
      return false;
    }

    if (!JURUSAN_RESMI.includes(val)) {
      setError(selectJurusan, errorJurusan, "Pilihan jurusan tidak valid.");
      return false;
    }

    clearError(selectJurusan, errorJurusan);
    return true;
  }

  // FR-04: Validasi Format Email
  function validateEmailField() {
    const val = inputEmail.value.trim();

    if (!val) {
      setError(inputEmail, errorEmail, "Alamat email wajib diisi.");
      return false;
    }

    if (!EMAIL_REGEX.test(val)) {
      setError(inputEmail, errorEmail, "Format email tidak valid (contoh: ahmad@student.its.ac.id).");
      return false;
    }

    clearError(inputEmail, errorEmail);
    return true;
  }

  // Validasi seluruh form sebelum submit
  function validateForm() {
    const isNimValid = validateNimField();
    const isNamaValid = validateNamaField();
    const isJurusanValid = validateJurusanField();
    const isEmailValid = validateEmailField();

    if (!isNimValid) {
      inputNim.focus();
      shakeElement(inputNim);
      return false;
    }
    if (!isNamaValid) {
      inputNama.focus();
      shakeElement(inputNama);
      return false;
    }
    if (!isJurusanValid) {
      selectJurusan.focus();
      shakeElement(selectJurusan);
      return false;
    }
    if (!isEmailValid) {
      inputEmail.focus();
      shakeElement(inputEmail);
      return false;
    }

    return true;
  }

  // Memeriksa apakah form sedang terisi (dirty check untuk FR-08)
  function isFormDirty() {
    return (
      inputNim.value.trim() !== "" ||
      inputNama.value.trim() !== "" ||
      selectJurusan.value !== "" ||
      inputEmail.value.trim() !== "" ||
      editingNim !== null
    );
  }

  /* ---------------- FORM MODE & RESET ---------------- */
  function setAddMode() {
    editingNim = null;
    formModeBadge.textContent = "Tambah Data";
    formModeBadge.className = "mode-badge mode-add";
    textBtnSimpan.textContent = "Simpan";
    btnSimpan.className = "btn btn-primary";
    editNotification.style.display = "none";
    editNimLabel.textContent = "-";
  }

  function setEditMode(student) {
    editingNim = student.nim;
    formModeBadge.textContent = "Edit Data";
    formModeBadge.className = "mode-badge mode-edit";
    textBtnSimpan.textContent = "Update";
    btnSimpan.className = "btn btn-primary mode-update";

    editNotification.style.display = "flex";
    editNimLabel.textContent = student.nim;

    // Isi data ke form
    inputNim.value = student.nim;
    inputNama.value = student.nama;
    selectJurusan.value = student.jurusan;
    inputEmail.value = student.email;

    updateNimCounter();
    clearAllErrors();

    // Scroll ke kartu form pada tampilan mobile
    const formCard = document.querySelector(".card-form");
    if (formCard) {
      formCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    inputNama.focus();
  }

  // FR-07: Reset - Mengosongkan isian dan pesan kesalahan
  function resetFormFields() {
    inputNim.value = "";
    inputNama.value = "";
    selectJurusan.value = "";
    inputEmail.value = "";
    updateNimCounter();
    clearAllErrors();
  }

  btnReset.addEventListener("click", function () {
    resetFormFields();
    showToast("Formulir telah dikosongkan.", "info");
  });

  // FR-08: Batal - Membatalkan proses edit/pengisian dengan konfirmasi jika dirty
  function handleBatal() {
    if (isFormDirty()) {
      const confirmMsg =
        editingNim !== null
          ? "Batalkan proses pengeditan data mahasiswa? Perubahan yang belum disimpan akan hilang."
          : "Batalkan pengisian form? Seluruh isian yang Anda ketik akan dibersihkan.";

      showConfirmModal({
        title: "Konfirmasi Pembatalan",
        message: confirmMsg,
        confirmText: "Ya, Batalkan",
        isDanger: false,
        onConfirm: function () {
          resetFormFields();
          setAddMode();
          renderTable();
          showToast("Proses dibatalkan.", "info");
        },
      });
    } else {
      setAddMode();
      renderTable();
    }
  }

  btnBatal.addEventListener("click", handleBatal);
  btnBatalEditQuick.addEventListener("click", handleBatal);

  /* ---------------- SIMPAN DATA (FR-06 & FR-10) ---------------- */
  formMahasiswa.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const nimVal = inputNim.value.trim();
    const namaVal = inputNama.value.trim();
    const jurusanVal = selectJurusan.value;
    const emailVal = inputEmail.value.trim();

    if (editingNim === null) {
      // Mode Tambah Data (FR-06)
      const newStudent = {
        nim: nimVal,
        nama: namaVal,
        jurusan: jurusanVal,
        email: emailVal,
      };

      // Tambahkan ke depan daftar agar langsung terlihat
      students.unshift(newStudent);
      saveStudentsToStorage(students);

      resetFormFields();
      setAddMode();
      currentPage = 1; // Pindah ke halaman 1 agar user melihat data baru
      renderTable();

      showToast(`Data mahasiswa "${namaVal}" berhasil disimpan!`, "success");
    } else {
      // Mode Edit Data (FR-10)
      const index = students.findIndex((item) => item.nim === editingNim);
      if (index !== -1) {
        students[index] = {
          nim: nimVal,
          nama: namaVal,
          jurusan: jurusanVal,
          email: emailVal,
        };

        saveStudentsToStorage(students);
        resetFormFields();
        setAddMode();
        renderTable();

        showToast(`Data mahasiswa "${namaVal}" berhasil diperbarui!`, "success");
      } else {
        showToast("Mahasiswa yang ingin diupdate tidak ditemukan.", "error");
      }
    }
  });

  /* ---------------- PENCARIAN REAL-TIME (FR-12) ---------------- */
  inputSearch.addEventListener("input", function (e) {
    searchQuery = e.target.value.trim().toLowerCase();
    currentPage = 1; // Reset halaman ke 1 saat pencarian berubah

    if (searchQuery.length > 0) {
      btnClearSearch.style.display = "flex";
    } else {
      btnClearSearch.style.display = "none";
    }

    renderTable();
  });

  btnClearSearch.addEventListener("click", function () {
    inputSearch.value = "";
    searchQuery = "";
    btnClearSearch.style.display = "none";
    currentPage = 1;
    inputSearch.focus();
    renderTable();
  });

  /* ---------------- TABEL & PAGINATION (FR-09 & FR-13) ---------------- */
  function getFilteredStudents() {
    if (!searchQuery) {
      return students;
    }

    return students.filter(function (student) {
      const matchNim = student.nim.toLowerCase().includes(searchQuery);
      const matchNama = student.nama.toLowerCase().includes(searchQuery);
      const matchJurusan = student.jurusan.toLowerCase().includes(searchQuery);
      const matchEmail = student.email.toLowerCase().includes(searchQuery);
      return matchNim || matchNama || matchJurusan || matchEmail;
    });
  }

  function renderTable() {
    // Perbarui statistik total mahasiswa
    statTotalStudents.textContent = `${students.length} Orang`;

    const filtered = getFilteredStudents();
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

    // Pastikan currentPage berada dalam batas valid
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    if (currentPage < 1) {
      currentPage = 1;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    const pageItems = filtered.slice(startIndex, endIndex);

    // Bersihkan isi tabel
    tableBody.innerHTML = "";

    if (totalItems === 0) {
      // Tampilkan Empty State
      emptyState.style.display = "flex";
      if (searchQuery) {
        emptyTitle.textContent = "Data tidak ditemukan";
        emptyDesc.textContent = `Tidak ada data mahasiswa yang cocok dengan kata kunci "${searchQuery}".`;
      } else {
        emptyTitle.textContent = "Belum ada data mahasiswa";
        emptyDesc.textContent = "Gunakan form di sebelah kiri untuk menambahkan data mahasiswa baru.";
      }
      paginationInfo.textContent = "Menampilkan 0 data";
      renderPaginationControls(0, 1);
      return;
    }

    emptyState.style.display = "none";

    // Buat baris-baris tabel (FR-09)
    pageItems.forEach(function (student, index) {
      const rowNumber = startIndex + index + 1;
      const tr = document.createElement("tr");

      // FR-10: Beri penanda warna pada baris yang sedang diedit
      const isEditingThisRow = editingNim !== null && student.nim === editingNim;
      if (isEditingThisRow) {
        tr.className = "row-editing";
      }

      const badgeClass = getJurusanBadgeClass(student.jurusan);

      tr.innerHTML = `
        <td class="td-num font-mono">${rowNumber}</td>
        <td class="td-nim font-mono">
          ${escapeHtml(student.nim)}
          ${isEditingThisRow ? '<span class="badge-editing-row">Edit</span>' : ""}
        </td>
        <td class="td-nama">${escapeHtml(student.nama)}</td>
        <td class="td-jurusan">
          <span class="${badgeClass}">${escapeHtml(student.jurusan)}</span>
        </td>
        <td class="td-email">${escapeHtml(student.email)}</td>
        <td class="td-aksi text-center">
          <div class="action-buttons">
            <button
              type="button"
              class="btn-action btn-action-edit"
              data-nim="${escapeHtml(student.nim)}"
              title="Edit data mahasiswa ini"
              aria-label="Edit data ${escapeHtml(student.nama)}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button
              type="button"
              class="btn-action btn-action-delete"
              data-nim="${escapeHtml(student.nim)}"
              title="Hapus data mahasiswa ini"
              aria-label="Hapus data ${escapeHtml(student.nama)}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    // Pasang event listener untuk tombol Edit & Hapus (Event Delegation atau per row)
    attachActionListeners();

    // FR-13: Perbarui Info Pagination "Menampilkan X - Y dari Z data"
    paginationInfo.textContent = `Menampilkan ${startIndex + 1} - ${endIndex} dari ${totalItems} data`;

    // FR-13: Render Kontrol Tombol Pagination « 1 2 3 »
    renderPaginationControls(totalPages, currentPage);
  }

  function attachActionListeners() {
    // Tombol Edit (FR-10)
    const editButtons = tableBody.querySelectorAll(".btn-action-edit");
    editButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetNim = btn.getAttribute("data-nim");
        const student = students.find((item) => item.nim === targetNim);
        if (student) {
          setEditMode(student);
          renderTable(); // Re-render untuk memberi highlight baris yang sedang diedit
        }
      });
    });

    // Tombol Hapus (FR-11)
    const deleteButtons = tableBody.querySelectorAll(".btn-action-delete");
    deleteButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetNim = btn.getAttribute("data-nim");
        const student = students.find((item) => item.nim === targetNim);
        if (student) {
          handleDeleteStudent(student);
        }
      });
    });
  }

  // FR-11: Hapus Data dengan Konfirmasi
  function handleDeleteStudent(student) {
    showConfirmModal({
      title: "Hapus Data Mahasiswa?",
      message: `Apakah Anda yakin ingin menghapus data mahasiswa "${student.nama}" (NIM: ${student.nim})? Tindakan ini tidak dapat dibatalkan.`,
      confirmText: "Ya, Hapus Data",
      isDanger: true,
      onConfirm: function () {
        // Jika sedang mengedit mahasiswa yang dihapus, batalkan mode edit
        if (editingNim === student.nim) {
          resetFormFields();
          setAddMode();
        }

        // Hapus mahasiswa dari array
        students = students.filter((item) => item.nim !== student.nim);
        saveStudentsToStorage(students);

        renderTable();
        showToast(`Data mahasiswa "${student.nama}" berhasil dihapus.`, "success");
      },
    });
  }

  // FR-13: Render Tombol Navigasi Pagination « 1 2 3 »
  function renderPaginationControls(totalPages, page) {
    paginationControls.innerHTML = "";

    if (totalPages <= 1) {
      return;
    }

    // Tombol Sebelumnya «
    const btnPrev = document.createElement("button");
    btnPrev.type = "button";
    btnPrev.className = "page-btn";
    btnPrev.innerHTML = "&laquo;";
    btnPrev.title = "Halaman sebelumnya";
    btnPrev.disabled = page === 1;
    btnPrev.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
    paginationControls.appendChild(btnPrev);

    // Tombol Angka Halaman
    for (let i = 1; i <= totalPages; i++) {
      const btnPage = document.createElement("button");
      btnPage.type = "button";
      btnPage.className = "page-btn" + (i === page ? " active" : "");
      btnPage.textContent = String(i);
      btnPage.title = `Halaman ${i}`;

      if (i === page) {
        btnPage.setAttribute("aria-current", "page");
      }

      btnPage.addEventListener("click", function () {
        if (currentPage !== i) {
          currentPage = i;
          renderTable();
        }
      });

      paginationControls.appendChild(btnPage);
    }

    // Tombol Berikutnya »
    const btnNext = document.createElement("button");
    btnNext.type = "button";
    btnNext.className = "page-btn";
    btnNext.innerHTML = "&raquo;";
    btnNext.title = "Halaman berikutnya";
    btnNext.disabled = page === totalPages;
    btnNext.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    });
    paginationControls.appendChild(btnNext);
  }

  /* ---------------- INISIALISASI APLIKASI ---------------- */
  function init() {
    students = loadStudentsFromStorage();
    setAddMode();
    renderTable();
    updateNimCounter();
  }

  // Jalankan inisialisasi saat DOM siap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

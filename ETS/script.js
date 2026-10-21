/**
 * LibraryReg — Aplikasi Pendaftaran Anggota Perpustakaan ITS
 * Front-End Logic: Validasi Formulir, Role-Based View (Pengunjung vs Admin Petugas),
 * Pengelolaan Data (CRUD), Pencarian, & LocalStorage
 */

const STORAGE_KEY = 'libraryReg_members_v1';
const STAFF_AUTH_KEY = 'libraryReg_staff_logged_in';

// Data sampel awal apabila localStorage belum memiliki data
const DEFAULT_MEMBERS = [
    {
        id: 'LIB-1001',
        nama: 'Raka Pratama Putra',
        nimNip: '5025221014',
        prodi: 'Teknik Informatika',
        jenis: 'Mahasiswa',
        telepon: '081234567801',
        email: 'raka.22014@mhs.its.ac.id',
        alamat: 'Jl. Gebang Lor No. 42, Sukolilo, Surabaya',
        tanggalDaftar: '2026-10-15'
    },
    {
        id: 'LIB-1002',
        nama: 'Dr. Eng. Ratna Kusuma Wardhani, S.Kom., M.T.',
        nimNip: '198407122010122003',
        prodi: 'Sistem Informasi',
        jenis: 'Dosen',
        telepon: '081331998822',
        email: 'ratna.wardhani@its.ac.id',
        alamat: 'Perum Dosen ITS Blok U-14, Keputih, Surabaya',
        tanggalDaftar: '2026-10-16'
    },
    {
        id: 'LIB-1003',
        nama: 'Alya Zahra Nabila',
        nimNip: '5026231048',
        prodi: 'Sistem Informasi',
        jenis: 'Mahasiswa',
        telepon: '085732114490',
        email: 'alya.23048@mhs.its.ac.id',
        alamat: 'Jl. Keputih Tegal Timur II No. 18, Surabaya',
        tanggalDaftar: '2026-10-18'
    },
    {
        id: 'LIB-1004',
        nama: 'Budi Santoso, S.Sos.',
        nimNip: '199003052015041001',
        prodi: 'UPT Perpustakaan & Layanan Sirkulasi',
        jenis: 'Tenaga Kependidikan',
        telepon: '081290876543',
        email: 'budi.santoso@its.ac.id',
        alamat: 'Jl. Mulyosari Utara V No. 9, Surabaya',
        tanggalDaftar: '2026-10-19'
    },
    {
        id: 'LIB-1005',
        nama: 'Dimas Aditya Mahendra',
        nimNip: '5002221088',
        prodi: 'Matematika',
        jenis: 'Mahasiswa',
        telepon: '082144556677',
        email: 'dimas.22088@mhs.its.ac.id',
        alamat: 'Jl. Arief Rahman Hakim No. 103, Surabaya',
        tanggalDaftar: '2026-10-20'
    }
];

// State aplikasi
let members = [];
let selectedMemberIdForDelete = null;
let selectedMemberIdForDetail = null;

// Bootstrap Modal instances
let detailModalInstance = null;
let editModalInstance = null;
let deleteModalInstance = null;
let loginModalInstance = null;

/* ==========================================================================
   1. INISIALISASI & LOCALSTORAGE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initModals();
    loadMembersFromStorage();
    syncStaffAuthState();
    updateCounters();
    initEventListeners();
    initNavigationTracking();
});

function initModals() {
    const detailEl = document.getElementById('modalDetailAnggota');
    const editEl = document.getElementById('modalEditAnggota');
    const deleteEl = document.getElementById('modalHapusAnggota');
    const loginEl = document.getElementById('modalLoginPetugas');

    if (detailEl) detailModalInstance = new bootstrap.Modal(detailEl);
    if (editEl) editModalInstance = new bootstrap.Modal(editEl);
    if (deleteEl) deleteModalInstance = new bootstrap.Modal(deleteEl);
    if (loginEl) loginModalInstance = new bootstrap.Modal(loginEl);
}

function isStaffLoggedIn() {
    return localStorage.getItem(STAFF_AUTH_KEY) === 'true';
}

function loadMembersFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) {
            members = [...DEFAULT_MEMBERS];
            saveMembersToStorage();
        } else {
            const parsed = JSON.parse(raw);
            members = Array.isArray(parsed) ? parsed : [...DEFAULT_MEMBERS];
        }
    } catch (error) {
        console.error('Gagal memuat data dari localStorage:', error);
        members = [...DEFAULT_MEMBERS];
    }
}

function saveMembersToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch (error) {
        console.error('Gagal menyimpan data ke localStorage:', error);
    }
}

/* ==========================================================================
   2. VALIDASI DATA FORMULIR (WAJIB, FORMAT EMAIL, KEUNIKAN NIM/NIP)
   ========================================================================== */
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).trim());
}

function isValidPhone(phone) {
    const digitsOnly = String(phone).replace(/[^0-9]/g, '');
    return digitsOnly.length >= 8 && digitsOnly.length <= 15;
}

function isNimNipUnique(nimNip, excludeId = null) {
    const normalizedTarget = String(nimNip).trim().toLowerCase();
    return !members.some(member => {
        if (excludeId && member.id === excludeId) return false;
        return String(member.nimNip).trim().toLowerCase() === normalizedTarget;
    });
}

function setFieldValidationState(inputEl, errorEl, isValid, errorMessage = '') {
    if (!inputEl) return;
    if (isValid) {
        inputEl.classList.remove('is-invalid');
    } else {
        inputEl.classList.add('is-invalid');
        if (errorEl && errorMessage) {
            errorEl.textContent = errorMessage;
        }
    }
}

function clearFormValidation(formEl) {
    if (!formEl) return;
    const inputs = formEl.querySelectorAll('.form-control, .form-select');
    inputs.forEach(el => el.classList.remove('is-invalid'));
}

function validateMemberPayload(fields, excludeId = null) {
    let isValid = true;

    // 1. Nama Lengkap
    const namaVal = fields.nama.input.value.trim();
    if (namaVal.length < 3) {
        setFieldValidationState(fields.nama.input, fields.nama.error, false, 'Nama lengkap wajib diisi (minimal 3 karakter).');
        isValid = false;
    } else {
        setFieldValidationState(fields.nama.input, fields.nama.error, true);
    }

    // 2. NIM / NIP (Wajib & Unik)
    const nimVal = fields.nimNip.input.value.trim();
    if (!nimVal) {
        setFieldValidationState(fields.nimNip.input, fields.nimNip.error, false, 'Nomor Induk (NIM/NIP) wajib diisi.');
        isValid = false;
    } else if (!isNimNipUnique(nimVal, excludeId)) {
        setFieldValidationState(fields.nimNip.input, fields.nimNip.error, false, `NIM/NIP "${nimVal}" sudah terdaftar pada anggota lain.`);
        isValid = false;
    } else {
        setFieldValidationState(fields.nimNip.input, fields.nimNip.error, true);
    }

    // 3. Jenis Keanggotaan
    const jenisVal = fields.jenis.input.value.trim();
    if (!jenisVal) {
        setFieldValidationState(fields.jenis.input, fields.jenis.error, false, 'Pilih salah satu jenis keanggotaan.');
        isValid = false;
    } else {
        setFieldValidationState(fields.jenis.input, fields.jenis.error, true);
    }

    // 4. Program Studi / Unit
    const prodiVal = fields.prodi.input.value.trim();
    if (!prodiVal) {
        setFieldValidationState(fields.prodi.input, fields.prodi.error, false, 'Program studi atau unit kerja wajib diisi.');
        isValid = false;
    } else {
        setFieldValidationState(fields.prodi.input, fields.prodi.error, true);
    }

    // 5. Nomor Telepon
    const teleponVal = fields.telepon.input.value.trim();
    if (!teleponVal) {
        setFieldValidationState(fields.telepon.input, fields.telepon.error, false, 'Nomor telepon wajib diisi.');
        isValid = false;
    } else if (!isValidPhone(teleponVal)) {
        setFieldValidationState(fields.telepon.input, fields.telepon.error, false, 'Nomor telepon harus berupa 8–15 digit angka.');
        isValid = false;
    } else {
        setFieldValidationState(fields.telepon.input, fields.telepon.error, true);
    }

    // 6. Email
    const emailVal = fields.email.input.value.trim();
    if (!emailVal) {
        setFieldValidationState(fields.email.input, fields.email.error, false, 'Alamat email wajib diisi.');
        isValid = false;
    } else if (!isValidEmail(emailVal)) {
        setFieldValidationState(fields.email.input, fields.email.error, false, 'Format email tidak valid (contoh: nama@its.ac.id).');
        isValid = false;
    } else {
        setFieldValidationState(fields.email.input, fields.email.error, true);
    }

    // 7. Alamat
    const alamatVal = fields.alamat.input.value.trim();
    if (alamatVal.length < 5) {
        setFieldValidationState(fields.alamat.input, fields.alamat.error, false, 'Alamat lengkap wajib diisi (minimal 5 karakter).');
        isValid = false;
    } else {
        setFieldValidationState(fields.alamat.input, fields.alamat.error, true);
    }

    return {
        isValid,
        data: {
            nama: namaVal,
            nimNip: nimVal,
            jenis: jenisVal,
            prodi: prodiVal,
            telepon: teleponVal,
            email: emailVal,
            alamat: alamatVal
        }
    };
}

/* ==========================================================================
   3. RENDER TABEL (PENGUNJUNG BIASA vs ADMIN PETUGAS) & STATISTIK
   ========================================================================== */
function getBadgeClassByRole(jenis) {
    if (jenis === 'Dosen') return 'badge-dosen';
    if (jenis === 'Tenaga Kependidikan') return 'badge-tendik';
    return 'badge-mahasiswa';
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderTable() {
    const thead = document.getElementById('memberTableHead');
    const tbody = document.getElementById('memberTableBody');
    if (!tbody || !thead) return;

    const isAdmin = isStaffLoggedIn();
    const searchKeyword = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
    const filterJenis = document.getElementById('filterJenisSelect')?.value || 'ALL';
    const countInfoEl = document.getElementById('tableCountInfo');

    // Render Header Tabel sesuai Role (Admin vs Regular User)
    if (isAdmin) {
        thead.innerHTML = `
            <tr>
                <th style="width: 55px;">No</th>
                <th>NIM / NIP</th>
                <th>Nama Lengkap</th>
                <th>Program Studi / Unit</th>
                <th>Jenis Keanggotaan</th>
                <th>Kontak</th>
                <th class="text-end">Aksi Pengelolaan</th>
            </tr>
        `;
    } else {
        thead.innerHTML = `
            <tr>
                <th style="width: 55px;">No</th>
                <th>NIM / NIP</th>
                <th>Nama Lengkap</th>
                <th>Program Studi / Unit</th>
                <th>Jenis Keanggotaan</th>
                <th class="text-end">Tanggal Terdaftar</th>
            </tr>
        `;
    }

    const filteredMembers = members.filter(member => {
        const matchSearch =
            member.nama.toLowerCase().includes(searchKeyword) ||
            member.nimNip.toLowerCase().includes(searchKeyword);
        const matchJenis = filterJenis === 'ALL' || member.jenis === filterJenis;
        return matchSearch && matchJenis;
    });

    if (countInfoEl) {
        countInfoEl.textContent = `Menampilkan ${filteredMembers.length} dari ${members.length} anggota`;
    }

    const colSpanCount = isAdmin ? 7 : 6;

    if (filteredMembers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="${colSpanCount}" class="text-center py-5 text-secondary">
                    <i class="bi bi-inbox fs-2 d-block mb-2 text-muted"></i>
                    <div class="fw-semibold">Data anggota tidak ditemukan</div>
                    <div class="small text-muted">Coba gunakan kata kunci pencarian lain atau tambahkan anggota baru.</div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredMembers.map((member, index) => {
        const badgeClass = getBadgeClassByRole(member.jenis);

        if (isAdmin) {
            return `
                <tr>
                    <td class="text-muted fw-semibold">${index + 1}</td>
                    <td><span class="fw-bold font-monospace">${escapeHtml(member.nimNip)}</span></td>
                    <td>
                        <div class="fw-semibold">${escapeHtml(member.nama)}</div>
                        <div class="small text-muted">${escapeHtml(member.id)}</div>
                    </td>
                    <td>${escapeHtml(member.prodi)}</td>
                    <td>
                        <span class="badge-role ${badgeClass}">${escapeHtml(member.jenis)}</span>
                    </td>
                    <td>
                        <div class="small">${escapeHtml(member.email)}</div>
                        <div class="small text-muted">${escapeHtml(member.telepon)}</div>
                    </td>
                    <td class="text-end">
                        <div class="d-inline-flex gap-1">
                            <button type="button" class="btn-action" title="Lihat Detail & Kartu Anggota" onclick="openDetailModal('${escapeHtml(member.id)}')">
                                <i class="bi bi-eye"></i>
                            </button>
                            <button type="button" class="btn-action" title="Edit Data Anggota" onclick="openEditModal('${escapeHtml(member.id)}')">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button" class="btn-action btn-action-danger" title="Hapus Data Anggota" onclick="openDeleteModal('${escapeHtml(member.id)}')">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }

        // Tampilan untuk Pengguna Reguler (Hanya Daftar Anggota, Tanpa Fitur Pengelolaan Admin)
        return `
            <tr>
                <td class="text-muted fw-semibold">${index + 1}</td>
                <td><span class="fw-bold font-monospace">${escapeHtml(member.nimNip)}</span></td>
                <td>
                    <div class="fw-semibold">${escapeHtml(member.nama)}</div>
                    <div class="small text-muted">${escapeHtml(member.id)}</div>
                </td>
                <td>${escapeHtml(member.prodi)}</td>
                <td>
                    <span class="badge-role ${badgeClass}">${escapeHtml(member.jenis)}</span>
                </td>
                <td class="text-end text-secondary small">${escapeHtml(member.tanggalDaftar || '-')}</td>
            </tr>
        `;
    }).join('');
}

function updateCounters() {
    const total = members.length;
    const mhsCount = members.filter(m => m.jenis === 'Mahasiswa').length;
    const dosenCount = members.filter(m => m.jenis === 'Dosen').length;
    const tendikCount = members.filter(m => m.jenis === 'Tenaga Kependidikan').length;

    const setElText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setElText('statRegisteredOnline', total);
    setElText('countAllMembers', total);
    setElText('countMahasiswa', mhsCount);
    setElText('countDosen', dosenCount);
    setElText('countTendik', tendikCount);
}

/* ==========================================================================
   4. NOTIFIKASI KEBERHASILAN ATAU KESALAHAN
   ========================================================================== */
function showAlert(containerId, type, message, extraHtml = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const alertClass = type === 'success' ? 'alert-flat-success' : 'alert-flat-danger';
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-octagon-fill';

    container.innerHTML = `
        <div class="alert-flat ${alertClass}" role="alert">
            <div class="d-flex flex-wrap align-items-center gap-2">
                <i class="bi ${iconClass}"></i>
                <span>${escapeHtml(message)}</span>
                ${extraHtml}
            </div>
            <button type="button" class="btn-close btn-sm" aria-label="Tutup" onclick="this.parentElement.remove()"></button>
        </div>
    `;
}

/* ==========================================================================
   5. OPERASI CRUD (TAMBAH, DETAIL, EDIT, HAPUS)
   ========================================================================== */
function generateMemberId() {
    const maxNum = members.reduce((acc, item) => {
        const num = parseInt(String(item.id).replace('LIB-', ''), 10);
        return !isNaN(num) && num > acc ? num : acc;
    }, 1000);
    return `LIB-${maxNum + 1}`;
}

function handleRegistrationSubmit(event) {
    event.preventDefault();

    const fields = {
        nama: { input: document.getElementById('regNama'), error: document.getElementById('errRegNama') },
        nimNip: { input: document.getElementById('regNimNip'), error: document.getElementById('errRegNimNip') },
        jenis: { input: document.getElementById('regJenis'), error: document.getElementById('errRegJenis') },
        prodi: { input: document.getElementById('regProdi'), error: document.getElementById('errRegProdi') },
        telepon: { input: document.getElementById('regTelepon'), error: document.getElementById('errRegTelepon') },
        email: { input: document.getElementById('regEmail'), error: document.getElementById('errRegEmail') },
        alamat: { input: document.getElementById('regAlamat'), error: document.getElementById('errRegAlamat') }
    };

    const validation = validateMemberPayload(fields);
    if (!validation.isValid) {
        showAlert('formAlertContainer', 'danger', 'Mohon periksa kembali kolom yang bertanda merah sebelum menyimpan.');
        return;
    }

    const newMember = {
        id: generateMemberId(),
        ...validation.data,
        tanggalDaftar: new Date().toISOString().slice(0, 10)
    };

    members.unshift(newMember);
    saveMembersToStorage();
    renderTable();
    updateCounters();

    const form = document.getElementById('registrationForm');
    form.reset();
    clearFormValidation(form);

    showAlert(
        'formAlertContainer',
        'success',
        `Pendaftaran berhasil! Anggota "${newMember.nama}" (${newMember.nimNip}) telah disimpan.`,
        `<a href="index.html#daftar-anggota" class="fw-bold text-decoration-underline ms-1" style="color: inherit;">Lihat Daftar Anggota &rarr;</a>`
    );
}

// Buka Modal Detail Anggota (Khusus Admin)
window.openDetailModal = function (memberId) {
    if (!isStaffLoggedIn()) return;
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    selectedMemberIdForDetail = member.id;

    document.getElementById('detailIdCardNumber').textContent = `ID Anggota: ${member.id}`;
    document.getElementById('detailNama').textContent = member.nama;
    document.getElementById('detailNimNip').textContent = member.nimNip;
    document.getElementById('detailProdi').textContent = member.prodi;
    document.getElementById('detailEmail').textContent = member.email;
    document.getElementById('detailTelepon').textContent = member.telepon;
    document.getElementById('detailAlamat').textContent = member.alamat;
    document.getElementById('detailTanggal').textContent = member.tanggalDaftar || '-';

    const badgeEl = document.getElementById('detailBadgeJenis');
    badgeEl.textContent = member.jenis;
    badgeEl.className = `badge-role ${getBadgeClassByRole(member.jenis)}`;

    detailModalInstance?.show();
};

// Buka Modal Edit Anggota (Khusus Admin)
window.openEditModal = function (memberId) {
    if (!isStaffLoggedIn()) return;
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const editForm = document.getElementById('editMemberForm');
    clearFormValidation(editForm);
    document.getElementById('editModalAlert').innerHTML = '';

    document.getElementById('editMemberId').value = member.id;
    document.getElementById('editNama').value = member.nama;
    document.getElementById('editNimNip').value = member.nimNip;
    document.getElementById('editJenis').value = member.jenis;
    document.getElementById('editProdi').value = member.prodi;
    document.getElementById('editTelepon').value = member.telepon;
    document.getElementById('editEmail').value = member.email;
    document.getElementById('editAlamat').value = member.alamat;

    editModalInstance?.show();
};

function handleEditSubmit(event) {
    event.preventDefault();
    if (!isStaffLoggedIn()) return;

    const memberId = document.getElementById('editMemberId').value;
    const fields = {
        nama: { input: document.getElementById('editNama'), error: document.getElementById('errEditNama') },
        nimNip: { input: document.getElementById('editNimNip'), error: document.getElementById('errEditNimNip') },
        jenis: { input: document.getElementById('editJenis'), error: document.getElementById('errEditJenis') },
        prodi: { input: document.getElementById('editProdi'), error: document.getElementById('errEditProdi') },
        telepon: { input: document.getElementById('editTelepon'), error: document.getElementById('errEditTelepon') },
        email: { input: document.getElementById('editEmail'), error: document.getElementById('errEditEmail') },
        alamat: { input: document.getElementById('editAlamat'), error: document.getElementById('errEditAlamat') }
    };

    const validation = validateMemberPayload(fields, memberId);
    if (!validation.isValid) {
        showAlert('editModalAlert', 'danger', 'Gagal memperbarui data. Pastikan seluruh kolom valid dan NIM/NIP unik.');
        return;
    }

    const idx = members.findIndex(m => m.id === memberId);
    if (idx === -1) return;

    members[idx] = {
        ...members[idx],
        ...validation.data
    };

    saveMembersToStorage();
    renderTable();
    updateCounters();
    editModalInstance?.hide();

    showAlert(
        'manageAlertContainer',
        'success',
        `Data anggota "${members[idx].nama}" (${members[idx].nimNip}) berhasil diperbarui.`
    );
}

// Buka Modal Konfirmasi Hapus (Khusus Admin)
window.openDeleteModal = function (memberId) {
    if (!isStaffLoggedIn()) return;
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    selectedMemberIdForDelete = member.id;
    document.getElementById('deleteTargetNama').textContent = member.nama;
    document.getElementById('deleteTargetNimNip').textContent = `NIM/NIP: ${member.nimNip} • ${member.prodi}`;

    deleteModalInstance?.show();
};

function confirmDeleteMember() {
    if (!isStaffLoggedIn() || !selectedMemberIdForDelete) return;

    const target = members.find(m => m.id === selectedMemberIdForDelete);
    members = members.filter(m => m.id !== selectedMemberIdForDelete);
    selectedMemberIdForDelete = null;

    saveMembersToStorage();
    renderTable();
    updateCounters();
    deleteModalInstance?.hide();

    if (target) {
        showAlert(
            'manageAlertContainer',
            'success',
            `Data anggota "${target.nama}" (${target.nimNip}) telah dihapus dari daftar anggota.`
        );
    }
}

/* ==========================================================================
   6. SINKRONISASI ROLE (PENGUNJUNG BIASA vs ADMIN PETUGAS) & EVENT LISTENERS
   ========================================================================== */
function syncStaffAuthState() {
    const isLogged = isStaffLoggedIn();
    const indicator = document.getElementById('staffStatusIndicator');
    const loginBtn = document.getElementById('btnOpenLoginModal');

    // Elemen bagian Daftar / Pengelolaan Anggota
    const sectionTagText = document.getElementById('memberSectionTagText');
    const sectionHeading = document.getElementById('memberSectionHeading');
    const sectionSubheading = document.getElementById('memberSectionSubheading');
    const btnRestoreSample = document.getElementById('btnRestoreSample');
    const heroBtnDaftar = document.getElementById('heroBtnDaftar');

    if (isLogged) {
        indicator?.classList.remove('d-none');
        indicator?.classList.add('d-flex');
        loginBtn?.classList.add('d-none');

        if (sectionTagText) sectionTagText.textContent = 'Panel Petugas Perpustakaan (Admin)';
        if (sectionHeading) sectionHeading.textContent = 'Daftar & Pengelolaan Data Anggota';
        if (sectionSubheading) {
            sectionSubheading.textContent =
                'Kelola data anggota terdaftar, cari berdasarkan nama atau NIM/NIP, lihat kartu detail, perbarui informasi, atau hapus data anggota.';
        }
        btnRestoreSample?.classList.remove('d-none');
        if (heroBtnDaftar) {
            heroBtnDaftar.innerHTML = '<i class="bi bi-table me-2"></i>Kelola &amp; Lihat Daftar Anggota';
        }
    } else {
        indicator?.classList.add('d-none');
        indicator?.classList.remove('d-flex');
        loginBtn?.classList.remove('d-none');

        if (sectionTagText) sectionTagText.textContent = 'Direktori Anggota Perpustakaan';
        if (sectionHeading) sectionHeading.textContent = 'Daftar Anggota';
        if (sectionSubheading) {
            sectionSubheading.textContent =
                'Lihat daftar anggota perpustakaan yang telah terdaftar atau cari anggota berdasarkan nama maupun NIM/NIP.';
        }
        btnRestoreSample?.classList.add('d-none');
        if (heroBtnDaftar) {
            heroBtnDaftar.innerHTML = '<i class="bi bi-people me-2"></i>Lihat Daftar Anggota';
        }
    }

    renderTable();
}

function initEventListeners() {
    // Submit Form Pendaftaran (pada pendaftaran.html)
    const regForm = document.getElementById('registrationForm');
    regForm?.addEventListener('submit', handleRegistrationSubmit);

    // Reset Form Pendaftaran
    const btnResetForm = document.getElementById('btnResetForm');
    btnResetForm?.addEventListener('click', () => {
        clearFormValidation(regForm);
        const alertBox = document.getElementById('formAlertContainer');
        if (alertBox) alertBox.innerHTML = '';
    });

    // Submit Form Edit (Admin)
    const editForm = document.getElementById('editMemberForm');
    editForm?.addEventListener('submit', handleEditSubmit);

    // Konfirmasi Hapus (Admin)
    const btnConfirmDelete = document.getElementById('btnConfirmDelete');
    btnConfirmDelete?.addEventListener('click', confirmDeleteMember);

    // Tombol Edit dari Modal Detail (Admin)
    const btnEditFromDetail = document.getElementById('btnEditFromDetail');
    btnEditFromDetail?.addEventListener('click', () => {
        detailModalInstance?.hide();
        if (selectedMemberIdForDetail) {
            setTimeout(() => window.openEditModal(selectedMemberIdForDetail), 200);
        }
    });

    // Pencarian & Filter Tabel
    const searchInput = document.getElementById('searchInput');
    const filterJenisSelect = document.getElementById('filterJenisSelect');
    searchInput?.addEventListener('input', renderTable);
    filterJenisSelect?.addEventListener('change', renderTable);

    // Muat Data Contoh (Khusus Admin)
    const btnRestoreSample = document.getElementById('btnRestoreSample');
    btnRestoreSample?.addEventListener('click', () => {
        if (!isStaffLoggedIn()) return;
        DEFAULT_MEMBERS.forEach(sample => {
            if (isNimNipUnique(sample.nimNip)) {
                members.push({ ...sample });
            }
        });
        saveMembersToStorage();
        renderTable();
        updateCounters();
        showAlert('manageAlertContainer', 'success', 'Data anggota contoh berhasil dimuat dan disinkronkan ke localStorage.');
    });

    // Simulasi Login Petugas
    const staffLoginForm = document.getElementById('staffLoginForm');
    staffLoginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const pass = document.getElementById('loginPassword').value.trim();

        if (!email || !pass) {
            showAlert('loginAlertContainer', 'danger', 'Email petugas dan kata sandi wajib diisi.');
            return;
        }

        localStorage.setItem(STAFF_AUTH_KEY, 'true');
        syncStaffAuthState();
        loginModalInstance?.hide();

        const daftarSection = document.getElementById('daftar-anggota');
        if (daftarSection) {
            showAlert('manageAlertContainer', 'success', `Selamat datang, Petugas (${email}). Mode Daftar & Pengelolaan Data Anggota aktif.`);
            daftarSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Jika login dari halaman pendaftaran.html, arahkan ke bagian pengelolaan di index.html
            window.location.href = 'index.html#daftar-anggota';
        }
    });

    // Logout Petugas
    const btnLogoutStaff = document.getElementById('btnLogoutStaff');
    btnLogoutStaff?.addEventListener('click', () => {
        localStorage.removeItem(STAFF_AUTH_KEY);
        syncStaffAuthState();
        showAlert('manageAlertContainer', 'success', 'Anda telah keluar dari mode Petugas. Tampilan kembali ke mode Daftar Anggota publik.');
    });
}

/* ==========================================================================
   7. PENANDA MENU NAVIGASI AKTIF (SCROLL & CLICK PADA INDEX.HTML)
   ========================================================================== */
function initNavigationTracking() {
    const navLinks = document.querySelectorAll('#navMenuList .nav-link[data-section]');
    if (navLinks.length === 0) return;

    const sections = ['beranda', 'tentang', 'layanan', 'daftar-anggota']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetSection = link.getAttribute('data-section');
            if (targetSection) setActiveLink(targetSection);

            const navbarCollapse = document.getElementById('navbarContent');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 140;
        let currentId = 'beranda';

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentId = section.id;
            }
        });

        setActiveLink(currentId);
    }, { passive: true });
}

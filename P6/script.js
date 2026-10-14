/* =========================================================
   Pertemuan 6 — Form Registration & Email Validation
   HTML, CSS, JavaScript murni (tanpa framework)
   ========================================================= */

/* ---------------- Navigasi halaman ---------------- */
function bukaHalaman(id) {
  if (!document.getElementById(id)) id = "beranda";

  document.querySelectorAll(".halaman").forEach(function (halaman) {
    halaman.classList.toggle("aktif", halaman.id === id);
  });
  document.querySelectorAll(".nav-btn").forEach(function (btn) {
    btn.classList.toggle("aktif", btn.dataset.target === id);
  });

  history.replaceState(null, "", id === "beranda" ? location.pathname : "#" + id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-target]").forEach(function (el) {
  el.addEventListener("click", function () {
    bukaHalaman(el.dataset.target);
  });
});

bukaHalaman(location.hash.replace("#", "") || "beranda");

/* ---------------- Utilitas ---------------- */
var toastTimer;
function tampilToast(pesan) {
  var toast = document.getElementById("toast");
  toast.textContent = pesan;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2600);
}

function goyang(el) {
  el.classList.remove("shake");
  void el.offsetWidth; // restart animasi
  el.classList.add("shake");
}

/* Regex email yang dipakai di kedua tugas */
var EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

/* =========================================================
   TUGAS 1 — FORM REGISTRATION
   ========================================================= */
var mahasiswa = [
  { nama: "Andi Pratama", nim: "5025251101", prodi: "Teknik Informatika" },
  { nama: "Budi Santoso", nim: "5025251102", prodi: "Teknik Informatika" },
  { nama: "Citra Lestari", nim: "5026251103", prodi: "Sistem Informasi" },
  { nama: "Dewi Anggraini", nim: "5027251104", prodi: "Teknologi Informasi" },
  { nama: "Eko Saputra", nim: "5025251105", prodi: "Rekayasa Perangkat Lunak" },
  { nama: "Fajar Nugroho", nim: "5025251106", prodi: "Sains Data" },
  { nama: "Gita Permata", nim: "5026251107", prodi: "Sistem Informasi" },
  { nama: "Hendra Wijaya", nim: "5025251108", prodi: "Teknik Informatika" },
];

var formReg = document.getElementById("formRegistrasi");
var inputNama = document.getElementById("regNama");
var boxRekomendasi = document.getElementById("rekomendasiNama");
var inputNim = document.getElementById("regNim");
var selectProdi = document.getElementById("regProdi");
var inputEmailReg = document.getElementById("regEmail");
var inputHp = document.getElementById("regHp");
var inputPass = document.getElementById("regPassword");
var inputKonfirmasi = document.getElementById("regKonfirmasi");
var cekSetuju = document.getElementById("regSetuju");
var hasilReg = document.getElementById("hasilRegistrasi");
var dataTerdaftar = [];
var indeksAktif = -1;

/* --- Autocomplete nama --- */
function tampilkanRekomendasi() {
  var kata = inputNama.value.trim().toLowerCase();
  boxRekomendasi.innerHTML = "";
  indeksAktif = -1;
  if (kata === "") return;

  mahasiswa
    .filter(function (m) {
      return m.nama.toLowerCase().includes(kata);
    })
    .forEach(function (m) {
      var tombol = document.createElement("button");
      tombol.type = "button";
      tombol.setAttribute("role", "option");

      // Sorot bagian nama yang cocok
      var namaEl = document.createElement("span");
      var mulai = m.nama.toLowerCase().indexOf(kata);
      var mark = document.createElement("mark");
      mark.textContent = m.nama.substr(mulai, kata.length);
      namaEl.append(m.nama.slice(0, mulai), mark, m.nama.slice(mulai + kata.length));

      var nimEl = document.createElement("small");
      nimEl.textContent = m.nim;

      tombol.append(namaEl, nimEl);
      tombol.addEventListener("click", function () {
        pilihMahasiswa(m);
      });
      boxRekomendasi.appendChild(tombol);
    });
}

function pilihMahasiswa(m) {
  inputNama.value = m.nama;
  inputNim.value = m.nim;
  selectProdi.value = m.prodi;
  inputEmailReg.value = m.nama.toLowerCase().split(" ")[0] + "." + m.nim + "@student.its.ac.id";
  boxRekomendasi.innerHTML = "";
  [inputNama, inputNim, selectProdi, inputEmailReg].forEach(validasiField);
  inputHp.focus();
}

inputNama.addEventListener("input", tampilkanRekomendasi);

inputNama.addEventListener("keydown", function (e) {
  var opsi = boxRekomendasi.querySelectorAll("button");
  if (!opsi.length) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    indeksAktif = (indeksAktif + (e.key === "ArrowDown" ? 1 : -1) + opsi.length) % opsi.length;
    opsi.forEach(function (o, i) {
      o.classList.toggle("active", i === indeksAktif);
    });
  } else if (e.key === "Enter" && indeksAktif >= 0) {
    e.preventDefault();
    opsi[indeksAktif].click();
  } else if (e.key === "Escape") {
    boxRekomendasi.innerHTML = "";
  }
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".autocomplete")) boxRekomendasi.innerHTML = "";
});

/* --- Aturan validasi per field --- */
var aturan = {
  regNama: function (v) {
    if (v.trim() === "") return "Nama lengkap wajib diisi.";
    if (!/^[a-zA-Z\s'.]+$/.test(v)) return "Nama hanya boleh berisi huruf dan spasi.";
    if (v.trim().length < 3) return "Nama minimal 3 karakter.";
    return "";
  },
  regNim: function (v) {
    if (v === "") return "NRP/NIM wajib diisi.";
    if (!/^\d{10}$/.test(v)) return "NRP/NIM harus terdiri dari 10 digit angka.";
    return "";
  },
  regProdi: function (v) {
    return v === "" ? "Silakan pilih program studi." : "";
  },
  regEmail: function (v) {
    if (v === "") return "Email wajib diisi.";
    if (!EMAIL_REGEX.test(v)) return "Format email tidak valid (contoh: nama@domain.com).";
    return "";
  },
  regHp: function (v) {
    if (v === "") return "Nomor HP wajib diisi.";
    if (!/^(\+62|62|0)8\d{8,11}$/.test(v.replace(/[\s-]/g, "")))
      return "Nomor HP harus diawali 08 / +628 dan berisi 10–13 digit.";
    return "";
  },
  regPassword: function (v) {
    if (v === "") return "Password wajib diisi.";
    if (v.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Z]/.test(v) || !/[a-z]/.test(v) || !/\d/.test(v))
      return "Password harus mengandung huruf besar, huruf kecil, dan angka.";
    return "";
  },
  regKonfirmasi: function (v) {
    if (v === "") return "Konfirmasi password wajib diisi.";
    if (v !== inputPass.value) return "Konfirmasi password tidak sama.";
    return "";
  },
  regGender: function () {
    return formReg.querySelector('input[name="gender"]:checked') ? "" : "Pilih jenis kelamin.";
  },
  regSetuju: function () {
    return cekSetuju.checked ? "" : "Anda harus menyetujui syarat & ketentuan.";
  },
};

function setStatus(id, pesan) {
  var errorEl = formReg.querySelector('.error[data-for="' + id + '"]');
  var field = errorEl.closest(".field");
  errorEl.textContent = pesan;
  field.classList.toggle("invalid", pesan !== "");
  field.classList.toggle("valid", pesan === "");
}

function validasiField(el) {
  var id = el.id;
  if (el.name === "gender") id = "regGender";
  var pesan = aturan[id](el.value || "");
  setStatus(id, pesan);
  return pesan === "";
}

// Validasi saat field ditinggalkan, lalu real-time setelah pernah disentuh
["regNama", "regNim", "regProdi", "regEmail", "regHp", "regPassword", "regKonfirmasi"].forEach(function (id) {
  var el = document.getElementById(id);
  el.addEventListener("blur", function () {
    if (id === "regNama" && boxRekomendasi.children.length) return;
    el.dataset.touched = "1";
    validasiField(el);
  });
  el.addEventListener(el.tagName === "SELECT" ? "change" : "input", function () {
    if (el.dataset.touched) validasiField(el);
    if (id === "regPassword" && inputKonfirmasi.dataset.touched) validasiField(inputKonfirmasi);
  });
});

// NIM hanya angka
inputNim.addEventListener("input", function () {
  inputNim.value = inputNim.value.replace(/\D/g, "");
});

formReg.querySelectorAll('input[name="gender"]').forEach(function (r) {
  r.addEventListener("change", function () {
    setStatus("regGender", "");
  });
});
cekSetuju.addEventListener("change", function () {
  setStatus("regSetuju", aturan.regSetuju());
});

/* --- Kekuatan password --- */
var strengthBar = document.getElementById("strengthBar");
var strengthText = document.getElementById("strengthText");
var level = [
  { teks: "Sangat lemah", warna: "var(--color-strength-1)" },
  { teks: "Lemah", warna: "var(--color-strength-2)" },
  { teks: "Sedang", warna: "var(--color-strength-3)" },
  { teks: "Kuat", warna: "var(--color-strength-4)" },
  { teks: "Sangat kuat", warna: "var(--color-strength-5)" },
];

inputPass.addEventListener("input", function () {
  var v = inputPass.value;
  var skor = 0;
  if (v.length >= 8) skor++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) skor++;
  if (/\d/.test(v)) skor++;
  if (/[^A-Za-z0-9]/.test(v)) skor++;
  if (v.length >= 12) skor++;

  if (v === "") {
    strengthBar.style.width = "0";
    strengthText.textContent = "Gunakan huruf besar, kecil, angka & simbol.";
    return;
  }
  var lv = level[Math.max(0, skor - 1)];
  strengthBar.style.width = (skor / 5) * 100 + "%";
  strengthBar.style.background = lv.warna;
  strengthText.textContent = "Kekuatan: " + lv.teks;
});

document.getElementById("togglePassword").addEventListener("click", function () {
  var tampil = inputPass.type === "password";
  inputPass.type = inputKonfirmasi.type = tampil ? "text" : "password";
  this.textContent = tampil ? "Tutup" : "Lihat";
  this.setAttribute("aria-label", tampil ? "Sembunyikan password" : "Tampilkan password");
});

/* --- Submit --- */
formReg.addEventListener("submit", function (e) {
  e.preventDefault();

  var semuaValid = true;
  Object.keys(aturan).forEach(function (id) {
    var el = document.getElementById(id);
    var pesan = aturan[id](el && "value" in el ? el.value : "");
    setStatus(id, pesan);
    if (pesan) semuaValid = false;
  });

  if (!semuaValid) {
    hasilReg.className = "alert error";
    hasilReg.textContent = "Registrasi gagal. Periksa kembali field yang ditandai merah.";
    goyang(formReg);
    var pertama = formReg.querySelector(".field.invalid input, .field.invalid select");
    if (pertama) pertama.focus();
    return;
  }

  if (dataTerdaftar.some(function (d) { return d.nim === inputNim.value; })) {
    hasilReg.className = "alert error";
    hasilReg.textContent = "NRP/NIM " + inputNim.value + " sudah terdaftar.";
    setStatus("regNim", "NRP/NIM sudah terdaftar.");
    goyang(formReg);
    return;
  }

  var data = {
    nama: inputNama.value.trim(),
    nim: inputNim.value,
    prodi: selectProdi.value,
    email: inputEmailReg.value,
    hp: inputHp.value,
    gender: formReg.querySelector('input[name="gender"]:checked').value,
  };
  dataTerdaftar.unshift(data);
  renderDaftar();

  hasilReg.className = "alert success";
  hasilReg.textContent = "Registrasi " + data.nama + " (" + data.nim + ") berhasil disimpan.";
  tampilToast("Registrasi berhasil");
  simpanPesan = true;
  formReg.reset();
});

var simpanPesan = false;
formReg.addEventListener("reset", function () {
  var hapusPesan = !simpanPesan;
  simpanPesan = false;
  setTimeout(function () {
    bersihkanStatus(hapusPesan);
  });
});

function bersihkanStatus(hapusPesan) {
  formReg.querySelectorAll(".field").forEach(function (f) {
    f.classList.remove("valid", "invalid");
  });
  formReg.querySelectorAll(".error").forEach(function (er) {
    er.textContent = "";
  });
  formReg.querySelectorAll("[data-touched]").forEach(function (el) {
    delete el.dataset.touched;
  });
  strengthBar.style.width = "0";
  strengthText.textContent = "Gunakan huruf besar, kecil, angka & simbol.";
  boxRekomendasi.innerHTML = "";
  if (hapusPesan) hasilReg.textContent = "";
}

function renderDaftar() {
  var list = document.getElementById("daftarRegistrasi");
  list.innerHTML = "";
  document.getElementById("daftarKosong").hidden = dataTerdaftar.length > 0;

  dataTerdaftar.forEach(function (d, i) {
    var li = document.createElement("li");
    li.className = "reg-item";

    var avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = d.nama
      .split(" ")
      .map(function (k) { return k[0]; })
      .slice(0, 2)
      .join("")
      .toUpperCase();

    var info = document.createElement("div");
    info.className = "info";
    var b = document.createElement("b");
    b.textContent = d.nama;
    var s1 = document.createElement("span");
    s1.textContent = d.nim + " · " + d.prodi;
    var s2 = document.createElement("span");
    s2.textContent = d.email + " · " + d.gender;
    info.append(b, s1, s2);

    var hapus = document.createElement("button");
    hapus.className = "btn-hapus";
    hapus.type = "button";
    hapus.title = "Hapus";
    hapus.textContent = "✕";
    hapus.addEventListener("click", function () {
      dataTerdaftar.splice(i, 1);
      renderDaftar();
      tampilToast("Data " + d.nama + " dihapus");
    });

    li.append(avatar, info, hapus);
    list.appendChild(li);
  });
}

/* =========================================================
   TUGAS 2 — EMAIL VALIDATION FORM
   ========================================================= */
var formEmail = document.getElementById("formEmail");
var inputEmail = document.getElementById("inputEmail");
var ikonStatus = document.getElementById("emailStatusIcon");
var saranEl = document.getElementById("emailSaran");
var hasilEmail = document.getElementById("hasilEmail");
var statistik = { valid: 0, invalid: 0 };

var domainPopuler = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "its.ac.id", "student.its.ac.id"];

function cekAturanEmail(email) {
  var bagian = email.split("@");
  var lokal = bagian[0] || "";
  var domain = bagian.length === 2 ? bagian[1] : "";

  return {
    notEmpty: email.length > 0,
    noSpace: email.length > 0 && !/\s/.test(email),
    oneAt: bagian.length === 2,
    local: lokal.length > 0 && /^[a-zA-Z0-9._%+-]+$/.test(lokal),
    dots:
      email.length > 0 &&
      !/\.\./.test(email) &&
      !/^\./.test(lokal) &&
      !/\.$/.test(lokal) &&
      !/^\./.test(domain) &&
      !/\.$/.test(email),
    domain: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(domain) && !/(^-|-\.|\.-|-$)/.test(domain),
    tld: /\.[a-zA-Z]{2,}$/.test(domain),
  };
}

function emailValid(email) {
  var hasil = cekAturanEmail(email);
  return Object.keys(hasil).every(function (k) { return hasil[k]; }) && EMAIL_REGEX.test(email);
}

/* Jarak Levenshtein untuk mendeteksi typo domain */
function jarak(a, b) {
  var dp = [];
  for (var i = 0; i <= a.length; i++) {
    dp[i] = [i];
    for (var j = 1; j <= b.length; j++) {
      dp[i][j] =
        i === 0
          ? j
          : Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

function cariSaran(email) {
  var at = email.lastIndexOf("@");
  if (at < 1) return null;
  var domain = email.slice(at + 1).toLowerCase();
  if (!domain || domainPopuler.includes(domain)) return null;

  var terbaik = null;
  var min = 3;
  domainPopuler.forEach(function (d) {
    var j = jarak(domain, d);
    if (j > 0 && j < min) {
      min = j;
      terbaik = d;
    }
  });
  return terbaik ? email.slice(0, at + 1) + terbaik : null;
}

function updateEmailUI() {
  var email = inputEmail.value;
  var hasil = cekAturanEmail(email);
  var wrap = inputEmail.parentElement;

  document.querySelectorAll("#emailRules li").forEach(function (li) {
    var ok = hasil[li.dataset.rule];
    li.classList.toggle("ok", ok);
    li.classList.toggle("fail", !ok && email.length > 0);
  });

  var valid = emailValid(email);
  wrap.classList.toggle("valid", valid);
  wrap.classList.toggle("invalid", !valid && email.length > 0);
  ikonStatus.textContent = email.length === 0 ? "" : valid ? "Valid" : "Belum valid";
  ikonStatus.className = "status-icon " + (valid ? "ok" : "no");

  // Saran typo
  saranEl.innerHTML = "";
  var saran = cariSaran(email);
  if (saran) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnPakaiSaran";
    btn.textContent = saran;
    btn.addEventListener("click", function () {
      inputEmail.value = saran;
      updateEmailUI();
      inputEmail.focus();
    });
    saranEl.append("Mungkin maksud Anda ", btn, "?");
  }
}

inputEmail.addEventListener("input", function () {
  hasilEmail.textContent = "";
  updateEmailUI();
});

formEmail.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = inputEmail.value.trim();
  inputEmail.value = email;
  updateEmailUI();

  if (email === "") {
    hasilEmail.className = "alert error";
    hasilEmail.textContent = "Silakan masukkan alamat email terlebih dahulu.";
    goyang(formEmail);
    inputEmail.focus();
    return;
  }

  var valid = emailValid(email);
  hasilEmail.className = "alert " + (valid ? "success" : "error");
  hasilEmail.textContent = valid
    ? "\"" + email + "\" adalah alamat email yang valid."
    : "\"" + email + "\" bukan alamat email yang valid. Periksa aturan yang ditandai merah.";
  if (!valid) goyang(formEmail);

  tambahRiwayat(email, valid);
});

document.getElementById("btnClearEmail").addEventListener("click", function () {
  inputEmail.value = "";
  hasilEmail.textContent = "";
  updateEmailUI();
  inputEmail.focus();
});

function tambahRiwayat(email, valid) {
  statistik[valid ? "valid" : "invalid"]++;
  document.getElementById("statValid").textContent = statistik.valid;
  document.getElementById("statInvalid").textContent = statistik.invalid;
  document.getElementById("riwayatKosong").hidden = true;

  var li = document.createElement("li");
  var dot = document.createElement("span");
  dot.className = "dot " + (valid ? "ok" : "no");
  var teks = document.createElement("span");
  teks.textContent = email;
  var waktu = document.createElement("time");
  waktu.textContent = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  li.append(dot, teks, waktu);

  var list = document.getElementById("riwayatEmail");
  list.prepend(li);
  while (list.children.length > 15) list.lastChild.remove();
}

/* --- Validasi banyak email --- */
document.getElementById("btnCekBulk").addEventListener("click", function () {
  var wadah = document.getElementById("hasilBulk");
  var daftar = document
    .getElementById("bulkEmail")
    .value.split(/[\n,;]+/)
    .map(function (s) { return s.trim(); })
    .filter(Boolean);

  wadah.innerHTML = "";
  if (!daftar.length) {
    tampilToast("Masukkan minimal satu email");
    return;
  }

  var jumlahValid = 0;
  var tags = daftar.map(function (email, i) {
    var ok = emailValid(email);
    if (ok) jumlahValid++;
    var tag = document.createElement("span");
    tag.className = "tag " + (ok ? "ok" : "no");
    tag.style.animationDelay = i * 40 + "ms";
    tag.textContent = (ok ? "✓ " : "✕ ") + email;
    return tag;
  });

  var ringkas = document.createElement("p");
  ringkas.className = "bulk-summary";
  ringkas.textContent = jumlahValid + " dari " + daftar.length + " email valid.";
  wadah.append(ringkas);
  tags.forEach(function (t) { wadah.append(t); });
});

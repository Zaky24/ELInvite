# 💌 ELInvite — Undangan Pernikahan Digital Adat Minangkabau

**ELInvite** adalah website undangan pernikahan digital modern, berkelas, dan interaktif yang dibangun dengan perpaduan nilai budaya Minangkabau dan standar estetika editorial tinggi (*The Lovers' Vow Journal*).

---

## 👨‍💻 Developer & Author Showcase

Proyek ini dirancang dan dikembangkan oleh:

- **Nama Proyek**: **ELInvite**
- **Pengembang**: **Ira Zaky Elmar**
- **Institusi**: Politeknik LP3I Kampus Padang (Manajemen Informatika)
- **Website Portofolio**: [zaky24.github.io](https://zaky24.github.io/)
- **GitHub**: [@Zaky24](https://github.com/Zaky24)
- **WhatsApp**: [+62 895-0763-0763](https://wa.me/6289507630763)
- **LinkedIn**: [Ira Zaky Elmar](https://www.linkedin.com/in/ira-zaky-0b6779447)
- **Instagram**: [@zaky__24](https://www.instagram.com/zaky__24)

---

## ✨ Fitur Unggulan ELInvite

1. **Cover Amplop Upacara & Pembuka Interaktif (*Ceremonial Envelope Opening*)**:
   - Tampilan pembuka bergaya amplop mewah dengan segel monogram *R & A* beranimasi *wax pulse*.
   - Tombol **"Buka Undangan"** dengan transisi unsealing halus, membuka kunci scroll, dan langsung memulai pemutaran musik latar.
   - Badge branding pengembang yang terintegrasi secara elegan.

2. **Animasi Kelopak Bunga Emas Melayang (*Ambient Golden Petals Canvas*)**:
   - Engine canvas partikel melayang yang ringan dan dinamis (`#petals-canvas`), menampilkan kelopak bunga emas dan rona merah Minang yang melayang lembut dengan fisika angin.
   - Otomatis hemat daya dan berhenti saat tab browser tidak aktif.

3. **Sistem Animasi Muncul Saat Scroll (*On-Scroll Reveal System*)**:
   - Transisi *IntersectionObserver* halus (`.reveal-on-scroll`) dengan kurva *exponential ease-out* pada setiap kartu dan bagian acara.

4. **Kekayaan Adat Minangkabau yang Autentik**:
   - **Marapulai**: Rizky Pratama, S.T. dengan **Gelar Adat: Sutan Palimo Basa** (*Kaciak banamo, gadang bagala*) dari **Suku Caniago**, Kurai, Bukittinggi.
   - **Anak Daro**: Adelia Putri Maharani, S.Ds. dari **Suku Koto**, Payakumbuh.
   - Foto pengantin profesional adat Minangkabau lengkap dengan **Suntiang Emas Megah**, **Songket**, dan jas resmi pengantin.
   - Pepatah petitih Minang (*"Adat basandi syarak, syarak basandi Kitabullah"*, *"Barek samo dipikua, ringan samo dijinjiang"*).
   - Rangkaian prosesi adat lengkap: **Malam Bainai**, **Akad Nikah**, dan **Baralek Gadang**.
   - Penghormatan silsilah keluarga besar: Ninik Mamak, Mamak Rumah, Bako, dan Induak Bako kedua suku.

5. **Personalisasi Nama Tamu Otomatis (*URL Query Parameter*)**:
   - Mendukung parameter URL dinamis:
     - `index.html?to=Bapak+Joko+Santoso`
     - `index.html?to=Keluarga+Besar+Hendra&u=VIP`
     - `index.html?guest=Sarah+Amalia`
   - Nama tamu otomatis ditampilkan pada kartu pembuka dan langsung mengisi form RSVP.

6. **Mesin Pemutar Musik Ganda (*Resilient Dual-Engine Audio Player*)**:
   - Audio akustik romantis (`assets/audio/romantic-ambient.wav`) dengan *fallback* **Web Audio API Synthesizer** (arpeggio piano/harpa).
   - *Floating capsule controller* dengan animasi piringan hitam berputar dan *equalizer soundwave*.

7. **Hitung Mundur Real-Time & Ekspor Kalender (*Live Countdown & Calendar Sync*)**:
   - Ticker hari, jam, menit, dan detik menuju waktu acara (Sabtu, 24 Oktober 2026, 08.00 WIB).
   - Tombol **"Simpan ke Google Calendar"** & **"Unduh Pengingat (.ics)"** standar RFC 5545 untuk Apple Calendar, Outlook, dan Android.

8. **Rangkaian Acara & Peta Lokasi (*Event Schedule & Google Maps*)**:
   - Jadwal terperinci Malam Bainai, Akad Nikah, dan Baralek Gadang beserta aturan busana (*dress code*).
   - Integrasi interaktif Google Maps ke gedung Sasana Kriya TMII Jakarta Timur dan tombol petunjuk arah.

9. **Galeri Foto & Penampil Interaktif (*Photo Gallery & Lightbox*)**:
   - Galeri foto pengantin adat Minangkabau dalam tata letak grid responsif.
   - Penampil foto layar penuh (*Lightbox modal*) dengan kontrol navigasi keyboard (panah kiri/kanan & Esc).

10. **RSVP & Sinkronisasi WhatsApp (*RSVP & WhatsApp Sync*)**:
    - Form konfirmasi kehadiran yang tersimpan di *LocalStorage* dan langsung ter-update di buku tamu.
    - Tombol **"Kirim Konfirmasi Langsung ke WhatsApp"** dengan format pesan otomatis.

11. **Buku Tamu & Untaian Doa (*Live Wishes Stream*)**:
    - Menampilkan ucapan doa restu dari para sahabat dan keluarga secara *real-time*.

12. **Tanda Kasih & Amplop Digital (*Wedding Gift & Digital Envelope*)**:
    - Rekening Bank BCA dan Mandiri dengan tombol **1-Klik Salin Nomor Rekening** disertai notifikasi *toast*.
    - Alamat pengiriman kado fisik dengan tombol **Salin Alamat Lengkap**.

13. **Kartu Branding & Kontak Pengembang (*Developer Showcase Card*)**:
    - Kartu profil pengembang interaktif di akhir halaman dengan tautan langsung ke website portofolio utama, GitHub, WhatsApp, LinkedIn, dan Instagram.

14. **Navigasi Melayang Bawah (*Bottom Capsule Dock*)**:
    - Navigasi cepat (*Scroll Spy*) yang otomatis menyorot posisi bagian aktif (Beranda, Mempelai, Acara, Keluarga, Galeri, RSVP, Hadiah).

---

## 🛠️ Tech Stack

- **HTML5**: Semantik, terstruktur, ramah SEO, dan lengkap dengan meta tag OpenGraph.
- **Tailwind CSS**: Desain utilitas modern dengan palet warna kustom (*Alabaster*, *Antique Bronze*, *Charcoal Ink*, *Minang Red*, *Minang Gold*).
- **Vanilla JavaScript (ES6+)**: Ringan, cepat, tanpa dependensi framework (*zero build step*).
- **Web Audio API**: Audio synthesis fallback & gesture unlock.
- **HTML5 Canvas**: Engine partikel kelopak bunga emas melayang.
- **Google Fonts**: `Marcellus` (display serif), `Tenor Sans` (humanist body), `Jost` (UI sans), dan `Pinyon Script` (monogram).

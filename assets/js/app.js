/**
 * Main Application Logic: Wedding Invitation Rizky & Adelia (Adat Minangkabau)
 * Features:
 * - Dynamic Guest personalization (?to=... or ?guest=...)
 * - Ambient Golden Floral Petals Particle Canvas Engine
 * - On-Scroll Reveal Observer System (.reveal-on-scroll)
 * - Ceremonial unsealing animation & audio trigger
 * - Resilient dual-engine audio player (HTML5 Audio + Web Audio API synthesizer fallback)
 * - Live countdown timer to target date (24 Oktober 2026, 08:00 WIB)
 * - One-click Google Calendar & .ics export
 * - 1-tap copy to clipboard with toast notification
 * - Interactive Lightbox for photo gallery with keyboard navigation
 * - LocalStorage guestbook & instant WhatsApp RSVP sync
 * - Active scroll spy for bottom navigation dock
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. GUEST NAME PERSONALIZATION FROM URL PARAMETERS
     ========================================================================= */
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuest = urlParams.get('to') || urlParams.get('guest') || urlParams.get('nama') || urlParams.get('u');
  const guestNameCover = document.getElementById('guest-name-cover');
  const rsvpNameInput = document.getElementById('rsvp-name');

  if (rawGuest && rawGuest.trim() !== '') {
    const formattedGuest = decodeURIComponent(rawGuest.replace(/\+/g, ' ')).trim();
    if (guestNameCover) guestNameCover.textContent = formattedGuest;
    if (rsvpNameInput) rsvpNameInput.value = formattedGuest;
  }

  /* =========================================================================
     2. AMBIENT GOLDEN FLORAL PETALS CANVAS ENGINE
     ========================================================================= */
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalCount = window.innerWidth < 768 ? 20 : 36;
    const petals = [];

    // Warm golden bronze palette
    const colors = [
      'rgba(197, 160, 89, 0.55)', // Minang gold
      'rgba(158, 125, 83, 0.45)',  // Champagne bronze
      'rgba(228, 213, 194, 0.40)', // Bronze light
      'rgba(139, 38, 30, 0.25)'    // Soft Minang red tint
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 5 + 3,
        dx: (Math.random() - 0.5) * 0.75 + 0.35,
        dy: Math.random() * 0.8 + 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmp: Math.random() * 1.5 + 0.5,
        swayPhase: Math.random() * Math.PI * 2
      });
    }

    let isCanvasRunning = true;
    document.addEventListener('visibilitychange', () => {
      isCanvasRunning = !document.hidden;
    });

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Organic petal curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.r, -p.r * 1.5, p.r * 1.8, p.r * 0.8, 0, p.r * 2.2);
      ctx.bezierCurveTo(-p.r * 1.8, p.r * 0.8, -p.r, -p.r * 1.5, 0, 0);
      ctx.fill();

      ctx.restore();
    }

    function animatePetals() {
      if (isCanvasRunning) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          p.swayPhase += p.swaySpeed;
          p.x += p.dx + Math.sin(p.swayPhase) * p.swayAmp;
          p.y += p.dy;
          p.rot += p.rotSpeed;

          // Wrap edges smoothly
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          drawPetal(p);
        }
      }
      requestAnimationFrame(animatePetals);
    }

    animatePetals();
  }

  /* =========================================================================
     3. ON-SCROLL REVEAL OBSERVER
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: reveal all immediately if IntersectionObserver unsupported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* =========================================================================
     4. RESILIENT AUDIO ENGINE (HTML5 Audio + Web Audio Synth Fallback)
     ========================================================================= */
  const audioElement = document.getElementById('wedding-audio');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const discIcon = document.getElementById('disc-icon');
  const equalizerBars = document.getElementById('equalizer-bars');
  const audioStatusText = document.getElementById('audio-status-text');

  let isAudioPlaying = false;
  let webAudioCtx = null;
  let synthInterval = null;

  function initWebAudioSynth() {
    if (webAudioCtx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      webAudioCtx = new AudioCtx();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  function playSynthChord() {
    if (!webAudioCtx || webAudioCtx.state === 'suspended') return;
    
    // Romantic arpeggio sequence in D / A / Bm / G with traditional nuance
    const chords = [
      [293.66, 369.99, 440.00], // D, F#, A
      [220.00, 277.18, 329.63], // A, C#, E
      [246.94, 293.66, 369.99], // Bm: B, D, F#
      [196.00, 246.94, 293.66]  // G: G, B, D
    ];
    const now = webAudioCtx.currentTime;
    const chord = chords[Math.floor(Math.random() * chords.length)];

    chord.forEach((freq, idx) => {
      const osc = webAudioCtx.createOscillator();
      const gain = webAudioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.18);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.18 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.18 + 1.8);

      osc.connect(gain);
      gain.connect(webAudioCtx.destination);

      osc.start(now + idx * 0.18);
      osc.stop(now + idx * 0.18 + 2.0);
    });
  }

  function updateAudioUI(playing) {
    isAudioPlaying = playing;
    if (playing) {
      discIcon.classList.add('animate-spin-slow');
      equalizerBars.classList.remove('hidden');
      if (audioStatusText) audioStatusText.textContent = 'Memutar Musik';
    } else {
      discIcon.classList.remove('animate-spin-slow');
      equalizerBars.classList.add('hidden');
      if (audioStatusText) audioStatusText.textContent = 'Musik Dijeda';
    }
  }

  async function playAudio() {
    initWebAudioSynth();
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      try { await webAudioCtx.resume(); } catch (e) {}
    }

    if (audioElement) {
      audioElement.volume = 0.65;
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateAudioUI(true);
          })
          .catch((err) => {
            console.warn('Audio element play blocked, falling back to Web Audio synth:', err);
            if (!synthInterval) {
              playSynthChord();
              synthInterval = setInterval(playSynthChord, 3500);
            }
            updateAudioUI(true);
          });
      }
    }
  }

  function pauseAudio() {
    if (audioElement) {
      audioElement.pause();
    }
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    updateAudioUI(false);
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', toggleAudio);
  }

  /* =========================================================================
     5. CEREMONIAL ENVELOPE OPENING
     ========================================================================= */
  const openInvitationBtn = document.getElementById('open-invitation-btn');
  const envelopeCover = document.getElementById('envelope-cover');

  if (openInvitationBtn && envelopeCover) {
    openInvitationBtn.addEventListener('click', () => {
      playAudio();
      envelopeCover.classList.add('unsealed');
      document.body.classList.remove('overflow-hidden');

      setTimeout(() => {
        envelopeCover.style.display = 'none';
      }, 850);
    });
  }

  /* =========================================================================
     6. LIVE COUNTDOWN TIMER
     ========================================================================= */
  // Target: 24 Oktober 2026 08:00 WIB (UTC+7)
  const targetDate = new Date('2026-10-24T08:00:00+07:00').getTime();

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =========================================================================
     7. GOOGLE CALENDAR & .ICS DOWNLOAD
     ========================================================================= */
  const btnGoogleCalendar = document.getElementById('btn-google-calendar');
  const btnDownloadIcs = document.getElementById('btn-download-ics');

  if (btnGoogleCalendar) {
    const gCalTitle = encodeURIComponent('Baralek Gadang: Rizky & Adelia (Adat Minangkabau)');
    const gCalDates = '20261024T010000Z/20261024T070000Z'; // 08:00 - 14:00 WIB in UTC
    const gCalDetails = encodeURIComponent('Akad Nikah & Baralek Gadang Rizky Pratama, S.T. (Gelar: Sutan Palimo Basa) & Adelia Putri Maharani, S.Ds. di Sasana Kriya Grand Ballroom, Taman Mini Indonesia Indah, Jakarta.');
    const gCalLocation = encodeURIComponent('Sasana Kriya TMII, Cipayung, Jakarta Timur');
    btnGoogleCalendar.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${gCalDates}&details=${gCalDetails}&location=${gCalLocation}`;
  }

  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Rizky & Adelia Minangkabau Wedding//ID',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:wedding-minang-rizky-adelia-20261024@invitation',
        'DTSTAMP:20261024T000000Z',
        'DTSTART:20261024T010000Z',
        'DTEND:20261024T070000Z',
        'SUMMARY:Baralek Gadang: Rizky & Adelia (Adat Minangkabau)',
        'DESCRIPTION:Akad Nikah & Baralek Gadang Rizky Pratama (Sutan Palimo Basa) & Adelia Putri Maharani.',
        'LOCATION:Sasana Kriya Grand Ballroom, Taman Mini Indonesia Indah, Jakarta Timur',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Pernikahan-Adat-Minang-Rizky-Adelia.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Pengingat kalender (.ics) berhasil diunduh!');
    });
  }

  /* =========================================================================
     8. TOAST NOTIFICATION UTILITY
     ========================================================================= */
  const toastNotice = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  /* =========================================================================
     9. 1-TAP COPY TO CLIPBOARD
     ========================================================================= */
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const label = btn.getAttribute('data-label') || 'Teks';
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const textToCopy = targetElement.textContent.trim();
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }
          showToast(`${label} berhasil disalin ke papan klip!`);
        } catch (err) {
          showToast(`Gagal menyalin ${label}`);
        }
      }
    });
  });

  /* =========================================================================
     10. GUESTBOOK & RSVP WITH LOCALSTORAGE PERSISTENCE
     ========================================================================= */
  const wishesStream = document.getElementById('wishes-stream');
  const rsvpForm = document.getElementById('rsvp-form');
  const btnRsvpWhatsapp = document.getElementById('btn-rsvp-whatsapp');

  const defaultWishes = [
    {
      name: 'Datuk Rangkayo Basa (Mamak Suku Caniago)',
      status: 'Hadir',
      time: 'Baru saja',
      message: 'Salamaik manjalani hiduik baru kamanakan kami Rizky (Sutan Palimo Basa) jo Adelia. Kok ketek banamo, kok gadang bagala. Sakinah mawaddah warahmah, rukun sampai ka uban.'
    },
    {
      name: 'Dimas Kurniawan & Sarah (Sahabat Kuliah)',
      status: 'Hadir',
      time: '2 jam yang lalu',
      message: 'Barakallahu lakuma wa baraka \'alaikuma wa jama\'a bainakuma fii khoir! Bahagia banget lihat adat Minangnya yang megah. Pasti hadir di Sasana Kriya bro!'
    },
    {
      name: 'Nabila Syahrani, S.Ds. (Keluarga Bako Suku Koto)',
      status: 'Hadir',
      time: '5 jam yang lalu',
      message: 'Happy wedding uni Adel rancak bana jo mas Rizky! Lancar Malam Bainai sampai Baralek Gadang nanti. Cant wait to see uni pakai suntiang megah!'
    },
    {
      name: 'Hendra Kusuma, S.E. (Rekan Kerja)',
      status: 'Berhalangan',
      time: '1 hari yang lalu',
      message: 'Selamat menempuh hidup baru Rizky & Adelia. Mohon maaf kebetulan sedang bertugas ke luar kota jadi belum bisa hadir langsung, namun doa terbaik selalu menyertai kedua mempelai.'
    }
  ];

  function getStoredWishes() {
    try {
      const stored = localStorage.getItem('wedding_wishes_minang_rizky_adelia');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultWishes;
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem('wedding_wishes_minang_rizky_adelia', JSON.stringify(wishes));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }

  function renderWishes() {
    if (!wishesStream) return;
    const wishes = getStoredWishes();
    wishesStream.innerHTML = '';

    wishes.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'journal-card rounded-2xl p-5 sm:p-6 transition-all';
      
      const isAttending = w.status === 'Hadir';
      const badgeClass = isAttending 
        ? 'bg-sage-light text-sage border-sage/30' 
        : 'bg-alabaster-surface text-ink-muted border-bronze-border/50';

      card.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-2.5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-bronze/15 text-bronze-deep flex items-center justify-center font-serif text-sm font-semibold">
              ${w.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p class="font-serif text-sm sm:text-base text-ink font-semibold tracking-wide leading-tight">${escapeHtml(w.name)}</p>
              <span class="text-xs text-ink-muted">${escapeHtml(w.time || 'Baru saja')}</span>
            </div>
          </div>
          <span class="text-xs font-sans px-2.5 py-0.5 rounded-full border ${badgeClass}">
            ${escapeHtml(w.status)}
          </span>
        </div>
        <p class="text-xs sm:text-sm text-ink-body leading-relaxed pl-10.5">
          ${escapeHtml(w.message)}
        </p>
      `;
      wishesStream.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  renderWishes();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const guests = document.getElementById('rsvp-guests').value;
      const statusInput = document.querySelector('input[name="rsvp-status"]:checked');
      const status = statusInput ? statusInput.value : 'Hadir';
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan doa restu Anda.');
        return;
      }

      const newWish = {
        name: name,
        status: status,
        guests: guests,
        time: 'Baru saja',
        message: message
      };

      const wishes = getStoredWishes();
      wishes.unshift(newWish);
      saveWishes(wishes);
      renderWishes();

      document.getElementById('rsvp-message').value = '';
      showToast('Terima kasih! Konfirmasi & doa restu Anda berhasil terkirim.');
    });
  }

  if (btnRsvpWhatsapp) {
    btnRsvpWhatsapp.addEventListener('click', () => {
      const name = document.getElementById('rsvp-name').value.trim() || 'Tamu Undangan';
      const guests = document.getElementById('rsvp-guests').value;
      const statusInput = document.querySelector('input[name="rsvp-status"]:checked');
      const status = statusInput ? statusInput.value : 'Hadir';
      const message = document.getElementById('rsvp-message').value.trim() || 'Semoga barakah dan bahagia selalu!';

      const waText = encodeURIComponent(
        `Halo Rizky (Sutan Palimo Basa) & Adelia, saya *${name}* ingin mengonfirmasi kehadiran di acara Baralek Gadang pernikahan Anda:\n\n` +
        `• Status Kehadiran: *${status}*\n` +
        `• Jumlah Tamu: *${guests}*\n` +
        `• Doa & Ucapan: "${message}"\n\n` +
        `Terima kasih dan selamat berbahagia!`
      );

      const waUrl = `https://wa.me/6281298765432?text=${waText}`;
      window.open(waUrl, '_blank');
    });
  }

  /* =========================================================================
     11. INTERACTIVE PHOTO LIGHTBOX
     ========================================================================= */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const galleryData = [
    { src: 'assets/images/hero-couple.jpg', caption: 'Keanggunan Busana Tradisional Adat Minangkabau' },
    { src: 'assets/images/bride.jpg', caption: 'Anak Daro dalam Balutan Suntiang Emas & Songket Megah' },
    { src: 'assets/images/groom.jpg', caption: 'Marapulai (Rizky Pratama - Sutan Palimo Basa)' },
    { src: 'assets/images/gallery-2.jpg', caption: 'Simbol Cincin Pengikat Dua Keluarga Besar' },
    { src: 'assets/images/gallery-4.jpg', caption: 'Suasana Pelaminan Adat Minangkabau yang Teduh' },
    { src: 'assets/images/gallery-5.jpg', caption: 'Senyum Ceria Menatap Mahligai Rumah Tangga' }
  ];

  let currentGalleryIndex = 0;

  function openLightbox(index) {
    if (!lightboxModal || !lightboxImg) return;
    currentGalleryIndex = index;
    lightboxImg.src = galleryData[index].src;
    if (lightboxCaption) lightboxCaption.textContent = galleryData[index].caption;
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
  }

  function nextLightbox() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    openLightbox(currentGalleryIndex);
  }

  function prevLightbox() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  /* =========================================================================
     12. SCROLL SPY FOR BOTTOM DOCK NAVIGATION
     ========================================================================= */
  const navLinks = document.querySelectorAll('.nav-dock-link');
  const observedSections = document.querySelectorAll('header[id], section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.remove('text-ink-muted');
            link.classList.add('text-bronze', 'font-medium');
          } else {
            link.classList.remove('text-bronze', 'font-medium');
            link.classList.add('text-ink-muted');
          }
        });
      }
    });
  }, observerOptions);

  observedSections.forEach((section) => observer.observe(section));

});

/*
  Birthday Surprise — Celestial Bloom
  Dibuat tanpa library: HTML + CSS + JavaScript saja.

  EDIT CEPAT:
  - Ubah nama di CONFIG.personName
  - Ubah teks ucapan di index.html
  - Foto pakai nama: foto1.jpg, foto2.jpg, foto3.jpg, foto4.jpg
  - Musik pakai nama: music.mp3
*/

const CONFIG = {
  personName: "My Universe", // contoh: "Alya", "Sayang", "Cintaku"
  giftDelayToMain: 1450,
  petalInterval: 520,
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const giftScreen = document.getElementById("giftScreen");
  const giftBox = document.getElementById("giftBox");
  const burstLayer = document.getElementById("burstLayer");
  const mainContent = document.getElementById("mainContent");
  const petalLayer = document.getElementById("petalLayer");
  const personName = document.getElementById("personName");
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  const flowerMessage = document.getElementById("flowerMessage");
  const flowers = document.querySelectorAll(".flower");
  const wishBtn = document.getElementById("wishBtn");
  const wishModal = document.getElementById("wishModal");
  const closeModal = document.getElementById("closeModal");
  const scrollProgress = document.getElementById("scrollProgress");
  const navDots = document.querySelectorAll(".floating-nav a");

  if (personName) {
    personName.textContent = CONFIG.personName;
  }

  let isOpened = false;
  let petalTimer = null;

  const burstItems = ["🌸", "🌺", "🌹", "🌷", "🌼", "🪷", "💗", "✨", "✦", "♡"];
  const fallingItems = ["🌸", "🌺", "🌷", "🌼", "❀", "✦", "♡"];

  const random = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function createBurst(amount = 58) {
    if (!burstLayer) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.52;

    for (let i = 0; i < amount; i++) {
      const item = document.createElement("span");
      item.className = "burst-item";
      item.textContent = pick(burstItems);
      item.style.left = `${centerX}px`;
      item.style.top = `${centerY}px`;
      item.style.setProperty("--x", `${random(-210, 210)}px`);
      item.style.setProperty("--y", `${random(-260, 95)}px`);
      item.style.setProperty("--rot", `${random(-360, 360)}deg`);
      item.style.setProperty("--scale", `${random(0.85, 1.9)}`);
      item.style.setProperty("--size", `${random(17, 36)}px`);
      item.style.animationDelay = `${random(0, 0.14)}s`;

      burstLayer.appendChild(item);

      setTimeout(() => {
        item.remove();
      }, 1700);
    }
  }

  function openGift(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (isOpened) return;
    isOpened = true;

    giftBox.classList.add("open");
    createBurst();

    if (navigator.vibrate) {
      navigator.vibrate([35, 45, 25]);
    }

    setTimeout(() => {
      giftScreen.classList.add("hidden");
      mainContent.classList.add("active");
      mainContent.setAttribute("aria-hidden", "false");
      body.classList.remove("locked");

      startPetals();

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });

      setTimeout(() => {
        if (giftScreen) giftScreen.remove();
      }, 1100);
    }, CONFIG.giftDelayToMain);
  }

  // Event berlapis supaya aman di browser HP biasa, tanpa mode situs desktop.
  if (giftBox) {
    ["pointerdown", "touchstart", "mousedown", "click"].forEach((eventName) => {
      giftBox.addEventListener(eventName, openGift, { passive: false });
    });
  }

  // Tap area kosong juga tetap bisa membuka kado.
  if (giftScreen) {
    ["touchstart", "click"].forEach((eventName) => {
      giftScreen.addEventListener(
        eventName,
        (event) => {
          if (
            event.target === giftScreen ||
            event.target.classList.contains("tap-hint") ||
            event.target.classList.contains("opening-copy")
          ) {
            openGift(event);
          }
        },
        { passive: false }
      );
    });
  }

  function createPetal() {
    if (!petalLayer) return;

    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = pick(fallingItems);
    petal.style.left = `${random(-8, 104)}vw`;
    petal.style.fontSize = `${random(13, 31)}px`;
    petal.style.animationDuration = `${random(7.5, 16)}s`;
    petal.style.animationDelay = `${random(0, 0.8)}s`;
    petal.style.setProperty("--drift", `${random(-80, 80)}px`);
    petal.style.setProperty("--rot", `${random(160, 720)}deg`);
    petal.style.setProperty("--op", `${random(0.35, 0.9)}`);

    petalLayer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 17000);
  }

  function startPetals() {
    if (petalTimer) return;

    for (let i = 0; i < 18; i++) {
      setTimeout(createPetal, i * 110);
    }

    petalTimer = setInterval(createPetal, CONFIG.petalInterval);
  }

  // Tombol musik
  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", async () => {
      try {
        if (bgMusic.paused) {
          await bgMusic.play();
          musicBtn.classList.add("playing");
          musicBtn.setAttribute("aria-label", "Pause music");
        } else {
          bgMusic.pause();
          musicBtn.classList.remove("playing");
          musicBtn.setAttribute("aria-label", "Play music");
        }
      } catch (error) {
        musicBtn.classList.remove("playing");

        const icon = musicBtn.querySelector(".music-icon");
        if (icon) icon.textContent = "!";

        musicBtn.title = "Pastikan file music.mp3 sudah ada di repository.";
        console.warn("Musik belum bisa diputar. Pastikan file music.mp3 ada.", error);
      }
    });
  }

  // Animasi section muncul saat discroll
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

  // Navigasi titik aktif
  const sections = [...document.querySelectorAll("main .section[id]")];

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navDots.forEach((dot) => {
          dot.classList.toggle(
            "active",
            dot.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // Progress scroll bagian atas
  function updateProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll <= 0 ? 0 : (window.scrollY / maxScroll) * 100;

    if (scrollProgress) {
      scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Pesan bunga interaktif
  flowers.forEach((flower) => {
    const showMessage = () => {
      flowers.forEach((item) => item.classList.remove("active"));
      flower.classList.add("active");

      if (flowerMessage) {
        flowerMessage.textContent =
          flower.dataset.message || "Semoga semua hal baik datang kepadamu.";
      }

      const rect = flower.getBoundingClientRect();

      createMiniConfetti(
        rect.left + flower.offsetWidth / 2,
        rect.top + 60,
        18
      );
    };

    flower.addEventListener("click", showMessage);

    flower.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        showMessage();
      },
      { passive: false }
    );
  });

  // Modal wish
  if (wishBtn && wishModal) {
    wishBtn.addEventListener("click", () => {
      createMiniConfetti(window.innerWidth / 2, window.innerHeight * 0.53, 95);

      wishModal.classList.add("show");
      wishModal.setAttribute("aria-hidden", "false");

      if (navigator.vibrate) {
        navigator.vibrate([20, 40, 20]);
      }
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeWishModal);
  }

  if (wishModal) {
    wishModal.addEventListener("click", (event) => {
      if (event.target === wishModal) {
        closeWishModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeWishModal();
    }
  });

  function closeWishModal() {
    if (!wishModal) return;

    wishModal.classList.remove("show");
    wishModal.setAttribute("aria-hidden", "true");
  }

  function createMiniConfetti(x, y, amount = 40) {
    const colors = ["#ffd98a", "#ff6ea8", "#8d5cff", "#7fffd4", "#ffffff"];

    for (let i = 0; i < amount; i++) {
      const confetti = document.createElement("span");
      confetti.className = "confetti";
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      confetti.style.setProperty("--x", `${random(-220, 220)}px`);
      confetti.style.setProperty("--y", `${random(-230, 170)}px`);
      confetti.style.setProperty("--r", `${random(-540, 540)}deg`);
      confetti.style.setProperty("--confetti-color", pick(colors));
      confetti.style.animationDelay = `${random(0, 0.16)}s`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 1800);
    }
  }

  initStars();
});

function initStars() {
  const canvas = document.getElementById("starCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createStars();
  }

  function createStars() {
    const amount = Math.round(Math.min(160, Math.max(75, width / 8)));

    stars = Array.from({ length: amount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.35 + 0.25,
      a: Math.random() * 0.65 + 0.2,
      tw: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.35 + 0.08,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      star.tw += 0.018;
      star.y += star.speed;

      if (star.y > height + 10) {
        star.y = -10;
        star.x = Math.random() * width;
      }

      const alpha = star.a + Math.sin(star.tw) * 0.18;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 247, 255, ${Math.max(0.05, alpha)})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Konstelasi hati tipis di area atas
    const cx = width * 0.5;
    const cy = height * 0.23;
    const points = [];

    for (let t = 0; t < Math.PI * 2; t += Math.PI / 13) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );

      points.push({
        x: cx + x * 5.2,
        y: cy + y * 5.2,
      });
    }

    ctx.strokeStyle = "rgba(255, 217, 138, 0.09)";
    ctx.lineWidth = 1;
    ctx.beginPath();

    points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });

    ctx.closePath();
    ctx.stroke();

    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.fillStyle =
        i % 3 === 0
          ? "rgba(255, 217, 138, 0.38)"
          : "rgba(255, 255, 255, 0.18)";
      ctx.arc(p.x, p.y, i % 3 === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  resize();
  draw();
    }

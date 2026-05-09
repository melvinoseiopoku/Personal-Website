const steps = [...document.querySelectorAll(".step")];
const deviceImage = document.querySelector(".device-screen img");
const deviceVideo = document.querySelector(".device-screen video");
const deviceScreen = document.querySelector(".device-screen");
const overlayLabel = document.querySelector(".screen-overlay span");
const overlayTitle = document.querySelector(".screen-overlay strong");

const deviceStates = [
  {
    image: "assets/img/portfolio/pcb.jpg",
    label: "Product design · PCB",
    title: "Bone density measurement system",
  },
  {
    image: "assets/img/portfolio/pcb_team1.JPG",
    label: "Poster · team",
    title: "Design communication",
  },
  {
    video: "assets/img/portfolio/ZProbe_Assembly.MP4",
    label: "CAD · assembly",
    title: "Exploded ZProbe view",
  },
];

steps.forEach((step) => {
  step.addEventListener("click", () => {
    const index = Number(step.dataset.device || 0);
    const state = deviceStates[index];
    steps.forEach((item) => item.classList.remove("active"));
    step.classList.add("active");
    if (deviceScreen) deviceScreen.classList.toggle("show-video", Boolean(state.video));
    if (deviceImage && state?.image) deviceImage.src = state.image;
    if (deviceVideo && state?.video) {
      deviceVideo.src = state.video;
      deviceVideo.play().catch(() => {});
    } else if (deviceVideo) {
      deviceVideo.pause();
    }
    if (overlayLabel && state) overlayLabel.textContent = state.label;
    if (overlayTitle && state) overlayTitle.textContent = state.title;
  });
});

document.querySelectorAll(".scroll-showcase").forEach((section) => {
  const shell = section.querySelector(".device-shell");
  if (!shell) return;

  const updateDeviceTilt = () => {
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
    const centered = (progress - 0.5) * 2;
    shell.style.setProperty("--device-tilt-x", `${10 - centered * 11}deg`);
    shell.style.setProperty("--device-tilt-y", `${centered * 7}deg`);
    shell.style.setProperty("--device-lift", `${Math.sin(progress * Math.PI) * -18}px`);
  };

  updateDeviceTilt();
  window.addEventListener("scroll", updateDeviceTilt, { passive: true });
  window.addEventListener("resize", updateDeviceTilt);
});

const modal = document.querySelector("#gallery-modal");
const modalImage = modal?.querySelector("img");
const modalTitle = modal?.querySelector("strong");
const modalDesc = modal?.querySelector("figcaption span");
const modalClose = modal?.querySelector(".modal-close");

document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (!modal || !img || !modalImage || !modalTitle || !modalDesc) return;
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = item.dataset.title || "";
    modalDesc.textContent = item.dataset.desc || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
root.dataset.theme = initialTheme;

document.querySelectorAll(".consciousness-panel").forEach((panel) => {
  const canvas = panel.querySelector(".neural-canvas");
  const context = canvas?.getContext?.("2d");
  const portrait = panel.querySelector(".portrait-stage");
  let width = 0;
  let height = 0;
  let frame = 0;
  let points = [];
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const liquid = {
    active: false,
    raf: 0,
    x: 0.5,
    y: 0.42,
    tx: 0.5,
    ty: 0.42,
    x2: 0.48,
    y2: 0.43,
    x3: 0.51,
    y3: 0.41,
    x4: 0.49,
    y4: 0.44,
  };

  const resize = () => {
    if (!canvas || !context) return;
    const rect = panel.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    seedPoints();
  };

  const seedPoints = () => {
    points = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      r: 1 + Math.random() * 2,
    }));
  };

  const draw = () => {
    if (!context || !canvas || !width || !height) return;
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < -20) point.x = width + 20;
      if (point.x > width + 20) point.x = -20;
      if (point.y < -20) point.y = height + 20;
      if (point.y > height + 20) point.y = -20;
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance > 145) continue;
        const alpha = (1 - distance / 145) * 0.22;
        context.strokeStyle = `rgba(127, 215, 217, ${alpha})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }

    points.forEach((point, index) => {
      const pulse = Math.sin(frame / 22 + index) * 0.45 + 0.55;
      context.fillStyle = `rgba(240, 139, 111, ${0.3 + pulse * 0.42})`;
      context.beginPath();
      context.arc(point.x, point.y, point.r + pulse, 0, Math.PI * 2);
      context.fill();
    });

    frame += 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  };

  const updatePointer = (event) => {
    const panelRect = panel.getBoundingClientRect();
    const panelX = (event.clientX - panelRect.left) / panelRect.width;
    const panelY = (event.clientY - panelRect.top) / panelRect.height;
    panel.style.setProperty("--mx", `${Math.max(0, Math.min(1, panelX)) * 100}%`);
    panel.style.setProperty("--my", `${Math.max(0, Math.min(1, panelY)) * 100}%`);
    panel.style.setProperty("--mx-num", Math.max(0, Math.min(1, panelX)).toFixed(3));
    panel.style.setProperty("--my-num", Math.max(0, Math.min(1, panelY)).toFixed(3));

    if (!portrait) return;
    const portraitRect = portrait.getBoundingClientRect();
    const portraitX = (event.clientX - portraitRect.left) / portraitRect.width;
    const portraitY = (event.clientY - portraitRect.top) / portraitRect.height;
    liquid.tx = Math.max(0, Math.min(1, portraitX));
    liquid.ty = Math.max(0, Math.min(1, portraitY));
    liquid.active = true;
    portrait.classList.add("revealing");
    if (!liquid.raf) liquid.raf = requestAnimationFrame(animateLiquid);
  };

  const setLiquidVars = () => {
    if (!portrait) return;
    portrait.style.setProperty("--rx", `${liquid.x * 100}%`);
    portrait.style.setProperty("--ry", `${liquid.y * 100}%`);
    portrait.style.setProperty("--rx2", `${liquid.x2 * 100}%`);
    portrait.style.setProperty("--ry2", `${liquid.y2 * 100}%`);
    portrait.style.setProperty("--rx3", `${liquid.x3 * 100}%`);
    portrait.style.setProperty("--ry3", `${liquid.y3 * 100}%`);
    portrait.style.setProperty("--rx4", `${liquid.x4 * 100}%`);
    portrait.style.setProperty("--ry4", `${liquid.y4 * 100}%`);
  };

  const animateLiquid = () => {
    liquid.x += (liquid.tx - liquid.x) * 0.42;
    liquid.y += (liquid.ty - liquid.y) * 0.42;
    liquid.x2 += (liquid.x - liquid.x2) * 0.19;
    liquid.y2 += (liquid.y - liquid.y2) * 0.19;
    liquid.x3 += (liquid.x2 - liquid.x3) * 0.13;
    liquid.y3 += (liquid.y2 - liquid.y3) * 0.13;
    liquid.x4 += (liquid.x3 - liquid.x4) * 0.09;
    liquid.y4 += (liquid.y3 - liquid.y4) * 0.09;
    setLiquidVars();

    const stillMoving =
      Math.abs(liquid.tx - liquid.x) +
      Math.abs(liquid.ty - liquid.y) +
      Math.abs(liquid.x - liquid.x2) +
      Math.abs(liquid.y - liquid.y2) > 0.002;

    if (liquid.active || stillMoving) {
      liquid.raf = requestAnimationFrame(animateLiquid);
    } else {
      liquid.raf = 0;
    }
  };

  panel.addEventListener("pointermove", updatePointer);
  panel.addEventListener("pointerleave", () => {
    panel.style.setProperty("--mx", "50%");
    panel.style.setProperty("--my", "42%");
    panel.style.setProperty("--mx-num", "0.5");
    panel.style.setProperty("--my-num", "0.42");
    if (portrait) {
      portrait.classList.remove("revealing");
      liquid.active = false;
      liquid.tx = 0.5;
      liquid.ty = 0.42;
      if (!liquid.raf) liquid.raf = requestAnimationFrame(animateLiquid);
    }
  });

  if (context) {
    resize();
    draw();
    window.addEventListener("resize", resize);
  }
});

document.querySelectorAll(".topbar").forEach((topbar) => {
  if (!topbar.querySelector(".nav-toggle")) {
    const nav = topbar.querySelector(".nav");
    const toggleNav = document.createElement("button");
    toggleNav.className = "nav-toggle";
    toggleNav.type = "button";
    toggleNav.setAttribute("aria-label", "Open menu");
    toggleNav.setAttribute("aria-expanded", "false");
    toggleNav.innerHTML = "<span></span><span></span><span></span>";
    nav?.before(toggleNav);

    toggleNav.addEventListener("click", () => {
      const isOpen = topbar.classList.toggle("nav-open");
      toggleNav.setAttribute("aria-expanded", String(isOpen));
      toggleNav.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        topbar.classList.remove("nav-open");
        toggleNav.setAttribute("aria-expanded", "false");
        toggleNav.setAttribute("aria-label", "Open menu");
      });
    });
  }

  if (topbar.querySelector(".theme-toggle")) return;
  const toggle = document.createElement("button");
  toggle.className = "theme-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Toggle dark mode");
  toggle.innerHTML = "<span></span><strong>Theme</strong>";
  topbar.appendChild(toggle);

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
});

const pubFilters = [...document.querySelectorAll("[data-pub-filter]")];
const publications = [...document.querySelectorAll("[data-pub-topic]")];

pubFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.getAttribute("data-pub-filter");
    pubFilters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    publications.forEach((publication) => {
      const show = value === "all" || publication.getAttribute("data-pub-topic") === value;
      publication.toggleAttribute("hidden", !show);
    });
  });
});

document.querySelectorAll(".pub-node").forEach((node) => {
  node.addEventListener("click", () => {
    pubFilters.forEach((item) => item.classList.toggle("active", item.dataset.pubFilter === "all"));
    publications.forEach((publication) => publication.removeAttribute("hidden"));
  });
});

document.querySelectorAll(".autoplay-video").forEach((video) => {
  video.muted = true;
  video.playsInline = true;
  video.play?.().catch(() => {});

  if (video.classList.contains("audio-video")) {
    video.addEventListener("click", () => {
      video.muted = false;
      video.volume = 1;
      video.play?.().catch(() => {});
    });
  }
});

document.querySelectorAll(".youtube-frame").forEach((frame) => {
  const videoId = frame.dataset.youtubeId;
  const title = frame.dataset.youtubeTitle || "YouTube video";
  const url = frame.dataset.youtubeUrl || `https://youtu.be/${videoId}`;
  if (!videoId) return;

  if (window.location.protocol === "file:") {
    frame.classList.add("youtube-fallback");
    frame.innerHTML = `
      <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}">
      <div>
        <span>Embedded video</span>
        <strong>${title}</strong>
        <p>YouTube blocks embedded playback from file:// pages. Open this site through localhost or the live domain to play it inline.</p>
        <a class="button primary" href="${url}">Watch on YouTube</a>
      </div>
    `;
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  iframe.title = title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  frame.appendChild(iframe);
});

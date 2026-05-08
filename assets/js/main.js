const steps = [...document.querySelectorAll(".step")];
const deviceImage = document.querySelector(".device-screen img");
const deviceVideo = document.querySelector(".device-screen video");
const deviceScreen = document.querySelector(".device-screen");
const overlayLabel = document.querySelector(".screen-overlay span");
const overlayTitle = document.querySelector(".screen-overlay strong");

const deviceStates = [
  {
    image: "assets/img/portfolio/branding-2.jpg",
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

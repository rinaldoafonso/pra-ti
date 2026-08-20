const loader = document.getElementById("loader");
const site = document.getElementById("site");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    site.setAttribute("aria-hidden", "false");
    document.querySelector(".hero-content")?.classList.add("visible");
  }, 900);
});

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

document.querySelectorAll(".photo-card img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

const surpriseBtn = document.getElementById("surpriseBtn");
const surprise = document.getElementById("mclaren");

surpriseBtn.addEventListener("click", () => {
  surprise.classList.add("active");
  surprise.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  setTimeout(() => {
    surprise.scrollIntoView({ behavior: "smooth" });
    document.body.classList.remove("locked");
  }, 80);
});

const audio = document.getElementById("specialAudio");
const playBtn = document.getElementById("playSpecial");

if (audio && playBtn) {
  playBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playBtn.textContent = "Ⅱ Pausar";
      } else {
        audio.pause();
        playBtn.textContent = "▶ Ouvir";
      }
    } catch (error) {
      console.error("Erro ao reproduzir a música:", error);
      playBtn.textContent = "Erro ao reproduzir";
    }
  });

  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶ Ouvir";
  });

  audio.addEventListener("error", () => {
    console.error("Não foi possível carregar:", audio.currentSrc);
    playBtn.textContent = "Música indisponível";
  });
}
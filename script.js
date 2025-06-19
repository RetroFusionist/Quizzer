
  // Spinner
window.addEventListener("load", () => {
  const spinner = document.querySelector(".spinner");
  if (spinner) spinner.style.display = "none";
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
});

// Locomotive Scroll Init
const scrollContainer = document.querySelector("[data-scroll-container]");
const locoScroll = new LocomotiveScroll({ el: scrollContainer, smooth: true });

// GSAP ScrollTrigger Sync
gsap.registerPlugin(ScrollTrigger);
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed"
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// Parallax Animation on Both Images
gsap.utils.toArray(".parallax-img").forEach(img => {
  gsap.to(img, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      scroller: scrollContainer,
      start: "top bottom",
      scrub: true
    }
  });
});

// Shrink on Scroll
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  document.querySelectorAll(".parallax-img").forEach(img => {
    const scale = Math.max(0.6, 1 - scrollPos / 1000);
    img.style.transform += ` scale(${scale})`;
  });
});

// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");
const body = document.getElementById("mainBody");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
});
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-theme");
  }
});

// Animate Stats
document.querySelectorAll('.stat h3').forEach(el => {
  let count = 0;
  const target = parseInt(el.textContent.replace(/\D/g, '')) || 0;
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    once: true,
    onEnter: () => {
      const increment = target / 100;
      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        el.textContent = Math.floor(count);
      }, 20);
    }
  });
});

// Hover Sound
const hoverSound = document.getElementById("hover-sound");
const cardHoverSound = document.getElementById("card-hover-sound");

document.querySelectorAll('.cta, .carousel-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});
document.querySelectorAll('.card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cardHoverSound.currentTime = 0;
    cardHoverSound.play();
  });
});

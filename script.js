// 🌐 Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.width = `${progress}%`;
});

// ⏳ Spinner Loader
window.addEventListener("load", () => {
  const spinner = document.querySelector(".spinner");
  if (spinner) spinner.style.display = "none";
});

// 🌌 Shrink Images on Scroll
const shrinkImgs = document.querySelectorAll(".interactive-image");
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  shrinkImgs.forEach(img => {
    const scale = Math.max(0.6, 1 - scrollPos / 1000);
    img.style.transform = `scale(${scale})`;
  });
});

// 🌀 Parallax Scroll (on parallax-img)
window.addEventListener("scroll", () => {
  const offset = window.scrollY;
  const parallaxImg = document.querySelector(".parallax-img");
  if (parallaxImg) {
    parallaxImg.style.transform = `translateY(${offset * 0.3}px)`;
  }
});

// 🚀 Locomotive Scroll Init
const scrollContainer = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true
});

// 🔄 Sync GSAP ScrollTrigger with Locomotive Scroll
gsap.registerPlugin(ScrollTrigger);
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// 🎠 Carousel Logic
const items = document.querySelectorAll('.carousel-item');
let current = 0;
setInterval(() => {
  items[current].classList.remove('active');
  current = (current + 1) % items.length;
  items[current].classList.add('active');
}, 3000);

// 🎬 GSAP Entry Animations for carousel
items.forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      scroller: scrollContainer,
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    delay: i * 0.2
  });
});

// 🔊 Hover Sounds
const hoverSound = document.getElementById("hover-sound");
const cardHoverSound = document.getElementById("card-hover-sound");

if (hoverSound && cardHoverSound) {
  hoverSound.volume = 0.3;
  cardHoverSound.volume = 0.3;

  document.querySelectorAll('.cta, .carousel-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      try {
        hoverSound.currentTime = 0;
        hoverSound.play();
      } catch (err) {
        console.warn("Hover sound couldn't play:", err);
      }
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      try {
        cardHoverSound.currentTime = 0;
        cardHoverSound.play();
      } catch (err) {
        console.warn("Card hover sound couldn't play:", err);
      }
    });
  });
}

// 🌓 Theme Toggle Logic
const toggleBtn = document.getElementById("themeToggle");
const body = document.getElementById("mainBody");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
});

// 🎨 Load Saved Theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
  }
});

// 🔢 Animate Stats on Scroll
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
        el.textContent = target >= 1000 ? Math.floor(count).toLocaleString() + "+" : Math.floor(count);
      }, 20);
    }
  });
});











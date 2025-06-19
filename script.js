// 🚀 Locomotive Scroll
const scrollContainer = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({ el: scrollContainer, smooth: true });

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

// 🎯 Carousel
const items = document.querySelectorAll('.carousel-item');
let current = 0;
setInterval(() => {
  items[current].classList.remove('active');
  current = (current + 1) % items.length;
  items[current].classList.add('active');
}, 3000);

// 🖼️ Scroll-triggered Image Shrink
const shrinkImgs = document.querySelectorAll(".scroll-shrink");
ScrollTrigger.batch(shrinkImgs, {
  onEnter: batch => batch.forEach(img => img.classList.add("shrunk")),
  onLeaveBack: batch => batch.forEach(img => img.classList.remove("shrunk")),
  start: "top center",
  end: "bottom center",
  scroller: scrollContainer
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
      } catch (err) {}
    });
  });
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      try {
        cardHoverSound.currentTime = 0;
        cardHoverSound.play();
      } catch (err) {}
    });
  });
}

// 🌓 Theme Toggle
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

// 🔢 Animate Stats
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

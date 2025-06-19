
  // 🌐 Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.width = ${progress}%;
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
    img.style.transform = scale(${scale});
  });
});

// 🌀 Parallax Scroll (on parallax-img)
window.addEventListener("scroll", () => {
  const offset = window.scrollY;
  const parallaxImg = document.querySelector(".parallax-img");
  if (parallaxImg) {
    parallaxImg.style.transform = translateY(${offset * 0.3}px);
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



styles
/* 🧱 Base styles */
body {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  background: #0a0a0a;
  color: white;
  overflow-x: hidden;
}

/* 📍 Scroll Progress Bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #ff4b2b;
  width: 0%;
  z-index: 2000;
}

/* ⏳ Loading Spinner */
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin: -30px 0 0 -30px;
  border: 6px solid #fff;
  border-top-color: #ff4b2b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 3000;
  background: transparent;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 🌀 Ripple Section (above core features) */
.ripple-section {
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 100px 20px;
  text-align: center;
}

.ripple-section::before {
  content: "";
  position: absolute;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.01%);
  background-size: 50px 50px;
  animation: ripple 4s linear infinite;
  top: -100%;
  left: -100%;
  z-index: -1;
}

@keyframes ripple {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* 🌠 Shrinking Interactive Images */
.interactive-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 80px 20px;
  position: relative;
  z-index: 2;
}

.interactive-image {
  width: 300px;
  height: auto;
  transition: transform 0.5s ease;
  will-change: transform;
}

/* 🌀 Parallax Container */
.parallax-wrapper {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.parallax-img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* 🌄 Background SVG */
.background-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -10;
  opacity: 0.4;
}

/* 🚀 Hero Section */
.hero-section {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.hero-content h1 {
  font-size: 5rem;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.hero-content p {
  font-size: 1.5rem;
  margin-top: 10px;
}

.cta {
  margin-top: 20px;
  padding: 14px 32px;
  border: none;
  background: #ff4b2b;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 30px;
  transition: transform 0.3s;
}

.cta:hover {
  transform: scale(1.05);
}

/* 💠 Feature Section */
.features {
  padding: 100px 20px;
  text-align: center;
}

.feature-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
}

.card {
  background: linear-gradient(145deg, #1f1f1f, #3a3a3a);
  padding: 40px;
  border-radius: 20px;
  width: 250px;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

/* 🎡 Carousel */
.carousel-section {
  padding: 80px 20px;
  text-align: center;
}

.carousel {
  display: flex;
  justify-content: center;
  gap: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  flex: 0 0 auto;
  scroll-snap-align: center;
  background: #1c1c1c;
  padding: 30px;
  border-radius: 15px;
  min-width: 200px;
  font-size: 1.1rem;
  transition: transform 0.3s;
}

.carousel-item.active {
  background: #ff4b2b;
  color: white;
  transform: scale(1.1);
}

/* 🎥 Showcase */
.showcase video {
  width: 90%;
  max-width: 800px;
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(255, 75, 43, 0.6);
}

/* 💬 Testimonials */
.testimonials {
  padding: 80px 20px;
  text-align: center;
  background: #121212;
}

.testimonial {
  max-width: 600px;
  margin: auto;
  font-style: italic;
  font-size: 1.2rem;
}

/* 📊 Stats Section */
.stats-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.stats-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.stats-overlay {
  z-index: 2;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 60px 20px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
  animation: fadeIn 1.5s ease;
}

.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 30px;
}

.stat h3 {
  font-size: 3rem;
  color: #ff4b2b;
}

.stat p {
  font-size: 1.2rem;
  margin: 0;
}

/* 📞 Footer & CTA */
.cta-final {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(90deg, #141e30, #243b55);
}

footer {
  text-align: center;
  padding: 30px;
  font-size: 0.9rem;
  background: #000;
}

/* 🌐 Navbar & Tabs */
.navbar {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #0a0a0a;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .brand {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar ul {
  display: flex;
  gap: 30px;
  list-style: none;
  margin-left: auto;
}

.navbar ul li a {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.navbar ul li a:hover {
  color: #ff4b2b;
}

.animated-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
}

/* 🌓 Theme Toggle */
.theme-toggle {
  margin-left: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.2);
}

/* 🌞 Light Theme Overrides */
body.light-theme {
  background: #ffffff;
  color: #111111;
}

body.light-theme .navbar {
  background: #f4f4f4;
}

body.light-theme .brand,
body.light-theme .hero-content h1 {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

body.light-theme .card,
body.light-theme .carousel-item {
  background: #eeeeee;
  color: #111;
}

body.light-theme .carousel-item.active,
body.light-theme .cta,
body.light-theme .cta-final {
  background: #2575fc;
  color: #fff;
}

body.light-theme .testimonials,
body.light-theme .cta-final,
body.light-theme footer {
  background: #f9f9f9;
  color: #111;
}

// 🚀 Locomotive Scroll Init
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true
});

// 🎯 Carousel Logic
let items = document.querySelectorAll('.carousel-item');
let current = 0;
setInterval(() => {
  items[current].classList.remove('active');
  current = (current + 1) % items.length;
  items[current].classList.add('active');
}, 3000);

// 🎬 GSAP Animations
items.forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
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
hoverSound.volume = 0.3;
cardHoverSound.volume = 0.3;

document.querySelectorAll('.cta, .carousel-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    cardHoverSound.currentTime = 0;
    cardHoverSound.play();
  });
});

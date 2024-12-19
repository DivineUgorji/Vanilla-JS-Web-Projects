// const primaryNav = document.querySelector(".primary-nav");
// const navToggle = document.querySelector(".mobile-nav-toggle");

// navToggle.addEventListener("click", (e) => {
//   const visibility = primaryNav.getAttribute("data-visible");

//   if (visibility === "false") {
//     primaryNav.setAttribute("data-visible", true);
//     navToggle.setAttribute("aria-expanded", true);
//   } else if (visibility === "true") {
//     primaryNav.setAttribute("data-visible", false);
//     navToggle.setAttribute("aria-expanded", false);
//   }
// });

const primaryNav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.mobile-nav-toggle');

// Set initial state
primaryNav.setAttribute('data-visible', 'false');
navToggle.setAttribute('aria-expanded', 'false');

navToggle.addEventListener('click', e => {
  e.preventDefault();
  const isVisible = primaryNav.getAttribute('data-visible') === 'true';

  primaryNav.setAttribute('data-visible', !isVisible);
  navToggle.setAttribute('aria-expanded', !isVisible);
});

// Javascript code to prevent animation during window resize
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

// Enable scroll-driven animation after initial fold-out completes
document.querySelectorAll('.popup-layer').forEach(el => {
  el.addEventListener('animationend', () => {
    el.classList.add('scroll-ready');
  }, { once: true });
});

// Also handle portrait element
const portrait = document.querySelector('.popup-portrait');
if (portrait) {
  portrait.addEventListener('animationend', () => {
    portrait.classList.add('scroll-ready');
  }, { once: true });
}

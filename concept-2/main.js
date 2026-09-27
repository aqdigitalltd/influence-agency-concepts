const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Reveal elements once as they enter the viewport */
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }),
  { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
);
document.querySelectorAll('.reveal, .img-reveal').forEach((element) => revealObserver.observe(element));

/* Nav background + gentle parallax on large imagery */
const nav = document.querySelector('[data-nav]');
const parallaxImages = [...document.querySelectorAll('[data-speed]')];

const update = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 24);

  if (prefersReducedMotion) return;
  parallaxImages.forEach((image) => {
    const rect = image.parentElement.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * Number(image.dataset.speed);
    image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.2)`;
  });
};

let frameRequested = false;
window.addEventListener(
  'scroll',
  () => {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(() => {
      update();
      frameRequested = false;
    });
  },
  { passive: true },
);
update();

/* Services: a quiet image preview that follows the cursor */
const services = document.querySelector('[data-services]');
const preview = services?.querySelector('.service-preview');
const previewImage = services?.querySelector('[data-preview-img]');

if (services && preview && previewImage && canHover) {
  services.querySelectorAll('[data-preview]').forEach((row) => {
    row.addEventListener('mouseenter', () => {
      previewImage.src = row.dataset.preview;
      preview.classList.add('visible');
    });
  });

  services.addEventListener('mouseleave', () => preview.classList.remove('visible'));

  services.addEventListener('mousemove', (event) => {
    const bounds = services.getBoundingClientRect();
    const x = Math.min(event.clientX - bounds.left + 40, bounds.width - preview.offsetWidth);
    const y = event.clientY - bounds.top - preview.offsetHeight / 2;
    preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/* Reveal elements once as they enter the viewport */
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }),
  { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
);
document.querySelectorAll('.reveal, .how-step').forEach((element) => revealObserver.observe(element));

const nav = document.querySelector('[data-nav]');
const statement = document.querySelector('[data-statement]');
const statementLines = statement ? [...statement.querySelectorAll('[data-step]')] : [];
const statementCounter = document.querySelector('[data-step-counter]');
const reach = document.querySelector('[data-hscroll]');
const reachTrack = reach?.querySelector('[data-hscroll-track]');
const parallaxImages = [...document.querySelectorAll('[data-speed]')];

/* 0 → 1 progress through a tall section whose content is sticky */
const stickyProgress = (section) => {
  const rect = section.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  return scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
};

const reachDistance = () => (reachTrack ? Math.max(reachTrack.scrollWidth - window.innerWidth, 0) : 0);

/* The horizontal section is as tall as the distance it needs to travel */
const sizeReach = () => {
  if (reach) reach.style.height = `${window.innerHeight + reachDistance()}px`;
};

const update = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 24);

  if (statement) {
    const activeCount = clamp(Math.floor(stickyProgress(statement) * statementLines.length * 1.2) + 1, 1, statementLines.length);
    statementLines.forEach((line, index) => line.classList.toggle('on', index < activeCount));
    if (statementCounter) statementCounter.textContent = `0${activeCount} / 0${statementLines.length}`;
  }

  if (reachTrack) {
    reachTrack.style.transform = `translate3d(${-stickyProgress(reach) * reachDistance()}px, 0, 0)`;
  }

  if (!prefersReducedMotion) {
    parallaxImages.forEach((image) => {
      const rect = image.parentElement.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * Number(image.dataset.speed);
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.18)`;
    });
  }
};

let frameRequested = false;
const requestUpdate = () => {
  if (frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(() => {
    update();
    frameRequested = false;
  });
};

window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', () => {
  sizeReach();
  requestUpdate();
});
window.addEventListener('load', () => {
  sizeReach();
  update();
});
document.fonts?.ready.then(() => {
  sizeReach();
  update();
});

sizeReach();
update();

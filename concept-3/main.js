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
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

/* Brands / Creators toggle */
const switchSection = document.querySelector('[data-switch]');
const tabs = switchSection ? [...switchSection.querySelectorAll('[data-tab]')] : [];
const panels = switchSection ? [...switchSection.querySelectorAll('[data-panel]')] : [];

const selectTab = (tabName) => {
  if (!switchSection) return;
  switchSection.dataset.active = tabName;
  tabs.forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.tab === tabName)));
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tabName;
  });
};

tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));

/* Hero CTAs jump to the toggle with the right side pre-selected */
document.querySelectorAll('[data-open-tab]').forEach((link) =>
  link.addEventListener('click', () => selectTab(link.dataset.openTab)),
);

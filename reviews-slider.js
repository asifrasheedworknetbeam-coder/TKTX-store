(() => {
  const section = document.querySelector('#customer-reviews');
  if (!section) return;
  const track = section.querySelector('.customer-stories-grid');
  const slides = [...track.querySelectorAll('.customer-story')];
  const controls = section.querySelector('.review-slider-controls');
  const dots = controls.querySelector('.review-slider-dots');
  const counter = controls.querySelector('.review-slider-counter');
  const toggle = controls.querySelector('.review-slider-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let targets = [];
  let active = 0;
  let timer;
  let frame;
  let visible = false;
  let hovered = false;
  let dragging = false;
  let paused = reducedMotion.matches;

  track.setAttribute('role', 'group');
  track.setAttribute('aria-roledescription', 'carousel');
  track.setAttribute('aria-label', 'Customer reviews');
  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Review ${index + 1} of ${slides.length}`);
  });

  function stop() { clearTimeout(timer); }
  function schedule(delay = 5500) {
    stop();
    if (paused || reducedMotion.matches || !visible || hovered || dragging || document.hidden ||
        section.contains(document.activeElement) || targets.length < 2) return;
    timer = setTimeout(() => move(active + 1), delay);
  }
  function update() {
    if (!targets.length) return;
    active = targets.reduce((closest, left, index) =>
      Math.abs(left - track.scrollLeft) < Math.abs(targets[closest] - track.scrollLeft) ? index : closest, 0);
    [...dots.children].forEach((dot, index) => dot.setAttribute('aria-current', String(index === active)));
    counter.textContent = `${active + 1} / ${targets.length}`;
  }
  function move(index) {
    const next = (index + targets.length) % targets.length;
    track.scrollTo({left: targets[next], behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    schedule();
  }
  function layout() {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    targets = [...new Set(slides.map(slide => Math.round(Math.min(slide.offsetLeft, max))))];
    dots.replaceChildren(...targets.map((left, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'review-slider-dot';
      button.setAttribute('aria-label', `Show review page ${index + 1} of ${targets.length}`);
      button.setAttribute('aria-controls', track.id);
      button.addEventListener('click', () => move(index));
      return button;
    }));
    controls.hidden = targets.length < 2;
    update();
    schedule();
  }
  function syncToggle() {
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Play review slideshow' : 'Pause review slideshow');
  }
  controls.querySelector('[data-review-prev]').addEventListener('click', () => move(active - 1));
  controls.querySelector('[data-review-next]').addEventListener('click', () => move(active + 1));
  toggle.addEventListener('click', () => { paused = !paused; syncToggle(); schedule(); });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, {passive: true});
  section.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('pointerdown', () => { dragging = true; stop(); });
  window.addEventListener('pointerup', () => { if (dragging) { dragging = false; schedule(8000); } });
  window.addEventListener('pointercancel', () => { dragging = false; schedule(8000); });
  section.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; stop(); } });
  section.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  section.addEventListener('focusin', stop);
  section.addEventListener('focusout', () => requestAnimationFrame(() => schedule()));
  document.addEventListener('visibilitychange', () => schedule());
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; syncToggle(); schedule(); });
  new ResizeObserver(layout).observe(track);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    schedule();
  }, {threshold: .35}).observe(track);
  syncToggle();
  layout();
})();

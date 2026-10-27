(() => {
  function initialize(section) {
    if (section.dataset.carouselReady) return;
    const viewport = section.querySelector('.category-viewport');
    const track = section.querySelector('.category-track');
    if (!viewport || !track) return;
    section.dataset.carouselReady = 'true';
    const originals = [...track.children];
    const count = originals.length;
    if (count < 2) {
      section.querySelector('.category-controls').hidden = true;
      return;
    }
    const controller = new AbortController();
    const { signal } = controller;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const previous = section.querySelector('.category-prev');
    const next = section.querySelector('.category-next');
    let index = 0, step = 0, locked = false, visible = false, hovering = false;
    let interval, settleTimer, pointerStart = null, suppressClick = false;
    for (let i = 0; i < 4; i++) {
      const clone = originals[i % count].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.removeAttribute('aria-label');
      clone.tabIndex = -1;
      track.appendChild(clone);
    }
    originals.forEach((slide, i) => {
      slide.setAttribute('aria-label', (slide.getAttribute('aria-label') || 'View category') + ', ' + (i + 1) + ' of ' + count);
    });
    const paint = (animate) => {
      track.style.transition = animate && !reduced.matches ? '' : 'none';
      track.style.transform = 'translate3d(' + (-index * step) + 'px,0,0)';
    };
    const settle = () => {
      clearTimeout(settleTimer);
      if (index >= count) { index = 0; paint(false); }
      locked = false;
    };
    const move = direction => {
      if (locked || !step) return;
      locked = true;
      if (direction < 0 && index === 0) {
        index = count;
        paint(false);
        void track.offsetWidth;
      }
      index += direction;
      paint(true);
      settleTimer = setTimeout(settle, reduced.matches ? 0 : 700);
    };
    const stop = () => { clearInterval(interval); interval = null; };
    const start = () => {
      stop();
      if (!visible || hovering || reduced.matches || document.hidden || section.contains(document.activeElement)) return;
      interval = setInterval(() => move(1), 4200);
    };
    const measure = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      step = originals[0].getBoundingClientRect().width + gap;
      settle();
      paint(false);
    };
    previous.addEventListener('click', () => { stop(); move(-1); }, { signal });
    next.addEventListener('click', () => { stop(); move(1); }, { signal });
    track.addEventListener('transitionend', event => { if (event.target === track && event.propertyName === 'transform') settle(); }, { signal });
    viewport.addEventListener('pointerdown', event => { pointerStart = event.clientX; stop(); }, { signal });
    viewport.addEventListener('pointerup', event => {
      if (pointerStart === null) return;
      const delta = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(delta) > 35) {
        suppressClick = true;
        move(delta < 0 ? 1 : -1);
        setTimeout(() => { suppressClick = false; }, 100);
      }
      start();
    }, { signal });
    viewport.addEventListener('pointercancel', () => { pointerStart = null; start(); }, { signal });
    viewport.addEventListener('dragstart', event => event.preventDefault(), { signal });
    viewport.addEventListener('click', event => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); } }, { signal, capture: true });
    section.addEventListener('mouseenter', () => { hovering = true; stop(); }, { signal });
    section.addEventListener('mouseleave', () => { hovering = false; start(); }, { signal });
    section.addEventListener('focusin', event => {
      stop();
      const slide = event.target.closest('.category-product');
      const focused = originals.indexOf(slide);
      if (focused >= 0 && (focused < index || focused >= index + 3)) {
        index = focused;
        paint(true);
      }
    }, { signal });
    section.addEventListener('focusout', () => setTimeout(start, 0), { signal });
    document.addEventListener('visibilitychange', start, { signal });
    reduced.addEventListener('change', start, { signal });
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      start();
    }, { threshold: .15 });
    visibility.observe(section);
    document.addEventListener('shopify:section:unload', event => {
      if (!event.target.contains(section)) return;
      stop(); clearTimeout(settleTimer); resize.disconnect(); visibility.disconnect(); controller.abort();
    }, { signal });
    measure();
  }
  document.querySelectorAll('[data-category-carousel]').forEach(initialize);
  document.addEventListener('shopify:section:load', event => event.target.querySelectorAll('[data-category-carousel]').forEach(initialize));
})();

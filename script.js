(() => {
  const fitAnnouncements = (root) => {
    const bar = root.querySelector('.announcement');
    const track = root.querySelector('.announcement-track');
    const groups = [...track.querySelectorAll('.announcement-group')];
    const unit = groups[0].innerHTML;
    const fit = () => {
      groups[0].innerHTML = unit;
      const unitWidth = groups[0].getBoundingClientRect().width;
      if (!unitWidth) return;
      const count = Math.max(2, Math.ceil(bar.clientWidth / unitWidth) + 1);
      groups.forEach(group => { group.innerHTML = unit.repeat(count); });
      track.style.setProperty('--marquee-duration', (unitWidth * count / 38) + 's');
    };
    fit();
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(bar);
    document.addEventListener('shopify:section:unload', event => {
      if (event.target.contains(root)) observer.disconnect();
    });
  };
  fitAnnouncements(document.querySelector('.tktx-store'));
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const dialog = document.querySelector('.search-panel');
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileNav.classList.remove('open');
    mobileNav.inert = true;
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('open', open);
    mobileNav.inert = !open;
    if (open) mobileNav.querySelector('a').focus();
  });
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.querySelector('.search-toggle').addEventListener('click', () => { closeMenu(); dialog.showModal(); });
  document.querySelector('.panel-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileNav.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
    if (event.key === 'Tab' && mobileNav.classList.contains('open')) {
      const links = [...mobileNav.querySelectorAll('a')];
      if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); menuToggle.focus(); }
      else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); menuToggle.focus(); }
      else if (document.activeElement === menuToggle) { event.preventDefault(); links[event.shiftKey ? links.length - 1 : 0].focus(); }
    }
  });
  matchMedia('(min-width: 1101px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
})();

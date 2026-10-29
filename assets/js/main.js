/* MG Gardens – site scripts (no dependencies) */
(function () {
  'use strict';

  /* ── Header: solid background once scrolled ── */
  var header = document.getElementById('header');
  function onScroll() {
    var solid = window.scrollY > 12;
    header.classList.toggle('bg-white/95', solid);
    header.classList.toggle('backdrop-blur', solid);
    header.classList.toggle('shadow-[0_1px_0_rgba(13,67,29,.08)]', solid);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ── */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    var lines = menuBtn.querySelectorAll('path');
    var setMenu = function (open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('opacity-0', !open);
      menu.classList.toggle('-translate-y-2', !open);
      menu.classList.toggle('pointer-events-none', !open);
      lines[0].style.transform = open ? 'translateY(5px) rotate(45deg)' : '';
      lines[1].style.opacity = open ? '0' : '';
      lines[2].style.transform = open ? 'translateY(-5px) rotate(-45deg)' : '';
      if (open) header.classList.add('bg-white/95');
      else onScroll();
    };
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ── Reveal on scroll ── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Services explorer (tabs) ── */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.svc-tab'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* Quote buttons pre-select the service in the form */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () { if (serviceSelect) serviceSelect.value = a.getAttribute('data-service'); });
  });

  /* ── Before / after slider (range input handles pointer, touch and keyboard) ── */
  document.querySelectorAll('[data-ba]').forEach(function (ba) {
    var range = ba.querySelector('input[type="range"]');
    var set = function () { ba.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', set);
    set();
  });

  /* ── Gallery lightbox ── */
  var lb = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] [data-full]'));
  if (lb && items.length) {
    var img = lb.querySelector('.lb-img');
    var cap = lb.querySelector('.lb-caption');
    var count = lb.querySelector('.lb-count');
    var idx = 0, lastFocus = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      img.style.opacity = '0';
      img.onload = function () { img.style.opacity = '1'; };
      img.src = it.getAttribute('data-full');
      img.alt = it.querySelector('img').alt;
      cap.textContent = it.getAttribute('data-caption') || '';
      count.textContent = (idx + 1) + ' / ' + items.length;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    };
    var close = function () {
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-caption')) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ── Quote form: inline validation + submit state ── */
  var form = document.getElementById('quote-form');
  if (form) {
    var fields = form.querySelectorAll('[required]');
    var check = function (f) {
      var ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      f.classList.toggle('is-invalid', !ok);
      f.setAttribute('aria-invalid', String(!ok));
      var err = f.parentNode.querySelector('.err');
      if (err) err.classList.toggle('hidden', ok);
      return ok;
    };
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.classList.contains('is-invalid')) check(f); });
    });
    form.addEventListener('submit', function (e) {
      var first = null;
      fields.forEach(function (f) { if (!check(f) && !first) first = f; });
      if (first) { e.preventDefault(); first.focus(); return; }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.classList.add('opacity-80');
      btn.querySelector('.label').textContent = 'Sending…';
      btn.querySelector('.spinner').classList.remove('hidden');
    });
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();

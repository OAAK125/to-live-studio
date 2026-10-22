(() => {
  'use strict';
  document.documentElement.classList.add('js');

  /* ===== Project data — edit this to update the portfolio =====
     image: path to a real screenshot (e.g. 'assets/images/shop.png'); null shows a labelled placeholder. */
  const PROJECTS = [
    {
      id: 'shop', variant: 'shop', title: 'Shop', year: '',
      status: 'Currently live',
      description: 'An ordering website for a homemade-food kitchen, with a Node/Express server that forwards orders to Telegram.',
      technologies: ['HTML', 'JavaScript', 'Node.js', 'Express', 'Telegram'],
      features: ['Ordering site for a home kitchen', 'Order and complaint endpoints in the repo’s api folder', 'Telegram order forwarding'],
      demoUrl: 'https://shop-five-mu-63.vercel.app',
      image: 'assets/images/shop.png', alt: 'Sohan Kitchen ordering website homepage'
    },
    {
      id: 'subsave', variant: 'subsave', title: 'Sub-save', year: '',
      status: 'Currently live',
      description: 'A subscription optimiser. Users manually select the subscriptions they have; the tool highlights bundle value or cheaper alternatives and calculates monthly and yearly cost.',
      technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      features: ['Manual subscription selection', 'Bundle and cheaper-alternative highlights', 'Monthly and yearly cost calculation'],
      demoUrl: 'https://sub-save-subscription-optimizer-sub.vercel.app',
      image: 'assets/images/subsave.png', alt: 'SubSave subscription selection screen'
    },
    {
      id: 'fyp', variant: 'fyp', title: 'Final Year Project', year: '',
      status: 'Currently live',
      description: 'An online platform for IT certification preparation: practice quizzes, resources, performance tracking and a question-contribution system.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Paystack', 'Vercel'],
      features: ['Quizzes for IT certifications', 'Performance tracking and charts', 'Custom quizzes and bookmarks', 'Subscription tiers (Free, Standard, Full Access)'],
      demoUrl: 'https://final-year-project-olive-omega.vercel.app/',
      image: 'assets/images/fyp.png', alt: 'Certify Prep certification practice homepage'
    }
  ];

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => { if (v !== '') node.setAttribute(k, v); });
    [].concat(children).forEach(c => node.append(c));
    return node;
  };

  function renderProjects() {
    const list = document.getElementById('projects');
    if (!list) return;

    PROJECTS.forEach((p, i) => {
      const media = p.image
        ? el('img', { src: p.image, alt: p.alt, loading: i ? 'lazy' : 'eager', width: '1200', height: '800' })
        : el('div', { class: 'ph', role: 'img', 'aria-label': `Placeholder for the ${p.title} screenshot, not yet added` }, `${p.title} — screenshot placeholder`);

      const links = el('div', { class: 'project__links' }, [
        el('a', { class: 'btn', href: p.demoUrl, target: '_blank', rel: 'noopener noreferrer' }, 'View live demo')
      ]);

      const body = el('div', { class: 'project__body' }, [
        el('div', {}, [
          el('p', { class: 'project__status' }, `0${i + 1} · ${p.status}`),
          el('h3', {}, p.title),
          el('p', { style: 'margin-top:.75rem' }, p.description),
          el('ul', { class: 'feat' }, p.features.map(f => el('li', {}, f)))
        ]),
        el('ul', { class: 'tags', 'aria-label': 'Technologies' }, p.technologies.map(t => el('li', {}, t))),
        links
      ]);

      list.append(el('article', { class: `project project--${p.variant} reveal` }, [body, el('div', { class: 'project__media' }, media)]));
    });
  }

  /* ===== Mobile menu ===== */
  function initNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('menu');
    if (!toggle || !menu) return;
    const setOpen = open => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
  }

  /* ===== Section reveal ===== */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal, .service, .process li, .section-head');
    if (!('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('is-in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });
  }

  /* ===== Contact form validation ===== */
  const RULES = {
    name: v => v.trim() ? '' : 'Please enter your name.',
    whatsapp: v => {
      const value = v.trim();
      const digits = value.replace(/\D/g, '').length;
      return /^\+?[0-9\s().-]+$/.test(value) && digits >= 7 && digits <= 15
        ? ''
        : 'Please enter a valid WhatsApp phone number.';
    },
    projectType: v => v ? '' : 'Please choose a project type.',
    deliverable: v => v ? '' : 'Please choose a preferred deliverable.',
    description: v => v.trim().length >= 20 ? '' : 'Please describe your idea in at least 20 characters.',
    timeline: v => v ? '' : 'Please choose a timeline.',
    referenceLink: v => !v.trim() || /^https?:\/\/\S+$/i.test(v.trim()) ? '' : 'Please enter a valid link starting with http:// or https://.'
  };

  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const check = field => {
      const msg = RULES[field.name](field.value);
      const out = document.getElementById(`${field.name}-error`);
      field.setAttribute('aria-invalid', String(Boolean(msg)));
      if (msg) field.setAttribute('aria-describedby', out.id); else field.removeAttribute('aria-describedby');
      out.textContent = msg;
      return !msg;
    };
    const fields = Object.keys(RULES).map(n => form.elements[n]).filter(Boolean);
    fields.forEach(f => f.addEventListener('blur', () => check(f)));
    fields.forEach(f => f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f); }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  renderProjects(); initNav(); initReveal(); initForm();
})();

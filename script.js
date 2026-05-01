/* ══════════════════════════════════════════════════════════════
   ALL RIDE LIMOUSINE — Interactions
══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // ── PRELOADER ─────────────────────────────────────────────
    const preloader = document.getElementById('preloader');
    const plFill    = document.getElementById('plFill');
    let progress = 0;

    const tick = setInterval(() => {
        progress = Math.min(progress + Math.random() * 14 + 3, 100);
        if (plFill) plFill.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(tick);
            setTimeout(() => {
                gsap.to(preloader, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        preloader.style.display = 'none';
                        heroIn();
                    }
                });
            }, 250);
        }
    }, 38);


    // ── HERO ENTRANCE ─────────────────────────────────────────
    function heroIn() {
        const els = [
            '.hero-kicker',
            '.hero-h1',
            '.hero-body',
            '.hero-ctas',
            '.hero-strip',
            '.hero-badge',
            '.hero-scroll-hint'
        ];

        gsap.set(els, { opacity: 0, y: 28 });
        gsap.set('#heroImg', { scale: 1.08 });

        gsap.to('#heroImg', { scale: 1, duration: 2.4, ease: 'expo.out' });

        gsap.to(els, {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.3
        });
    }


    // ── NAV SCROLL STATE ──────────────────────────────────────
    const nav = document.getElementById('nav');
    if (nav) {
        ScrollTrigger.create({
            start: 60,
            onEnter:     () => nav.classList.add('scrolled'),
            onLeaveBack: () => nav.classList.remove('scrolled')
        });
    }


    // ── MOBILE MENU ───────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobMenu   = document.getElementById('mobMenu');
    const mmLinks   = document.querySelectorAll('.mm-link');

    function openMenu() {
        mobMenu.classList.add('open');
        mobMenu.setAttribute('aria-hidden', 'false');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        gsap.fromTo('.mm-link', { opacity: 0, x: 24 }, {
            opacity: 1, x: 0,
            duration: 0.6, ease: 'power3.out',
            stagger: 0.07, delay: 0.2
        });
        gsap.fromTo('.mm-foot', { opacity: 0, y: 16 }, {
            opacity: 1, y: 0,
            duration: 0.5, ease: 'power3.out', delay: 0.55
        });
    }

    function closeMenu() {
        mobMenu.classList.remove('open');
        mobMenu.setAttribute('aria-hidden', 'true');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobMenu.classList.contains('open') ? closeMenu() : openMenu();
        });
    }

    mmLinks.forEach(link => link.addEventListener('click', closeMenu));


    // ── SCROLL REVEALS ────────────────────────────────────────
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });


    // ── SPREAD SECTION REVEALS ────────────────────────────────
    gsap.utils.toArray('.spread').forEach(spread => {
        const img  = spread.querySelector('.spread-img img');
        const text = spread.querySelector('.spread-text, .spread-text--dark');

        if (img) {
            gsap.set(img, { scale: 1.06 });
            gsap.to(img, {
                scale: 1, duration: 1.2, ease: 'power2.out',
                scrollTrigger: {
                    trigger: spread, start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        if (text) {
            gsap.set(text, { opacity: 0, x: 24 });
            gsap.to(text, {
                opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
                scrollTrigger: {
                    trigger: spread, start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });


    // ── HOW IT WORKS STAGGER ─────────────────────────────────
    const hiwSteps = document.querySelectorAll('.hiw-step');
    if (hiwSteps.length) {
        gsap.set(hiwSteps, { opacity: 0, y: 28 });
        gsap.to(hiwSteps, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: {
                trigger: '.hiw-steps', start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }


    // ── FLEET CARDS STAGGER ───────────────────────────────────
    const fleetRow = document.querySelector('.fleet-row');
    if (fleetRow) {
        const cards = fleetRow.querySelectorAll('.vehicle');
        gsap.set(cards, { opacity: 0, y: 32 });
        gsap.to(cards, {
            opacity: 1, y: 0,
            duration: 0.85, ease: 'power3.out', stagger: 0.14,
            scrollTrigger: {
                trigger: fleetRow, start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }


    // ── FAQ ACCORDION ─────────────────────────────────────────
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item   = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item.open').forEach(el => {
                el.classList.remove('open');
            });

            // Open clicked (unless it was already open)
            if (!isOpen) item.classList.add('open');
        });
    });


    // ── HERO IMG PARALLAX ─────────────────────────────────────
    gsap.to('#heroImg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2
        }
    });


    // ── BOOKING FORM ──────────────────────────────────────────
    const form = document.getElementById('bookForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.bk-submit');
            btn.textContent = 'Connecting to dispatch…';
            btn.style.background = 'var(--teal-dk)';

            setTimeout(() => {
                btn.innerHTML = '✓&nbsp; Request Received — We\'ll Call You Shortly';
                btn.style.background = '#166534';

                setTimeout(() => {
                    btn.innerHTML = `Request Reservation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
                    btn.style.background = '';
                }, 5000);
            }, 1600);
        });
    }

});

/* ─── Preloader ─────────────────────────────────────────────── */

window.addEventListener('load', () => {
    document.getElementById('preloader')?.classList.add('hide');

    // Animar elementos do hero com delay escalonado
    document.querySelectorAll('#hero .reveal-up').forEach(el => {
        const delay = parseInt(el.style.getPropertyValue('--d') || '0', 10);
        setTimeout(() => el.classList.add('visible'), 200 + delay);
    });
});


/* ─── Navbar: transparente → sólida ao scroll ───────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ─── Fechar menu mobile ao clicar num link ─────────────────── */

document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.getElementById('navMenu');
        if (collapse?.classList.contains('show')) {
            // Bootstrap 5: fechar o colapso programaticamente
            const bsCollapse = bootstrap.Collapse.getInstance(collapse);
            bsCollapse?.hide();
        }
    });
});


/* ─── Smooth scroll (links âncora) ─────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 8 : 0;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
});


/* ─── Intersection Observer — animações de scroll ───────────── */

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Observar todos os elementos fora do hero (esses são ativados no load)
document.querySelectorAll('[class*="reveal-"]:not(#hero *)').forEach(el => {
    revealObserver.observe(el);
});


/* ─── Barras de sustentabilidade ────────────────────────────── */

const barObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.target + '%';
                });
                barObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

const sustainCard = document.querySelector('.sustain-card');
if (sustainCard) barObserver.observe(sustainCard);


/* ─── Formulário — Web3Forms (fetch assíncrono) ─────────────── */

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = submitBtn?.querySelector('.btn-text');
const btnLoading = submitBtn?.querySelector('.btn-loading');
const fSuccess   = document.getElementById('form-success');
const fError     = document.getElementById('form-error');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Mostrar estado de carregamento
    submitBtn.disabled = true;
    btnText?.classList.add('d-none');
    btnLoading?.classList.remove('d-none');
    fSuccess?.classList.add('d-none');
    fError?.classList.add('d-none');

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });

        const data = await res.json();

        if (data.success) {
            fSuccess?.classList.remove('d-none');
            form.reset();
        } else {
            throw new Error(data.message || 'Erro desconhecido');
        }
    } catch {
        fError?.classList.remove('d-none');
    } finally {
        submitBtn.disabled = false;
        btnText?.classList.remove('d-none');
        btnLoading?.classList.add('d-none');
    }
});

/* ─── Página Hobbies — gerada a partir de hobbies-data.js ────── */
/* Corre antes do main.js (ambos com defer), para que os cartões criados
   aqui já existam quando o main.js liga as animações reveal-*. */

(() => {
    const data = window.HOBBIES || { aventuras: [], voltas: [], galeria: [] };

    const fmtKm   = n => n.toLocaleString('pt-PT', { maximumFractionDigits: 1 });
    const fmtInt  = n => Math.round(n).toLocaleString('pt-PT');
    const fmtData = iso => new Date(iso + 'T12:00:00').toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    const komootLink = url => url
        ? `<a class="hb-komoot" href="${esc(url)}" target="_blank" rel="noopener">Ver no Komoot <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        : '';


    /* ─── Totais ─────────────────────────────────────────────── */

    const etapas = data.aventuras.flatMap(a => a.etapas);
    const todas  = [...etapas, ...data.voltas];
    const totais = {
        km: todas.reduce((s, v) => s + v.km, 0),
        dplus: todas.reduce((s, v) => s + v.dplus, 0),
        voltas: todas.length
    };

    document.querySelectorAll('[data-total]').forEach(el => {
        el.dataset.count = totais[el.dataset.total];
        el.textContent = '0';
    });


    /* ─── Aventuras (vários dias) ────────────────────────────── */

    const avEl = document.getElementById('hb-aventuras');
    if (avEl) {
        avEl.innerHTML = data.aventuras.map(a => {
            const km = a.etapas.reduce((s, e) => s + e.km, 0);
            const dp = a.etapas.reduce((s, e) => s + e.dplus, 0);
            return `
            <article class="hb-feature reveal-up">
                ${a.foto ? `<div class="hb-feature-img"><img src="${esc(a.foto)}" alt="${esc(a.fotoAlt || a.titulo)}" loading="lazy"></div>` : ''}
                <div class="hb-feature-body">
                    <span class="hb-eyebrow">Aventura em destaque</span>
                    <h3>${esc(a.titulo)}</h3>
                    <p class="hb-feature-sub">${esc(a.subtitulo || '')}</p>
                    <div class="hb-feature-stats">
                        <div><strong>${fmtInt(km)} km</strong><span>dist&acirc;ncia</span></div>
                        <div><strong>${fmtInt(dp)} m</strong><span>desn&iacute;vel D+</span></div>
                        <div><strong>${a.etapas.length}</strong><span>${a.etapas.length === 1 ? 'dia' : 'dias'}</span></div>
                    </div>
                    <ol class="hb-etapas">
                        ${a.etapas.map(e => `
                        <li>
                            <div>
                                <strong>${esc(e.titulo)}</strong>
                                <span>${fmtData(e.data)} &middot; ${fmtKm(e.km)} km &middot; ${fmtInt(e.dplus)} m D+${e.duracao ? ' &middot; ' + esc(e.duracao) : ''}</span>
                            </div>
                            ${komootLink(e.komoot)}
                        </li>`).join('')}
                    </ol>
                </div>
            </article>`;
        }).join('');
    }


    /* ─── Voltas ─────────────────────────────────────────────── */

    const vEl = document.getElementById('hb-voltas');
    if (vEl) {
        const voltas = [...data.voltas].sort((a, b) => b.data.localeCompare(a.data));
        vEl.innerHTML = voltas.map(v => `
            <div class="col-md-6 col-lg-4">
                <article class="hb-ride reveal-up">
                    <div class="hb-ride-img${v.foto ? '' : ' is-empty'}">
                        ${v.foto
                            ? `<img src="${esc(v.foto)}" alt="${esc(v.fotoAlt || v.titulo)}" loading="lazy">`
                            : '<i class="fa-solid fa-person-biking"></i>'}
                        <span class="hb-ride-date">${fmtData(v.data)}</span>
                    </div>
                    <div class="hb-ride-body">
                        <h4>${esc(v.titulo)}</h4>
                        ${v.local ? `<span class="hb-ride-local"><i class="fa-solid fa-location-dot"></i> ${esc(v.local)}</span>` : ''}
                        <div class="hb-ride-stats">
                            <span><i class="fa-solid fa-route"></i> ${fmtKm(v.km)} km</span>
                            <span><i class="fa-solid fa-mountain"></i> ${fmtInt(v.dplus)} m D+</span>
                        </div>
                        ${komootLink(v.komoot)}
                    </div>
                </article>
            </div>`).join('');
    }


    /* ─── Galeria (escondida enquanto estiver vazia) ─────────── */

    const gSec = document.getElementById('galeria');
    const gEl  = document.getElementById('hb-galeria');
    if (gSec && gEl) {
        if (!data.galeria.length) {
            gSec.hidden = true;
            document.querySelectorAll('a[href="#galeria"]').forEach(a => a.closest('li')?.remove());
        } else {
            gEl.innerHTML = data.galeria.map((g, i) => `
                <div class="col-6 col-md-4">
                    <button type="button" class="hb-thumb reveal-up" data-i="${i}" aria-label="Ampliar: ${esc(g.legenda || 'foto')}">
                        <img src="${esc(g.foto)}" alt="${esc(g.legenda || '')}" loading="lazy">
                    </button>
                </div>`).join('');

            const dlg = document.getElementById('hb-lightbox');
            const img = dlg.querySelector('img');
            const cap = dlg.querySelector('figcaption');
            gEl.addEventListener('click', e => {
                const btn = e.target.closest('.hb-thumb');
                if (!btn) return;
                const g = data.galeria[btn.dataset.i];
                img.src = g.foto;
                img.alt = g.legenda || '';
                cap.textContent = g.legenda || '';
                dlg.showModal();
            });
            dlg.addEventListener('click', () => dlg.close());
        }
    }


    /* ─── Contadores animados ────────────────────────────────── */

    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const end = Number(el.dataset.count);
            const t0 = performance.now();
            const step = now => {
                const p = Math.min(1, (now - t0) / 1400);
                el.textContent = fmtInt(end * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));


    /* ─── Barras de sustentabilidade ─────────────────────────── */

    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.target + '%';
            });
            barObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    const sustainCard = document.querySelector('.sustain-card');
    if (sustainCard) barObserver.observe(sustainCard);
})();

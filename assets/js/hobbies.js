/* ─── Página Hobbies — gerada a partir de hobbies-data.js ────── */
/* Corre antes do main.js (ambos com defer), para que os elementos criados
   aqui já existam quando o main.js liga as animações reveal-*. */

(() => {
    const data = window.HOBBIES || {};
    const btt = data.btt || { km: 0, dplus: 0 };
    const aventuras = data.aventuras || [];
    const fotos = data.fotos || {};

    const fmtKm   = n => n.toLocaleString('pt-PT', { maximumFractionDigits: 1 });
    const fmtInt  = n => Math.round(n).toLocaleString('pt-PT');
    const fmtData = iso => new Date(iso + 'T12:00:00').toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
    const fmtMes  = ym => new Date(ym + '-15T12:00:00').toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    const komootLink = url => url
        ? `<a class="hb-komoot" href="${esc(url)}" target="_blank" rel="noopener">Ver no Komoot <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        : '';


    /* ─── BTT: totais ────────────────────────────────────────── */

    document.querySelectorAll('[data-total]').forEach(el => {
        el.dataset.count = btt[el.dataset.total] || 0;
        el.textContent = '0';
    });

    const fonteEl = document.getElementById('hb-fonte');
    if (fonteEl && btt.fonte) {
        fonteEl.textContent = `Fonte: ${btt.fonte}${btt.atualizado ? ' · atualizado em ' + fmtMes(btt.atualizado) : ''}`;
    }


    /* ─── Aventuras (vários dias) ────────────────────────────── */

    const avEl = document.getElementById('hb-aventuras');
    if (avEl) {
        avEl.innerHTML = aventuras.map(a => {
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


    /* ─── Fotos por bloco (data-fotos="confraria" etc.) ──────── */
    /* Com fotos: grelha clicável. Sem fotos: mantém o visual de reserva. */

    const dlg = document.getElementById('hb-lightbox');

    document.querySelectorAll('[data-fotos]').forEach(el => {
        const lista = fotos[el.dataset.fotos] || [];
        if (!lista.length) return;

        el.classList.add('has-fotos');
        el.innerHTML = lista.map((g, i) => `
            <button type="button" class="hb-thumb" data-i="${i}" aria-label="Ampliar: ${esc(g.legenda || 'foto')}">
                <img src="${esc(g.foto)}" alt="${esc(g.legenda || '')}" loading="lazy">
            </button>`).join('');

        el.addEventListener('click', e => {
            const btn = e.target.closest('.hb-thumb');
            if (!btn || !dlg) return;
            const g = lista[btn.dataset.i];
            dlg.querySelector('img').src = g.foto;
            dlg.querySelector('img').alt = g.legenda || '';
            dlg.querySelector('figcaption').textContent = g.legenda || '';
            dlg.showModal();
        });
    });

    dlg?.addEventListener('click', () => dlg.close());


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

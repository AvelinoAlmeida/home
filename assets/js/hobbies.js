/* ─── Página Hobbies — gerada a partir de hobbies-data.js ────── */
/* Corre antes do main.js (ambos com defer), para que os elementos criados
   aqui já existam quando o main.js liga as animações reveal-*. */

(() => {
    const data = window.HOBBIES || {};
    const btt = data.btt || { km: 0, dplus: 0 };
    const aventuras = data.aventuras || [];
    const fotos = data.fotos || {};

    /* ─── Idioma (lang do <html>) e textos gerados aqui ─────────── */

    const isEn = document.documentElement.lang.startsWith('en');
    const locale = isEn ? 'en-GB' : 'pt-PT';
    const T = isEn ? {
        komoot: 'View on Komoot', fonte: 'Source', atualizado: 'updated', destaque: 'Featured adventure',
        distancia: 'distance', dplus: 'elevation gain', dia: 'day', dias: 'days', ampliar: 'Enlarge', foto: 'photo'
    } : {
        komoot: 'Ver no Komoot', fonte: 'Fonte', atualizado: 'atualizado em', destaque: 'Aventura em destaque',
        distancia: 'dist&acirc;ncia', dplus: 'desn&iacute;vel D+', dia: 'dia', dias: 'dias', ampliar: 'Ampliar', foto: 'foto'
    };

    // Campo traduzido: em inglês usa `campo_en` quando existe (ver hobbies-data.js)
    const tx = (o, k) => (isEn && o[k + '_en']) || o[k] || '';

    // Os caminhos em hobbies-data.js são relativos à raiz do site;
    // resolvê-los a partir deste script faz com que funcionem também em /en/
    const root = new URL('../../', document.currentScript.src);
    const url = p => new URL(p, root).href;

    const fmtKm   = n => n.toLocaleString(locale, { maximumFractionDigits: 1 });
    const fmtInt  = n => Math.round(n).toLocaleString(locale);
    const fmtData = iso => new Date(iso + 'T12:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
    const fmtMes  = ym => new Date(ym + '-15T12:00:00').toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    const komootLink = href => href
        ? `<a class="hb-komoot" href="${esc(href)}" target="_blank" rel="noopener">${T.komoot} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        : '';


    /* ─── BTT: totais ────────────────────────────────────────── */

    document.querySelectorAll('[data-total]').forEach(el => {
        el.dataset.count = btt[el.dataset.total] || 0;
        el.textContent = '0';
    });

    const fonteEl = document.getElementById('hb-fonte');
    if (fonteEl && btt.fonte) {
        fonteEl.textContent = `${T.fonte}: ${btt.fonte}${btt.atualizado ? ` · ${T.atualizado} ` + fmtMes(btt.atualizado) : ''}`;
    }


    /* ─── Aventuras (vários dias) ────────────────────────────── */

    const avEl = document.getElementById('hb-aventuras');
    if (avEl) {
        avEl.innerHTML = aventuras.map(a => {
            const km = a.etapas.reduce((s, e) => s + e.km, 0);
            const dp = a.etapas.reduce((s, e) => s + e.dplus, 0);
            return `
            <article class="hb-feature reveal-up">
                ${a.foto ? `<div class="hb-feature-img"><img src="${esc(url(a.foto))}" alt="${esc(tx(a, 'fotoAlt') || tx(a, 'titulo'))}" loading="lazy"></div>` : ''}
                <div class="hb-feature-body">
                    <span class="hb-eyebrow">${T.destaque}</span>
                    <h3>${esc(tx(a, 'titulo'))}</h3>
                    <p class="hb-feature-sub">${esc(tx(a, 'subtitulo'))}</p>
                    <div class="hb-feature-stats">
                        <div><strong>${fmtInt(km)} km</strong><span>${T.distancia}</span></div>
                        <div><strong>${fmtInt(dp)} m</strong><span>${T.dplus}</span></div>
                        <div><strong>${a.etapas.length}</strong><span>${a.etapas.length === 1 ? T.dia : T.dias}</span></div>
                    </div>
                    <ol class="hb-etapas">
                        ${a.etapas.map(e => `
                        <li>
                            <div>
                                <strong>${esc(tx(e, 'titulo'))}</strong>
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
            <button type="button" class="hb-thumb" data-i="${i}" aria-label="${T.ampliar}: ${esc(tx(g, 'legenda') || T.foto)}">
                <img src="${esc(url(g.foto))}" alt="${esc(tx(g, 'legenda'))}" loading="lazy">
            </button>`).join('');

        el.addEventListener('click', e => {
            const btn = e.target.closest('.hb-thumb');
            if (!btn || !dlg) return;
            const g = lista[btn.dataset.i];
            dlg.querySelector('img').src = url(g.foto);
            dlg.querySelector('img').alt = tx(g, 'legenda');
            dlg.querySelector('figcaption').textContent = tx(g, 'legenda');
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

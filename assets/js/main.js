jQuery(window).on('load', function () {
    'use strict';

    // Esconder preloader
    $('.preloader').addClass('hide-preloader');

    // Animar hero após preloader desaparecer
    setTimeout(function () {
        $('#hero .animation-container').each(function () {
            var el = $(this);
            setTimeout(function () {
                el.addClass('run-animation');
            }, el.data('animation-delay') || 0);
        });
    }, 700);
});


jQuery(document).ready(function ($) {
    'use strict';


    // ── Smooth scroll ───────────────────────────────────────
    $(document).on('click', 'a.smooth-scroll', function (e) {
        e.preventDefault();
        var target = $.attr(this, 'href');
        if (!$(target).length) return;
        $('html, body').animate({
            scrollTop: $(target).offset().top - 68
        }, 600);
        // Fechar menu mobile se aberto
        $('#nav-menu').removeClass('open');
    });


    // ── Navbar: transparente → sólida no scroll ─────────────
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });


    // ── Menu mobile toggle ──────────────────────────────────
    $('#nav-toggle').on('click', function () {
        $('#nav-menu').toggleClass('open');
    });

    // Fechar menu ao clicar fora
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#navbar').length) {
            $('#nav-menu').removeClass('open');
        }
    });


    // ── ScrollReveal ────────────────────────────────────────
    if (typeof ScrollReveal !== 'undefined') {
        var sr = ScrollReveal();

        sr.reveal('.reveal', {
            duration: 700,
            delay:    100,
            origin:   'bottom',
            distance: '36px',
            opacity:  0,
            scale:    1,
            viewFactor: 0.15,
            reset:    false
        });

        sr.reveal('.reveal-left', {
            duration: 700,
            delay:    100,
            origin:   'left',
            distance: '48px',
            opacity:  0,
            scale:    1,
            viewFactor: 0.15,
            reset:    false
        });

        sr.reveal('.reveal-right', {
            duration: 700,
            delay:    150,
            origin:   'right',
            distance: '48px',
            opacity:  0,
            scale:    1,
            viewFactor: 0.15,
            reset:    false
        });

        // Escalonar cards individualmente
        sr.reveal('.skill-card', {
            duration:  600,
            origin:    'bottom',
            distance:  '28px',
            opacity:   0,
            scale:     1,
            interval:  80,
            viewFactor: 0.1,
            reset:     false
        });

        sr.reveal('.btt-icon-card', {
            duration:  600,
            origin:    'bottom',
            distance:  '24px',
            opacity:   0,
            scale:     1,
            interval:  100,
            viewFactor: 0.1,
            reset:     false
        });
    }


    // ── Formulário de contacto (Formspree) ──────────────────
    // O Formspree trata o envio nativamente.
    // Este bloco apenas dá feedback visual enquanto o formulário
    // está a ser submetido.
    $('#contact-form').on('submit', function () {
        var btn = $(this).find('button[type="submit"]');
        btn.text('A enviar…').prop('disabled', true);
    });


});

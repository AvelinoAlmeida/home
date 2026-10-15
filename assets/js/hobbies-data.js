/*
    Dados da página Hobbies (hobbies.html)

    Para atualizar a página basta editar este ficheiro:
      - Nova volta: acrescentar um objeto em `voltas` (a ordem não importa,
        a página ordena por data, da mais recente para a mais antiga).
      - Nova aventura de vários dias: acrescentar em `aventuras`, com as etapas.
      - Nova foto na galeria: acrescentar em `galeria`.
    Os totais (km, D+, nº de voltas) são calculados automaticamente.

    Fotos: guardar a versão otimizada em assets/img/hobbies/ (máx. 1600 px).
    Campos opcionais: `foto`, `komoot`, `local`.
*/

window.HOBBIES = {

    aventuras: [
        {
            titulo: 'Porto → Fátima',
            subtitulo: 'Peregrinação de bicicleta com a equipa 💯 Kedas',
            foto: 'assets/img/hobbies/2026-09-27-fatima.jpg',
            fotoAlt: 'KTM Macina Chacana no Santuário de Fátima',
            etapas: [
                { titulo: 'Dia 1 · Porto → Coimbra', data: '2026-09-26', km: 128, dplus: 1630, duracao: '10h30', komoot: 'https://www.komoot.com/pt-pt/tour/3310737857' },
                { titulo: 'Dia 2 · Coimbra → Fátima', data: '2026-09-27', km: 112, dplus: 2070, duracao: '10h40', komoot: 'https://www.komoot.com/pt-pt/tour/3314788422' }
            ]
        }
    ],

    voltas: [
        { titulo: 'De Paço de Sousa a Cabeça Santa', data: '2026-09-13', km: 55.7, dplus: 820, local: 'Penafiel', komoot: 'https://www.komoot.com/pt-pt/tour/3279626330' },
        { titulo: 'Brenha', data: '2026-09-09', km: 38.4, dplus: 730, komoot: 'https://www.komoot.com/pt-pt/tour/3270781108' },
        { titulo: '💯 Kedas Castelo de Paiva', data: '2026-08-15', km: 52.7, dplus: 950, local: 'Castelo de Paiva', komoot: 'https://www.komoot.com/pt-pt/tour/3202538760' },
        { titulo: 'Livração – Sra. da Graça – Livração', data: '2026-08-08', km: 115, dplus: 1730, komoot: 'https://www.komoot.com/pt-pt/tour/3181897154',
          foto: 'assets/img/hobbies/2026-08-08-miradouro-canico.jpg', fotoAlt: 'Miradouro do Caniço, Veade, Celorico de Basto' },
        { titulo: 'Cara na Pedra', data: '2026-08-06', km: 24.4, dplus: 430, komoot: 'https://www.komoot.com/pt-pt/tour/3176532567',
          foto: 'assets/img/hobbies/2026-08-06-ktm-cara-na-pedra.jpg', fotoAlt: 'KTM Macina Chacana junto a um penedo' }
    ],

    galeria: [
        // { foto: 'assets/img/hobbies/AAAA-MM-DD-nome.jpg', legenda: 'Texto da legenda' }
    ]
};

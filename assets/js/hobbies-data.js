/*
    Dados da página Hobbies (hobbies.html)

    Para atualizar a página basta editar este ficheiro:
      - BTT: atualizar `btt.km`, `btt.dplus`, `btt.fonte` e `btt.atualizado`
        (usar uma única fonte para não contar a mesma volta duas vezes).
      - Nova aventura de vários dias: acrescentar em `aventuras`, com as etapas.
      - Fotos de um bloco: acrescentar em `fotos.<bloco>` (confraria, futebol, gaming).
        Enquanto a lista estiver vazia, o bloco mostra um visual sem fotos.
      - Inglês (en/hobbies.html): cada texto pode ter uma versão `campo_en`
        (ex.: `subtitulo_en`, `legenda_en`). Sem ela, usa-se o texto em português.

    Fotos: guardar a versão otimizada em assets/img/hobbies/ (máx. 1600 px),
    com o nome AAAA-MM-DD-descricao.jpg. Os originais ficam em fotos/ (fora do git).
*/

window.HOBBIES = {

    btt: {
        km: 896.2,
        dplus: 19415,
        fonte: 'Strava',
        atualizado: '2026-10'
    },

    aventuras: [
        {
            titulo: 'Porto → Fátima',
            subtitulo: 'Peregrinação de bicicleta com a equipa 💯 Kedas',
            subtitulo_en: 'Bike pilgrimage with the 💯 Kedas team',
            foto: 'assets/img/hobbies/2026-09-27-fatima.jpg',
            fotoAlt: 'KTM Macina Chacana no Santuário de Fátima',
            fotoAlt_en: 'KTM Macina Chacana at the Sanctuary of Fátima',
            etapas: [
                { titulo: 'Dia 1 · Porto → Coimbra', titulo_en: 'Day 1 · Porto → Coimbra', data: '2026-09-26', km: 128, dplus: 1630, duracao: '10h30', komoot: 'https://www.komoot.com/pt-pt/tour/3310737857' },
                { titulo: 'Dia 2 · Coimbra → Fátima', titulo_en: 'Day 2 · Coimbra → Fátima', data: '2026-09-27', km: 112, dplus: 2070, duracao: '10h40', komoot: 'https://www.komoot.com/pt-pt/tour/3314788422' }
            ]
        }
    ],

    fotos: {
        // { foto: 'assets/img/hobbies/AAAA-MM-DD-descricao.jpg', legenda: 'Texto da legenda', legenda_en: 'Caption' }
        confraria: [
            { foto: 'assets/img/hobbies/confraria-grupo.jpg', legenda: 'Confraria dos Irmãos mais Velhos' }
        ],
        futebol: [
            { foto: 'assets/img/hobbies/futebol-formacao.jpg', legenda: 'Futebol de formação', legenda_en: 'Youth football' }
        ],
        gaming: []
    }
};

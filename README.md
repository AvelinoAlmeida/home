# Avelino Almeida · Personal website

Personal website of Avelino Almeida, DBA Consultant at eSPap (SQL Server on-premises and Azure, BI and ETL).
It brings together the professional profile, a downloadable CV, a contact form and a hobbies page.

The site is available in **English** (site root, the version that opens by default) and in **Portuguese** (`/pt/`).
The flag button in the top-right corner switches between the two versions of the same page.

## Pages

| Page | EN | PT |
| --- | --- | --- |
| Professional profile: summary, career, skills, education and contact | [index.html](index.html) | [pt/index.html](pt/index.html) |
| Hobbies: mountain biking, the KTM, the Confraria, youth football, gaming and social media | [hobbies.html](hobbies.html) | [pt/hobbies.html](pt/hobbies.html) |

## Structure

```
index.html, hobbies.html     English version (opens by default)
pt/                          Portuguese version (same sections and ids)
assets/
  css/main.css               shared styles (including the language switcher)
  css/hobbies.css            hobbies page styles
  js/main.js                 navbar, smooth scrolling, animations and contact form
  js/hobbies-data.js         hobbies page data (totals, adventures, photos)
  js/hobbies.js              builds the hobbies blocks from the data, in EN or PT
  cv/                        CV as PDF (EN and PT)
  img/                       images, photos and flags (img/flags)
```

It is a static site: HTML, CSS and JavaScript, with no build step. Libraries are loaded from CDNs.

## Running locally

Serve the project folder with any static web server and open `http://localhost:8000/`.
For example:

```sh
python -m http.server 8000      # Python 3
npx serve -l 8000               # Node.js
```

The Live Server extension for VS Code also works.

## Maintenance

### Text in both languages

Each page exists in two copies (`index.html` and `pt/index.html`, `hobbies.html` and `pt/hobbies.html`).
When you change text in one version, update the other as well. In the pages inside `pt/`, paths to
assets start with `../assets/`.

### Hobbies

The mountain biking totals, the adventures and the photos live in [assets/js/hobbies-data.js](assets/js/hobbies-data.js);
instructions are at the top of that file. English text uses a field with the `_en` suffix
(for example `subtitulo_en` or `legenda_en`); without it, the English version shows the Portuguese text.

### CV

Replace the PDFs in `assets/cv/`, keeping the names `Avelino_Almeida_CV_2026_EN.pdf` and
`Avelino_Almeida_CV_2026_PT.pdf`, or update the links in both `index.html` pages.

### Contact form

The form sends messages through [Web3Forms](https://web3forms.com) (free, no backend required).
The access key is in the form's `access_key` field, in both versions of `index.html`.
Messages sent from the English version arrive with a subject ending in `(EN)`.

## Technologies and credits

- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome 6](https://fontawesome.com/)
- [Devicon](https://devicon.dev/), technology icons
- Google Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Web3Forms](https://web3forms.com), contact form delivery
- Game logos: Wikimedia Commons (public domain); trademarks belong to their respective owners

The first version of the site (2022) also used:

- [jQuery](https://jquery.com/)
- [ScrollReveal](https://scrollrevealjs.org/)
- [Featherlight](https://noelboss.github.io/featherlight/)
- [SmoothScroll for Websites](https://github.com/galambalazs/smoothscroll-for-websites)
- Google Fonts: [Arapey](https://fonts.google.com/specimen/Arapey) and [Abril Fatface](https://fonts.google.com/specimen/Abril+Fatface)
- Demo images from [Pixabay](https://pixabay.com/)

## License

[MIT](LICENSE) © Avelino Almeida

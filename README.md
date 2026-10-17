# Avelino Almeida · Site pessoal

Site pessoal de Avelino Almeida, Consultor DBA na eSPap (SQL Server on-premises e Azure, BI e ETL).
Reúne o perfil profissional, o CV para descarregar, um formulário de contacto e uma página de hobbies.

O site está disponível em **português** (raiz) e em **inglês** (`/en/`). O botão com a bandeira, no canto
superior direito, troca entre as duas versões da mesma página.

## Páginas

| Página | PT | EN |
| --- | --- | --- |
| Perfil profissional: resumo, percurso, competências, formação e contacto | [index.html](index.html) | [en/index.html](en/index.html) |
| Hobbies: BTT, a KTM, a Confraria, futebol de formação, gaming e redes sociais | [hobbies.html](hobbies.html) | [en/hobbies.html](en/hobbies.html) |

## Estrutura

```
index.html, hobbies.html     versão portuguesa
en/                          versão inglesa (mesmas secções e mesmos ids)
assets/
  css/main.css               estilos comuns (inclui o seletor de idioma)
  css/hobbies.css            estilos da página de hobbies
  js/main.js                 navbar, scroll suave, animações e formulário
  js/hobbies-data.js         dados da página de hobbies (totais, aventuras, fotos)
  js/hobbies.js              gera os blocos de hobbies a partir dos dados, em PT ou EN
  cv/                        CV em PDF (PT e EN)
  img/                       imagens, fotos e bandeiras (img/flags)
```

É um site estático: HTML, CSS e JavaScript, sem passo de build. As bibliotecas vêm de CDN.

## Executar localmente

Basta servir a pasta do projeto com qualquer servidor estático e abrir `http://localhost:8000/`.
Por exemplo:

```sh
python -m http.server 8000      # Python 3
npx serve -l 8000               # Node.js
```

No VS Code também funciona a extensão Live Server.

## Manutenção

### Textos nos dois idiomas

Cada página existe em duas cópias (`index.html` e `en/index.html`, `hobbies.html` e `en/hobbies.html`).
Ao alterar um texto numa versão, atualizar também a outra. Nas páginas dentro de `en/`, os caminhos
para os recursos começam por `../assets/`.

### Hobbies

Os números do BTT, as aventuras e as fotos estão em [assets/js/hobbies-data.js](assets/js/hobbies-data.js);
as instruções estão no topo desse ficheiro. Os textos em inglês usam um campo com o sufixo `_en`
(por exemplo `subtitulo_en` ou `legenda_en`); sem ele, a versão inglesa mostra o texto em português.

### CV

Substituir os PDFs em `assets/cv/` mantendo os nomes `Avelino_Almeida_CV_2026_PT.pdf` e
`Avelino_Almeida_CV_2026_EN.pdf`, ou atualizar as ligações nas duas páginas `index.html`.

### Formulário de contacto

O formulário envia as mensagens através do [Web3Forms](https://web3forms.com) (gratuito, sem backend).
A chave de acesso está no campo `access_key` do formulário, nas duas versões do `index.html`.
As mensagens enviadas a partir da versão inglesa chegam com o assunto terminado em `(EN)`.

## Tecnologias e créditos

- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome 6](https://fontawesome.com/)
- [Devicon](https://devicon.dev/), ícones de tecnologias
- Google Fonts: [Inter](https://fonts.google.com/specimen/Inter) e [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Web3Forms](https://web3forms.com), envio do formulário de contacto
- Logótipos dos jogos: Wikimedia Commons (domínio público); marcas registadas dos respetivos proprietários

A primeira versão do site (2022) usava também:

- [jQuery](https://jquery.com/)
- [ScrollReveal](https://scrollrevealjs.org/)
- [Featherlight](https://noelboss.github.io/featherlight/)
- [SmoothScroll for Websites](https://github.com/galambalazs/smoothscroll-for-websites)
- Google Fonts: [Arapey](https://fonts.google.com/specimen/Arapey) e [Abril Fatface](https://fonts.google.com/specimen/Abril+Fatface)
- Imagens de demonstração do [Pixabay](https://pixabay.com/)

## Licença

[MIT](LICENSE) © Avelino Almeida

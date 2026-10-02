# Site de fotografia

Site estático (HTML + CSS + JS puro, sem build), inspirado no layout de portfólio minimalista do Adobe Portfolio.

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Início: slideshow em tela cheia + atalhos para as categorias |
| `trabalhos.html?c=fineart` | Grade de projetos de uma categoria (3 colunas, capas 3:4) |
| `projeto.html?p=infinitum` | Galeria do projeto com lightbox (setas, teclado, swipe) |
| `contato.html` | Formulário de orçamento |

## Como editar

Todo o conteúdo fica em **`js/dados.js`**: nome, e-mail, Instagram, WhatsApp, categorias, projetos e fotos.

1. Coloque suas fotos em `img/` (ex.: `img/infinitum/01.jpg`). Exporte em ~2000px no lado maior, JPG qualidade 80.
2. Em `dados.js`, troque `ph("...")` pelo caminho: `capa: "img/infinitum/capa.jpg"`.
3. Para criar um projeto, copie um bloco `{ slug, categoria, titulo, ano, capa, fotos }`.

Cores, fonte e espaçamentos ficam no topo de `css/style.css` (`:root`).

## Formulário

Por padrão o botão "Enviar" abre o e-mail do visitante já preenchido. Para receber as mensagens direto, crie um formulário grátis no [Formspree](https://formspree.io) e troque o handler em `js/main.js` (função `paginaContato`).

## Testar e publicar

```bash
cd fotografia
python3 -m http.server 8000   # abra http://localhost:8000
```

Para publicar, envie a pasta `fotografia/` para qualquer hospedagem estática: GitHub Pages, Netlify, Vercel ou a hospedagem de sempre (via FTP).

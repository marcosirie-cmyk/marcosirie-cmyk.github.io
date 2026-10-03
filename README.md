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

1. Coloque suas fotos em `img/` (ex.: `img/infinitum/01.jpg`). Exporte com no máximo 1600px no lado maior, JPG qualidade 70–80 (veja "Proteção das fotos").
2. Em `dados.js`, troque `ph("...")` pelo caminho: `capa: "img/infinitum/capa.jpg"`.
3. Para criar um projeto, copie um bloco `{ slug, categoria, titulo, ano, capa, fotos }`.

Cores, fonte e espaçamentos ficam no topo de `css/style.css` (`:root`).

## Proteção das fotos

Já ativo no site, sem mudar o visual:
- Clique direito e arrastar ficam bloqueados sobre as fotos.
- A foto fica "por baixo" do clique, então "Salvar imagem como" não aparece. No celular, o toque longo também não oferece salvar.
- As fotos não saem na impressão.
- O rodapé tem aviso de direitos autorais.

O que depende de você ao exportar as fotos, e é o que mais protege:
- **Resolução baixa:** exporte com no máximo **1600px** no lado maior, JPG qualidade 70–80. Quem baixar leva um arquivo ruim para impressão. Guarde os originais só com você.
- **Metadados de autoria:** no Lightroom (Exportar → Metadados → "Todos os metadados" ou "Somente copyright e contato"), preencha Copyright = "© Lucas Pasetti" e o contato. Isso serve de prova de autoria.
- **Busca reversa:** de vez em quando, procure suas fotos no Google Imagens ou no TinEye para achar uso indevido.

Nenhuma proteção impede print de tela; estas só dificultam a cópia fácil.

Para mais tarde (o GitHub Pages não oferece): bloqueio de hotlink pelo Cloudflare em um domínio próprio, e galeria com senha para clientes (Pixieset, Pic-Time).

## Formulário

Por padrão o botão "Enviar" abre o e-mail do visitante já preenchido. Para receber as mensagens direto, crie um formulário grátis no [Formspree](https://formspree.io) e troque o handler em `js/main.js` (função `paginaContato`).

## Testar e publicar

```bash
cd fotografia
python3 -m http.server 8000   # abra http://localhost:8000
```

Para publicar, envie a pasta `fotografia/` para qualquer hospedagem estática: GitHub Pages, Netlify, Vercel ou a hospedagem de sempre (via FTP).

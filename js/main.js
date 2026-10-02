/* Monta cabeçalho, páginas e lightbox a partir de SITE (dados.js). */
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const params = new URLSearchParams(location.search);
  const pagina = document.body.dataset.page;

  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Cabeçalho e menu ---------- */
  function linksMenu(ativo) {
    const cats = SITE.categorias
      .map((c) => `<a href="trabalhos.html?c=${c.slug}" class="${ativo === c.slug ? "ativo" : ""}">${esc(c.titulo)}</a>`)
      .join("");
    return `
      <a href="index.html" class="${ativo === "home" ? "ativo" : ""}">Início</a>
      ${cats}
      <a href="contato.html" class="${ativo === "contato" ? "ativo" : ""}">Orçamento</a>`;
  }

  function montarCabecalho(ativo) {
    document.title = SITE.nome;
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <a href="index.html" class="logo">${esc(SITE.nome)}</a>
      <nav class="nav">${linksMenu(ativo)}</nav>
      <button class="hamburger" aria-label="Abrir menu" aria-expanded="false"><i></i><i></i><i></i></button>`;
    document.body.prepend(header);

    const menu = document.createElement("div");
    menu.className = "menu-mobile";
    menu.innerHTML = `<nav>${linksMenu(ativo)}</nav>`;
    document.body.append(menu);

    const btn = $(".hamburger", header);
    btn.addEventListener("click", () => {
      const aberto = document.body.classList.toggle("menu-aberto");
      btn.setAttribute("aria-expanded", aberto);
    });

    const aoRolar = () => header.classList.toggle("rolado", scrollY > 10);
    addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
  }

  function montarRodape() {
    const f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML = `
      <span>© ${new Date().getFullYear()} ${esc(SITE.nome)}</span>
      <span>
        <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
      </span>`;
    document.body.append(f);
  }

  /* ---------- Imagens: aparecem suavemente ao carregar ---------- */
  function revelarAoCarregar(root = document) {
    root.querySelectorAll("img.fade").forEach((img) => {
      if (img.complete && img.naturalWidth) img.classList.add("ok");
      else img.addEventListener("load", () => img.classList.add("ok"), { once: true });
    });
  }

  /* ---------- Grade de projetos (estilo "project covers") ---------- */
  function grade(projetos) {
    return `<section class="covers">${projetos
      .map(
        (p) => `
        <a class="cover" href="projeto.html?p=${p.slug}">
          <div class="cover-img"><img class="fade" src="${esc(p.capa)}" alt="${esc(p.titulo)}" loading="lazy"></div>
          <div class="cover-info">
            <div class="titulo">${esc(p.titulo)}</div>
            <div class="ano">${p.ano || ""}</div>
          </div>
        </a>`
      )
      .join("")}</section>`;
  }

  /* ---------- Páginas ---------- */
  function paginaHome() {
    montarCabecalho("home");
    const main = $("main");
    const slides = SITE.capaHome
      .map((src, i) => `<div class="slide${i === 0 ? " ativo" : ""}" style="background-image:url('${esc(src)}')"></div>`)
      .join("");
    main.innerHTML = `
      <section class="hero">
        ${slides}
        <div class="hero-texto">
          <h1>${esc(SITE.nome)}</h1>
          <p>${esc(SITE.descricao)}</p>
          <a class="botao claro" href="trabalhos.html?c=${SITE.categorias[0].slug}">Ver trabalhos</a>
        </div>
      </section>
      <section class="categorias">
        ${SITE.categorias
          .map((c) => {
            const capa = (SITE.projetos.find((p) => p.categoria === c.slug) || {}).capa || "";
            return `
            <a class="categoria" href="trabalhos.html?c=${c.slug}">
              <img class="fade" src="${esc(capa)}" alt="" loading="lazy">
              <span>${esc(c.titulo)}</span>
            </a>`;
          })
          .join("")}
      </section>`;

    const els = main.querySelectorAll(".slide");
    let atual = 0;
    if (els.length > 1)
      setInterval(() => {
        els[atual].classList.remove("ativo");
        atual = (atual + 1) % els.length;
        els[atual].classList.add("ativo");
      }, 5000);
    montarRodape();
  }

  function paginaTrabalhos() {
    const slug = params.get("c") || SITE.categorias[0].slug;
    const cat = SITE.categorias.find((c) => c.slug === slug) || SITE.categorias[0];
    montarCabecalho(cat.slug);
    document.title = `${SITE.nome} — ${cat.titulo}`;
    $("main").innerHTML = grade(SITE.projetos.filter((p) => p.categoria === cat.slug));
    montarRodape();
  }

  function paginaProjeto() {
    const p = SITE.projetos.find((x) => x.slug === params.get("p"));
    if (!p) return void (location.href = "index.html");
    montarCabecalho(p.categoria);
    document.title = `${SITE.nome} — ${p.titulo}`;

    const lista = SITE.projetos.filter((x) => x.categoria === p.categoria);
    const i = lista.indexOf(p);
    const ant = lista[(i - 1 + lista.length) % lista.length];
    const prox = lista[(i + 1) % lista.length];

    $("main").innerHTML = `
      <article class="projeto">
        <header class="projeto-topo">
          <h1>${esc(p.titulo)}</h1>
          ${p.ano ? `<div class="ano">${p.ano}</div>` : ""}
          ${p.texto ? `<p>${esc(p.texto)}</p>` : ""}
        </header>
        <div class="fotos">
          ${p.fotos
            .map((src, n) => `<button class="foto" data-i="${n}" aria-label="Ampliar foto ${n + 1}"><img class="fade" src="${esc(src)}" alt="${esc(p.titulo)} ${n + 1}" loading="lazy"></button>`)
            .join("")}
        </div>
        <nav class="projeto-nav">
          <a href="projeto.html?p=${ant.slug}">← ${esc(ant.titulo)}</a>
          <a href="trabalhos.html?c=${p.categoria}">Todos</a>
          <a href="projeto.html?p=${prox.slug}">${esc(prox.titulo)} →</a>
        </nav>
        <div class="cta">
          <p>Gostou deste trabalho?</p>
          <a class="botao" href="contato.html?assunto=${encodeURIComponent(p.titulo)}">Solicitar orçamento</a>
        </div>
      </article>`;

    montarLightbox(p.fotos);
    montarRodape();
  }

  function paginaContato() {
    montarCabecalho("contato");
    const assunto = params.get("assunto") || "";
    $("main").innerHTML = `
      <section class="contato">
        <div>
          <h1>Solicite um orçamento</h1>
          <p>Conte um pouco sobre o seu projeto — casamento, ensaio, impressão fine art ou trabalho comercial — e retorno em até 48h.</p>
          <ul class="contato-links">
            <li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>
            <li><a href="https://wa.me/${esc(SITE.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
        <form class="form" id="form-contato">
          <label>Nome<input name="nome" required></label>
          <label>E-mail<input name="email" type="email" required></label>
          <label>Tipo de trabalho
            <select name="tipo">
              ${SITE.categorias.map((c) => `<option>${esc(c.titulo)}</option>`).join("")}
              <option>Outro</option>
            </select>
          </label>
          <label>Mensagem<textarea name="mensagem" rows="6" required>${assunto ? esc(`Olá! Tenho interesse em "${assunto}".\n\n`) : ""}</textarea></label>
          <button class="botao" type="submit">Enviar</button>
        </form>
      </section>`;

    // Sem servidor: abre o e-mail do visitante já preenchido.
    // Para receber direto, troque por um serviço como Formspree (action="https://formspree.io/f/SEU_ID").
    $("#form-contato").addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      const corpo = `Nome: ${d.nome}\nE-mail: ${d.email}\nTipo: ${d.tipo}\n\n${d.mensagem}`;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Orçamento — " + d.tipo)}&body=${encodeURIComponent(corpo)}`;
    });
    montarRodape();
  }

  /* ---------- Lightbox ---------- */
  function montarLightbox(fotos) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `
      <button class="lb-fechar" aria-label="Fechar">×</button>
      <button class="lb-ant" aria-label="Anterior">‹</button>
      <img alt="">
      <button class="lb-prox" aria-label="Próxima">›</button>
      <div class="lb-cont"></div>`;
    document.body.append(lb);

    const img = $("img", lb);
    let i = 0;
    const mostrar = (n) => {
      i = (n + fotos.length) % fotos.length;
      img.src = fotos[i];
      $(".lb-cont", lb).textContent = `${i + 1} / ${fotos.length}`;
    };
    const abrir = (n) => { mostrar(n); lb.classList.add("aberto"); document.body.style.overflow = "hidden"; };
    const fechar = () => { lb.classList.remove("aberto"); document.body.style.overflow = ""; };

    document.querySelectorAll(".foto").forEach((b) => b.addEventListener("click", () => abrir(+b.dataset.i)));
    $(".lb-fechar", lb).onclick = fechar;
    $(".lb-ant", lb).onclick = (e) => { e.stopPropagation(); mostrar(i - 1); };
    $(".lb-prox", lb).onclick = (e) => { e.stopPropagation(); mostrar(i + 1); };
    lb.addEventListener("click", (e) => { if (e.target === lb) fechar(); });

    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("aberto")) return;
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") mostrar(i - 1);
      if (e.key === "ArrowRight") mostrar(i + 1);
    });

    let x0 = null;
    lb.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mostrar(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Transição suave entre páginas ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || a.origin !== location.origin) return;
    e.preventDefault();
    document.body.classList.add("saindo");
    setTimeout(() => (location.href = a.href), 250);
  });
  // Corrige o cache do Safari ao voltar
  addEventListener("pageshow", (e) => e.persisted && document.body.classList.remove("saindo"));

  ({ home: paginaHome, trabalhos: paginaTrabalhos, projeto: paginaProjeto, contato: paginaContato }[pagina] || paginaHome)();
  revelarAoCarregar();
})();

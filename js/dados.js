/*
 * CONTEÚDO DO SITE
 * ----------------
 * Edite este arquivo para trocar nome, categorias, projetos e fotos.
 *
 * Fotos: coloque seus arquivos em /img (ex.: img/infinitum/01.jpg) e use
 * o caminho no lugar das URLs de exemplo. As URLs picsum.photos abaixo
 * são apenas imagens provisórias.
 */

// Gera uma imagem provisória (troque por 'img/pasta/arquivo.jpg')
const ph = (seed, w = 1200, h = 1600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const SITE = {
  nome: "Lucas Pasetti",
  descricao: "Fotografia particular — o olhar de um aprendiz.",
  email: "contato@seudominio.com",
  instagram: "https://instagram.com/seuusuario",
  whatsapp: "5511999999999", // só números, com DDI e DDD

  // Fotos do slideshow da página inicial
  capaHome: [ph("home-1", 2400, 1600), ph("home-2", 2400, 1600), ph("home-3", 2400, 1600)],

  categorias: [
    { slug: "fineart",   titulo: "Fine Art Prints" },
    { slug: "eventos",   titulo: "Casamentos e Ensaios" },
    { slug: "comercial", titulo: "Hotéis e Marcas" },
  ],

  projetos: [
    // ---- FINE ART ----
    {
      slug: "infinitum", categoria: "fineart", titulo: "Infinitum", ano: 2025,
      texto: "Uma série sobre horizontes, silêncio e o tempo longo das paisagens.",
      capa: ph("infinitum"),
      fotos: [ph("inf-1", 1600, 1067), ph("inf-2"), ph("inf-3"), ph("inf-4", 1600, 1067), ph("inf-5"), ph("inf-6")],
    },
    {
      slug: "selvva", categoria: "fineart", titulo: "Selvva", ano: 2025,
      texto: "Texturas e luz no interior da mata atlântica.",
      capa: ph("selvva"),
      fotos: [ph("sel-1"), ph("sel-2", 1600, 1067), ph("sel-3"), ph("sel-4"), ph("sel-5", 1600, 1067)],
    },
    {
      slug: "la-mar", categoria: "fineart", titulo: "La Mar", ano: 2025,
      texto: "O oceano como paisagem e como estado de espírito.",
      capa: ph("lamar"),
      fotos: [ph("mar-1", 1600, 1067), ph("mar-2"), ph("mar-3"), ph("mar-4", 1600, 1067)],
    },
    {
      slug: "wildlife", categoria: "fineart", titulo: "Wildlife", ano: 2026,
      capa: ph("wildlife"),
      fotos: [ph("wild-1"), ph("wild-2", 1600, 1067), ph("wild-3"), ph("wild-4")],
    },
    {
      slug: "na-montanha", categoria: "fineart", titulo: "Na Montanha", ano: 2025,
      capa: ph("montanha"),
      fotos: [ph("mon-1", 1600, 1067), ph("mon-2"), ph("mon-3"), ph("mon-4", 1600, 1067), ph("mon-5")],
    },
    {
      slug: "magia-do-deserto", categoria: "fineart", titulo: "Magia do Deserto", ano: 2025,
      capa: ph("deserto"),
      fotos: [ph("des-1"), ph("des-2", 1600, 1067), ph("des-3"), ph("des-4")],
    },
    {
      slug: "rio-de-janeiro", categoria: "fineart", titulo: "Rio de Janeiro", ano: 2025,
      capa: ph("rio"),
      fotos: [ph("rio-1", 1600, 1067), ph("rio-2"), ph("rio-3"), ph("rio-4"), ph("rio-5", 1600, 1067)],
    },
    {
      slug: "fotos-de-rua", categoria: "fineart", titulo: "Street / Fotos de Rua", ano: 2025,
      capa: ph("street"),
      fotos: [ph("str-1"), ph("str-2"), ph("str-3", 1600, 1067), ph("str-4")],
    },
    {
      slug: "na-sua-parede", categoria: "fineart", titulo: "Na Sua Parede", ano: 2025,
      texto: "Veja como as impressões fine art ficam em ambientes reais. Peça um orçamento para tamanhos e acabamentos.",
      capa: ph("parede"),
      fotos: [ph("par-1", 1600, 1067), ph("par-2"), ph("par-3", 1600, 1067)],
    },

    // ---- EVENTOS ----
    {
      slug: "ana-e-pedro", categoria: "eventos", titulo: "Ana & Pedro", ano: 2025,
      capa: ph("casamento1"),
      fotos: [ph("ap-1"), ph("ap-2", 1600, 1067), ph("ap-3"), ph("ap-4"), ph("ap-5", 1600, 1067)],
    },
    {
      slug: "ensaio-praia", categoria: "eventos", titulo: "Ensaio na Praia", ano: 2025,
      capa: ph("ensaio"),
      fotos: [ph("ep-1"), ph("ep-2"), ph("ep-3", 1600, 1067)],
    },
    {
      slug: "julia-e-marcos", categoria: "eventos", titulo: "Julia & Marcos", ano: 2024,
      capa: ph("casamento2"),
      fotos: [ph("jm-1", 1600, 1067), ph("jm-2"), ph("jm-3"), ph("jm-4")],
    },

    // ---- COMERCIAL ----
    {
      slug: "hotel-costa", categoria: "comercial", titulo: "Hotel Costa", ano: 2025,
      capa: ph("hotel"),
      fotos: [ph("hc-1", 1600, 1067), ph("hc-2"), ph("hc-3", 1600, 1067), ph("hc-4")],
    },
    {
      slug: "marca-atelier", categoria: "comercial", titulo: "Ateliê Terra", ano: 2025,
      capa: ph("marca"),
      fotos: [ph("at-1"), ph("at-2"), ph("at-3", 1600, 1067)],
    },
    {
      slug: "pousada-serra", categoria: "comercial", titulo: "Pousada da Serra", ano: 2024,
      capa: ph("pousada"),
      fotos: [ph("ps-1", 1600, 1067), ph("ps-2"), ph("ps-3"), ph("ps-4", 1600, 1067)],
    },
  ],
};

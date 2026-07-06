/* ════════════════════════════════════════════════════════════════════════
   capitulos.js — Datos de la portada-descenso (actos y capítulos).
   REGLA SAGRADA: todo texto cultural se copia VERBATIM:
     · numeral/título de acto → los Libros de El_Grimorio_del_Archipielago_
       DEFINITIVO.txt (allí tipografiados en VERSALES);
     · nombre / alias / gancho → el bloque @ENTIDAD de
       contenido/El_Grimorio_Datos_Estructurados.txt;
     · tags → vocabulario controlado del @ENTIDAD (REINO/CATEGORIA/ALCANCE).
   El teaser del Caleuche es el de la portada original (curatorial, aprobado).
   `verbo`, `labelSonda`, coords de `ventana`/`brillo` = UI, no contenido.
   El orden del array es el orden curatorial del descenso (n = travesía).
   ════════════════════════════════════════════════════════════════════════ */
window.Grimorio = window.Grimorio || {};
window.Grimorio.portada = {
  /* Fin del camino: adonde lleva el "Siguiente" del último capítulo publicado. */
  fin: { href: "lecho.html", nombre: "El lecho", frase: "El camino desciende hasta el lecho del archipiélago." },
  /* ORDEN DEL MANDATO 2026-07-05 (reversible): Caleuche → Pincoya → Trauco →
     Invunche → Camahueto (mar → bosque → cueva → desembocadura). Cuando llegue
     el documento bibliográfico (CAMINO-DEL-MITO), el orden se ajusta cambiando
     los `n` y los puentes se cargan en el campo `puente` de cada capítulo
     ({ texto, fuente }) — todo data-driven, cero HTML. */
  actos: [
    // Solo los Libros con capítulos publicados o sellados; agregar actos es gratis.
    // El orden del array sigue la travesía (n del primer capítulo de cada Libro),
    // para que la carta lea Capítulo I, II, III… de corrido; numeral/título
    // VERBATIM de los Libros del DEFINITIVO (versales → redonda, práctica aprobada).
    { id: "libro-3", numeral: "Libro Tercero", titulo: "Los barcos y el paso de las almas", zona: "mar" },
    { id: "libro-2", numeral: "Libro Segundo", titulo: "Los señores del mar",               zona: "mar" },
    { id: "libro-4", numeral: "Libro Cuarto",  titulo: "Los señores del bosque",            zona: "bosque" },
    { id: "libro-8", numeral: "Libro Octavo",  titulo: "La Recta Provincia",                zona: "cueva" },
    { id: "libro-5", numeral: "Libro Quinto",  titulo: "Las bestias del agua y la tierra",  zona: "cerro-rio" }
  ],
  capitulos: [
    {
      id: "caleuche",               // = ID del @ENTIDAD = archivo = prefijo de imágenes
      n: 1,                         // orden curatorial del descenso
      acto: "libro-3",
      nombre: "El Caleuche",
      alias: "Buque de Arte",       // del ALIAS:: del @ENTIDAD (verbatim)
      gancho: "Hay noches en que la niebla se cierra sobre el canal y ves luces donde no debería haberlas. Los que suben a su cubierta no vuelven a bajar.",
      tags: ["Mar", "Barco fantasma", "Chilota"],
      teaser: "Cuatro relatos lo explican. Ninguno del todo.",
      verbo: "Abordar",
      labelSonda: "Caleuche",
      href: "caleuche.html",
      estado: "publicado",          // "publicado" | "sellado"
      atmosfera: "niebla",          // sonido del reino (sonido.js); mar lejano + fiesta insinuada
      img: "portada-caleuche",      // base → assets/img/<img>.webp/.png
      ventana: { left: "8%", top: "26%", w: "42%", h: "40%" },
      ventanaMovil: { left: "4%", top: "20%", w: "60%", h: "34%" },
      brillo: { x: "30%", y: "52%", rx: "16%", ry: "24%", a: 0.3, tipo: "latido" }
    },
    {
      id: "pincoya",
      n: 2,
      acto: "libro-2",
      nombre: "La Pincoya",
      alias: "Princesa de las mareas · Dueña de los mariscos",  // ALIAS:: del @ENTIDAD (verbatim, unidos con ·)
      gancho: "Sale del agua al amanecer, de cabellos dorados y vestida de algas, y baila en la arena. Es lo más cercano a la bondad que tiene el océano de Chiloé.",
      tags: ["Mar", "Espíritu marino", "Chilota"],
      // sin teaser: no se redacta texto nuevo (regla sagrada)
      verbo: "Acercarse",
      labelSonda: "Pincoya",
      href: "pincoya.html",
      estado: "publicado",
      atmosfera: "mar-adentro",     // subacuático: denso, burbujeo escaso
      img: "portada-pincoya",     // playa negra con resplandor dorado en el agua
      ventana: { left: "28%", top: "30%", w: "26%", h: "32%" },
      ventanaMovil: { left: "12%", top: "28%", w: "60%", h: "32%" },
      brillo: { x: "40%", y: "45%", rx: "13%", ry: "18%", a: 0.32, tipo: "latido" }
    },
    {
      id: "trauco",
      n: 3,
      acto: "libro-4",
      nombre: "El Trauco",
      alias: "Thrauco · Chauco · Trauko",   // ALIAS:: del @ENTIDAD (verbatim, unidos con ·)
      gancho: "No es alto ni hermoso, apenas te llega a la cintura, con un hacha de piedra. Pero ninguna mujer que cruza su mirada vuelve igual.",
      tags: ["Bosque", "Chilota"],
      // sin teaser: no se redacta texto nuevo (regla sagrada)
      verbo: "Adentrarse",
      labelSonda: "Trauco",
      href: "trauco.html",
      estado: "publicado",
      atmosfera: "bosque",          // viento en el follaje + crujidos espaciados; nada de mar
      img: "portada-trauco",      // cosecha 2026-07-05: claro del bosque con rayo de luna
      ventana: { left: "52%", top: "38%", w: "26%", h: "34%" },
      ventanaMovil: { left: "30%", top: "34%", w: "55%", h: "30%" },
      brillo: { x: "63%", y: "60%", rx: "14%", ry: "18%", a: 0.28, tipo: "latido" }
    },
    {
      id: "invunche",
      n: 4,
      acto: "libro-8",
      nombre: "El Invunche",
      alias: "Imbunche · Ivunche · el Machucho de la cueva",  // ALIAS:: del @ENTIDAD (verbatim)
      gancho: "En la boca de la cueva de los brujos hay algo que vigila. Fue un niño, una vez. Ya no.",
      tags: ["Guardián", "Chilota"],
      // sin teaser: no se redacta texto nuevo (regla sagrada)
      verbo: "Asomarse",
      labelSonda: "Invunche",
      href: "invunche.html",
      estado: "publicado",
      atmosfera: "cueva",           // drone mínimo + goteo con eco; el silencio ES el sonido
      // PROVISIONAL: no existe portada-invunche todavía (registrado en
      // herramientas/pendientes.md); se usa el hero de la ficha con los velos.
      img: "invunche-hero",
      ventana: { left: "30%", top: "25%", w: "40%", h: "55%" },
      ventanaMovil: { left: "15%", top: "22%", w: "65%", h: "45%" },
      brillo: { x: "34%", y: "81%", rx: "10%", ry: "12%", a: 0.3, tipo: "latido" }
    },
    {
      id: "camahueto",
      n: 5,
      acto: "libro-5",
      nombre: "El Camahueto",
      // sin alias: el @ENTIDAD lo trae vacío (—)
      gancho: "Nace en lo alto de los cerros y duerme décadas. Un día de tormenta despierta y baja al mar arrasando todo; los surcos de su cuerno se vuelven ríos.",
      tags: ["Cerro y río", "Bestia zoomorfa", "Chilota"],
      // sin teaser: no se redacta texto nuevo (regla sagrada)
      verbo: "Seguir el surco",
      labelSonda: "Camahueto",
      href: "camahueto.html",
      estado: "publicado",
      atmosfera: "tormenta",        // lluvia + viento racheado + trueno lejano ocasional
      // PROVISIONAL: no existe portada-camahueto todavía (registrado en
      // herramientas/pendientes.md); se usa el hero de la ficha con los velos.
      img: "camahueto-hero",
      ventana: { left: "18%", top: "12%", w: "45%", h: "55%" },
      ventanaMovil: { left: "8%", top: "14%", w: "70%", h: "45%" },
      brillo: { x: "55%", y: "41%", rx: "12%", ry: "16%", a: 0.3, tipo: "latido" }
    }
  ]
};

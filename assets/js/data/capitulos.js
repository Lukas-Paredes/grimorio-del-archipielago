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
  actos: [
    // Solo los Libros con capítulos publicados o sellados; agregar actos es gratis.
    { id: "libro-3", numeral: "Libro Tercero", titulo: "Los barcos y el paso de las almas", zona: "mar" },
    { id: "libro-4", numeral: "Libro Cuarto",  titulo: "Los señores del bosque",            zona: "bosque" }
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
      img: "portada-caleuche",      // base → assets/img/<img>.webp/.png
      ventana: { left: "8%", top: "26%", w: "42%", h: "40%" },
      ventanaMovil: { left: "4%", top: "20%", w: "60%", h: "34%" },
      brillo: { x: "30%", y: "52%", rx: "16%", ry: "24%", a: 0.3, tipo: "latido" }
    },
    {
      id: "trauco",
      n: 2,
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
      // PROVISIONAL: no existe portada-trauco todavía (registrado en
      // herramientas/pendientes.md); se usa el hero de la ficha con los velos.
      img: "trauco-hero",
      ventana: { left: "50%", top: "22%", w: "36%", h: "50%" }
    }
  ]
};

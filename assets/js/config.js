/* ════════════════════════════════════════════════════════════════════════
   config.js — Parámetros del camino del mito en UN solo lugar (FASE 3,
   mandato 2026-07). Sin frameworks, sin módulos ES.

   Se carga ANTES que camino.js y sonido.js; ambos leen de aquí con
   defaults propios, así que borrar o vaciar este archivo NO rompe nada.
   Los datos culturales NO viven aquí (van en capitulos.js / los @ENTIDAD);
   esto es solo afinación de la experiencia (tiempos, volúmenes, curvas).
   ════════════════════════════════════════════════════════════════════════ */
window.Grimorio = window.Grimorio || {};
window.Grimorio.config = {
  /* Transición de bruma entre páginas (camino.js). */
  bruma: {
    salidaMs: 420,       // cuánto cubre el velo antes de navegar
    entradaMs: 1400,     // cuánto tarda en despejarse al llegar
    seguridadMs: 3000    // red de seguridad: el velo se levanta solo
  },
  /* Audio ambiente procedural (sonido.js). */
  audio: {
    volumen: 0.35,       // ganancia maestra (presencia discreta)
    crossfadeS: 3.0,     // crossfade entre ATMÓSFERAS al cambiar de capítulo (2–4 s)
    lowpass: {
      arribaHz: 6000,    // claridad en la superficie
      fondoHz: 550,      // ahogado al fondo del capítulo
      curva: 1.4         // exponente del descenso (1 = lineal)
    },
    /* Perillas por atmósfera (mandato sonido-por-capítulo): cualquier valor
       puesto aquí SOBREESCRIBE la receta homónima de sonido.js, perilla a
       perilla. Ganancias 0–1 (subir/bajar una capa), frecuencias en Hz,
       cadencias de eventos en segundos (promedio; el sistema varía ±).
       Ejemplos listos para descomentar y ajustar a oído:
    atmosferas: {
      niebla:        { fiesta: 0.02, fiestaCadaS: 40 },  // fiesta aún más tímida
      "mar-adentro": { burbuja: 0.08, burbujaCadaS: 12 },
      bosque:        { hojas: 0.24, crujidoCadaS: 40 },
      cueva:         { goteoCadaS: 18, drone: 0.04 },
      tormenta:      { trueno: 0.09, truenoCadaS: 60, lluvia: 0.12 },
      abismo:        { drone: 0.05 }
    }
       Recetas y perillas disponibles: ver RECETAS en assets/js/sonido.js. */
  }
};

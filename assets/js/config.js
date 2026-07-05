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
    crossfadeS: 1.6,     // crossfade entre mezclas de zona
    lowpass: {
      arribaHz: 6000,    // claridad en la superficie
      fondoHz: 550,      // ahogado al fondo del capítulo
      curva: 1.4         // exponente del descenso (1 = lineal)
    }
  }
};

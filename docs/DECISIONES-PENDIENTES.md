# Decisiones y notas pendientes

Notas escritas a mano: contradicciones abiertas, limpiezas anotadas y decisiones que esperan a
Lucas. Viven aquí y no en `herramientas/pendientes.md` porque ese archivo lo reescribe completo
`herramientas/generar_fichas.py` en cada corrida, y toda nota a mano se pierde.

Las dos secciones que siguen se trasladaron íntegras desde `herramientas/pendientes.md` el
2026-09-15. Sus líneas «Nota manual: `generar_fichas.py` reescribe este archivo» hablan de ese
archivo de origen; aquí no aplican, porque este documento no se genera.

---

## Técnica de ilustración — contradicción abierta (anotada 2026-09-15, a mano)
> Nota manual: `generar_fichas.py` reescribe este archivo; trasladarla antes de regenerar.

- **La contradicción.** El anexo visual de Fondart 2027 (`postulaciones/fondart-2027/anexo-visual.html`)
  y la Propuesta Creativa dejan la técnica abierta y asignada por función de la pieza (ilustración
  pintada en portales, píxel art en el entorno del descenso). La documentación del repo sigue
  fijando el píxel art como restricción de encargo: `docs/SISTEMA-VISUAL-Y-ARTE.md` §1, §4 («De
  píxel») y §8 («Restricciones que valen para toda pieza encargada»); `MAPA-PROYECTO.md` §1 y §5
  («ADN visual»); `docs/ARQUITECTURA.md` §5. `CLAUDE.md` no lo menciona. Se resuelve después.
- **Arrastra una decisión técnica.** `image-rendering: pixelated` es global sobre `img`
  (`ficha.css`, `portada.css`): un portal pintado se vería pixelado al escalar. Ver
  «El renderizado pixelado, por versión» en `docs/ARQUITECTURA.md` §5.
- **Dato del doc que no calza con los archivos.** `docs/SISTEMA-VISUAL-Y-ARTE.md` §4 y §5 dicen que
  los `hero` enmarcados pasan por «grilla 3 · 96 colores». Los PNG reales de los cinco hero de
  917 × 512 son RGB con 23 000 – 32 000 colores (color pleno, `--colors 0`, como indica
  `COMO-AGREGAR-CAPITULO.md`). Solo las `lamina` y escenas de 565 × 842 tienen 96 colores.
- **Regla del sello en la esquina inferior derecha.** Solo existe porque el normalizador tapa el
  sello de la herramienta que generó las piezas del prototipo; no aplica a piezas encargadas.

## Documentos de arranque — limpieza pendiente (anotada 2026-09-15, a mano)
> Nota manual: `generar_fichas.py` reescribe este archivo; trasladarla antes de regenerar.
> Mandato de Lucas (2026-09-15): se anota, no se ejecuta todavía.

- **Archivar `_handoff/`.** Contiene una copia vieja de `CLAUDE.md` (último cambio 2026-07-01) con
  reglas contrarias a las vigentes del `CLAUDE.md` de la raíz: presenta `index.html` como cáscara que
  renderiza `home.js` y pide «papel, tinta» en el diseño. Sus copias del corpus son idénticas a
  `contenido/`; las del motor son de julio (`ficha.js` ya difiere del vigente).
  Antes de mover: ocho archivos remiten a `_handoff/`, entre ellos `CLAUDE.md`, `MAPA-PROYECTO.md`
  (apertura vía `_handoff/PROTOCOLO.md`) y `robots.txt`. Destino y momento los decide Lucas: mover
  archivos antes del envío requiere su aprobación.
- **Actualizar `ESTADO-DEL-PROYECTO.md`** (última actualización 2026-09-01). Dice 5 capítulos (hoy
  son 12), da el deploy por «parqueado» por repo privado (hoy el sitio está en GitHub Pages) y no
  menciona Fondart 2027.
- **Actualizar `HANDOFF-CODE.md`** (snapshot 2026-07-09). Pide «commit + push por fase» y «mandatos
  autónomos», contrarios al trabajo por checkpoints de `CLAUDE.md`; su estado git (rama
  `v8-arquitectura`) y el orden de cinco capítulos son de julio.

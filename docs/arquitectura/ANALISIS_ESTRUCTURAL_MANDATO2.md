# Análisis estructural — FASE 5 del mandato 2 (2026-07-05)

Documento de PENSAMIENTO, no de obra. Evalúa cómo quedó el sistema tras
montar Pincoya, Invunche y Camahueto (5 capítulos publicados de 68 entidades)
y qué conviene hacer ANTES de la próxima ola de capítulos.

---

## 1 · Lo que escala bien (probado hoy, tres veces)

- **El pipeline es real y data-driven.** Montar un capítulo completo
  (imágenes → prosa verbatim → ficha → camino) no tocó `ficha.js`,
  `ficha.css`, `camino.js` ni `portada.js`. Está documentado en
  `COMO-AGREGAR-CAPITULO.md` y el verificador (`verificar_prosa.py`)
  convierte la regla sagrada del verbatim en un chequeo automático.
- **Las zonas.** `zona` en el acto elige de una vez atmósfera visual y mezcla
  de sonido. Agregar una zona nueva = una mezcla más en `sonido.js`.
- **La carta.** Las 68 placas ya se renderizan; el estado «sellado» evita
  enlaces muertos y deja el deseo de completar (espíritu permitido del
  HORIZONTE-RELATO).
- **config.js** separa afinación de contenido; borrarlo no rompe nada.

## 2 · Lo que cruje (riesgos estructurales, por orden de urgencia)

1. **La lista `publicadas` va embebida en CADA ficha.** Publicar una criatura
   regenera TODAS las fichas (hoy 5, mañana 68) solo para actualizar ese
   array de la vitrina. Con 68 publicadas, cada alta toca 68 archivos.
   → Pensado: extraer `publicadas` a un data compartido
   (`assets/js/data/publicadas.js`, mismo patrón que `indice.js`) y que
   `ficha.js` lo lea de `window.Grimorio`. Cambio pequeño, hacerlo ANTES
   de la próxima ola.
2. **`_raw/` viaja en el branch publicado.** Los crudos (~5 MB c/u, ya ~28
   archivos) se sirven públicamente en GitHub Pages y engordan cada clon.
   A ritmo de 3-4 imágenes por criatura × 68, el repo se va a cientos de MB.
   → Pensado: sacar `_raw/` del branch de deploy (branch propio de archivo,
   o Git LFS, o respaldo externo). Decisión de Lucas: ¿el crudo es parte
   del archivo público o material interno?
3. **La portada solo usa el capítulo n:1.** `ventana`/`brillo` de los demás
   capítulos son metadata inerte (se curan a mano y nadie las ve). O la
   portada-descenso crecerá para mostrar más umbrales (¿los primeros de cada
   Libro?), o conviene dejar de curar esas coordenadas para capítulos no
   iniciales. Decisión de diseño pendiente.
4. **La travesía es una sola línea (n global).** Con 15+ capítulos, un solo
   hilo se hará largo; los `actos` ya agrupan por Libro y permitirían
   sub-caminos («mareas») sin rediseño: el `n` seguiría siendo el orden
   maestro (regla 3 del HORIZONTE), con cortes visuales por Libro.
5. **og:image usa el PNG del hero (~550 KB).** Para crawlers es pesado y el
   recorte 16:9 no es el 1200×630 canónico. → Pensado: slot `og` opcional en
   el normalizador.
6. **El repo vive dentro de OneDrive.** Sincronizar _raw + páginas genera
   conflictos de lock y sube todo dos veces (OneDrive + GitHub). Sugerencia
   operativa: excluir la carpeta del sync o mover el repo.

## 3 · Contratos del HORIZONTE-RELATO: intactos

- `n` sigue siendo el orden de la travesía; la carta admite estados extra
  por placa vía clase CSS; `grimorio:travesia` sigue libre; los slots
  `<id>-relato-<n>` y `contenido/relatos/` siguen reservados.
- `ficha.js` NO absorbió lógica de relato: FASE 2 (reveal fino + sonda de
  lectura) es presentación de lectura, no narrativa interactiva. El futuro
  `motor-relato.js` puede montarse encima sin tocar lo de hoy: las secciones
  tienen IDs estables y el chrome (camino.js) ya inserta bloques al final
  de `main` sin conflicto.
- El sonido quedó fuera de `ficha.js` (archivo propio `sonido.js`), así el
  motor de relato podrá pedir mezclas por escena reutilizándolo
  (`Grimorio.sonido` expone `set/estado`; agregar `mezcla(zona)` pública
  sería trivial cuando haga falta).

## 4 · Deuda menor anotada

- `herramientas/pendientes.md` regenera su prosa fija desde el generador:
  bien para no divergir, pero las «Decisiones de Lucas» viven en código
  Python — moverlas a un `.md` propio que el generador incluya, para que
  editar pendientes no requiera tocar Python.
- El `AVISO: hero webp supera 60 KB` del normalizador quedó obsoleto tras la
  regla de color pleno (los 5 heroes rondan 50-77 KB y está bien): subir el
  umbral o silenciarlo para no acostumbrarse a ignorar avisos.
- `verificar_prosa.py` compara contra el DEFINITIVO completo: si un día dos
  criaturas comparten una frase idéntica, podría dar OK cruzado. Riesgo
  bajo; se afinaría acotando al capítulo de la entidad.

## 5 · Qué haría después (priorizado)

1. **Cosecha faltante en Gemini**: `portada-invunche`, `portada-camahueto`,
   y regenerar `camahueto-cierre` a resolución completa (hoy 1376×768).
2. **Decidir la Fiura**: sus tres crudos ya están en `_raw/` (llegaron sin
   esperarse). Con prosa verbatim del cap. XI sería el capítulo VI del
   camino (bosque, junto al Trauco) siguiendo el pipeline documentado.
3. **Des-embeber `publicadas`** (punto 2.1) antes de publicar más fichas.
4. **CAMINO-DEL-MITO (NotebookLM)**: al llegar, fijar el orden definitivo y
   cargar los `puente { texto, fuente }` — el renderer ya los muestra.
5. **Decidir `_raw/` en el deploy** (punto 2.2).
6. **Probar sonido y scroll-snap en móvil real** (iOS Safari: resume del
   AudioContext; Android: si el snap marea, quitar `snap-on`).
7. Cuando Lucas lo active: **H1 del HORIZONTE** (motor-relato.js + una
   escena beta del Caleuche con sus 4 variantes como finales).

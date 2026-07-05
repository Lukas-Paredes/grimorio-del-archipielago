# Cómo agregar un capítulo al camino del mito

Guía operativa (FASE 3 del mandato 2026-07). Este es el pipeline exacto con el
que se montaron Pincoya, Invunche y Camahueto. Todo es **data-driven**: agregar
un capítulo NO toca `ficha.js`, `ficha.css`, `camino.js` ni `portada.js`.

Requisitos previos: el `@ENTIDAD` de la criatura ya existe en
`contenido/El_Grimorio_Datos_Estructurados.txt` (las 68 están), y hay crudos
de Gemini para sus imágenes.

---

## 1 · Imágenes (normalizador)

Respaldar SIEMPRE los crudos en `assets/img/_raw/` antes de tocar. Después,
pipeline por tipo (regla de oro: **calidad visual sobre peso**):

| Slot | Formato | Pipeline | Comando |
|---|---|---|---|
| `<id>-hero` | 16:9 | grid /3, color pleno (`--colors 0`)¹ | `python herramientas/normalizar_img.py crudo.png --id <id> --slot hero --colors 0` |
| `<id>-descenso` | 9:16 | full-viewport 1800px, sin grid/paleta | `python herramientas/normalizar_img.py crudo.png --id <id> --slot descenso` |
| `<id>-cierre` | 16:9 | full-viewport 1800px, sin grid/paleta | `python herramientas/normalizar_img.py crudo.png --id <id> --slot cierre` |
| `portada-<id>` | 16:9 | full-viewport 1800px, sin grid/paleta | `python herramientas/normalizar_img.py crudo.png --out portada-<id> --slot portada` |
| piezas UI | 1:1 | negro→alfa, recorte, LANCZOS a tamaño de uso | `python herramientas/normalizar_img.py crudo.png --out <nombre> --slot ui --alto 48` |

¹ La cuantización de paleta (MEDIANCUT) apaga los degradés brillantes que
ocupan pocos píxeles (cuerno del Camahueto, pelo de la Pincoya, luces del
Caleuche) **al mismo peso webp**: por eso los heroes van a color pleno.

El sello ✦ se cubre solo (degradado radial); **verificar a ojo** la esquina
inferior derecha de cada salida. Si no hay `portada-<id>` todavía, usar el
hero como provisional (`img: "<id>-hero"`) y registrarlo en
`herramientas/pendientes.md`.

## 2 · Prosa curada (verbatim)

Crear `contenido/prosa/<id>.txt` copiando VERBATIM del capítulo de la criatura
en `contenido/El_Grimorio_del_Archipielago_DEFINITIVO.txt`:

- `@DESCRIPCION` ← «LO QUE SE SABE CON CERTEZA» (las subsecciones tituladas,
  como «DE SU NACIMIENTO», se pliegan a párrafos sin su etiqueta).
- `@INTERPRETACION` ← «LO QUE DICEN LOS QUE ESTUDIAN».
- `@ORIGEN-MITO` ← «DE DÓNDE PUDO NACER EL MITO» (solo si el capítulo lo trae).
- `@CIERRE` ← UNA línea curatorial (práctica aprobada; no viene del texto).

Las «LO QUE CUENTAN (variantes y voces)» **no** van en la prosa: ya viven como
`VARIANTE::` en el `@ENTIDAD` y la ficha las renderiza como cajones.

**Tipos de párrafo** dentro de una sección (los prefijos marcan la forma
tipográfica del original; el texto sigue siendo verbatim):

```text
Párrafo normal de prosa.

» «Una cita testimonial, con sus comillas del original.»
— Quien la dijo, dónde, en QUÉ FUENTE (año)

| Lado izquierdo de una regla → resultado
| Otro lado → otro resultado
```

- `» …` (+ línea `— …` opcional) → cita con atribución (blockquote).
- Líneas `| a → b` → placa de regla con punteado (p. ej. la danza de la Pincoya).

Verificar SIEMPRE la fidelidad:

```bash
python herramientas/verificar_prosa.py <id>
```

Todo segmento debe dar `OK`; el `@CIERRE` queda marcado «CURATORIAL» para
revisión humana.

## 3 · Publicar la ficha

1. Agregar el `<id>` a `herramientas/publicadas.txt` (una línea).
2. `python herramientas/generar_fichas.py` — genera `<id>.html` en la raíz y
   regenera TODAS las publicadas (la vitrina cruzada usa la lista completa),
   más `assets/js/data/indice.js` y `herramientas/pendientes.md`.

## 4 · El capítulo en el camino (`assets/js/data/capitulos.js`)

1. Si su Libro no está en `actos`, agregarlo: `numeral`/`titulo` VERBATIM del
   DEFINITIVO (versales → redonda es práctica aprobada) + `zona`
   (`mar` · `bosque` · `cueva` · `cerro-rio`), que también elige la mezcla
   de sonido. El array `actos` se ordena por la travesía (el `n` de su primer
   capítulo), para que la carta lea Capítulo I, II, III… de corrido.
2. Agregar la entrada del capítulo: `id`, `n` (orden de la travesía), `acto`,
   `nombre`/`alias`/`gancho` VERBATIM del `@ENTIDAD`, `tags` del vocabulario
   controlado (REINO/CATEGORIA/ALCANCE), `verbo` (UI), `labelSonda`, `href`,
   `estado: "publicado"`, `img` (`portada-<id>` o el hero provisional),
   `ventana`/`ventanaMovil` (zona clicable sobre la imagen, en %) y `brillo`
   (resplandor animado, opcional).
3. Si el capítulo se inserta en medio, correr los `n` siguientes.
4. Cuando llegue el documento CAMINO-DEL-MITO: ajustar `n` y cargar los
   `puente { texto, fuente }` (cita bibliográfica del tránsito entre
   capítulos); `camino.js` ya los muestra si existen.

## 5 · Metadatos del sitio

- `sitemap.xml`: agregar `https://…/<id>.html`.

## 6 · Tipos de sección de una página de capítulo

La plantilla (`herramientas/plantilla_ficha.html`) define las secciones; cada
una se muestra solo si la entidad trae su dato:

| Sección | Fuente del contenido | Notas |
|---|---|---|
| Hero | `NOMBRE`/`ALIAS` + `<id>-hero` | posición «Camino del mito · Capítulo N» la pone camino.js |
| Gancho | `GANCHO::` | epígrafe atmosférico |
| Datos de bestiario | REINO/CATEGORIA/CONDICION/… | etiquetas del vocabulario (LABELS en ficha.js) |
| Advertencia | `ADVERTENCIA::` | encuadre ético ANTES del relato (p. ej. Invunche) |
| El relato | `RESUMEN::` + prosa `@DESCRIPCION` | primer párrafo con capitular; párrafos con reveal fino (FASE 2) |
| Variantes del relato | `VARIANTE::` (repetible) | cajones I, II, III… |
| Defensa | `DEFENSA::` | oculta si no existe |
| Nota del archivero | `@INTERPRETACION` (o `INTERPRETACION::`) | papel con pin |
| De dónde nació el mito | `@ORIGEN-MITO` | oculta si no existe |
| Vitrina | `RELACIONES::` | enlaza solo a fichas publicadas |
| Fuentes y enlaces | `FUENTE::`/`ENLACE::` | pie |
| Cierre | `@CIERRE` + `<id>-cierre` | pantalla completa final |
| El camino continúa | capitulos.js (`n`+1) | gancho verbatim del próximo; lo monta camino.js |

## 7 · Afinación global (`assets/js/config.js`)

Tiempos de la bruma y parámetros del sonido (volumen, crossfade, curva del
low-pass) viven en `config.js`. Borrarlo no rompe nada: cada consumidor tiene
defaults idénticos.

## 8 · QA mínimo antes de cerrar

- Recorrido: portada → … → capítulo nuevo → siguiente → lecho (y atrás/adelante).
- `python herramientas/verificar_prosa.py --todas` sin FALLA.
- Carta de capítulos: numeración corrida y placa nueva.
- Consola limpia; 390 px sin scroll horizontal; imágenes nítidas a pantalla
  completa (desktop y móvil); Escape cierra la carta; teclado llega a todo.
- Sonido: encender en el capítulo nuevo y comprobar su mezcla de zona.

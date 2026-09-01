# Dossier — Fondart Regional 2027

Carpeta de trabajo de la postulación. **No es parte de la obra publicada**: la
obra que evalúa la comisión es el sitio, en la raíz del repositorio.

---

## Identificación

| | |
|---|---|
| **Convocatoria** | Fondart Regional, año de ejecución **2027** |
| **Línea** | **Creación Artística** |
| **Folio** | **878718** |
| **Región** | Los Lagos |
| **Cierre de la convocatoria** | 9 de septiembre de 2026, 15:00 |
| **Fecha de envío** | *(por registrar — se completa al recibir el certificado de recepción)* |
| **Responsable** | Lucas Paredes Vásquez |
| **Obra evaluada** | https://lukas-paredes.github.io/grimorio-del-archipielago/ |

---

## Comunas declaradas

**Calbuco · Castro · Ancud · Quemchi · Quellón**

> **Verificación contra el corpus — leer antes de usar esta lista en un
> formulario.** El mandato pedía cotejar cada dato y reportar lo que no calce.
> Las cinco comunas no tienen el mismo respaldo documental en el repositorio:

| Comuna | Respaldo en el repositorio | Lectura |
|---|---|---|
| **Ancud** | **40 menciones.** Sede del proceso de 1880 y del Museo Regional. Punto propio en el mapa | **Sólida** |
| **Quemchi** | **16 menciones.** Contiene Quicaví —capital de la Recta Provincia y sede de la cueva—, Tenaún y la isla Caucahué | **Sólida** |
| **Quellón** | **3 menciones**, todas indirectas: la Sirena chilota «habita la isla Laitec, al sur de Quellón» | **Anclaje real pero indirecto.** No es punto del mapa; es la referencia de ubicación de Laitec |
| **Castro** | **1 mención**, indirecta: Rauco, «al sur de Castro» | **Anclaje débil.** Solo como referencia de ubicación de Rauco |
| **Calbuco** | **0 menciones** en corpus, investigación y mapa. Solo aparece en el GeoJSON regional de comunas y como contexto en papers académicos | **Sin anclaje documental.** Es territorio del proyecto por residencia del responsable y por alcance declarado, no por presencia en el corpus |

**Comunas con anclaje verificado que NO están en la lista:** **Quinchao**
(Achao), **Dalcahue** y **Queilén** — las tres con punto propio y fuente en el
mapa del archipiélago.

**No ajusté la lista.** Si el formulario pide comunas de *intervención* o de
*residencia del equipo*, las cinco declaradas pueden ser correctas y esta tabla
no aplica. Si pide comunas con *presencia en la obra*, conviene revisarla.
Decisión de Lucas.

---

## Cifras de la obra

Contadas contra los archivos del repositorio el **2026-09-01**, commit `5ee6187`.
**17 de 17 coinciden** con `docs/ESTADO-VERIFICADO-2026-08.md`. Cero discrepancias.

### Corpus

| Dato | Cifra | Se verifica en |
|---|---|---|
| Entidades documentadas | **68** | bloques `@ENTIDAD…@FIN` |
| Citas de fuente | **108** | líneas `FUENTE::` |
| Enlaces | **70** | líneas `ENLACE::` |
| Variantes documentadas | **47** | líneas `VARIANTE::` |
| Interpretaciones curatoriales | **21** | líneas `INTERPRETACION::` |
| Secciones temáticas | **11** | valores distintos de `SECCION::` |
| Capítulos redactados | **40** | serie I–XL del grimorio literario, completa y sin huecos |
| Libros | **10** | encabezados `LIBRO …` |

### Publicación

| Dato | Cifra |
|---|---|
| Capítulos publicados y navegables | **12** |
| Entidades selladas | **56** |

Los doce, en orden del descenso: El Caleuche · La Pincoya · El Trauco ·
El Invunche · La Cueva de Quicaví · La Recta Provincia · El Brujo chilote ·
El Macuñ · El Challanco · La Voladora · El Camahueto · El juicio de Ancud de 1880.

### Arte

| Dato | Cifra |
|---|---|
| Piezas producidas | **41** — **21 por criatura, 20 de sistema** |
| Archivos (WebP + respaldo PNG) | **80** |
| Pares completos | **39** |
| Peso servido en WebP | **2,4 MB** (2.429.918 bytes) |

> El reparto **21/20** corrige el 19/20/2 que circulaba en documentación previa.
> Las dos piezas sin par WebP (`motas-capa-1/2.png`) están **dentro** de las 20
> de sistema, no aparte.

### Fuentes

| Dato | Cifra |
|---|---|
| Fuentes en el índice | **40** |
| Archivadas y verificables en el repositorio | **12** |
| Temas con respaldo pleno | **17 de 20** |
| Temas sin respaldo | **0** |

### Sonido y tipografía

6 pistas en OGG y MP3 (12 archivos), normalizadas a −18 LUFS con loop, apagadas
por defecto. 3 familias tipográficas autoalojadas en 8 archivos `.woff2`.

---

## Contenido de esta carpeta

| Ruta | Qué es |
|---|---|
| `index.html` | Índice visual del dossier. Sin dependencias externas; reutiliza las tipografías autoalojadas del sitio por ruta relativa |
| `capturas/` | 13 capturas de la obra. **Copias** de `postulacion/capturas/`, que se conserva intacta |
| `documentos/` | **Vacía.** Los documentos se trabajan fuera del repositorio y se incorporan al cierre |
| `README.md` | Este archivo |

---

## Antecedente

Hubo una postulación anterior al **Fondo Cultura Puente Chacao 2026**, declarada
**inadmisible**. Su expediente se conserva en `postulacion/` como historia del
proyecto.

**Dos advertencias sobre ese material:**

1. **El equipo de esa postulación no aplica.** La composición cambió. No
   reutilizar nombres, roles, distribución de honorarios ni cartas de compromiso.
2. **Sus cifras están desactualizadas:** declaraba 5 capítulos publicados cuando
   hoy son 12. Para toda cifra manda este documento o
   `docs/ESTADO-VERIFICADO-2026-08.md`, nunca el anexo de Chacao.

Ese anexo contiene datos personales del responsable —nombre completo, correo y
teléfono— y el repositorio es público por decisión del 2026-09-01. No
redistribuirlo a servicios de terceros.

---

## Dónde está el resto

| Necesitas | Ve a |
|---|---|
| Las cifras y su método de verificación | `docs/ESTADO-VERIFICADO-2026-08.md` |
| Las 40 fuentes, con acceso y situación de derechos | `docs/SISTEMA-DE-FUENTES.md` |
| Paleta, tipografías, slots y las 41 piezas | `docs/SISTEMA-VISUAL-Y-ARTE.md` |
| Decisiones de arquitectura y limpieza | `docs/ARQUITECTURA.md` |
| Estado del repositorio y problemas abiertos | `docs/DIAGNOSTICO-2026-09.md` |
| Contexto completo para alguien que llega de cero | `docs/GUIA-DE-CONTEXTO.md` |
| Las reglas del proyecto | `CLAUDE.md` |

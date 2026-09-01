# 11 · ESTADO VERIFICADO PARA LA POSTULACIÓN

**El Grimorio del Archipiélago** · cifras al **31 de agosto de 2026**, commit `dd27bc7`.

> **Cada cifra de este documento fue contada hoy sobre los archivos del
> repositorio.** Ninguna se copió de documentación anterior. Este documento existe
> porque el anexo de la postulación anterior declaraba **5 capítulos publicados**
> cuando ya había 12: el material heredado subestima la obra y eso cuesta puntaje.
>
> **Úsese este documento, no el anexo de Chacao, para toda cifra.**

---

## EL CORPUS DOCUMENTAL

| Dato | Cifra | Cómo se verifica |
|---|---|---|
| **Entidades documentadas** | **68** | bloques `@ENTIDAD…@FIN` en el corpus estructurado |
| **Citas de fuente** | **108** | líneas `FUENTE::` |
| **Enlaces** | **70** | líneas `ENLACE::` |
| **Variantes documentadas** | **47** | líneas `VARIANTE::` |
| **Interpretaciones curatoriales** | **21** | líneas `INTERPRETACION::` |
| **Secciones temáticas** | **11** | valores distintos de `SECCION::` |
| **Capítulos redactados** | **40** | capítulos I–XL del Grimorio literario |
| **Libros del grimorio literario** | **10** | encabezados `LIBRO …` |
| Entidades con desarrollo escaso declarado | 19 | campo `DESARROLLO::` |

**Reparto por sección temática:** Recta Provincia 15 · Bestias 12 · Menores 9 ·
Corte del mar 6 · Lugares 5 · Relatos 5 · Bosque 4 · Aves brujas 4 · Penas 4 ·
Barcos y almas 3 · Origen 1.

---

## LO PUBLICADO Y NAVEGABLE

### **12 capítulos completos**, en el orden del descenso

| # | Capítulo | Libro |
|---|---|---|
| I | **El Caleuche** | Tercero · Los barcos y el paso de las almas |
| II | **La Pincoya** | Segundo · Los señores del mar |
| III | **El Trauco** | Cuarto · Los señores del bosque |
| IV | **El Invunche** | Octavo · La Recta Provincia |
| V | **La Cueva de Quicaví** | Octavo |
| VI | **La Recta Provincia** | Octavo *(hub + vitrina de 7 piezas)* |
| VII | **El Brujo chilote** | Octavo |
| VIII | **El Macuñ** | Octavo |
| IX | **El Challanco** | Octavo |
| X | **La Voladora** | Octavo |
| XI | **El Camahueto** | Quinto · Las bestias del agua y la tierra |
| XII | **El juicio de Ancud de 1880** | Octavo · *«El Expediente»*, página bespoke |

Cada uno con su propia URL, citable y enlazable.

**Selladas: 56 entidades** (68 − 12). Documentadas con sus fuentes, visibles en la
carta de capítulos como placas selladas — el visitante ve la dimensión completa
del proyecto **sin encontrar un solo enlace roto**.

### El camino completo

Portada-descenso · umbral de capítulo · carta con las 68 entidades · umbral de
Libro al cruzar de acto · «El camino continúa» encadenando capítulos · el lecho
con las puertas del archivo · el archivo de consulta (Bestiario, Mundos, Recta
Provincia, Cosmología) · **menú público de Fuentes** · **mapa del archipiélago**.

---

## EL SISTEMA DE FUENTES

| Dato | Cifra |
|---|---|
| **Fuentes en el índice** | **40** |
| **Archivadas y verificables en el repositorio** | **12** |
| Papers académicos archivados (PDF + TXT extraído) | **8** |
| Por conseguir | 15 |
| Localizables con cita completa | 9 |
| Perdida / no verificada (nunca suman) | 1 / 1 |
| **Temas cruzados con respaldo pleno** | **17 de 20** |
| Con respaldo parcial | 3 |
| **Sin respaldo** | **0** |

**Validación ejecutada hoy:** `validar_fuentes.py` → *«Todo limpio: índice
coherente con el disco y el corpus»*. Las 108 citas se reducen a 32 fuentes
únicas, y las 32 tienen entrada en el índice. **Cero citas huérfanas.**

**Fuente primaria propia:** el proceso de Ancud de 1880 transcrito verbatim con
aparato crítico, sobre el folleto de Memoria Chilena (MC0033459).

---

## EL TERRITORIO

**8 lugares con fuente verificada en el repositorio**, sobre la silueta real de
las comunas de la provincia (geometría DPA/SUBDERE, coordenadas OpenStreetMap):

**Quicaví** (capital de la Recta Provincia y sede de la cueva) · **Tenaún**
(origen legendario) · **Achao** · **Queilén** · **Isla Caucahué** · **Rauco** ·
**Dalcahue** · **Ancud** (sede del juicio y del Museo Regional).

**4 lugares descartados** por circular en la web sin fuente citable: las cascadas
de Tocoihue y Nalhuitad, la cueva de Colo, y la playa de Quicaví con el brujo
Zapata. **No se mapean hasta tener fuente.** Ese descarte es parte del argumento:
el proyecto deja fuera lo que no puede sostener.

---

## LA PRODUCCIÓN ARTÍSTICA

| Dato | Cifra |
|---|---|
| **Piezas de arte producidas** | **41** |
| Archivos totales | 80 |
| Pares WebP + PNG completos | 39 |
| Peso servido al navegador (WebP) | **2,4 MB** |
| Peso del fallback (PNG) | 39 MB |
| Crudos originales conservados en `_raw/` | **40 archivos · 205 MB** |
| Pistas de banda sonora | **6**, en OGG + MP3, normalizadas a −18 LUFS con loop |
| Tipografías auto-alojadas | 3 familias · 8 archivos `.woff2` |

**Formatos:** cada pieza se sirve en **WebP** con **PNG de respaldo**, vía
`<picture>` o `image-set()`. Cinco slots por criatura: `hero` 16:9 (917 × 512) ·
`lamina` 2:3 (565 × 842) · `descenso` 9:16 (1005 × 1800) · `cierre` 16:9
(1800 × 1005) · `card` 1:1.

---

## EL SITIO PUBLICADO

**https://lukas-paredes.github.io/grimorio-del-archipielago/**

Verificado en línea el 31 de agosto de 2026: **responde HTTP 200**.

Arquitectura: sitio estático puro —HTML, CSS y JavaScript clásico—. Sin
frameworks, sin gestores de paquetes, sin proceso de compilación, sin base de
datos, **sin dependencias de pago**. Costo operativo anual = el dominio.

Accesibilidad verificada: contraste AA, cuerpo de lectura ≥ 17 px en teléfono,
objetivos táctiles ≥ 44 px, 390 px sin scroll horizontal, movimiento pausable con
`prefers-reduced-motion` respetado en 6 hojas de CSS y 4 de JS, sonido apagado por
defecto, recorrido completo por teclado, diálogos con Escape.

---

## QUÉ FALTA PARA COMPLETAR LA OBRA

| Frente | Falta |
|---|---|
| **Contenido** | **56 entidades** por publicar (documentadas, con fuentes, sin ficha montada) |
| **Arte — lo más urgente** | **8 `descenso`** (el fondo 9:16 del cuerpo en teléfono) y **8 `cierre`**, todos del bloque de la Recta Provincia. Los prompts están listos |
| **Arte — miniaturas** | **13 `card`**: el slot está definido en el pipeline y **no existe ni una pieza producida** |
| **Arte — umbrales** | `portada-invunche` y `portada-camahueto` (hoy usan el hero como provisional) |
| **Arte — deuda técnica** | `camahueto-cierre` está a media resolución (1376 × 768 contra 1800 × 1005). Dos motas de sedimento sin par WebP |
| **Siguiente criatura** | **La Fiura**: crudos en `_raw/` sin normalizar ni montar |
| **Fuentes** | **Quintana 1972 y Cavada 1914**: juntos son **45 de las 108 citas** del corpus y ninguno está archivado. Conseguirlos es la mayor mejora disponible al respaldo documental |
| **Verificación** | Un párrafo de la ficha Recta Provincia no verifica verbatim contra ningún corpus: parece síntesis curatorial y debe reetiquetarse como interpretación |
| **Créditos** | Faltan título y autor de las 6 pistas de audio (licencia Pixabay ya documentada) |

---

## CIFRAS QUE CAMBIAN RESPECTO DE DOCUMENTOS ANTERIORES

| Cifra | Decía antes | **Verificado hoy** | Dónde estaba mal |
|---|---|---|---|
| Capítulos publicados | **5** | **12** | Anexo de Chacao §12.1 · `ESTADO-DEL-PROYECTO.md` §2 |
| Fichas del bestiario | 24 | *(superado)* **68 entidades** | `docs/arquitectura/INVENTARIO_CONTENIDO_BESTIARIO_V8.md` |
| «Criaturas en apéndice pendiente» | **36** | ⚠️ **no verificable** | El apéndice del grimorio literario lista **21 nombres** (15 viñetas). Ninguna cuenta da 36. **La cifra utilizable es 56 entidades por publicar** |
| Estado del deploy | «bloqueado, repo privado» | **el sitio está en línea** | `ESTADO-DEL-PROYECTO.md` §5 |
| Fuentes | *(no se declaraban)* | **40 indexadas · 12 archivadas** | Sistema construido después del anexo |
| Lugares del mapa | *(no existía)* | **8 verificados · 4 descartados** | Sistema construido después del anexo |

**Las siete primeras cifras del corpus** —68 entidades, 108 citas, 70 enlaces,
47 variantes, 21 interpretaciones, 40 capítulos, 11 secciones— **se verificaron
exactas**. La única que no se sostiene es «36 criaturas en apéndice».

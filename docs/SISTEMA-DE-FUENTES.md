# 09 · SISTEMA DE FUENTES Y TRAZABILIDAD

**El Grimorio del Archipiélago** · generado 2026-08-31 desde el estado real del
repositorio (`fuentes/bibliografia/fuentes.yaml`, commit `dd27bc7`).

> Este documento reemplaza a los PDFs para efectos de contexto. Los PDFs viven en
> `fuentes/_raw/lecturas/` y no se suben al Project: pesan y no aportan como
> contexto conversacional.

---

## 1 · CÓMO FUNCIONA LA TRAZABILIDAD

### La regla constitutiva

**Nada inventado.** Ni relatos, ni fuentes, ni testimonios, ni citas, ni fechas,
ni páginas, ni territorios. Lo que no está en la fuente, no existe en el sitio.

De ahí se derivan cinco reglas operativas:

1. **Verbatim.** El texto cultural se copia literal de su fuente, con ortografía
   de época intacta cuando es documento histórico. Las marcas `[¿palabra?]` e
   `[ilegible]` del OCR se muestran tal cual.
2. **Las variantes se muestran, jamás se zanjan.** Cuando dos fuentes legítimas
   divergen —las cifras del proceso, el color de la luz del macuñ, la forma del
   challanco, las penas— se muestran todas con su fuente. La discrepancia es
   material narrativo, no un problema a resolver.
3. **Un dato SIN fuente que contradice a las fuentes es ERROR y se corrige.**
   Precedente registrado: el «caso Cavada», donde una conflación atribuía a
   Cavada la autoría de la redada; tres fuentes coinciden en que fue Martiniano
   Rodríguez. Se corrigió.
4. **Estatus siempre diferenciado.** Seis etiquetas, nunca intercambiables:
   *tradición documentada · variante · interpretación curatorial · antecedente
   histórico · recreación artística · pendiente de verificación.*
5. **Verificación contra el original.** Toda cita académica lleva
   `(Autor, año, p. X)` cotejada contra el PDF o TXT archivado en el repositorio.
   Lo no verificable queda `[por verificar]` y **no se publica**.

### La arquitectura: una sola base de datos

```
fuentes/bibliografia/fuentes.yaml     ← ÍNDICE ÚNICO, editado A MANO
        │                                40 fuentes con tipo, autor, año, título,
        │                                acceso, url, archivo_local, estado,
        │                                qué respalda y alias_corpus
        │
        ├─→ generar_matriz.py ─→ MATRIZ-CITAS.md        (cruce tema × fuente)
        │                     ─→ BIBLIOGRAFIA.md        (APA)
        │                     ─→ REPORTE-FUENTES.md     (stats, huecos, prioridades)
        │                     ─→ assets/js/data/fuentes-datos.js  (menú público del sitio)
        │
        └─← validar_fuentes.py   (solo AVISA, nunca corrige)
```

Los cuatro archivos de salida están marcados «GENERADO — no editar a mano». Se
edita el índice y se regenera. Ningún script adivina nada: el campo `respalda`
es juicio curatorial humano.

### Las cuatro capas de fuente

El menú público del sitio expone cuatro capas, y solo cuatro:

| Capa | Qué es |
|---|---|
| **Primaria** | El folleto del proceso de Ancud de 1908, el manuscrito de Espech, el Anuario Hidrográfico |
| **Académicas** | Los papers y libros de estudio |
| **Prensa de época** | Los decretos y la prensa de 1880-1882 |
| **Tradición oral** | Lo atribuido a tradición oral en el corpus |

Quedan **fuera** del menú público: corpus interno, geodatos, terciarias (incluida
Wikipedia), institucionales, referencia interna y las no verificadas.

**Regla dura del menú:** enlace al original **solo si `acceso == abierta`**. El
sitio jamás aloja un PDF para descarga.

---

## 2 · LAS 40 FUENTES DEL ÍNDICE

### Cómo leer las dos columnas de la derecha

**`acceso`** es lo que registra el repositorio: si el texto se puede consultar y
cómo. **No es lo mismo que la situación de derechos de autor.** Un paper de
acceso abierto en Dialnet sigue protegido por copyright: abierto significa que se
puede leer sin pagar, no que se pueda reproducir.

**`derechos`** no está registrado en `fuentes.yaml`. Lo que va abajo es una
lectura por año de publicación bajo la Ley 17.336 (Chile: vida del autor + 70
años). **Toda fila marcada «probable» exige confirmar la fecha de muerte del
autor antes de reproducir nada.** Donde no hay ni año ni autor identificado, va
`[NO VERIFICADO]`.

### Primarias (4)

| id | Autor | Año | Título | acceso | derechos |
|---|---|---|---|---|---|
| `f-1908` | Ponce Hermanos (eds.) | 1908 | Los brujos de Chiloé. Célebre proceso seguido ante el Juzgado de Ancud | abierta | Dominio público (probable — 1908) |
| `manuscrito-espech-1882` | Ramón Espech (copista) → Benjamín Vicuña Mackenna | 1882 | Copia de algunas piezas del proceso de los brujos de Chiloé | localizable | Dominio público (probable — 1882; Vicuña Mackenna †1886) |
| `anuario-1887` | José de Moraleda; Anuario Hidrográfico de la Marina de Chile | 1887 | Esploraciones jeográficas de José de Moraleda | localizable | Dominio público (probable — 1887) |
| `abate-molina-sxviii` | Molina, Juan Ignacio (abate) | s. XVIII | [obra por precisar — probable *Saggio sulla storia naturale/civile del Chili*] | localizable | Dominio público (s. XVIII) |

### Académicas archivadas y verificables en el repositorio (8)

Estas ocho son las que sostienen las citas publicadas hoy. Todas están en
`fuentes/_raw/lecturas/` en PDF + TXT extraído.

| id | Autor | Año | Título | acceso | derechos |
|---|---|---|---|---|---|
| `cat-2019` | Catepillan Tessi, Tomás | 2019 | La República de la Raza. Política indígena y brujería en el Chile del siglo XIX | abierta | **Protegida** (acceso abierto ≠ libre uso) |
| `amp-2016` | Ampuero Díaz, Evelyn Lorena | 2016 | El imaginario de los brujos y la memoria colectiva de los chilotes en el poemario *Cauquil* de Sergio Mansilla | abierta | **Protegida** |
| `val-2014` | Valenzuela, Felipe A. | 2014 | La enfermedad de todos en el cuerpo propio: brujería y performatividad del Tribunal de la Raza Indígena en Chiloé | abierta | **Protegida** |
| `nun-2022` | Núñez, Daniela | 2022 | El sustrato indígena de los seres mitológicos de Chiloé | abierta | **Protegida** (Servicio Nacional del Patrimonio Cultural) |
| `her-2013` | Hernández, Joaquín | 2013 | Enfrentando saberes: los brujos de Chiloé y el discurso ilustrado (1849-1900) *[título por confirmar: portada sin capa de texto]* | abierta | **Protegida** |
| `leo-2016` | León, Marco Antonio | 2016 | Medicina y resistencias culturales en la provincia de Chiloé, 1826-1930 | abierta | **Protegida** |
| `rom-sf` | Romo Sánchez, Manuel | s.f. | Diccionario de la Brujería en Chiloé | abierta | [NO VERIFICADO] — sin año |
| `con-sf` | Contreras, Constantino | s.f. | Estudio lingüístico-folklórico de Chiloé: mitos y actividades laborales rudimentarias | abierta | [NO VERIFICADO] — sin año |

### Académicas por conseguir (12)

Están citadas por el corpus pero **no archivadas**: no cuentan como respaldo
pleno hasta conseguirse.

| id | Autor | Año | Título | acceso | derechos |
|---|---|---|---|---|---|
| `quintana-1972` | Quintana Mansilla, Bernardo | 1972 | Chiloé Mitológico | localizable | **Protegida** (probable) |
| `cavada-1914` | Cavada, Francisco J. | 1914 | Chiloé y los chilotes | localizable | Dominio público (probable — 1914; †1950, confirmar) |
| `garcia-barria-sf` | García Barría, Narciso | s.f. | Tesoro Mitológico del archipiélago de Chiloé *[título por confirmar]* | localizable | **Protegida** (probable) |
| `cardenas-1985` | Cárdenas, Renato | 1985 | Chiloé: manual del pensamiento mágico y la creencia popular | localizable | **Protegida** |
| `montecino-2015` | Montecino, Sonia | 2015 | Mitos de Chile: enciclopedia de seres, apariciones y encantos | de-pago | **Protegida** |
| `galleguillos-2018` | Galleguillos Muñoz, M. | 2018 | Los brujos de Chiloé: documentos de un proceso judicial | de-pago | **Protegida** |
| `marino-osorio-2014` | Marino, M., & Osorio, C. | 2014 | Juicio a los brujos de Chiloé | de-pago | **Protegida** |
| `vicuna-cifuentes-1915` | Vicuña Cifuentes, Julio | 1915 | Mitos y supersticiones recogidos de la tradición oral chilena (fascículo I: El Caleuche) | localizable | Dominio público (probable — 1915; †1936) |
| `rojas-flores-sf` | Rojas Flores, Gonzalo | s.f. | Reyes sobre la tierra | localizable | [NO VERIFICADO] — sin año |
| `negron-vera-sf` | Negrón Vera | s.f. | Mitos de Chanquín y Cucao | localizable | [NO VERIFICADO] — sin año |
| `molina-1950` | Molina *[por identificar]* | 1950 | *[por identificar — el corpus lo cita junto a Cárdenas 1998]* | localizable | [NO VERIFICADO] — autor sin identificar |
| `geomitologia-uchile` | Universidad de Chile | 2019-2020 | *[estudios de geomitología, por identificar]* | localizable | [NO VERIFICADO] — obra sin identificar |

### Prensa de época y documentos administrativos (7)

| id | Autor | Año | Título | acceso | derechos |
|---|---|---|---|---|---|
| `decreto-intendente-1880` | Intendencia de Chiloé (decretos 7-abr y 10-may-1880) | 1880 | Decretos del intendente sobre la persecución de brujos | localizable | Dominio público (documento oficial, 1880) |
| `gaceta-1881-primera` | Gaceta de los Tribunales (Santiago) | 1881 | Sentencia de primera instancia contra Mateo Coñuecar y otros por asociación ilícita | localizable | Dominio público (1881) |
| `gaceta-1882-absolucion` | Gaceta de los Tribunales (Santiago) | 1882 | Sentencia de segunda instancia — la absolución (Concepción, 24-may-1881) | localizable | Dominio público (1881-82) |
| `el-chilote-desmentido-1880` | El Chilote (Ancud) | 1880 | Desmentido oficial de los azotes | localizable | Dominio público (1880) |
| `prensa-contexto-cat` | Varios (El Chilote · El Mercurio de Valparaíso · Gaceta de los Tribunales) | desde 1851 | Piezas de contexto rastreadas por las notas de Catepillan y Hernández | localizable | Dominio público (s. XIX) |
| `el-liberal-azotes-1880` | El Liberal (Ancud), remitido sin firma | 1880 | Denuncia de tormentos (azotes) a los aprehendidos | **perdida** | Dominio público (1880) — pero el número no se conserva |
| `el-correo-1880` | «El Correo» (Ancud) | 1880 | *[pista: nota del 7-ago-1880]* | **perdida** | **no verificada** — nunca suma |

**Regla de rastreabilidad absoluta:** nada de prensa se cita sin respaldo en el
repositorio. `fuentes/_raw/prensa/REGISTRO-PRENSA.md` separa (A) lo descargado,
(B) lo localizable con cita completa y dónde consultarlo, y (C) discrepancias.
**No se piratea.**

### Terciarias, institucionales, geodatos e internas (9)

| id | Autor | Año | Título | acceso | derechos |
|---|---|---|---|---|---|
| `memoria-chilena` | Memoria Chilena, Biblioteca Nacional de Chile | — | Minisitio «Juicio a los brujos de Chiloé» y fichas asociadas | abierta | Institucional — condiciones de la BN |
| `fritz-roa-sf` | Fritz Roa, Sergio | s.f. | La Recta Provincia · La iniciación y los poderes del brujo chilote | localizable | [NO VERIFICADO] — sin año |
| `wikipedia-recta-provincia` | Wikipedia | — | Recta Provincia | abierta | CC BY-SA — **fuera del menú público** |
| `wikipedia-brujos` | Wikipedia | — | Brujos de Chiloé | abierta | CC BY-SA — **fuera del menú público** |
| `geo-dpa-chiloe` | DPA/SUBDERE vía caracena/chile-geojson | 2026 | Geometría de las 10 comunas de la provincia de Chiloé | abierta | Datos públicos del Estado |
| `geo-osm` | OpenStreetMap / Nominatim | 2026 | Coordenadas de los 8 lugares verificados del mapa | abierta | ODbL |
| `tradicion-chilota` | — | — | Atribuciones a tradición oral en el corpus | no-aplica | Patrimonio inmaterial — sin titular individual |
| `corpus` | El Grimorio del Archipiélago (curaduría) | 2026 | Corpus de datos estructurados + Grimorio literario DEFINITIVO | abierta | Obra propia del proyecto |
| `referencias-lote-2026` | Varios (lote `docs/propuestas/`) | 2026 | Referencias **NO promovidas** a fuente citable | no-aplica | Referencia interna |

### Reparto verificado

| Por estado | | Por tipo | |
|---|---|---|---|
| por-conseguir | **15** | académica | **20** |
| **archivada** | **12** | prensa | 7 |
| localizable | 9 | primaria | 4 |
| atribución oral | 1 | terciaria | 3 |
| perdida | 1 | geodatos | 2 |
| no-verificada | 1 | corpus interno · institucional · oral · referencia interna | 1 c/u |
| referencia | 1 | | |
| **Total** | **40** | **Total** | **40** |

---

## 3 · MATRIZ DE CITAS — QUÉ TIENE RESPALDO Y QUÉ NO

**Criterio del semáforo:** cuenta **solo** fuentes con estado `archivada`
(verificables abriendo el repositorio). ✅ = 2 o más · ⚠️ = 1 · ❌ = 0.
El asterisco (⚠️\*) marca temas que **subirían de nivel** al conseguir sus
fuentes pendientes. Las `perdida` y `no-verificada` se listan pero **nunca suman**.

**Totales: ✅ 17 · ⚠️ 3 · ❌ 0** — de 20 temas cruzados.

### Con respaldo pleno (17)

| Tema | Fuentes archivadas que lo sostienen |
|---|---|
| **brujo-chilote** | f-1908 · cat-2019 (pp. 84-103) · amp-2016 (pp. 61-91) · val-2014 (pp. 38-39) · nun-2022 (p. 24) · leo-2016 · con-sf |
| **juicio-1880** | f-1908 (todo el folleto) · cat-2019 (pp. 84, 92-99) · her-2013 (tesis dedicada) · leo-2016 |
| **macun** | f-1908 (B: piel · C: candil) · amp-2016 (p. 70) · her-2013 · rom-sf · con-sf |
| **la-mayoria** | f-1908 (D) · cat-2019 (p. 97 ss.) · val-2014 (p. 35) · her-2013 · rom-sf |
| **cueva-quicavi** | f-1908 (B) · amp-2016 (n. 7) · val-2014 · nun-2022 · con-sf |
| **challanco** | f-1908 (B/C, «chayanco») · cat-2019 (p. 99 n. 55) · rom-sf · con-sf |
| **machi-calcu** | val-2014 (pp. 38-39) · nun-2022 (pp. 4, 24) · rom-sf · leo-2016 |
| **invunche** | f-1908 (B, «Ibunche/Chibato») · amp-2016 · nun-2022 · rom-sf |
| **voladora** | amp-2016 (p. 79) · nun-2022 · con-sf (20 menciones) |
| **iniciacion** | f-1908 (B, el juramento) · amp-2016 (p. 76) · con-sf (baño ritual) |
| **gobernador** | cat-2019 (p. 92) · amp-2016 (p. 66) · her-2013 (pp. 1, 8, 12, 15) |
| **absolucion** | cat-2019 (p. 93 + n. 29) · her-2013 (p. 30 n. 50) |
| **cifras-del-proceso** | cat-2019 (p. 92, p. 93 n. 29) · amp-2016 (p. 66) |
| **decreto-intendente** | cat-2019 (notas 27-28) · her-2013 (n. 99, p. 50) |
| **origen-moraleda** | f-1908 (B) · val-2014 (Espech 1960: 127) |
| **recta-provincia** | amp-2016 (p. 65) · val-2014 (p. 35) · nun-2022 (p. 24) |
| **mapa-archipielago** | geo-dpa-chiloe · geo-osm (8 puntos) |

### Con respaldo parcial — una sola fuente archivada (3)

| Tema | Qué tiene | Qué le falta |
|---|---|---|
| **los-azotes** ⚠️\* | her-2013 (p. 20 n. 33) | `el-chilote-desmentido-1880` (transcrito en HER n. 33). El número de *El Liberal* con la denuncia original está **perdido** |
| **museo-ancud** ⚠️ | nun-2022 (piezas con número de inventario: Basilisco T79, Condená 1093, Brujo T84, Trauco 1474, Sirena 1092, Caballo marino 1094) | una segunda fuente independiente |
| **siete-republicas** ⚠️ | her-2013 (notas 185-186, el mapa en clave de 1880 = VARIANTE del corpus) | una segunda fuente independiente |

### Sin respaldo: ninguno

**❌ 0 temas.** Nada publicado carece por completo de fuente archivada.

### Prioridad de adquisición

Ordenada por peso real en el corpus (menciones `FUENTE::`):

| Fuente | Menciones en el corpus | Acceso |
|---|---|---|
| **Quintana 1972** — Chiloé Mitológico | **33** | localizable |
| **Cavada 1914** — Chiloé y los chilotes | **12** | localizable |
| **García Barría** — Tesoro Mitológico | **12** | localizable |
| Fritz Roa — La Recta Provincia | 7 | localizable |
| Anuario Hidrográfico 1887 — Moraleda | 2 | localizable |
| Negrón Vera — Mitos de Chanquín y Cucao | 2 | localizable |

Quintana y Cavada juntos son **45 de las 108 citas del corpus**. Conseguirlos es
la mayor mejora disponible al respaldo documental del proyecto.

---

## 4 · LAS HERRAMIENTAS

Las tres son **offline**, viven en `herramientas/` y **el sitio publicado no
depende de ellas**. No constituyen una cadena de compilación.

### `generar_matriz.py` — el motor de salidas

Lee `fuentes.yaml` y **emite** cuatro archivos. Jamás modifica el índice ni el
corpus.

| Emite | Qué es |
|---|---|
| `MATRIZ-CITAS.md` | El cruce tema × fuente con el semáforo, calculado |
| `BIBLIOGRAFIA.md` | Bibliografía formateada en APA aproximado con etiqueta de estado |
| `REPORTE-FUENTES.md` | Estadísticas, huecos y prioridad de adquisición |
| `assets/js/data/fuentes-datos.js` | **El menú público de Fuentes del sitio** |

Aplica el criterio del semáforo y decide qué entra al menú público (las cuatro
capas) y qué no (corpus interno, geodatos, terciarias, institucionales,
referencia interna, no verificadas). Enlaza al original solo si el acceso es
abierto.

### `validar_fuentes.py` — el guardián de coherencia

**Solo avisa. Jamás corrige.** Sale con código distinto de cero si hay errores.

Comprueba, entre índice, disco y corpus:

- ✗ ids duplicados o mal formados (que no sean kebab-case)
- ✗ vocabularios fuera de los controlados (`tipo` / `acceso` / `estado`)
- ✗ `archivo_local` que **no existe en el disco**
- ✗ estado `archivada` **sin ningún** `archivo_local`
- ✗ entrada de `respalda` sin tema o **sin página**
- ✗ `alias_corpus` que no corresponde a ninguna línea `FUENTE::` real
- ✗ **cobertura inversa**: línea `FUENTE::` del corpus **sin** entrada en el índice
- ⚠ url ausente en fuentes de acceso abierto o localizable
- ⚠ fuente archivada con PDF pero **sin TXT** de verificación

El chequeo de cobertura inversa es el más estricto: garantiza que **ninguna cita
del corpus quede huérfana** del índice.

### `verificar_prosa.py` — el guardarraíl verbatim

Comprueba que cada párrafo de `contenido/prosa/<id>.txt` exista **literalmente**
(módulo espacios y saltos de línea) en el Grimorio literario DEFINITIVO.

Normaliza el corte duro de línea a ~78 columnas, desarma los marcadores de forma
(comillas de cita, `— fuente`, `lado → lado`) y compara cada lado por separado.
Los lados de regla se comparan sin distinguir mayúsculas, porque el DEFINITIVO
tipografía los resultados en versales.

El bloque `@CIERRE` es curatorial por decisión aprobada y **no se verifica**: se
lista aparte para revisión humana.

**Complemento automático:** el generador de fichas embebe en cada `<id>.html` un
`window.FICHA.raw` **byte-idéntico** al bloque `@ENTIDAD` del corpus. La regla
sagrada queda automatizada: la ficha publicada y el registro estructurado **no
pueden divergir**.

---

## 5 · ESTADO ACTUAL DE LA VALIDACIÓN

Ejecutado el 2026-08-31 sobre el commit `dd27bc7`.

### `validar_fuentes.py` → **limpio**

```
Fuentes validadas: 40 | líneas FUENTE:: únicas del corpus: 32
Todo limpio: índice coherente con el disco y el corpus.
(código de salida 0)
```

Las 108 líneas `FUENTE::` del corpus se reducen a **32 fuentes únicas**, y las 32
tienen entrada en el índice. Cero huérfanas.

### `verificar_prosa.py` → **1 hallazgo real**

Sobre los 12 archivos de prosa curada:

| Bloque | OK | Falla | Curatorial |
|---|---|---|---|
| `@DESCRIPCION` | **31** | **1** | — |
| `@INTERPRETACION` | 6 | 0 | — |
| `@ORIGEN-MITO` | 1 | 0 | — |
| `@TESTIMONIO` | 0 | 15 | — |
| `@LECTURAS` | 0 | 23 | — |
| `@CIERRE` | — | — | 11 |

**Cómo leer esto, porque los números engañan:**

- Los **38 «fallos» de `@TESTIMONIO` y `@LECTURAS` son falsos positivos por
  diseño.** La herramienta solo compara contra el DEFINITIVO. `@TESTIMONIO` viene
  del dossier del proceso de 1880 y `@LECTURAS` de los papers archivados —
  ninguno de los dos está en el DEFINITIVO. **Es un hueco de la herramienta, no un
  error de contenido.** Vale la pena extenderla para que valide esos dos bloques
  contra `fuentes/proceso-ancud-1880.md` y contra los TXT de
  `fuentes/_raw/lecturas/`.
- Los **11 `@CIERRE`** están excluidos por decisión aprobada: son curatoriales.
- **El hallazgo real es uno solo.**

### El hallazgo que necesita decisión de Lucas

Un párrafo de `contenido/prosa/recta-provincia.txt`, en el bloque
`@DESCRIPCION`, **no aparece verbatim en ninguno de los tres corpus**. Comprobado
contra el DEFINITIVO, contra el corpus de datos estructurados y contra el dossier
del proceso de 1880: no está en ninguno.

> «Al frente estaba un Rey (a veces se habla de reyes y presidentes). Bajo él, un
> consejo gobernante: la Mayoría. Y un enjambre de cargos y funcionarios, con
> nombres que imitaban a los de un gobierno real: virreyes, escribanos, alcaldes,
> secretarios, reparadores, investigadores; y luego los brujos comunes, los
> curanderos, las machis, y los guardianes —los porteros de la cueva. El jefe
> supremo en Quicaví recibía también el nombre de "el Supremo" o "el Buta".»

Parece una **síntesis curatorial** de la jerarquía que sí está documentada en el
bloque D del folleto de 1908 y en `cat-2019` p. 97 ss. Si lo es, el arreglo no es
reescribirlo: es **etiquetarlo como interpretación curatorial**, no como
descripción, y darle su fuente. **Decisión de Lucas** — la prosa no se edita sin
su visto bueno.

---

## 6 · LO QUE ESTE SISTEMA PERMITE AFIRMAR

Todo verificable abriendo el repositorio:

1. **40 fuentes indexadas**, de las cuales **12 están archivadas** en el propio
   repositorio y son verificables sin salir de él.
2. **8 papers académicos** archivados en PDF + TXT extraído, con toda cita
   publicada cotejada contra su archivo y con página.
3. **Un dossier de fuente primaria**: el proceso de Ancud de 1880 transcrito
   verbatim con aparato crítico, sobre el folleto de Memoria Chilena
   (MC0033459).
4. **Cero temas sin respaldo.** 17 de 20 con respaldo pleno, 3 con respaldo
   parcial, ninguno en cero.
5. **Los huecos están declarados**, no escondidos: 15 fuentes por conseguir con
   su prioridad calculada por peso en el corpus.
6. **La fidelidad está automatizada**, no prometida: un verificador de prosa y un
   `raw` byte-idéntico embebido en cada ficha.
7. **La política de discrepancia está escrita y fechada** en la constitución del
   proyecto, no improvisada caso a caso.
8. **No se piratea.** Las fuentes de pago se declaran como pendientes; el sitio
   nunca aloja un PDF para descarga y solo enlaza lo de acceso abierto.

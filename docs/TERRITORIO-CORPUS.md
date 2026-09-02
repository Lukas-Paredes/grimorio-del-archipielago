# TERRITORIO EN EL CORPUS — insumo para la propuesta cartográfica

**El Grimorio del Archipiélago** · análisis de solo lectura · 1 de septiembre de 2026
Contado sobre el repositorio, commit `66b5297`. **Nada estimado, nada interpretado.**

---

## 0 · PARA QUIEN LO LEE

### Qué es El Grimorio del Archipiélago

Es un **archivo digital y recorrido cultural** del imaginario mitológico de Chiloé
y su entorno insular. Es un sitio web público y gratuito, ya en línea, que se
recorre de dos maneras sobre los mismos datos: como un **descenso** narrativo —de
la superficie del mar al lecho, capítulo a capítulo— y como un **archivo de
consulta** con fichas, un expediente documental sobre la brujería histórica, un
mapa y una sección pública de fuentes.

### Qué es el corpus

El **corpus** es la base documental del proyecto. Son dos archivos de texto plano:

- **El corpus estructurado** — 68 entidades de la tradición chilota (figuras,
  lugares, instituciones de la brujería, relatos), cada una en un bloque con
  campos declarados: nombre, alias, sección, reino, etimología, descripción,
  variantes, interpretación, relaciones con otras entidades, y sus fuentes.
- **El grimorio literario** — la misma materia en prosa, en diez Libros y cuarenta
  capítulos, más un glosario y una guía de lugares.

Todo lo que el sitio publica sale de ahí. **Este documento no analiza el sitio:
analiza el corpus.**

### La regla de no inventar nada

Es la regla constitutiva del proyecto y condiciona todo lo que sigue:

> Nada se inventa: ni relatos, ni fuentes, ni testimonios, ni citas, ni fechas, ni
> **territorios**. El texto se copia verbatim de su fuente. Cuando dos fuentes
> discrepan, **se muestran las dos con su atribución y no se zanja**.

En la práctica: si el corpus no ubica algo, **este documento dice que no lo
ubica**. No completa por inferencia, no deduce comunas por conocimiento general,
no rellena huecos. Un lugar sin fuente citable **queda fuera**, y ya hay cuatro
casos donde eso se aplicó.

Hay una herramienta que verifica que cada párrafo publicado exista literalmente en
el corpus, y cada ficha del sitio lleva incrustada una copia byte-idéntica de su
registro. La fidelidad está automatizada, no prometida.

### Qué compromete la postulación en el frente territorial

**Georreferenciar el corpus a partir de lo que declaran las fuentes**,
distinguiendo lo verificado de lo que la tradición menciona sin ubicación precisa.
Y un **muestreo del registro oral** con criterios de insularidad, accesibilidad y
distribución.

### Qué se te pide

**Una propuesta cartográfica que parta de estos datos.** No hay que salir a buscar
material: lo que el corpus dice está todo aquí abajo, contado. Lo que falta
también está marcado, y es tan importante como lo que hay.

Las preguntas concretas están en la sección 7.

---

## 1 · LUGARES QUE EL CORPUS NOMBRA

Búsqueda por **palabra completa** —sin tildes, sin distinguir mayúsculas— sobre
los dos archivos del corpus y los doce archivos de prosa curada.

> **Advertencia de método.** Una primera pasada por subcadena dio cifras infladas:
> «Rauco» aparecía 61 veces porque es subcadena de «Trauco», y «Colo» 54 porque lo
> es de «color» y «Colofón». Las cifras de abajo son con límite de palabra. Si
> repites el conteo, usa límites o llegarás a los números equivocados.

| Lugar | Corpus | Grimorio | Prosa | **Total** | Precisión |
|---|---:|---:|---:|---:|---|
| **Chiloé** | 128 | 121 | 15 | **264** | el archipiélago entero, no un punto |
| **Cucao** | 42 | 33 | 0 | **75** | localidad, comuna declarada |
| **Quicaví** | 26 | 17 | 7 | **50** | localidad, comuna declarada |
| **Ancud** | 12 | 12 | 14 | **38** | ciudad |
| **Punta Pirulil** | 9 | 7 | 0 | **16** | punta, «al sur de Cucao» |
| **Tenaún** | 9 | 3 | 1 | **13** | localidad, «costa este» |
| **Achao** | 7 | 4 | 0 | **11** | localidad, isla declarada |
| **Quemchi** | 5 | 4 | 1 | **10** | comuna |
| **Chaitén** | 5 | 5 | 0 | **10** | testimonio recogido allí |
| **Isla Caylín** | 1 | 5 | 2 | **8** | isla, «la última habitada» |
| **Chana** | 4 | 3 | 0 | **7** | testimonio recogido allí |
| **Islita Imelev** | 6 | 1 | 0 | **7** | isla que aparece y desaparece |
| **Laguna Huelde** | 3 | 3 | 0 | **6** | laguna, «cerca de Cucao» |
| **Isla Laitec** | 2 | 2 | 0 | **4** | isla, «al sur de Quellón» |
| **Quinchao** | 2 | 2 | 0 | **4** | isla y comuna |
| **Dalcahue** | 1 | 2 | 0 | **3** | distrito de la Recta Provincia |
| **Queilén** | 1 | 2 | 0 | **3** | distrito |
| **Caucahué** | 1 | 2 | 0 | **3** | isla, distrito |
| **Rauco** | 1 | 2 | 0 | **3** | distrito |
| **Chonchi** | 1 | 2 | 0 | **3** | comuna |
| **Quellón** | 1 | 2 | 0 | **3** | comuna, referencia de Laitec |
| **Laguna Huillinco** | 0 | 3 | 0 | **3** | laguna, morada del Piuchén |
| **Payos** | 0 | 1 | 0 | **1** | variante del mapa en clave |
| **Chacao** | 0 | 1 | 0 | **1** | variante del mapa en clave |
| **Lemuy** | 0 | 1 | 0 | **1** | isla |

**25 lugares con al menos una mención.** Descontando «Chiloé», que es el
archipiélago entero: **24 lugares nombrados**.

### Candidatos con CERO menciones

Se buscaron y **no aparecen ni una vez** en el corpus:

**Castro · Calbuco · Maullín · Colo · Tocoihue · Nalhuitad · Abtao · Aucar ·
Quehui · Matao · Chahuén · Chelín · Quetalco · Chauques · Compu · Puqueldón**

Esto es dato, no ausencia de dato. Ver secciones 5 y 6.

---

## 2 · ASOCIACIÓN ENTIDAD → LUGAR

Para cada una de las **68 entidades**, si su bloque en el corpus nombra algún
lugar. **28 lo hacen. 40 no.**

### Las 28 con vínculo territorial

| # | Entidad | Sección | Lugares | Cita del corpus |
|---|---|---|---|---|
| 1 | El Millalobo | corte del mar | Cucao | `VARIANTE:: El reflejo en Cucao` — nadie se atreve a mirar su reflejo en el agua |
| 2 | La Huenchur | corte del mar | Cucao | `RESUMEN::` su relato trágico explica el nombre del lago |
| 3 | La Pincoya | corte del mar | Cucao, Huelde | `VARIANTE:: La laguna Huelde` — «otra versión la hace nacer en la laguna Huelde, cerca de Cucao» |
| 4 | La Sirena chilota | corte del mar | Laitec, Quellón | `RESUMEN::` «Habita la isla Laitec, al sur de Quellón» |
| 5 | Tempilcahue | barcos y almas | Cucao, Pirulil | `RESUMEN::` «cruza a las almas al otro mundo desde Punta Pirulil, en Cucao» |
| 6 | Las Ánimas de Cucao | barcos y almas | Cucao, Pirulil | `ALIAS:: Las almas en pena de Pirulil` |
| 7 | El Caballo Marino | bestias | Chana, Chaitén | `FUENTE:: Núñez (2022), testimonios de Chana y Chaitén` |
| 8 | La Vaca Marina | bestias | Chaitén | `VARIANTE:: El testimonio de Chaitén` |
| 9 | La Curamilla | menores | Cucao | `RESUMEN::` «piedra mágica de oro macizo cerca de Cucao» |
| 10 | La Llorona / Pucullén | penas | Cucao | vía `RELACIONES::` con las Ánimas de Cucao |
| 11 | La Condená | penas | Ancud | `VARIANTE:: En la cultura material` — tallada en el Museo Regional de Ancud |
| 12 | La Recta Provincia | Recta Provincia | Quicaví | vía `RELACIONES::` con la cueva |
| 13 | La Mayoría | Recta Provincia | Quicaví, Ancud | `DESCRIPCION::` la cúpula; `FUENTE:: crónicas del Proceso de Ancud` |
| 14 | Las siete repúblicas | Recta Provincia | **7 distritos** | `DESCRIPCION::` — ver abajo |
| 15 | La iniciación | Recta Provincia | Quicaví, Ancud | `FUENTE:: Documentos del Proceso de Ancud (1880)` |
| 16 | El Challanco | Recta Provincia | Ancud | `FUENTE:: Mateo Coñuecar (declaración, Proceso de Ancud 1880)` |
| 17 | El Invunche | Recta Provincia | Quicaví | `RESUMEN::` «guarda la entrada de la Cueva de Quicaví» |
| 18 | La Cueva de Quicaví | Recta Provincia | Quicaví, Quemchi | `GANCHO::` «una cueva oculta en la costa de Quemchi» |
| 19 | El Libro de Moraleda | Recta Provincia | Tenaún | `DESCRIPCION::` «hacia 1786, en Tenaún, la bruja Chilpilla se enfrentó a Moraleda» |
| 20 | El juicio de Ancud de 1880 | Recta Provincia | Ancud | `NOMBRE::` |
| 21 | El Muelle de las Almas | lugares | Cucao, Pirulil | `RESUMEN::` «el acantilado de Punta Pirulil, al sur de Cucao» |
| 22 | Cucao | lugares | Cucao, Huelde, Chonchi | `DESCRIPCION::` «costa occidental de Chiloé (comuna de Chonchi)… visitado por Charles Darwin en 1835» |
| 23 | Quicaví | lugares | Quicaví, Quemchi | `RESUMEN::` «Localidad de la comuna de Quemchi» |
| 24 | Tenaún | lugares | Tenaún | `RESUMEN::` «Localidad de la costa este» |
| 25 | Achao | lugares | Achao, Quinchao | `RESUMEN::` «Localidad de la isla Quinchao, con la iglesia más antigua del archipiélago» |
| 26 | La Campana Sumergida | relatos | Imelev | vía `RELACIONES::` con la islita |
| 27 | La islita Imelev | relatos | Imelev | `ID::` |
| 28 | Las animitas | relatos | Cucao | `INTERPRETACION::` «las Ánimas de Cucao, la Pucullén» |

**Las siete repúblicas, verbatim del corpus:**

> «Para operar en secreto, la Recta Provincia dividió el archipiélago en siete
> Distritos o Repúblicas, cada uno con un nombre en clave tomado de lugares de
> España y sus colonias, para esconder los lugares reales de Chiloé. Cada distrito
> tenía su presidente y respondía al Rey. Las equivalencias eran: **Buenos Aires =
> Achao; España = Queilén; Lima = Quicaví (la sede del Rey); Perú = Caucahué;
> Salamanca = Rauco; Santiago = Tenaún; Villarrica = Dalcahue.**»

### Las 40 sin vínculo territorial

**Esto también es dato.** Que una entidad no tenga lugar en el corpus no significa
que la tradición no se lo dé: significa que **las fuentes recopiladas no lo
registran**. Es exactamente donde el registro oral puede aportar.

| Sección | Entidades sin lugar |
|---|---|
| Origen (1 de 1) | Tenten Vilu y Caicai Vilu |
| Corte del mar (2 de 6) | La Huenchula, El Pincoy |
| Barcos y almas (1 de 3) | **El Caleuche** |
| Bosque (4 de 4) | El Trauco, La Fiura, El Ruende, El Trehuaco |
| Bestias (9 de 12) | El Camahueto, El Cuchivilu, El Cuero, El Ñirivilu, La Cochodoma, Los Sumpall, La Lucerna, El Basilisco, El Piuchén, El Cahuelche |
| Menores (8 de 9) | El Coñipoñi, La Coñieuma, El Vilpoñi, La Piruquina, El Deñ, El Lluhay, El Puyo, El Carbunco |
| Aves brujas (4 de 4) | El Coo, El Raiquén, El Mandao, El Chonchón |
| Penas (2 de 4) | La Viuda, El Caballero de Lata |
| Recta Provincia (6 de 15) | El Brujo chilote, La Machi, El Calcu, El Macuñ, Los poderes del brujo, La Voladora |
| Relatos (2 de 5) | Los Entierros, Cómo nació la papa |

> **El caso que más llama la atención: el Caleuche.** Es el Capítulo I del
> recorrido y una de las figuras centrales de la obra, y **el corpus no le da
> ninguna ubicación**. Su bloque dice «los mares del sur», «el canal», «la
> niebla» — ningún topónimo. **Es un mito de tránsito sin ruta declarada.** Ver
> sección 4.

**El reino del bosque completo —Trauco, Fiura, Ruende, Trehuaco— y las cuatro aves
brujas no tienen un solo lugar asociado.**

---

## 3 · PUNTOS GEORREFERENCIABLES

### 3.1 · Los ocho ya mapeados

Ya existe un mapa en el sitio: silueta real de las comunas de la provincia
(geometría del Directorio de Áreas Protegidas / SUBDERE vía el repositorio público
`caracena/chile-geojson`) con ocho puntos, cuyas coordenadas provienen de
**OpenStreetMap**.

| # | Punto | Clave de la cofradía | Qué es, según el corpus |
|---|---|---|---|
| 1 | **Quicaví** | «Lima» | Capital de la Recta Provincia y sede del Rey; en su costa, la cueva guardada por el Invunche |
| 2 | **Tenaún** | «Santiago» | Origen legendario: hacia 1786 la Chilpilla dejó en seco el barco de Moraleda |
| 3 | **Achao** | «Buenos Aires» | Distrito, en la isla Quinchao; cuna de Bernardo Quintana |
| 4 | **Queilén** | «España» | Distrito |
| 5 | **Isla Caucahué** | «Perú» | Distrito insular |
| 6 | **Rauco** | «Salamanca» | Distrito |
| 7 | **Dalcahue** | «Villarrica» | Distrito |
| 8 | **Ancud** | — | Sede del proceso de 1880; su Museo Regional conserva las figuras míticas |

**Los siete primeros son la misma fuente**: la lista de distritos de las siete
repúblicas. El mapa actual **cartografía una sola institución** —la Recta
Provincia— más Ancud como contrapunto estatal.

### 3.2 · Nombrados con precisión, aún sin mapear

Ordenados por peso en el corpus. **Estos son el crecimiento natural del mapa.**

| Lugar | Menciones | Qué dice el corpus | Qué falta para tener coordenada |
|---|---:|---|---|
| **Cucao** | 75 | «Localidad y lago de la costa oeste, comuna de Chonchi». **El lugar más mencionado del corpus después de Chiloé** | Nada de fuente: es una localidad identificable. Falta decidir si el punto es el poblado, el lago o ambos |
| **Punta Pirulil** | 16 | «El acantilado al sur de Cucao donde las almas esperan a Tempilcahue». Hoy hay una pasarela escultórica | Nada de fuente. Coordenada de la punta o del Muelle de las Almas |
| **Isla Caylín** | 8 | «La última isla habitada de Chiloé». De allí es Rosa Chiguay, cuyo testimonio cita la obra | Nada de fuente |
| **Chaitén** | 10 | Lugar de testimonios recogidos por Núñez (2022) | Está **fuera del archipiélago**, en el continente. Decidir si entra al mapa |
| **Chana** | 7 | Lugar de testimonios recogidos por Núñez (2022) | Confirmar de qué Chana se trata |
| **Laguna Huelde** | 6 | «Cerca de Cucao». Cuna de una versión de la Pincoya | Nada de fuente |
| **Isla Laitec** | 4 | «Al sur de Quellón». Morada de la Sirena chilota | Nada de fuente |
| **Laguna Huillinco** | 3 | Morada del Piuchén «según la tradición» | Nada de fuente |
| **Islita Imelev** | 7 | Isla que **aparece y desaparece** | **Puede no tener coordenada.** Ver la pregunta 7.3 |
| **Payos**, **Chacao** | 1 c/u | Aparecen en la **variante** del mapa en clave de 1880 | Decidir si la capa variante se mapea |

### 3.3 · Los cuatro descartados, y por qué

La investigación territorial del proyecto marcó cada lugar como verificado o
solo-web. **Estos cuatro circulan en internet y en material turístico, pero no
aparecen en ninguna fuente del repositorio**, así que no se mapearon.

| Descartado | Motivo textual |
|---|---|
| **Cascada de Tocoihue** | Cero apariciones en corpus, grimorio, prosa, dossier y lecturas. El **ritual** de la cascada sí está verificado —el término *traiguén*, «cascada usada en la iniciación del brujo»—; **los nombres no** |
| **Cascada de Nalhuitad** | Igual que la anterior |
| **Cueva de Colo** | Cero apariciones de «Colo» como cueva en todas las fuentes del repositorio |
| **Playa de Quicaví / brujo Zapata** | «Zapata» no aparece en ninguna fuente del repositorio. El punto Quicaví ya está cubierto por otras fuentes propias |

Los candidatos naturales para verificarlos son **Quintana (1972)** y **Cavada
(1914)**, dos obras que el corpus cita 33 y 12 veces respectivamente y que **aún
no están archivadas** en el repositorio.

> **Esto no es una limitación del análisis: es el método.** El proyecto deja fuera
> lo que no puede sostener, y ese descarte es parte de su argumento.

---

## 4 · RED DE CONEXIONES

El corpus declara vínculos explícitos entre entidades en el campo `RELACIONES::`.

| Dato | Cifra |
|---|---:|
| Aristas declaradas | **198** |
| Conexiones únicas, sin dirección | **123** |
| Conexiones entre **dos** entidades con vínculo territorial | **47** |

### El grupo del paso de las almas — el más denso

Todo converge en **Cucao / Punta Pirulil**, y es la agrupación territorial más
clara del corpus:

```
Cucao ─┬─ Tempilcahue ─── Muelle de las Almas (Punta Pirulil)
       ├─ Ánimas de Cucao ─┬─ La Llorona / Pucullén ─── La Condená
       │                   └─ Las animitas
       ├─ La Pincoya ──── La Sirena chilota
       ├─ La Huenchur ─── El Millalobo
       └─ La Curamilla
```

Siete entidades convergen en Cucao. **La costa oeste concentra el paso de las
almas y la corte del mar.**

### El grupo de la Recta Provincia — el más jerárquico

```
Quicaví ─── Cueva de Quicaví ─┬─ El Invunche
                              ├─ La iniciación
                              └─ La Mayoría ─── El Challanco
La Recta Provincia ─┬─ Las siete repúblicas ─── Achao · Tenaún · Dalcahue
                    │                            Queilén · Caucahué · Rauco
                    ├─ El juicio de Ancud de 1880
                    └─ El Libro de Moraleda ─── Tenaún
```

**La costa este concentra la institución secreta.** Es la única red del corpus con
una **estructura territorial declarada**: siete distritos con nombre en clave.

### Los nodos más conectados

| Entidad | Conexiones | ¿Territorial? |
|---|---:|---|
| El Brujo chilote | 14 | **no** |
| La Recta Provincia | 13 | sí |
| La Pincoya | 8 | sí |
| El Millalobo | 7 | sí |
| Cucao | 7 | sí |
| **El Caleuche** | **7** | **no** |
| La Mayoría | 7 | sí |
| Las siete repúblicas | 7 | sí |

### El tránsito del Caleuche: no existe como ruta

La consigna pedía los tránsitos del Caleuche. **El corpus no se los da.**

El Caleuche es la sexta entidad más conectada del corpus —siete vínculos: Pincoya,
Pincoy, Sirena, Tempilcahue, Recta Provincia, Caballo Marino— pero **ninguna de
esas conexiones es geográfica**. Su bloque habla de «los mares del sur», «el
canal», «la niebla», y su interpretación lo llama «mito de tránsito, junto a
Tempilcahue». Nunca nombra un lugar.

**Es una red social, no una ruta.** Si la cartografía quiere representar el
tránsito del Caleuche, tendrá que hacerlo **sin apoyo del corpus** — y eso, bajo
la regla del proyecto, exige o una fuente nueva o una etiqueta explícita de
interpretación curatorial.

Lo mismo, más marcado, con el reino del bosque: **el Trauco, la Fiura, el Ruende y
el Trehuaco no tienen ni lugar ni conexión territorial.**

---

## 5 · COBERTURA POR COMUNA

> **Advertencia sobre las cifras.** Las que siguen son **solo del corpus**. Un
> documento anterior del proyecto —el README del dossier de postulación— publicó
> conteos ligeramente distintos porque su búsqueda incluyó además la investigación
> territorial y los datos generados del mapa. Ver la sección 8.

### Comuna declarada explícitamente en el corpus

**Solo dos.** El corpus escribe la fórmula «comuna de X» en cuatro pasajes:

| Localidad | Comuna | Cita |
|---|---|---|
| **Quicaví** | **Quemchi** | «Localidad de la comuna de Quemchi, sede de la Recta Provincia»; «Alrededores de Quicaví, comuna de Quemchi (costa este de la Isla Grande)» |
| **Cucao** | **Chonchi** | «Sector poblado de la costa occidental de Chiloé (comuna de Chonchi)» |

**Achao** declara isla, no comuna: «Localidad de la isla Quinchao».
**Tenaún** declara solo orientación: «Localidad de la costa este».
**El resto de las comunas no se declara en ninguna parte del corpus.**

### Densidad de menciones

| Comuna | Menciones en el corpus | Qué la ancla |
|---|---:|---|
| **Chonchi** | 75 vía Cucao (+3 propias) | Cucao, Punta Pirulil, laguna Huelde, el Muelle de las Almas, el paso de las almas |
| **Quemchi** | 50 vía Quicaví (+10 propias) | Quicaví, la cueva, Tenaún y Caucahué en su entorno |
| **Ancud** | 38 | El proceso de 1880 y el Museo Regional |
| **Quinchao** | 11 vía Achao (+4 propias) | Achao, distrito «Buenos Aires» |
| **Dalcahue** | 3 | Distrito «Villarrica» |
| **Queilén** | 3 | Distrito «España» |
| **Quellón** | 3 | Isla Laitec «al sur de Quellón»; isla Caylín |
| **Castro** | **0** | — |
| **Calbuco** | **0** | — |
| **Maullín** | **0** | — |
| Curaco de Vélez, Puqueldón | **0** | — |

### Las cinco comunas de ejecución de la postulación

| Comuna | En el corpus | Criterio declarado por la postulación |
|---|---:|---|
| **Ancud** | 38 | Presencia en el corpus |
| **Quemchi** | 50+10 | Presencia en el corpus |
| **Quellón** | 3 | Presencia en el corpus + equidad territorial |
| **Castro** | **0** | **Circulación** — nudo del mar interior |
| **Calbuco** | **0** | **Pertenencia cultural y registro pendiente** |

**Las dos comunas con más peso en el corpus —Chonchi con 75 menciones y Quinchao
con 11— no están entre las cinco de ejecución.** Es una observación, no una
objeción: la postulación las excluye por alcance, no por falta de respaldo.

---

## 6 · VACÍOS

El territorio que el proyecto declara documentar es **Chiloé, Calbuco y Maullín**.

### Vacío total: el continente insular

| Zona | Menciones | Consecuencia |
|---|---:|---|
| **Calbuco** | **0** | Base territorial del proyecto y residencia del responsable. **El corpus bibliográfico no dice absolutamente nada de ella** |
| **Maullín** | **0** | Territorio declarado. Cero presencia |

**Este es el vacío más importante del análisis**, y es exactamente el argumento
del registro oral: las recopilaciones clásicas de la mitología chilota se
concentraron en la **Isla Grande**, y dejaron fuera el continente insular. Lo que
falta en el corpus no es prueba de que allí no haya tradición: es prueba de que
**nadie la recopiló**.

### Vacío en la isla: el sur y el centro

| Zona | Situación |
|---|---|
| **Castro y el centro** | Cero menciones. La comuna más poblada del archipiélago no aparece en el corpus |
| **Quellón y el sur** | 3 menciones, todas indirectas: Laitec «al sur de Quellón» y la isla Caylín |
| **Lemuy, Puqueldón, Curaco de Vélez** | Lemuy 1 mención; las otras dos, cero |
| **Costa oeste al norte de Cucao** | Sin menciones |

### Vacío temático, no geográfico

**40 de las 68 entidades no tienen lugar.** Entre ellas, bloques enteros:

- **El reino del bosque completo** — Trauco, Fiura, Ruende, Trehuaco. El Trauco es
  probablemente la figura más conocida de la mitología chilota fuera de Chile y
  **el corpus no lo ubica en ninguna parte.**
- **Las cuatro aves brujas** — Coo, Raiquén, Mandao, Chonchón.
- **Ocho de las nueve criaturas menores.**
- **El Caleuche**, Capítulo I del recorrido.

> **Para el muestreo del registro oral, estos dos vacíos apuntan en direcciones
> distintas:** el geográfico dice **dónde ir** (Calbuco, Maullín, el sur, el
> centro); el temático dice **qué preguntar** (dónde vive el Trauco, por dónde
> pasa el Caleuche).

---

## 7 · PREGUNTAS PARA EL GEÓGRAFO

### 7.1 · Qué representa un punto

El corpus tiene lugares de naturalezas distintas y hoy el mapa los trata igual.
¿Se distinguen?

- **Localidades** — Quicaví, Achao, Tenaún, Dalcahue, Cucao.
- **Accidentes geográficos** — Punta Pirulil, laguna Huelde, laguna Huillinco.
- **Islas** — Laitec, Caylín, Caucahué, Lemuy, Quinchao.
- **Un sitio arqueológico-mítico** — la cueva de Quicaví, cuya ubicación exacta la
  academia registra como **«presumiblemente»** en Quicaví. Ese matiz debe viajar
  con el punto.
- **Una comuna entera** — Quemchi, Chonchi.

### 7.2 · Cómo se representa la incertidumbre

Es la pregunta central del proyecto, porque su regla es no zanjar.

El mapa en clave de las siete repúblicas **tiene dos versiones que no coinciden**.
El corpus da una; las declaraciones del proceso de 1880 dan otra, **en parte
distinta y más larga**: allí «Salamanca» es Tenaún y no Rauco, «España» es Payos y
no Queilén, y aparecen distritos que la primera no menciona.

**El mapa en clave era inestable entre declarantes, y esa inestabilidad es el
relato.** ¿Cómo se cartografía un lugar que dos fuentes ubican distinto, sin que
la cartografía elija por nosotros?

### 7.3 · Qué se hace con lo que no tiene coordenada

- La **islita Imelev** aparece y desaparece. ¿Se mapea? ¿Con qué símbolo?
- La **cueva de Quicaví** tiene ubicación «presumible».
- El **Caleuche** navega sin ruta declarada.
- Las **cuarenta entidades sin lugar** — ¿tienen alguna representación cartográfica
  o simplemente no están en el mapa?

### 7.4 · Formatos de salida

**Restricción dura del proyecto:** el sitio es **estático puro**. HTML, CSS y
JavaScript clásico. **Sin frameworks, sin npm, sin CDN, sin cadena de
compilación.** Nada de Leaflet, Mapbox ni ArcGIS embebido. Es una decisión
declarada en la postulación, no una preferencia.

Lo que ya funciona y se puede seguir usando:

- **GeoJSON** — ya se usa. La silueta de las comunas viene de un GeoJSON público
  que una herramienta Python offline convierte a trazados SVG.
- **SVG generado en tiempo de construcción** — el mapa actual es SVG inline con
  las coordenadas ya proyectadas. Cero costo en el navegador.
- **Herramientas Python offline** están permitidas: pueden hacer cualquier
  procesamiento pesado antes de publicar. **Lo que no puede es correr en el sitio.**

**Preguntas concretas:**
- ¿GeoJSON como formato de intercambio te sirve para entregar tu trabajo?
- ¿Qué proyección propones? La actual es una proyección simple a `viewBox` SVG.
- ¿Necesitas capas separadas —base, puntos, variantes, rutas— o una sola?
- ¿Qué software vas a usar y qué exporta?

### 7.5 · Qué necesitas de nosotros que no está aquí

Sabemos que faltan al menos estas cosas, y queremos saber qué más:

- **Coordenadas** de los lugares de la sección 3.2. No las tenemos.
- **Criterios de muestreo del registro oral** — la postulación compromete
  insularidad, accesibilidad y distribución, pero no están operacionalizados.
- **Quintana (1972) y Cavada (1914)** — 45 de las 108 citas del corpus, **no
  archivadas**. Podrían resolver los cuatro puntos descartados.
- **El límite del territorio en el mapa.** Chaitén está en el continente y aparece
  en el corpus por un testimonio. ¿El mapa llega hasta ahí?

---

## 8 · UNA DISCREPANCIA QUE HAY QUE CORREGIR

**El README del dossier de postulación atribuye a Castro una mención que el corpus
no tiene.**

Dice: *«Castro · 1 mención · Referencia de ubicación de Rauco en el mapa en clave
de la Recta Provincia»*.

Esa frase existe, pero **no está en el corpus ni en ninguna fuente**: está en
`assets/js/data/mapa-datos.js`, un archivo **generado por el propio proyecto** para
describir el punto Rauco. Es redacción curatorial nuestra, no una fuente.

**Contado solo sobre el corpus, Castro tiene cero menciones, igual que Calbuco.**

**Qué cambia y qué no.** No cambia la justificación: Castro está en la postulación
por **circulación**, no por presencia en el corpus, y ese criterio se sostiene
igual. Lo que cambia es que la tabla del README, tal como está, **sugiere un
anclaje documental que no existe**.

Las otras cifras del README tienen la misma diferencia de alcance, sin
consecuencia: Ancud 40 contra 38, Quemchi 16 contra 10 — la diferencia está en la
investigación territorial y el mapa, que son documentos del proyecto, no fuentes.

**Recomendación:** ajustar esa fila a cero y dejar la justificación de Castro
apoyada solo en el criterio de circulación, que es sólido por sí mismo. **No lo
modifiqué**: este documento es de solo lectura y la decisión es de Lucas.

---

## RESUMEN

| Dato | Cifra |
|---|---:|
| **Lugares que el corpus nombra** | **24** (25 contando «Chiloé») |
| **Entidades con vínculo territorial** | **28 de 68** |
| **Entidades sin vínculo territorial** | **40 de 68** |
| **Puntos ya georreferenciados** | **8** |
| **Nombrados con precisión, sin mapear** | **10** |
| **Descartados por falta de fuente** | **4** |
| Conexiones únicas entre entidades | 123 |
| Conexiones entre entidades territoriales | 47 |
| Comunas con comuna declarada en el corpus | **2** — Quemchi y Chonchi |
| Comunas del territorio declarado con cero menciones | **Calbuco, Maullín, Castro** |

---

*Documento de solo lectura. No modifica el corpus, el sitio ni ningún dato.
Método: coincidencia por palabra completa sobre los dos archivos del corpus y los
doce de prosa curada. Cada cifra es reproducible sobre el commit `66b5297`.*

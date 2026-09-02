# HISTORIAL — el recorrido del proyecto

**El Grimorio del Archipiélago** · hitos, no commits.

Este documento cuenta **cómo llegó el proyecto hasta aquí**: qué cambió en cada
hito y qué decisión lo motivó. Se escribe una vez y casi no cambia.

> **Qué NO es.** No es el historial completo — ese es **git**, con sus 91 commits
> fechados y firmados, y no se duplica aquí porque se desincronizaría. No es el
> changelog: [`../CHANGELOG.md`](../CHANGELOG.md) lleva el detalle cronológico de
> junio y julio de 2026 y se consulta ahí. No es el registro de decisiones: esas
> viven fechadas en [`../CLAUDE.md`](../CLAUDE.md) y
> [`ARQUITECTURA.md`](ARQUITECTURA.md).
>
> **De dónde sale.** Del historial de git y de los documentos de `docs/`. Lo que
> no se pudo fechar con evidencia va marcado **[aproximado]** o
> **[sin fecha documentada]**.

**Cuándo se actualiza:** solo en **hitos mayores**. Un capítulo nuevo no es un
hito; un sistema nuevo sí.

---

## Resumen

| | |
|---|---|
| Primer commit | **24 de junio de 2026** |
| Último commit al escribir esto | **1 de septiembre de 2026** |
| Commits totales | **91** |
| Postulaciones | 2 — Puente Chacao 2026, Fondart Regional 2027 |

---

## 2026-06-24 · El origen: dos arquitecturas en una semana

Nace el repositorio con la base **V7**, un HTML monolítico, y de inmediato se
reescribe como **arquitectura modular V8**: bestiario abierto, siete mundos
curatoriales, fichas con URL propia, expediente de Recta Provincia, cosmología y
metodología.

**La decisión que lo motivó:** presentar el proyecto como **plataforma pública de
consulta patrimonial**, no como recorrido cerrado. La V7 se archiva en `legacy/`
en vez de borrarse.

Ese sistema es el que hoy llamamos **legado** y que sigue en pie —
`index-legacy.html` + `pages/` — porque el recorrido nuevo lo usa como puerta del
archivo de consulta. El porqué está en [`ARQUITECTURA.md`](ARQUITECTURA.md) §7.

## 2026-06-28 · El corpus

Entra la pieza fundacional: la **base de datos de mitología con 68 entidades** en
bloques `@ENTIDAD…@FIN`, y el **grimorio literario DEFINITIVO** con sus diez
Libros y cuarenta capítulos.

**La decisión que lo motivó:** separar **el dato de la prosa**. El corpus
estructurado es lo que el sistema lee; el grimorio literario es de dónde sale
verbatim el texto que se publica. Esa separación es la que hace posible todo lo
que viene después.

## 2026-06-29 al 07-02 · El motor y el paso a un sistema gobernado por datos

Aparece la **plantilla parametrizada de fichas** (`ficha.js` + `ficha.css`), la
**portada-descenso**, las **herramientas offline** —normalizador de imágenes y
generador de fichas— y el **descenso por capítulos gobernado por datos**.

**La decisión que lo motivó, y que rige hasta hoy:** *agregar contenido no debe
exigir tocar código*. Desde aquí, publicar una entidad es agregar un objeto a los
datos y regenerar. El motor no se edita por criatura.

De ese principio se desprende, cuatro meses después, el de los **puntos de entrada
del equipo** ([`ARQUITECTURA.md`](ARQUITECTURA.md) §6): si incorporar un capítulo
es curaduría y no desarrollo, incorporar el trabajo de un profesional también
debe serlo.

## 2026-07-05 · El criterio perceptual, aprendido a la mala

Una auditoría encuentra que los fondos servidos estaban **sobrecomprimidos con
posterización visible**, y que los heroes ancla se habían degradado al cuantizar a
96 colores: el Caleuche **perdía todas las luces del buque —de 2.003 píxeles
cálidos a 0—** y el Trauco bajaba de 3.718 a 1.542.

Se restauran desde los crudos de `_raw/`, que por regla nunca se borran.

**La decisión que lo motivó:** **el criterio de aceptación es visual a pantalla
completa, no el peso**. Quedó codificada en el propio normalizador — los fondos a
pantalla completa no pasan por reducción de grilla ni cuantización — y es hoy una
de las reglas cerradas del sistema visual.

## 2026-07-05 · El camino del mito

El recorrido pasa a **páginas separadas**: inicio con umbral, un capítulo por
página, `lecho.html` como cierre, carta de capítulos con las 68 entidades —
publicadas enlazadas, selladas sin enlaces muertos— y transiciones de bruma.

Se monta la **accesibilidad amplia** que sigue vigente: cuerpo ≥ 17 px, etiquetas
legibles en vez de solo iconos, contraste AA, objetivos táctiles ≥ 44 px, botonera
primera en el orden del tabulador.

Y se arregla un fallo real: al volver con «atrás», el **bfcache** restauraba la
página con el velo de bruma activo y **mataba todos los clics**. El fix vive en
`camino.js` y está documentado para que nadie lo reintroduzca.

## 2026-07-05 · El verificador de prosa

Entra `verificar_prosa.py`: comprueba que **cada párrafo publicado exista
literalmente** en el grimorio literario. En paralelo, el generador empieza a
embeber en cada ficha una copia **byte-idéntica** del bloque `@ENTIDAD`.

**La decisión que lo motivó:** que la regla sagrada dejara de depender de la
disciplina de quien escribe. **La fidelidad pasa de prometida a automatizada**, y
se convierte en el argumento de innovación más fuerte del proyecto.

## 2026-07-05 al 07-09 · Sonido

Atmósfera **procedural** con Web Audio y cero archivos, una receta por reino, con
low-pass ligado a la profundidad del scroll. Después, mezcla por capítulo. Por
último, seis pistas normalizadas a −18 LUFS con loop sin costura.

**Las decisiones que lo motivaron:** apagado por defecto y jamás autoplay; y el
**Caleuche intermitente** —aparece y se va, con low-pass de distancia y eco— por
fidelidad al mito, no por capricho técnico.

## 2026-07-05 al 07-09 · La postulación a Puente Chacao 2026

Se produce el anexo técnico: documento autocontenido e imprimible, con la ficha
del Caleuche verbatim y **13 capturas reales** del prototipo. Se alinea al
formulario del fondo y se cierra el frente. **[aproximado]** El envío ocurrió el
**9 de julio de 2026 o antes**: ese día el backlog ya lo marca como enviado.

Fue **declarada inadmisible por falta de un documento, no por el proyecto**.
**[sin fecha documentada]** — el repositorio no registra cuándo.

Su expediente se conserva en `postulacion/` como historia. En septiembre de 2026
se le retiraron los datos de contacto por ser una página pública
([`ARQUITECTURA.md`](ARQUITECTURA.md) §8).

## 2026-07-09 al 07-11 · La fuente primaria: el proceso de Ancud de 1880

Entra el folleto de Ponce Hermanos (1908) desde Memoria Chilena, su OCR crudo y la
**transcripción verbatim** de las declaraciones con aparato crítico.

**La decisión que lo motivó:** que el proyecto tuviera **fuente primaria propia**,
no solo bibliografía de segunda mano. Con ella nacen dos patrones que definen la
obra: la **doble columna mito ‖ testimonio** con etiqueta curatorial obligatoria, y
la regla de que **las cifras del proceso son variante** — divergen entre fuentes y
se muestran todas, sin zanjar.

## 2026-07-10 al 07-11 · El capítulo de la Recta Provincia

El bloque más grande de la obra: siete fichas nuevas, el slot **lámina** 2:3, la
**vitrina** de piezas sin parada propia, y **«El Expediente»** — `juicio-1880.html`,
la única página hecha a mano y protegida de la regeneración.

Se cierra con **el Epílogo**: la absolución de todos los imputados por la Corte de
Apelaciones de Concepción, verificada contra Catepillan (2019), p. 93.

**La decisión que lo motivó:** el folleto de 1908 termina en la sentencia
condenatoria; **el sitio cuenta el final**. Y con él llega la capa **Lecturas**:
qué dice la academia, solo lo verificado contra el PDF y con página.

## 2026-07-11 · El sistema de trazabilidad entre sesiones

Nacen `MAPA-PROYECTO.md`, `CHANGELOG.md`, el protocolo de apertura y cierre, las
migraciones fechadas y la primera **matriz de citas**.

**La decisión que lo motivó:** que el conocimiento del proyecto **dejara de vivir
en la conversación**. Este documento y [`APORTES.md`](APORTES.md) continúan esa
misma línea.

## 2026-07-13 · El mapa del archipiélago

Silueta real de las comunas desde datos públicos y **ocho puntos verificados** con
coordenadas de OpenStreetMap.

**La decisión que lo motivó, y que define el método:** la investigación previa
marcó cada lugar como verificado o solo-web. **Cuatro puntos que circulan en la
web quedaron fuera** por no tener fuente citable. El descarte es parte del
argumento: el proyecto no mapea lo que no puede sostener.

## 2026-07-13 · El sistema de fuentes

`fuentes.yaml` como **índice único** de 40 fuentes, editado a mano. De él salen,
generados, la matriz de citas, la bibliografía y el reporte de huecos. Y dos
guardarraíles: `generar_matriz.py`, que emite, y `validar_fuentes.py`, que **solo
avisa y nunca corrige**.

Se publica el **menú de Fuentes** con sus cuatro capas y la conexión bidireccional
ficha ↔ fuente.

**La decisión que lo motivó:** que los **huecos se declararan en vez de
esconderse**. El semáforo cuenta solo fuentes archivadas en el repositorio; lo que
falta se lista con su prioridad. Detalle en
[`SISTEMA-DE-FUENTES.md`](SISTEMA-DE-FUENTES.md).

## 2026-07-13 al 09-01 · Pausa

Siete semanas sin commits. El trabajo se retoma con la postulación a Fondart.

## 2026-09-01 · Consolidación y Fondart Regional 2027

Se consolida todo en `main`, que además es la rama desplegada, y se verifican las
cifras de la obra contra los archivos: **17 de 17 coinciden**. Se documenta el
estado real en `docs/`, se prepara el dossier de la postulación y se registra el
**principio de puntos de entrada del equipo**.

**Las decisiones que lo motivaron:** que las cifras se **cuenten contra el
repositorio y nunca se copien** de documentación previa — el anexo de Chacao
declaraba 5 capítulos cuando ya había 12 — y que la separación de ramas sirva
para **pavimentar la llegada del equipo**, no para archivar.

---

## Dónde sigue cada cosa

| Necesitas | Ve a |
|---|---|
| El historial exacto, commit a commit | `git log` |
| El detalle cronológico de junio y julio de 2026 | [`../CHANGELOG.md`](../CHANGELOG.md) |
| Las decisiones estructurales vigentes, fechadas | [`ARQUITECTURA.md`](ARQUITECTURA.md) |
| Las reglas del proyecto | [`../CLAUDE.md`](../CLAUDE.md) |
| Qué entregó cada profesional del equipo | [`APORTES.md`](APORTES.md) |
| Las cifras verificadas de la obra | [`ESTADO-VERIFICADO-2026-08.md`](ESTADO-VERIFICADO-2026-08.md) |

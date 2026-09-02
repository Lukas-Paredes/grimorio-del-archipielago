# APORTES — registro de entregas del equipo

**El Grimorio del Archipiélago** · una entrada por aporte.

Este documento es la **contraparte escrita del principio de puntos de entrada**
([`ARQUITECTURA.md`](ARQUITECTURA.md) §6): si el aporte de un profesional entra al
proyecto como dato declarado en un archivo propio, **aquí queda registrado quién
lo declaró**.

Sirve para dos cosas a la vez: trazabilidad —saber qué cambió con el trabajo de
quién— y **acreditación de autoría**, que es algo que la postulación compromete
explícitamente.

> **Cuándo se actualiza:** **cada vez que entra trabajo de un profesional.** Es el
> único de los tres documentos de memoria que crece de forma continua.
>
> **No duplica.** El principio está en [`ARQUITECTURA.md`](ARQUITECTURA.md) §6, los
> hitos del proyecto en [`HISTORIAL.md`](HISTORIAL.md), y el diff exacto en git.
> Aquí solo va **quién entregó qué, cuándo, y dónde entró**.

---

## Cómo se registra un aporte

Una entrada por entrega, en orden cronológico inverso — la más reciente arriba.

| Campo | Qué va |
|---|---|
| **Fecha** | La de la entrega, no la del commit, si difieren |
| **Quién** | Nombre tal como debe acreditarse públicamente |
| **Frente** | `dirección de arte` · `territorial` · `registro oral` · `desarrollo` · `curaduría` |
| **Qué entregó** | Descripción breve, en términos del proyecto |
| **Dónde entró** | El archivo de datos que declara el aporte, no el motor |
| **Commit** | El hash que lo incorporó |
| **Cesión** | Solo para registro oral y obra contratada: si hay documento firmado y dónde está |

**Regla dura, heredada del principio de puntos de entrada:** la columna «dónde
entró» debe apuntar a un **archivo de datos declarado**. Si apunta a `ficha.js`,
`camino.js`, `portada.js` o a una ficha editada a mano, **el aporte se incorporó
mal** y hay que rehacerlo como dato.

---

## Registro

*No hay aportes registrados todavía. El equipo aún no se incorpora.*

<!--
EJEMPLO — formato de una entrada. Borrar este bloque al registrar el primero.

### 2027-03-15 · Nombre Apellido · dirección de arte

**Qué entregó.** Cuatro piezas comisionadas del portal: `caleuche-hero`,
`pincoya-hero`, `trauco-hero` e `invunche-hero`, en ilustración digital pintada,
a 917 × 512, según la línea editorial acordada.

**Dónde entró.**
- `assets/img/comisionado/` — los archivos, en WebP con respaldo PNG.
- `assets/img/creditos.yaml` — una entrada por pieza, con autoría, técnica,
  conjunto, fecha y rótulo.
- `datos/arte.yaml` — sin cambios: el conjunto `comisionado` ya iba primero en el
  orden, así que las piezas aparecen al regenerar.

**Commit.** `abc1234`

**Cesión.** Contrato firmado el 2027-03-10, archivado fuera del repositorio.
Acreditación nominal en la página de créditos, generada desde `creditos.yaml`.

**Verificación.** `validar_arte.py` pasa limpio: las cuatro piezas miden lo que su
slot exige, tienen entrada en créditos, y ninguna declara origen de IA.
-->

---

## Los tres frentes y el estado de su punto de entrada

Resumen operativo. El detalle y el porqué están en
[`ARQUITECTURA.md`](ARQUITECTURA.md) §6.

| Frente | Punto de entrada | Estado |
|---|---|---|
| **Dirección de arte** | `assets/img/<conjunto>/` · `creditos.yaml` · `arte.yaml` | **Parcial** — existe el de lectura; falta el documento donde la dirección de arte decide |
| **Territorial** | — | **No existe.** Por diseñar en fase 4b |
| **Registro oral** | — | **No existe.** Por diseñar en fase 4b |

**No se diseñan por adelantado.** Cada punto de entrada se define cuando el
profesional de ese frente diga qué necesita entregar.

### Nota sobre el registro oral

Cuando exista, un testimonio entra bajo la **regla sagrada del contenido**: es
**fuente primaria**, se cita con su atribución nominal y se somete a la misma
trazabilidad que hoy tienen las fuentes bibliográficas — igual que el proceso de
Ancud de 1880, que se transcribe verbatim y se atribuye a su declarante.

Eso implica, como mínimo: **cesión de derechos firmada** antes de publicar,
atribución nominal de quien narra, e ingreso al corpus con su entrada propia en el
índice de fuentes.

# HANDOFF — cierre de sesión

**Fecha:** 2026-07-11 (tarde, segunda tanda) · **Máquina:** casa · **Rama:** `v8-arquitectura` (limpia salvo `docs/propuestas/` —bandeja de Lucas, sin trackear a propósito—, sincronizada con origin)

## SEGUNDA TANDA del 2026-07-11 (commits, en orden)

- `133db07` — **reorden**: el Juicio de Ancud pasa a ser el CIERRE del descenso (XII); Camahueto antes (XI). Cadena: …X Voladora → XI Camahueto → XII Juicio → lecho.
- `7313373` — **umbral de entrada**: campo opcional `umbral {img, bajada}` en el ACTO; camino.js antepone la boca de la cueva + «Libro Octavo · La Recta Provincia» + bajada verbatim del DEFINITIVO al CRUZAR hacia libro-8 (aparece en Trauco→Invunche y Camahueto→Juicio; nunca en tránsitos internos).
- `5004c4c` — **prensa de época**: `fuentes/_raw/prensa/REGISTRO-PRENSA.md` (rastro en-repo vía Catepillan): el decreto del intendente 7-abr-1880 publicado en El Chilote 8-abr y El Liberal 9-abr; sentencia 1ª inst. en Gaceta 11-jun-1881; nada descargable en línea aún; «El Correo 7-ago-1880» NO verificó.
- `1592ad8` — **MATRIZ-CITAS v1** (mapa de solidez documental).
- `e4cae91` — **lote docs/propuestas/ integrado**: PROMOVIDOS Hernández 2013, Romo Sánchez (MC0033461), León 2016, Contreras (pdf+txt en `_raw/lecturas/`). Veredicto «el gobernador»: Cavada = ERROR (conflación con el canónigo autor); Martiniano Rodríguez ×3 fuentes. 💎 **Hernández p. 30 transcribe ÍNTEGRA la sentencia de 2ª instancia (Concepción, 24-may-1881; Gaceta nº 1964, p. 457; voto disidente de Escobar) → MONTADA VERBATIM en el Epílogo.** Prensa nueva: los AZOTES denunciados por El Liberal (número perdido; desmentido en El Chilote 21-may-1880, Hernández p. 20).
- `de94911` — **MATRIZ v2**: absolución ⚠️→✅ · fila «el gobernador» ✅ resuelto · fila «los azotes» · Romo verifica las citas del corpus.

**Decisiones de Lucas aplicadas:** discrepancias legítimas = material narrativo con fuente (nunca zanjar); «Cavada» corregible por ser error sin fuente; `docs/propuestas/` = candidatas promovibles bajo filtro (promovidas 4; referencia 8; para su decisión: los 3 PDFs sin capa de texto).

---

## (Cierre de la mañana — sesión anterior)

Documento vivo de traspaso entre sesiones/máquinas. Se actualiza al CERRAR cada sesión
(ver `_handoff/PROTOCOLO.md`). La guía completa de arquitectura para una conversación
nueva es `HANDOFF-CODE.md` (raíz del repo).

---

## Qué se hizo en esta sesión (commits, en orden)

**Bloque 1 — Montaje completo del capítulo Recta Provincia** (piloto cueva-quicavi aprobado la sesión anterior):

- `13f02f1` — **fase A**: 5 fichas plenas (Cap. VI-X): recta-provincia (hero = ex portada-recta-provincia, renombrada), brujo-chilote, macun, challanco, voladora (láminas 2:3). Prosa verbatim del Libro Octavo. @TESTIMONIO en macun (piel/candil, B+C) y recta-provincia (jerarquía, sentencia D). Camahueto corre a n:12.
- `8e48f3e` — **fase B**: vitrina del capítulo en el hub recta-provincia: 7 piezas verbatim (la-mayoria, siete-republicas, iniciacion —con su @TESTIMONIO del juramento y ADVERTENCIA—, poderes-del-brujo, machi, calcu, libro-de-moraleda). Mecánica: dict GALERIAS en el generador.
- `1f8fc2b` — **fase C**: **El Expediente** — `juicio-1880.html` bespoke (Cap. XI, clímax): placas de bronce A-D del dossier con lacre SVG a mano, NOTA curatorial, escenas cueva-vacia y archivo-ardiendo, FUENTE:: por bloque. `recogida.png` fuera. Set BESPOKE en el generador (nunca la regenera).

**Bloque 2 — Capa académica (Lecturas) + Epílogo:**

- `ef6a201` — bibliografía NotebookLM archivada (`fuentes/lecturas/lecturas-recta-provincia.md`); extracción y papers marcados pendientes.
- `de0028a` — **Ampuero 2016** hallado en la máquina (dentro del issue Mapocho Nº 80, nombre engañoso), verificado por primera página, txt archivado.
- `b43ca4d` — capa **Lecturas** (sección aditiva tras flag, patrón @TESTIMONIO) + primera Lectura: macun (luz «blanquecina», Ampuero p. 70).
- `9291194` — **Catepillan 2019, Valenzuela 2014, Núñez 2022** incorporados (pdf+txt) a `fuentes/_raw/lecturas/`, verificados por primera página.
- `89c272a` — **EL EPÍLOGO**: la absolución de todos los imputados por la Corte de Apelaciones de Concepción, **verificada contra Catepillan p. 93 real**; los 9 condenados con nombres/edades (n. 29); cifras del proceso como VARIANTE (80/54/9/12 + penas divergentes), cada una con fuente y página. Advertencia del Bloque A actualizada: la persecución del intendente Luis Martiniano Rodríguez ahora tiene respaldo académico (Ampuero p. 66; Catepillan p. 92).
- `925f71d` — **Lecturas completas**: juicio-1880 (Catepillan pp. 84/97/99: lectura política, castellano, azmapu) · recta-provincia (Valenzuela p. 35 + Núñez p. 24 + Ampuero p. 65) · challanco (vaso con agua y piedras — **atribución corregida**: Catepillan p. 99 n. 55, NO Valenzuela como decía NotebookLM) · iniciacion (3 pruebas Ampuero p. 76 vs 4 del corpus) · voladora (Ampuero p. 79).

## Estado exacto del capítulo Recta Provincia

- **Cadena del descenso:** I Caleuche → II Pincoya → III Trauco → **IV Invunche → V Cueva de Quicaví → VI Recta Provincia (hub + vitrina) → VII Brujo chilote → VIII Macuñ → IX Challanco → X Voladora → XI El juicio de 1880 (Expediente + Epílogo + Lecturas)** → XII Camahueto → lecho. Todo publicado y verificado.
- **Doble columna mito‖testimonio:** cueva-quicavi, macun, recta-provincia (+ iniciacion en vitrina). Etiqueta obligatoria en todas.
- **Lecturas montadas:** macun, recta-provincia, challanco, voladora, juicio-1880, iniciacion (vitrina).
- **Fuentes verificadas en repo:** folleto 1908 (MC0033459) + Ampuero txt + Catepillan/Valenzuela/Núñez pdf+txt.

## Qué sigue

1. **Los 7 descensos de Gemini** (`<id>-descenso` 9:16): prompts listos (revisados); Lucas genera; al llegar → normalizar, regenerar (las 6 fichas los toman solas) y cablear a mano el de la bespoke juicio-1880 (que hoy no tiene `.descenso-bg`, adrede).
2. **QA humano del capítulo completo** (el ojo de Lucas, desde el index hasta el lecho).
3. **Cotejo de las ~18 marcas [¿?]** del dossier contra el PDF de 1908 (pendiente de Lucas) antes de publicar a producción.
4. **Orden `n` definitivo**: espera el documento CAMINO-DEL-MITO (NotebookLM).
5. **[por verificar] pendientes**: cifras de Memoria Chilena («más de cien»/70) y Sanhueza/LUN 2015 — fuentes fuera del repo; versión de Memoria Chilena de las pruebas de iniciación.

## Decisiones abiertas

- ¿Umbral por Libro en el index? (hoy solo se pinta el primer capítulo publicado — hallazgo documentado).
- ¿Música propia para los capítulos de la Recta Provincia? (hoy van solo con atmósfera `cueva`).
- Portadas faltantes: portada-invunche, portada-camahueto (Gemini).
- Deploy a GitHub Pages: parqueado (repo privado).
- machi/calcu con fuente genérica: aceptadas así (van en vitrina).

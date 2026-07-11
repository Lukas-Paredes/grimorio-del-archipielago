# HANDOFF — cierre de sesión

**Fecha:** 2026-07-11 · **Máquina:** casa · **Rama:** `v8-arquitectura` (limpia, sincronizada con origin)

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

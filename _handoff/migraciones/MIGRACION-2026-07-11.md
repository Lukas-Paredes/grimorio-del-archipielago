# MIGRACIÓN DE SESIÓN — 2026-07-11

**Cierre:** 2026-07-11, tarde · **Máquina:** casa · **Rama:** `v8-arquitectura`
**Último commit al cerrar:** ver `git log -1` (este archivo se commitea como
`handoff: migracion 2026-07-11 + changelog + sistema trazabilidad`).
**Árbol:** limpio salvo `docs/propuestas/` (bandeja de PDFs de Lucas, SIN
trackear a propósito — los promovidos ya viven en `fuentes/_raw/lecturas/`).

Este archivo existe para que una sesión NUEVA de Claude Code retome sin perder
nada. Léelo completo antes de tocar cualquier cosa.

---

## 1 · Qué se hizo (sesión 2026-07-10 → 11, capítulo Recta Provincia completo)

**Montaje del capítulo (10-11 jul):**
- `8281120` piloto: Cueva de Quicaví (Cap. V) — lámina 2:3, doble columna mito‖testimonio.
- `0f1cf76` fix: fondos neutros para reinos no-mar (sin naufragio heredado).
- `13f02f1` fase A: 5 fichas plenas (VI recta-provincia hub · VII brujo-chilote · VIII macun · IX challanco · X voladora).
- `8e48f3e` fase B: vitrina del capítulo (7 piezas verbatim en el hub, iniciación con testimonio+advertencia).
- `1f8fc2b` fase C: **El Expediente** — `juicio-1880.html` bespoke (placas A-D, lacre SVG, escenas; en lista `BESPOKE` del generador).

**Capa académica (11 jul, mañana):**
- `ef6a201` bibliografía NotebookLM archivada · `de0028a` Ampuero 2016 hallado en la máquina y verificado · `b43ca4d` capa **Lecturas** (`@LECTURAS`, aditiva) + macun (luz «blanquecina», Ampuero p. 70) · `9291194` Catepillan/Valenzuela/Núñez incorporados (pdf+txt) · `89c272a` **EL EPÍLOGO** (absolución, Catepillan p. 93; cifras como VARIANTE) · `925f71d` Lecturas completas (juicio, recta-provincia, challanco, iniciación, voladora) · `c4735fd` handoff+protocolo.

**Segunda tanda (11 jul, tarde):**
- `133db07` **reorden**: el Juicio cierra el descenso (XII); Camahueto antes (XI).
- `7313373` **umbral de entrada**: `umbral {img,bajada}` opcional en el ACTO; la boca de la cueva + bajada verbatim al cruzar hacia libro-8.
- `5004c4c` **prensa rastreable**: `fuentes/_raw/prensa/REGISTRO-PRENSA.md`.
- `1592ad8` **MATRIZ-CITAS v1** · `de94911` **v2** (absolución ✅).
- `e4cae91` **lote de Lucas integrado**: promovidos Hernández 2013, Romo Sánchez (MC0033461), León 2016, Contreras. 💎 **La sentencia de 2ª instancia ÍNTEGRA (Concepción, 24-may-1881; Gaceta nº 1964, p. 457; voto disidente de Escobar) montada verbatim en el Epílogo** (transcrita en Hernández p. 30).
- `ff07eb4` handoff segunda tanda + 5 decisiones nuevas en CLAUDE.md.

## 2 · Estado exacto del capítulo Recta Provincia

- **Cadena (12 paradas, todas publicadas y verificadas):** I Caleuche → II Pincoya → III Trauco → IV Invunche → V Cueva de Quicaví → VI La Recta Provincia (hub + vitrina de 7 piezas) → VII Brujo chilote → VIII Macuñ → IX Challanco → X Voladora → XI Camahueto → **XII El juicio de Ancud (Expediente + Epílogo + Lecturas) → lecho**.
- **Umbral de entrada** del Libro Octavo: aparece al cruzar Trauco→Invunche y Camahueto→Juicio.
- **Doble columna mito‖testimonio** (etiqueta curatorial obligatoria): cueva-quicavi, macun, recta-provincia (+ iniciación en vitrina).
- **Lecturas académicas montadas:** macun, recta-provincia, challanco, voladora, juicio-1880, iniciación — todas con (Autor, año, p. X) verificada.
- **El Expediente:** NOTA curatorial → placas A-D verbatim del maestro (`fuentes/proceso-ancud-1880.md`) → escenas cueva-vacia/archivo-ardiendo → **Epílogo con la sentencia de la absolución verbatim** → Lecturas. `recogida.png` fuera (sin fuente).
- **Bibliografía/matriz:** `fuentes/lecturas/lecturas-recta-provincia.md` (evaluación del lote) · `fuentes/bibliografia/MATRIZ-CITAS.md` (15/17 ✅) · `fuentes/_raw/prensa/REGISTRO-PRENSA.md`.

## 3 · Decisiones vigentes (detalle en CLAUDE.md → «Decisiones»)

- **Regla sagrada:** nada inventado; verbatim con fuente; lo no verificable = `[por verificar]` y NO se publica.
- **Discrepancias entre fuentes legítimas = material narrativo** (se muestran con fuente, jamás se zanjan). Un dato sin fuente que contradice a las fuentes es ERROR y se corrige.
- **El caso del gobernador:** «Cavada» como autor de la redada = error (conflación con el canónigo autor de 1914). **El intendente Luis Martiniano Rodríguez ordenó la persecución** (Ampuero p. 66 · Catepillan p. 92 · Hernández). El juez letrado de Ancud instruyó y sentenció en 1ª instancia — en el folleto de 1908 la sentencia es del **juez Beytía** (⚠️ ojo: si en algún documento aparece «Barría», NO está en las fuentes del repo; verificar antes de usar).
- **`docs/propuestas/` = candidatas promovibles** bajo filtro (mitológico/histórico verificable → fuente; visión/estrategia → referencia; duda → «para decisión de Lucas»).
- **Política bibliográfica:** acceso abierto → se descarga a `fuentes/_raw/lecturas/` (pdf+txt, nombre limpio, verificado por primera página); con copyright → cita completa + dónde consultar; jamás piratear. Revista completa pesada → solo txt del artículo.

## 4 · QUÉ SIGUE (por prioridad)

1. **Los 7 descensos de Gemini** (9:16, prompts ya afinados y aprobados). Nombres exactos → normalizar a `assets/img/<nombre>.webp/.png`:
   `cueva-quicavi-descenso` · `recta-provincia-descenso` · `brujo-chilote-descenso` · `macun-descenso` · `challanco-descenso` · `voladora-descenso` · `juicio-1880-descenso`.
   Las 6 fichas generadas los toman SOLAS al regenerar (`python herramientas/generar_fichas.py`); **la bespoke `juicio-1880.html` requiere cableado a mano** (hoy no tiene `.descenso-bg`, adrede — no cablear antes de tener la imagen o vuelve el naufragio por defecto).
2. **QA visual de Lucas** del capítulo completo (index → lecho, su ojo es el QA).
3. **Cotejo de las ~18 marcas `[¿?]`** del dossier contra el PDF de 1908 (Lucas) antes de producción.
4. **Orden `n` definitivo**: espera el documento CAMINO-DEL-MITO (NotebookLM). Todos los `n` actuales son PROVISIONALES.
5. **Arreglos visuales pendientes**: láminas flojas a regenerar (lista de Lucas tras su QA); portada-invunche y portada-camahueto (Gemini); camahueto-cierre a media resolución.
6. **Fuentes por conseguir** (ver MATRIZ → Direcciones): texto del decreto del intendente (El Chilote 8-abr / El Liberal 9-abr 1880, BN física) · Anuario Hidrográfico 1887 · páginas de la Gaceta en visor BND (`BND:620043`; 1ª inst. 11-jun-1881, 2ª inst. nº 1964 p. 457) · Cavada 1914 · Quintana 1972 · Galleguillos 2018 (comprar) · identificar los 3 PDFs sin capa de texto del lote.
7. **Cosecha barata futura:** Núñez y Contreras cubren fuerte Caleuche/Camahueto/Pincoya/Trauco → Lecturas para los capítulos viejos.

## 5 · Cómo retomar (orden de APERTURA para la sesión nueva)

> Lee CLAUDE.md (constitución + Decisiones), luego
> _handoff/migraciones/MIGRACION-2026-07-11.md (este archivo), luego
> _handoff/HANDOFF.md y herramientas/pendientes.md. Confirma con `git status`
> que estás en v8-arquitectura con árbol limpio, haz `git pull`, y reporta:
> último commit, qué quedó pendiente, y espera mi primer mandato. No toques
> nada todavía.

Gotchas de esta máquina: caché agresiva del navegador (Ctrl+Shift+R tras tocar JS/CSS/datos) · OneDrive demora la primera lectura de archivos recién renombrados · el preview de Code no saca screenshots (QA visual = ojo humano) · puerto 8001 puede tener un server huérfano (usable: sirve del disco) · TLS/schannel puede requerir `--ssl-no-revoke` en descargas.

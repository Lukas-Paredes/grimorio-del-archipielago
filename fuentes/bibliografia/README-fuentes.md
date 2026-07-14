# README — El sistema de fuentes (`fuentes.yaml`)

**Qué es.** `fuentes.yaml` es el ÍNDICE ESTRUCTURADO de todas las fuentes del
Grimorio: la única base de datos bibliográfica del proyecto (mandato
2026-07-13). Consolida lo que antes vivía desparramado en MATRIZ-CITAS.md,
lecturas-recta-provincia.md, REGISTRO-PRENSA.md, geografia-cosmologia.md y
las 108 líneas `FUENTE::` del corpus.

**Regla de oro.** El índice se edita A MANO (el juicio de solidez es
curatorial); los scripts SOLO LEEN de aquí y generan salidas. Nada inventa
respaldos: el campo `respalda` se escribe únicamente con citas ya verificadas
contra el archivo correspondiente.

## Formato de una entrada

```yaml
- id: cat-2019                # corto, único, kebab-case: autor-año
  tipo: academica             # ver vocabulario abajo
  autor: "Catepillan Tessi, Tomás"
  anio: 2019                  # null si se desconoce
  titulo: "La República de la Raza…"
  publicacion: "Trashumante…, (13), 84-107"
  acceso: abierta             # abierta | localizable | de-pago | perdida | no-aplica
  url: "https://…"            # link al original (null si no hay)
  archivo_local:              # rutas EN EL REPO (vacío = no archivada)
    - fuentes/_raw/lecturas/catepillan-2019-republica-de-la-raza.pdf
    - fuentes/_raw/lecturas/catepillan-2019-republica-de-la-raza.txt
  estado: archivada           # ver vocabulario abajo
  notas: "…"                  # opcional: contexto, advertencias, decisiones
  alias_corpus:               # cadenas EXACTAS de las líneas FUENTE:: del
    - "Catepillan (2019)"     # corpus que apuntan a esta fuente (para validar
                              # cobertura mecánicamente). Omitir si no aplica.
  respalda:                   # JUICIO CURATORIAL: qué tema respalda y dónde
    - { tema: absolucion, pagina: "p. 93 (+ n. 29)" }
```

## Vocabularios controlados

- **tipo**: `primaria` (documento de época) · `academica` · `institucional`
  (Memoria Chilena, SNPC…) · `terciaria` (Wikipedia, blogs) · `prensa` ·
  `oral` (atribuciones de tradición, no documentos) · `corpus-interno` ·
  `geodatos` · `referencia-interna` (guía al proyecto, no respalda mito).
- **acceso**: `abierta` · `localizable` (existe, hay que ir a buscarla) ·
  `de-pago` (se compra, jamás se piratea) · `perdida` · `no-aplica`.
- **estado**: `archivada` (pdf/txt EN el repo → cuenta para la matriz) ·
  `localizable` · `por-conseguir` · `perdida` · `no-verificada` ·
  `atribucion-oral` · `referencia`.
- **tema** (en `respalda`): preferir el id de entidad del corpus (`macun`,
  `challanco`, `cueva-quicavi`…); para temas transversales usar los ya
  acuñados: `absolucion`, `gobernador`, `decreto-intendente`,
  `cifras-del-proceso`, `machi-calcu`, `los-azotes`, `origen-moraleda`,
  `la-mayoria`, `siete-republicas`, `museo-ancud`, `mapa-archipielago`.

## Cómo agregar una fuente nueva (el flujo completo)

1. **Archivar primero** (si es de acceso abierto): pdf + txt extraído a
   `fuentes/_raw/lecturas/` con nombre `autor-año-titulo`. Verificar por
   primera página que es lo que dice ser. Si es de pago: no se piratea —
   entrada con `acceso: de-pago`, `estado: por-conseguir`.
2. **Entrada en `fuentes.yaml`**: copiar el esqueleto de arriba. `respalda`
   se deja `[]` hasta que haya citas verificadas montadas o por montar
   (con página cotejada contra el pdf/txt del repo).
3. **Si el corpus la cita**: añadir la cadena exacta de su línea `FUENTE::`
   a `alias_corpus` (la validación avisa si una cita del corpus no tiene
   entrada aquí).
4. **Regenerar salidas**: `python herramientas/generar_matriz.py` → emite
   `MATRIZ-CITAS.md` (la oficial) + `BIBLIOGRAFIA.md` + `REPORTE-FUENTES.md`
   en esta carpeta. GENERADOS: no se editan a mano. (La matriz manual
   histórica quedó como `MATRIZ-CITAS-manual-respaldo.md`.)
5. **Validar**: `python herramientas/validar_fuentes.py` → chequea que los
   `archivo_local` existan, que cada `respalda` tenga página, la cobertura
   alias↔corpus en ambos sentidos y los vocabularios. Solo avisa; no arregla.

## El criterio del semáforo (calculado, no escrito)

✅ = 2+ fuentes `archivada` respaldan el tema · ⚠️ = 1 · ❌ = 0. Las
pendientes (`localizable`/`por-conseguir`) se listan aparte y, si al
conseguirse subirían el nivel, el símbolo lleva asterisco (⚠️*).
`perdida`/`no-verificada` jamás suman.

## Qué NO va aquí

- Los documentos legales de la postulación (frente congelado).
- El texto cultural en sí (eso vive en corpus/prosa/dossier).
- Juicios de solidez calculados: el ✅/⚠️/❌ de la matriz LO CALCULA el
  generador contando fuentes `archivada` por tema — no se escribe a mano.

## Convivencia con los .md históricos

MATRIZ-CITAS.md, lecturas-recta-provincia.md y REGISTRO-PRENSA.md se
MANTIENEN (guardarraíl del mandato) hasta confirmar que las salidas
generadas los reemplazan bien. REGISTRO-PRENSA.md conserva además el detalle
fino pieza-a-pieza de prensa que el índice resume.

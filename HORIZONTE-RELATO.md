# HORIZONTE — relato interactivo y travesía (visión, no plan de obra)

> Hacia dónde evoluciona El Grimorio del Archipiélago después de las Etapas
> 0–5 en curso. Nada de aquí se implementa sin orden expresa de Lucas. Su
> función: (a) que ninguna decisión de hoy bloquee la capa jugable de mañana,
> (b) que las reglas ya estén escritas, coherentes con CLAUDE.md y la regla
> sagrada, cuando llegue la hora.

## 1 · La idea central: DOS caminos sobre la MISMA página

El sitio tendrá dos maneras de recorrerse, sin duplicar nada:

- **Camino lector (el archivo, ya existe):** entrar, leer capítulo a capítulo,
  ficha a ficha. Completo en sí mismo: quien solo lee, aprende TODO. Este
  camino nunca se degrada ni pierde contenido por culpa del otro.
- **Camino travesía (opcional, gamificado):** quien quiere JUGAR activa la
  travesía: vive cada capítulo como relato interactivo (ilustración + texto +
  decisiones, espíritu *Slay the Princess* con disciplina cultural) y, al
  cerrar un final, **la corriente lo lleva al capítulo siguiente** en el orden
  curatorial — Caleuche → Pincoya → … — con su avance guardado, hasta
  **completar el Grimorio del Archipiélago**. La navegación misma del sitio
  es el tablero; no hay «otro juego» aparte.

Reglas duras del diseño:
- **Los finales de cada capítulo son las `VARIANTE::` documentadas del
  `@ENTIDAD`** (el Caleuche: cuatro variantes → cuatro finales). Jugar no es
  inventar: es elegir cuál relato documentado seguir.
- Cada final cierra con «de dónde viene este relato» + fuentes, y devuelve al
  archivo. El relato lleva gente a las fuentes, no al revés.
- **Cero contenido cultural exclusivo del modo jugado.** La travesía reordena
  y dramatiza; JAMÁS esconde conocimiento detrás del juego. Leer sin jugar
  entrega el saber completo, siempre.
- Nomenclatura (ya es ley en CLAUDE.md): «relato interactivo», «travesía»,
  «recorrido narrativo». Nunca «juego», «RPG», «niveles», «quests».

## 2 · La inspiración Pokémon — qué se toma y qué se prohíbe

**SE TOMA (el espíritu, no la mecánica):**
- El registro que da ganas de completar: la carta de navegación con sus 68
  placas ES esa colección en clave museo. Estados de placa: sellada → abierta
  (publicada) → **recorrida** (completada en la travesía). Completar el
  Grimorio = haber recorrido todos los capítulos publicados; el premio es el
  códice encendido, no capturas.
- El descubrimiento por territorio: cada reino (mar, bosque, cueva, aire) con
  su atmósfera, su luz ámbar y sus habitantes.

**SE PROHÍBE (rompería el proyecto y la postulación):**
- Combatir, capturar o coleccionar criaturas como objetos; stats, niveles,
  barras de vida. Son patrimonio vivo: el Trauco no se «derrota».
- Cualquier mecánica que contradiga las fuentes documentadas.
- Estética o sprites que imiten IP ajena (Nintendo u otra). La referencia es
  espiritual; el lenguaje visual es el ADN propio del Grimorio.

## 3 · Fases del horizonte (solo cuando Lucas las active, en este orden)

- **H1 · Motor + beta.** `assets/js/motor-relato.js`: máquina de estados JS
  vanilla, genérica, escrita UNA vez (mismo espíritu que `ficha.js`) + UNA
  escena del Caleuche —la decisión de abordar— como beta jugable.
- **H2 · Capítulo Caleuche completo.** Las cuatro ramas/finales = las cuatro
  variantes, con «hallazgos» que encienden placas de la ficha.
- **H3 · LA TRAVESÍA (el corazón de esta visión).** El hilo inter-capítulos:
  botón «iniciar la travesía»; al cerrar un final, «la corriente te lleva» al
  capítulo siguiente según el orden `n` de `capitulos.js`; avance en
  `localStorage` (`grimorio:travesia`); la carta muestra las placas
  recorridas; pantalla de Grimorio completo al terminar los publicados (y
  crece sola cuando se publican más).
- **H4 · Viñeta caminable (opcional).** Intro de 30–60 s en Canvas: un
  pescador pixel camina DE PERFIL por el muelle nocturno hacia las luces en
  la niebla, y entra al relato. Un solo sprite lateral (4–6 cuadros), fondos
  ya existentes. Sabor RPG-2000 al 5 % del costo.
- **H5 · Evaluar más allá** (exploración top-down) SOLO si H1–H4 funcionan y
  sin comprometer el archivo.

## 4 · Reglas de arquitectura DESDE HOY (para no bloquear el mañana)

Rigen el trabajo actual; todas se cumplen ya — el punto es no romperlas:

1. **Motor y contenido separados, siempre.** La lógica será genérica; el
   guion de cada capítulo será datos, nunca código.
2. **Formato reservado `@ESCENA`** (espíritu `@ENTIDAD`), esquema tentativo a
   fijar recién en H1: `@ESCENA` / `ID:: ` / `IMG:: ` / `TEXTO:: ` /
   `OPCION:: etiqueta | id-escena-destino` (repetible) /
   `FINAL:: id-variante` / `@FIN`.
3. **El campo `n` de `capitulos.js` ES el orden de la travesía.** No se le da
   otro significado.
4. **La carta de navegación debe poder recibir estados extra por placa**
   (p. ej. «recorrida») vía clase CSS, sin rediseño. Su render data-driven de
   la Etapa 4 ya lo permite; no exige trabajo adicional ahora.
5. **Claves reservadas de `localStorage`:** `grimorio:travesia` (avance). Las
   existentes (`grimorio:motion`, `grimorio:audio`) no cambian.
6. **Slots de imagen reservados:** `<id>-relato-<n>` (escenas) y `<id>-sprite`
   (H4). El normalizador los acepta con su pipeline normal.
7. **Carpeta reservada:** `contenido/relatos/<id>.txt` para los guiones.
8. **`ficha.js` y `ficha.css` jamás absorben lógica de relato o travesía.**
   La capa jugable se monta aparte y comparte solo el ADN visual y
   `window.Grimorio`. Los enlaces futuros («continuar la travesía» al cierre
   de una ficha) serán aditivos, nunca invasivos.
9. **Sin frameworks ni build también para el relato:** Canvas/JS clásico
   alcanza para H1–H4. Las reglas técnicas de CLAUDE.md aplican íntegras.
10. Nada de este documento modifica ni retrasa las Etapas 0–5 en curso.

## 5 · Regla de oro

Ante cualquier duda entre «más juego» y «más archivo», **gana el archivo** —
y quien solo lee, capítulo a capítulo, se lleva el Grimorio entero igual.

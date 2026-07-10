# Créditos de audio — El Grimorio del Archipiélago

La música de fondo del camino proviene de **Pixabay** y se usa bajo la
**Pixabay Content License** (uso libre, incluso comercial, sin atribución
obligatoria; aun así se acredita aquí por transparencia, mismo estándar que las
imágenes). Cada pista fue normalizada a ~−18 LUFS y preparada como loop sin
costura por `herramientas/audio_pipeline.py`. Los crudos originales quedan en
`_entrada-audio/` (bandeja local, no versionada).

> **Pendiente de Lucas:** completar «Título original» y «Autor» de cada pista
> desde la página de descarga de Pixabay (los MP3 no traían metadatos ID3, así
> que no se pudieron extraer automáticamente — no se inventan).

| Capítulo / página | Archivo final | Título original | Autor | Fuente | Licencia |
|---|---|---|---|---|---|
| Inicio / superficie (`index`) | `musica-main.ogg/.mp3` | _[completar]_ | _[completar]_ | Pixabay | Pixabay Content License |
| El Caleuche | `musica-caleuche.ogg/.mp3` | _[completar]_ | _[completar]_ | Pixabay | Pixabay Content License |
| La Pincoya | `musica-pincoya.ogg/.mp3` | _[completar]_ | _[completar]_ | Pixabay | Pixabay Content License |
| El Trauco | `musica-trauco.ogg/.mp3` | _[completar]_ | _[completar]_ | Pixabay | Pixabay Content License |
| El Invunche | `musica-invunche.ogg/.mp3` | _[completar]_ | _[completar]_ | Pixabay | Pixabay Content License |
| El Camahueto | `musica-camahueto.ogg/.mp3` | _[completar]_ | _[completar]_ | Pixabay | Pixabay Content License |

## Procesamiento aplicado (por pista)

- **Loudness** normalizado a −18 LUFS (loudnorm de dos pasadas) → volumen parejo
  entre capítulos.
- **Silencios** de cabeza y cola recortados.
- **Loop sin costura**: auto-crossfade cola→cabeza de 2 s (sin «hipo» al repetir).
- **Formato**: OGG Vorbis (q5) que carga el navegador + MP3 (q5) de respaldo
  para Safari/iOS. Streaming: cada visitante descarga solo el capítulo que visita.
- **Capadas a 120 s** (loops largos, por memoria/peso en móvil): `trauco`
  (140→116 s) y `camahueto` (260→118 s). Si Lucas quiere el largo completo de
  alguna, se sube `MAXLOOP` en `herramientas/audio_pipeline.py` y se reprocesa.

## Reproducción en el sitio

- La música es una **capa por debajo** de la atmósfera procedural de `sonido.js`
  (las olas/viento/goteo siguen siendo el cuerpo; la música, el alma que se
  insinúa). Un **único** botón de Sonido enciende/apaga todo; un **slider**
  ajusta el volumen maestro. Apagado por defecto, jamás autoplay.
- El **Caleuche** no suena continuo: aparece y desaparece sobre el agua (fiel al
  mito), con filtro de distancia, como una fiesta lejana entre la niebla.

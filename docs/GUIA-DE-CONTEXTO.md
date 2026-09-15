# 00 · LÉEME PRIMERO

**El Grimorio del Archipiélago** · carpeta de contexto para el Project de Claude Chat
Generada el 31 de agosto de 2026 desde el repositorio real, commit `dd27bc7`.

> Si es tu primera vez con este proyecto: lee esta página entera antes de
> responder nada. Toma cinco minutos y evita casi todos los errores posibles.

---

## QUÉ ES ESTE PROYECTO

**El Grimorio del Archipiélago** es un archivo digital y recorrido cultural
dedicado a la difusión y puesta en valor del imaginario mitológico de Chiloé y su
entorno insular. Reúne, sobre una base documental verificable, un corpus de **68
entidades** de la tradición chilota —figuras, lugares, instituciones de la
brujería histórica y relatos— y las presenta de dos maneras complementarias: un
**camino narrativo** que se recorre capítulo a capítulo como un descenso desde la
superficie de las islas hasta el lecho del mar, y un **archivo de consulta** con
fichas, índices, un expediente documental sobre la Recta Provincia y una sección
pública de fuentes y método. Es una plataforma web pública, gratuita, sin registro
ni publicidad, y **ya está en línea**.

Su forma es un descenso y su regla es no inventar nada. Cada relato se copia
**verbatim** de su fuente. Cuando dos fuentes legítimas discrepan —las cifras del
proceso de 1880, el color de la luz del macuñ, la forma del challanco— **se
muestran las dos con su fuente y no se zanja**: la discrepancia es material
narrativo, no un problema a resolver. El sistema distingue siempre, y con
etiquetas visibles, entre tradición documentada, variante, interpretación
curatorial, antecedente histórico, recreación artística y contenido pendiente de
verificación. Un dato sin fuente que contradice a las fuentes es un error y se
corrige.

Visualmente es un museo nocturno: pixel art dark fantasy sobre una paleta abisal
de azules muy oscuros, con **una sola luz cálida ámbar por escena** —el farol del
palafito, las luces del buque fantasma, el cabello de la Pincoya que es la única
luz de su playa—. Las superficies son placas de bronce y agua abisal. Las
tipografías son Jacquard 24 para los títulos, EB Garamond para la prosa y Pixelify
Sans para la interfaz. Técnicamente es un sitio estático puro: HTML, CSS y
JavaScript clásico, sin frameworks, sin npm, sin proceso de compilación y sin
backend. Todo el contenido está gobernado por datos, de modo que **publicar una
entidad nueva no exige tocar el motor de la plataforma**.

**El autor y responsable del proyecto es Lucas Paredes**, sociólogo y científico
de datos, residente en Calbuco. Trabaja el proyecto desde dos computadores.

---

## A QUÉ SE ESTÁ POSTULANDO

| | |
|---|---|
| **Fondo** | **Fondart Regional 2027** |
| **Cierre** | **miércoles 16 de septiembre de 2026, 15:00** |
| **Días restantes al generar esta carpeta** | **9** |
| Bases, formularios, requisitos y presupuesto | **[PENDIENTE DE CONFIRMAR]** — no hay ningún documento de bases, FUP, formulario ni presupuesto en el repositorio |

**Antecedente que importa:** hubo una postulación anterior al **Fondo Cultura
Puente Chacao 2026**, que fue **declarada inadmisible**. Su anexo técnico existe y
tiene texto de excelente calidad sobre el proyecto —fundamentación patrimonial,
dirección de arte, metodología, accesibilidad, ficha técnica—.

**Dos advertencias sobre ese anexo:**

1. **Todo lo relativo al EQUIPO de esa postulación queda descartado.** La
   composición cambió. No reutilizar nombres, roles, distribución de honorarios ni
   cartas de compromiso.
2. **Sus cifras están desactualizadas.** Declara **5 capítulos publicados** cuando
   hoy hay **12**. El material heredado subestima la obra. **Para toda cifra, usar
   el documento 11 de esta carpeta, nunca el anexo.**

El anexo **no se subió a esta carpeta**: contiene datos personales de Lucas
(teléfono, correo, domicilio).

---

## QUÉ HAY EN CADA DOCUMENTO

| # | Documento | Qué contiene | Cuándo consultarlo |
|---|---|---|---|
| **01** | `MAPA-PROYECTO.md` | **El plano permanente.** Qué es el proyecto, la regla de fuentes, la arquitectura, el mapa de carpetas, el pipeline de imágenes, el estado del contenido | **Empieza por aquí.** Para cualquier pregunta de «dónde está X» o «cómo funciona Y» |
| **02** | `CONSTITUCION-Y-DECISIONES.md` | La constitución del proyecto: reglas culturales y técnicas, criterios de diseño, lenguaje obligatorio, y **11 decisiones editoriales fechadas** | **Antes de proponer cualquier cambio.** Aquí está lo que ya se decidió y por qué |
| **03** | `ESTADO-DEL-PROYECTO.md` | Foto operativa: sonido, deploy, herramientas, pendientes | Para saber qué está a medias. ⚠️ Su §2 dice «5 capítulos»: **desactualizado, ver 11** |
| **04** | `CONVENCIONES-DE-CODIGO.md` | Arquitectura práctica, convenciones y trampas del entorno | Solo si vas a tocar código |
| **05** | `TABLA-DE-CRIATURAS.md` | Las 68 entidades: qué imágenes tiene cada una, si hay prosa curada, si está publicada | Para planificar producción. **Es un archivo generado**: se regenera, no se edita |
| **06** | `CHANGELOG.md` | Hitos cronológicos, junio–julio de 2026 | Para reconstruir cómo se llegó hasta aquí |
| **07** | `COMO-AGREGAR-CAPITULO.md` | El pipeline exacto de publicación de una entidad nueva | Cuando la pregunta sea «¿cuánto cuesta agregar una criatura?». Respuesta: curaduría e ilustración, **nunca desarrollo** |
| **08** | `INVENTARIO-COMPLETO.md` | Inventario exhaustivo del repositorio: árbol, stack, duplicados, basura, y **hallazgos que requieren decisión** | Para entender el estado real, incluidos los problemas |
| **09** | `SISTEMA-DE-FUENTES.md` | Cómo funciona la trazabilidad, **las 40 fuentes** con autor/año/acceso/derechos, la matriz de citas, qué validan las herramientas y el estado de la validación | **Para todo argumento de rigor documental.** Es el activo más fuerte del proyecto |
| **10** | `SISTEMA-VISUAL-Y-ARTE.md` | Paleta con hex y rol, tipografías, reglas cerradas, el pipeline de imágenes con medidas, **las 41 piezas existentes** y qué falta | **Para dirección de arte y encargos.** Escrito para que un director de arte externo pueda encargar sin más preguntas |
| **11** | `ESTADO-PARA-POSTULACION.md` | **Las cifras exactas, contadas hoy.** Corpus, publicado, fuentes, territorio, arte, URL, qué falta | **Para cualquier documento de postulación.** Prevalece sobre todo lo demás |

**Los dos `.txt` del corpus ya están cargados en el Project** y no se repiten aquí:
`El_Grimorio_Datos_Estructurados.txt` (la base de datos, 68 bloques `@ENTIDAD`) y
`El_Grimorio_del_Archipielago_DEFINITIVO.txt` (el grimorio literario, 10 Libros y
40 capítulos, con glosario y guía de lugares al final).

---

## DECISIONES CERRADAS — NO SE RE-DISCUTEN

Estas ya se tomaron. Proponer alternativas es hacer perder el tiempo.

### De identidad y lenguaje

- El proyecto es **archivo cultural, consulta pública y mediación cultural**.
  **No** es un videojuego, una Pokédex, una colección de monstruos, un dashboard ni
  una clasificación cultural oficial. Tampoco se presenta principalmente como
  intervención educativa formal.
- La capa interactiva se llama **«relato interactivo»**, **«recorrido narrativo»**
  o **«travesía»**. **Jamás** «juego», «RPG», «niveles» ni «quests» — ni en la
  interfaz, ni en los textos, ni en la documentación.
- Los **Mundos** son recorridos curatoriales del proyecto. **No** son clasificación
  tradicional, académica ni oficial, y así debe decirse siempre.

### De fuentes

- **Nada inventado**: ni relatos, ni fuentes, ni testimonios, ni citas, ni fechas,
  ni páginas bibliográficas, ni territorios.
- **Verbatim**, con ortografía de época intacta en documentos históricos. Las
  marcas `[¿palabra?]` e `[ilegible]` del OCR se muestran tal cual.
- **Las variantes se muestran, jamás se zanjan.**
- Toda cita académica lleva `(Autor, año, p. X)` **cotejada contra el PDF o TXT
  archivado**. Lo no verificable queda `[por verificar]` y **no se publica**.
- **No se piratea.** Las fuentes de pago se declaran pendientes; el sitio nunca
  aloja un PDF para descarga y solo enlaza lo de acceso abierto.

### De estética

- Paleta abisal `#02060c` → `#15384a`, con **una sola** luz cálida ámbar `#f2b65a`
  y óxido `#a04a30` como único acento no ámbar.
- **Nunca pergamino ni textura de papel** en el sistema nuevo. Placas de bronce y
  agua abisal.
- Sin tarjetas repetidas, sin exceso de bordes redondeados ni sombras, sin estética
  genérica de IA, sin apariencia SaaS, sin elementos visuales sin función cultural.
- Pixel art de **grilla visible, sin antialiasing**. Toda pieza se rotula como
  **recreación artística**, nunca como iconografía tradicional documentada.

### De arquitectura

- HTML estático + CSS modular + JavaScript clásico. **Sin frameworks, sin npm, sin
  backend, sin cadena de compilación, sin módulos ES, sin `fetch()` estructural.**
- Rutas relativas siempre. Namespace global único: `window.Grimorio`.
- Abre con `python -m http.server 8000`.
- **Conviven dos sistemas.** El sitio antiguo (`index-legacy.html` + `pages/`)
  **no se modifica**. Se trabaja en el sistema nuevo.
- Las fichas de criatura **se generan**, no se editan a mano. Se edita la prosa y
  se regenera con `herramientas/generar_fichas.py`.
- `juicio-1880.html` («El Expediente») es la **única excepción declarada**: página
  hecha a mano, protegida en la lista `BESPOKE` del generador. Nunca se regenera.

### De trabajo

- **No se hace commit ni push sin instrucción expresa de Lucas.**
- No se hace merge hacia `main` ni se modifica el remoto por iniciativa propia.
- No se crean copias con sufijos tipo `final`, `nuevo`, `v9` o `backup`. Se
  modifican los archivos estables existentes.
- **La prosa del corpus no se edita.** Es verbatim de fuente; cualquier cambio lo
  decide Lucas.

---

## CINCO COSAS QUE CONVIENE SABER ANTES DE HABLAR

1. **El proyecto está más avanzado de lo que dice casi toda su documentación.** Si
   un documento dice 5 capítulos o 24 fichas, está viejo. Son **12 publicadas** de
   **68 documentadas**.
2. **El activo más fuerte no es el arte: es la trazabilidad.** 40 fuentes
   indexadas, 12 archivadas dentro del propio repositorio, 17 de 20 temas con
   respaldo pleno, **cero temas sin respaldo**, y un verificador automático que
   comprueba que cada párrafo publicado exista palabra por palabra en el corpus.
3. **El cuello de botella real es el arte, no el contenido.** Faltan 8 fondos de
   descenso —el fondo que se ve en teléfono— y 8 cierres, todos del bloque de la
   Recta Provincia. Los prompts ya están escritos.
4. **La expansión es editorial, no técnica.** El costo marginal de cada capítulo
   nuevo es su curaduría y su ilustración, **nunca desarrollo de software**. Está
   documentado y se ejercitó varias veces seguidas sin tocar el motor.
5. **Cuando falte un dato, se marca `[PENDIENTE DE CONFIRMAR]`.** No se completa
   por inferencia. Esa es la regla del proyecto y aplica también a las
   conversaciones sobre él.

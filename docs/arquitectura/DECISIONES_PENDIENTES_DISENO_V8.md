# Decisiones pendientes de diseño — El Grimorio del Archipiélago V8

## Propósito

Este registro separa las decisiones que puede fijar la arquitectura de aquellas que requieren trabajo del equipo de diseño, curaduría, investigación, desarrollo o instituciones colaboradoras.

No constituye una recomendación visual definitiva.

## Principios ya definidos y no pendientes

- La información educativa no se bloquea.
- Bestiario, mundos, Recta Provincia, Cosmología y fuentes están disponibles desde el primer ingreso.
- “Bestiario” aparece en la navegación principal.
- La portada ofrece tres accesos prioritarios: Bestiario, siete mundos y Recta Provincia.
- El recorrido narrativo es futuro, opcional y secundario.
- Los siete mundos se rotulan como organización curatorial.
- Las fichas muestran estado, fuentes y contenidos pendientes.
- La Recta Provincia distingue registros históricos, legendarios, interpretativos y artísticos.

## Registro de decisiones

| ID | Decisión pendiente | Pregunta a resolver | Responsables sugeridos | Dependencias | Riesgo si no se resuelve | Momento |
|---|---|---|---|---|---|---|
| D-01 | Nombre final de la sección | ¿Se confirma “Bestiario del Archipiélago” y el subtítulo propuesto? | Dirección, curaduría, diseño de contenido | Posicionamiento público | Que “Bestiario” desaparezca o excluya presencias no monstruosas | Antes de diseño de interfaz |
| D-02 | Figuras destacadas en portada | ¿Cuántas se muestran y con qué criterio: reconocimiento, mundo, estado o disponibilidad visual? | Curaduría y diseño | Inventario y encargos | Sobrerrepresentar fichas populares o pendientes | Antes de wireframes visuales |
| D-03 | Ilustraciones completas o fragmentadas | ¿Qué piezas pueden recortarse sin perder contexto ni crear iconografía falsa? | Dirección de arte y curaduría | Archivos maestros y matriz de usos | Distorsión de piezas corales | Antes de producción/exportación |
| D-04 | Ficha como página o panel | ¿La ficha tiene página propia, panel, o solución híbrida? | UX, desarrollo, accesibilidad | SEO, enlaces directos, navegación móvil | Perder URL directa, contexto o accesibilidad | Antes del prototipo navegable |
| D-05 | Densidad de texto | ¿Qué se muestra inicialmente y qué se expande sin ocultar información esencial? | Diseño de contenido, UX, curaduría | Extensión real de fichas | Saturación o simplificación excesiva | Durante wireframes visuales |
| D-06 | Mapa territorial | ¿Se implementa, con qué nivel de precisión y con qué fuentes? | Investigación, curaduría, cartografía/diseño | Validación territorial | Inventar localizaciones o fijar circulaciones inciertas | Después de investigación |
| D-07 | Audio | ¿Habrá ambiente, pronunciaciones, testimonios o ninguno? | Curaduría, sonido, accesibilidad, comunidades | Derechos, consentimiento, transcripciones | Simular voces, excluir usuarios o confundir recreación | Fase posterior |
| D-08 | Versión móvil | ¿Qué patrones concretos usarán navegación, filtros, ficha y relaciones? | UX/UI y accesibilidad | Decisión D-04 | Ocultar contenido o depender de gestos | Antes del sistema visual |
| D-09 | Voz del Grimorio | ¿Qué identidad, tono y autoridad tendrá en la experiencia futura? | Guion, curaduría, comunidades, diseño narrativo | Recorrido futuro | Confundir voz ficticia con autoridad tradicional | Fase narrativa |
| D-10 | Posición futura del juego | ¿Seguirá como página propia, modo opcional o experiencia separada? | Dirección de producto, UX, desarrollo | Alcance y pruebas | Que vuelva a dominar la arquitectura educativa | Antes de diseñar el juego |
| D-11 | Créditos institucionales | ¿Qué instituciones, equipos y comunidades se acreditan y cómo? | Producción, legal, curaduría | Convenios y aportes reales | Atribución incompleta o indebida | Antes de publicación |
| D-12 | Estados de información pendiente | ¿Qué nombres, iconos, orden y explicación tendrán los estados? | Diseño de contenido, UX, curaduría | Matriz curatorial | Que “pendiente” parezca error o que “provisional” parezca validado | Antes del sistema de componentes |

## Desarrollo de decisiones obligatorias

### D-01. Nombre final del Bestiario

**Base disponible:** “Bestiario del Archipiélago” con subtítulo “Seres, presencias y figuras de la tradición chilota”.

**Debe resolver:**

- si “Bestiario” será nombre formal o etiqueta de navegación;
- si el subtítulo aparece siempre o sólo en portada;
- cómo se evita reducir aves, barcos, memorias o figuras humanas a “monstruos”.

**No decidir aquí:** una denominación patrimonial alternativa no presente en las fuentes.

### D-02. Cantidad de figuras destacadas

**Opciones a evaluar en diseño:**

- una figura por mundo;
- un conjunto reducido y rotativo;
- ninguna figura individual, usando sólo accesos por modo;
- destacados editoriales con criterio explícito.

**Criterios mínimos:**

- estado curatorial;
- cobertura de los siete mundos;
- disponibilidad de ilustración;
- sensibilidad de representación;
- evitar que popularidad equivalga a relevancia patrimonial.

### D-03. Uso de ilustraciones completas o fragmentadas

**Preguntas:**

- ¿Qué obras son corales?
- ¿Qué personajes pueden recortarse?
- ¿Cómo se acredita el recorte?
- ¿Qué información se pierde al aislar una figura?
- ¿Se requiere fondo transparente?
- ¿Qué recortes deben prohibirse?

**Casos especialmente sensibles:** Corte del Mar, Tentén y Caicai, Invunche y Voladora, Camahueto y Cuchivilu.

### D-04. Página o panel para las fichas

**Requisitos que cualquier opción debe cumplir:**

- URL directa;
- navegación por teclado;
- historial y botón Atrás previsibles;
- retorno a búsqueda con estado conservado;
- lectura e impresión;
- enlaces a mundo, relaciones y fuentes;
- experiencia móvil completa;
- indexación y posibilidad de compartir.

La decisión visual no puede reducir la ficha a un contenido efímero sin ruta.

### D-05. Densidad de texto

**Debe definirse:**

- longitud de la definición;
- qué bloques aparecen antes del primer desplazamiento;
- si existe índice interno;
- qué secciones pueden plegarse;
- cómo se presenta un campo vacío;
- cómo se preserva la trazabilidad sin sobrecargar.

**Información que no debe ocultarse como secundaria irrelevante:** estado curatorial, fuentes, condición de recreación y contenido pendiente.

### D-06. Mapa territorial

**No implementar hasta responder:**

- qué lugares poseen fuente verificable;
- si se representa territorio, circulación o ambiente narrativo;
- qué escala es apropiada;
- cómo se muestran incertidumbre y circulación regional;
- qué contenidos requieren autorización territorial.

**Prohibición actual:** convertir ambientes generales de V7 en puntos geográficos exactos.

### D-07. Audio

**Tipos a decidir por separado:**

- ambiente sonoro;
- efectos;
- lectura de textos;
- pronunciación;
- música;
- testimonios.

**Condiciones:**

- alternativa textual;
- controles visibles;
- sin reproducción automática obligatoria;
- créditos y derechos;
- testimonios sólo con consentimiento y posibilidad de retiro;
- no presentar una recreación como registro de terreno.

### D-08. Versión móvil

**Debe prototiparse:**

- menú principal;
- búsqueda y filtros;
- índice alfabético;
- página de mundo;
- ficha extensa;
- índice interno de Recta Provincia;
- relaciones como lista;
- créditos y estados.

**No asumir:** que la versión móvil es sólo una reducción de columnas de escritorio.

### D-09. Identidad de la Voz del Grimorio

**Preguntas para fase narrativa:**

- ¿es narrador, mediador, personaje o interfaz?
- ¿habla en primera persona?
- ¿cómo declara su condición ficticia?
- ¿qué afirmaciones puede formular?
- ¿cómo deriva a fuentes?
- ¿quién revisa su tono?

**Límite:** no puede presentarse como voz de una comunidad, tradición o fallecido.

### D-10. Posición futura del juego

**Condiciones arquitectónicas:**

- entrada secundaria;
- disponibilidad independiente de todo el contenido educativo;
- progreso separado de la consulta;
- sin desbloqueo de fuentes o fichas;
- posibilidad de abandonar y volver a la consulta;
- accesibilidad equivalente.

**Debe decidirse:** si Fragmentos, Guardianes y Folios conservarán esos nombres y qué función cumplirán después de pruebas.

### D-11. Créditos institucionales

**Debe incluir, cuando exista información:**

- instituciones;
- comunidades y personas colaboradoras;
- investigación y curaduría;
- diseño y desarrollo;
- ilustración;
- fuentes de archivo;
- licencias;
- fecha y versión;
- mecanismos de corrección o retiro.

**No incorporar:** logos, avales o validaciones no confirmados.

### D-12. Estados de información pendiente

**Estados mínimos a diseñar:**

- referencia general / provisional;
- sin fuente concreta / pendiente;
- interpretación curatorial;
- variante;
- historia documentada;
- tradición;
- recreación artística;
- recreación narrativa;
- testimonio no incorporado;
- no aplica.

**Requisitos:**

- etiqueta textual;
- explicación accesible;
- no depender sólo de color;
- uso coherente en fichas, mundos, relaciones y Recta Provincia;
- enlace a la fuente o al pendiente específico.

## Otras decisiones derivadas

| ID | Tema | Decisión requerida |
|---|---|---|
| D-13 | Búsqueda | Campos indexados, sinónimos, errores ortográficos y agrupación de resultados |
| D-14 | Índice alfabético | Orden de artículos, nombres alternativos y signos diacríticos |
| D-15 | Relaciones | Vista inicial como lista, red o ambas; comportamiento de relaciones pendientes |
| D-16 | Portada de mundos | Una pieza por mundo o reutilización desigual de los diez encargos |
| D-17 | Campos vacíos | Diferenciar “pendiente”, “no documentado” y “no aplica” |
| D-18 | Cultura posterior | Alcance editorial y fuentes antes de convertirla en sección pública extensa |
| D-19 | Correcciones | Canal de reporte, responsables, trazabilidad y tiempos de respuesta |
| D-20 | Fecha de revisión | Lugar y formato de versión/última actualización de cada ficha |
| D-21 | Descargas e impresión | Qué contenido se exporta y cómo conserva fuentes, créditos y estados |
| D-22 | Accesibilidad visual | Contraste, escalado, foco, lectura sin imágenes y movimiento reducido |
| D-23 | Lenguaje | Glosario, vocabulario territorial y revisión de nombres |
| D-24 | Analítica | Si se usa, qué se mide sin convertir popularidad en criterio curatorial |

## Decisiones que requieren investigación antes de diseño

- ubicaciones y cronologías de la Recta Provincia;
- genealogías de la Corte del Mar;
- reglas o contextos del canto del Chucao;
- delimitación chilota de Raiquén, Piuchén, Cuero del Agua y Chonchón/Tuetué;
- representación de Fiura e Invunche;
- testimonios y memoria de Ánimas de Cucao;
- atributos y poderes de Camahueto;
- tripulaciones y relaciones del Caleuche;
- nombres y variantes de Tentén y Caicai.

## Decisiones que pueden prototiparse sin cerrar contenido

- visibilidad del Bestiario en navegación;
- tres accesos principales de Inicio;
- cuatro modos de consulta;
- estructura común de ficha;
- estructura diferenciada de Recta Provincia;
- rutas entre mundo, ficha, relación y fuente;
- estados vacíos explícitos;
- patrón móvil de navegación y filtros;
- bloque secundario del recorrido futuro.

## Criterio de cierre de esta lista

Una decisión puede marcarse como resuelta sólo si registra:

1. decisión tomada;
2. responsable;
3. fecha;
4. fundamento;
5. fuentes o pruebas utilizadas;
6. impacto en contenido y accesibilidad;
7. archivos o pantallas afectados;
8. si requiere nueva revisión curatorial.

# Mapa de sitio — El Grimorio del Archipiélago V8

## Propósito

Este documento reorganiza el contenido existente de V7 para que el proyecto pueda comprenderse primero como una plataforma pública de consulta patrimonial y educativa.

La arquitectura V8 debe hacer visibles desde el primer ingreso:

- el Bestiario;
- los siete mundos;
- las fichas enciclopédicas;
- la Recta Provincia;
- las relaciones entre figuras;
- las fuentes, estados curatoriales y contenidos pendientes.

El recorrido narrativo, los Fragmentos, Guardianes y Folios se conservan como una fase futura, opcional y no necesaria para acceder a información.

## Principios de arquitectura

1. La información educativa nunca está bloqueada.
2. “Bestiario” aparece como nombre explícito en la navegación principal.
3. Una figura puede encontrarse por mundo, alfabeto, búsqueda o relaciones.
4. Mundo y figura son unidades complementarias: el mundo aporta contexto; la ficha aporta profundidad.
5. La Recta Provincia posee arquitectura propia y no se reduce a una ficha o a un mundo más.
6. Fuentes, tipo de afirmación y estado curatorial permanecen accesibles junto al contenido que califican.
7. Los siete mundos son una organización curatorial del proyecto, no una clasificación tradicional oficial.
8. La recreación artística se distingue de tradición, variante, interpretación e historia documentada.

## Navegación principal

Orden recomendado:

1. **Inicio**
2. **Los siete mundos**
3. **Bestiario**
4. **Recta Provincia**
5. **Cosmología y relaciones**
6. **Fuentes y metodología**
7. **Recorrido narrativo — Próximamente**

Elementos utilitarios, fuera de la navegación temática:

- búsqueda global;
- accesibilidad;
- acerca del proyecto;
- créditos;
- reportar un error, cuando exista un canal definido.

## Árbol de páginas

```text
Inicio
├── Explorar el Bestiario
├── Conocer los siete mundos
├── Abrir el expediente de la Recta Provincia
├── Cosmología y relaciones
├── Fuentes y metodología
└── Recorrido narrativo — Próximamente

Los siete mundos
├── Índice general
├── Mundo I — Origen y transformación del territorio
│   ├── Tentén Vilu
│   └── Caicai Vilu
├── Mundo II — Corte y habitantes del mar
│   ├── Millalobo
│   ├── Huenchula
│   ├── Pincoya
│   ├── Pincoy
│   ├── Sirena Chilota
│   └── Caballo Marino Chilote
├── Mundo III — Bruma y mar nocturno
│   └── Caleuche
├── Mundo IV — Monte, senderos y presagios
│   ├── Trauco
│   ├── Fiura
│   ├── Chucao
│   ├── Raiquén
│   └── Piuchén
├── Mundo V — Aguas interiores y barro
│   ├── Camahueto
│   ├── Cuchivilu
│   └── Cuero del Agua
├── Mundo VI — Recta Provincia y poder secreto
│   └── Acceso contextual a la sección Recta Provincia
└── Mundo VII — Muertos, costa y caminos
    ├── Ánimas de Cucao
    └── La Condená

Bestiario del Archipiélago
├── Portada del Bestiario
├── Explorar por mundo
├── Índice alfabético
├── Buscar
├── Explorar relaciones
└── 24 fichas enciclopédicas

Recta Provincia
├── Introducción
├── Historia documentada
├── Organización legendaria
├── Figuras asociadas
│   ├── Brujo de la Recta Provincia
│   ├── Voladora
│   ├── Invunche
│   ├── Chonchón / Tuetué
│   └── Basilisco
├── Lugares y conceptos
├── Cultura posterior
├── Fuentes
└── Contenidos pendientes

Cosmología y relaciones
├── Los siete mundos como organización curatorial
├── Relaciones entre figuras
├── Relaciones entre mundos
├── Leyenda de tipos de relación
└── Accesos a mundos y fichas

Fuentes y metodología
├── Alcance del proyecto
├── Tipos de contenido y sellos
├── Fuentes disponibles
├── Matriz de afirmaciones
├── Criterios de representación
├── Protocolo futuro para testimonios
├── Créditos y licencias
└── Agenda de investigación

Recorrido narrativo — Próximamente
├── Presentación de la experiencia futura
├── Relación con los siete mundos
├── Estado de desarrollo
└── Aviso: la consulta educativa ya está disponible
```

## Navegación secundaria

### En Los siete mundos

- Índice de mundos.
- Mundo anterior / mundo siguiente como apoyo, no como progresión obligatoria.
- Figuras de este mundo.
- Relaciones de este mundo.
- Fuentes y pendientes del mundo.
- Volver al índice.

### En el Bestiario

- Por mundo.
- Alfabético.
- Buscar.
- Relaciones.
- Filtros por naturaleza, ambiente y estado curatorial.

Los filtros no deben crear nuevas clasificaciones patrimoniales. Son herramientas de consulta construidas con campos ya existentes.

### En una ficha

- Volver al resultado o índice de origen.
- Ir al mundo correspondiente.
- Abrir figuras relacionadas.
- Ver relaciones.
- Consultar fuentes y estado curatorial.
- Pasar a figura anterior / siguiente sólo dentro del índice activo.

### En Recta Provincia

Navegación interna persistente o fácilmente recuperable:

- Introducción.
- Historia documentada.
- Organización legendaria.
- Figuras asociadas.
- Lugares y conceptos.
- Cultura posterior.
- Fuentes.
- Pendientes.

### En Cosmología y relaciones

- Todos los tipos.
- Parentesco.
- Oposición.
- Territorio.
- Asociación legendaria.
- Comparación.
- Continuidad narrativa.

La continuidad narrativa debe rotularse como construcción del proyecto y no confundirse con relación tradicional.

## Relaciones entre páginas

| Página de origen | Página relacionada | Motivo del vínculo |
|---|---|---|
| Inicio | Bestiario | Producto principal y acceso prioritario |
| Inicio | Los siete mundos | Contexto general de la colección |
| Inicio | Recta Provincia | Expediente temático destacado |
| Mundo | Ficha | La figura concreta desarrolla el contexto del mundo |
| Ficha | Mundo | El mundo explica ambiente, comparación y red |
| Ficha | Ficha relacionada | Parentesco, oposición, territorio, asociación o comparación |
| Recta Provincia | Fichas asociadas | Profundización enciclopédica sin perder el registro histórico/legendario |
| Cosmología | Mundo o ficha | Salida desde la relación hacia contenido legible |
| Fuente o metodología | Afirmación, mundo o ficha | Trazabilidad del contenido |
| Recorrido futuro | Mundo o ficha | La experiencia se construye sobre contenidos públicos ya existentes |

## Rutas de entrada

La arquitectura debe aceptar entradas directas sin exigir pasar por Inicio.

### Entrada general

`Inicio → Bestiario / Siete mundos / Recta Provincia`

### Entrada desde buscador externo o enlace compartido

`Ficha individual → resumen → estado curatorial → mundo → figuras relacionadas`

### Entrada temática

`Mundo → figuras principales → figura secundaria o comparación → fuentes`

### Entrada alfabética

`Bestiario → índice alfabético → ficha → relaciones`

### Entrada por pregunta o palabra clave

`Búsqueda → resultados agrupados → ficha o mundo → fuente correspondiente`

### Entrada documental

`Recta Provincia → historia documentada → fuentes → organización legendaria`

### Entrada relacional

`Cosmología y relaciones → vínculo → ficha A / ficha B → mundo`

## Rutas de consulta prioritarias

### Reconocer una figura

`Bestiario → buscar nombre → lectura breve → señales / ambiente → estado curatorial`

### Comprender un mundo

`Índice de mundos → página de mundo → figuras → relaciones → fuentes y pendientes`

### Comparar figuras

`Ficha → figuras relacionadas → vista de relación → segunda ficha`

### Verificar una afirmación

`Ficha o Recta Provincia → datos respaldados / tipo de contenido → fuente → pendiente específico`

### Investigar el archivo incompleto

`Fuentes y metodología → agenda de investigación → contenidos pendientes → fichas afectadas`

## Jerarquía de los siete mundos

Los mundos deben mostrarse como siete puertas equivalentes de consulta. La numeración conserva orden editorial, pero no bloquea ni obliga a una secuencia.

| Mundo | Título | Función de consulta |
|---|---|---|
| I | Origen y transformación del territorio | Introduce tierra, agua, refugio y transformación |
| II | Corte y habitantes del mar | Presenta la red marina y genealogías variables |
| III | Bruma y mar nocturno | Profundiza en señales y variantes del Caleuche |
| IV | Monte, senderos y presagios | Distingue figura, ave, señal y lectura crítica |
| V | Aguas interiores y barro | Compara figuras a través de ambientes |
| VI | Recta Provincia y poder secreto | Abre el expediente especializado |
| VII | Muertos, costa y caminos | Distingue aparición, presagio, memoria y duelo |

## Ubicación futura del recorrido narrativo

El recorrido debe existir como séptimo ítem de la navegación principal, con el rótulo **“Recorrido narrativo — Próximamente”**.

En Inicio aparece después de los tres accesos principales, mediante un bloque secundario:

> Próximamente: una experiencia guiada a través de los siete mundos.

La página futura puede explicar:

- que usará los mismos mundos y fichas;
- que será opcional;
- que podrá incorporar Fragmentos, Guardianes y Folios;
- que no desbloqueará información educativa;
- que su progreso no afectará la consulta pública;
- que la Voz del Grimorio pertenecerá a la mediación narrativa, no a la autoridad patrimonial.

## Comportamiento en escritorio

- Navegación principal visible y estable.
- Búsqueda global accesible desde la cabecera.
- Índices y filtros pueden compartir la pantalla con resultados si el espacio lo permite.
- La página de mundo puede presentar contexto y listado de figuras en columnas, sin imponer una composición visual definitiva.
- La ficha debe tener URL propia aunque el diseño final decida mostrarla inicialmente como página, panel o solución híbrida.
- Las relaciones deben poder leerse como listado textual incluso si se incorpora una visualización gráfica.
- Fuentes y estado curatorial no deben depender de hover.
- El regreso conserva consulta, filtros y posición cuando sea técnicamente posible.

## Comportamiento en móvil

- Menú principal contraíble con “Bestiario” visible en el primer nivel.
- Búsqueda disponible sin recorrer todo el menú.
- Filtros en un control expandible, con resumen de filtros activos.
- Resultados en una sola columna.
- Navegación secundaria del mundo o expediente mediante índice local desplegable.
- Fichas en lectura vertical; ningún dato queda oculto exclusivamente en pestañas horizontales.
- Relaciones disponibles como lista antes o además de cualquier diagrama.
- Ilustraciones recortables sin esconder crédito, texto alternativo o condición de recreación.
- Botones, enlaces y controles con etiquetas textuales; no depender sólo de glifos.
- El bloque “Recorrido narrativo — Próximamente” permanece secundario y no ocupa la primera pantalla por encima de los accesos educativos.

## Reglas de URL y rotulación

Rutas conceptuales recomendadas, sujetas a definición técnica posterior:

```text
/
/mundos/
/mundos/origen/
/mundos/corte-del-mar/
/bestiario/
/bestiario/alfabetico/
/bestiario/relaciones/
/bestiario/caleuche/
/recta-provincia/
/cosmologia-relaciones/
/fuentes-metodologia/
/recorrido-narrativo/
```

Cada ficha y mundo debe tener:

- título único;
- descripción breve;
- ruta directa;
- migas de pan o contexto equivalente;
- enlaces internos legibles;
- estado curatorial;
- fecha o versión de revisión cuando exista.

## Fuera del alcance de esta arquitectura

- bloqueos;
- progreso obligatorio;
- localStorage;
- quizzes;
- nuevas mecánicas;
- diseño visual definitivo;
- animaciones complejas;
- mapa territorial con ubicaciones no verificadas;
- nuevos contenidos patrimoniales;
- testimonios no autorizados.

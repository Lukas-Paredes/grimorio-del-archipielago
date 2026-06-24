# Pruebas de la arquitectura actual

Fecha: 24 de junio de 2026

## Entorno

- Repositorio: `grimorio-del-archipielago`.
- Rama: `v8-arquitectura`.
- Navegador integrado basado en Chromium.
- Vista de escritorio predeterminada.
- Vista móvil: 390 × 844 px.
- Servidor HTTP temporal utilizado únicamente para automatizar la prueba funcional.
- Arquitectura de producción: archivos estáticos compatibles con apertura local.

## Compatibilidad con `file://`

La política de seguridad del navegador automatizado bloqueó la navegación directa a una URL `file://`. No se utilizó un navegador alternativo ni un mecanismo de evasión.

Se realizó una auditoría estática específica:

- nueve páginas HTML con rutas relativas;
- cero referencias locales inexistentes;
- cero usos de `fetch()`;
- cero módulos ES o `type="module"`;
- cero usos de `localStorage` o `sessionStorage`;
- cero dependencias de npm, bundler, base de datos o servidor;
- scripts clásicos cargados con `defer`;
- datos compartidos bajo `window.Grimorio`.

La interacción y el renderizado se validaron en un servidor local temporal. La apertura manual mediante doble clic queda como comprobación externa pendiente por la limitación del navegador automatizado.

## Resultados

| N.º | Prueba | Evidencia | Resultado |
|---:|---|---|---|
| 1 | Abrir `index.html` mediante `file://` | Navegación bloqueada por política del navegador integrado; auditoría estática de compatibilidad aprobada | Limitación del entorno |
| 2 | Navegar a todas las páginas | Se abrieron Inicio, Bestiario, ficha, mundos, mundo, Recta Provincia, Cosmología, Metodología y Recorrido | Aprobada |
| 3 | Abrir Bestiario sin progreso | Mostró 24 resultados inmediatamente, sin bloqueos ni estado de juego | Aprobada |
| 4 | Buscar Caleuche | Consulta `q=Caleuche`; un resultado: Caleuche | Aprobada |
| 5 | Filtrar por mundo | Mundo V mostró Camahueto, Cuchivilu y Cuero del Agua | Aprobada |
| 6 | Abrir vista rápida | Diálogo de Caleuche con definición, ambiente, señales, estado y enlaces | Aprobada |
| 7 | Abrir ficha completa | `figura.html?id=caleuche`; doce bloques enciclopédicos visibles | Aprobada |
| 8 | Volver al resultado anterior | Regreso a `bestiario.html?q=Caleuche`; consulta y resultado conservados | Aprobada |
| 9 | Abrir los siete mundos | Siete tarjetas y siete enlaces directos | Aprobada |
| 10 | Comprobar aclaración curatorial | Texto visible: los mundos no constituyen una clasificación tradicional oficial | Aprobada |
| 11 | Abrir Recta Provincia | Siete secciones: historia, organización legendaria, figuras, lugares, cultura, fuentes y pendientes | Aprobada |
| 12 | Abrir Cosmología | Siete mundos y 23 relaciones en vista textual | Aprobada |
| 13 | Abrir fuentes | Metodología mostró tres fuentes/estados disponibles y agenda de investigación | Aprobada |
| 14 | Comprobar URLs con parámetros | `figura.html?id=caleuche` y `mundo.html?id=waters` renderizaron contenido correcto | Aprobada |
| 15 | Probar teclado | Menú móvil accesible, `aria-expanded` actualizado y foco visible definido en CSS | Aprobada |
| 16 | Cerrar vista rápida con Escape | Diálogo abierto y cerrado mediante Escape después de reforzar el manejo explícito | Aprobada |
| 17 | Probar a 390 px | Nueve rutas revisadas a 390 × 844 px | Aprobada |
| 18 | Comprobar ausencia de desborde | `scrollWidth` no superó el ancho visible en ninguna de las nueve rutas | Aprobada |
| 19 | Revisar enlaces relativos | Nueve HTML analizados; cero referencias locales inexistentes | Aprobada |
| 20 | Revisar consola sin errores | Cero mensajes `error` o `warn` durante la prueba final | Aprobada |

## Pruebas de datos y estructura

| Indicador | Resultado |
|---|---:|
| Fichas | 24 |
| Mundos | 7 |
| Relaciones | 23 |
| Variantes registradas | 14 |
| Afirmaciones curatoriales | 28 |
| Encargos de ilustración | 10 |
| Identificadores de figura duplicados | 0 |
| Fichas sin mundo válido | 0 |
| Relaciones con extremos inexistentes | 0 |
| Fichas prioritarias con campos obligatorios | 7/7 |
| Archivos JavaScript con errores de sintaxis | 0 |

Fichas prioritarias verificadas:

- Caleuche;
- Pincoya;
- Trauco;
- Camahueto;
- Invunche;
- Tentén Vilu;
- Caicai Vilu.

## Correcciones realizadas durante las pruebas

1. Se añadió un manejador explícito de Escape para cerrar la vista rápida de forma fiable.
2. Se corrigió el ancho mínimo de elementos dentro de rejillas responsive.
3. Se ajustó el tamaño y quiebre de encabezados largos en móvil.

## Limitaciones reales

- El navegador automatizado no permitió abrir una URL `file://`; la compatibilidad se verificó por arquitectura y análisis estático, pero requiere una comprobación manual final con doble clic.
- No existen todavía las diez ilustraciones profesionales.
- No se realizó auditoría externa con lector de pantalla.
- No existe validación patrimonial, territorial, institucional o comunitaria.
- Las referencias disponibles continúan siendo generales y sin páginas específicas.

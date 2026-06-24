# Guía y registro de pruebas — V7

Fecha: 23 de junio de 2026  
Archivo: `el_grimorio_del_archipielago_v7.html`

## Entorno

- Chromium integrado de Codex.
- Servidor local sobre `127.0.0.1`.
- Escritorio: 1280 × 720.
- Móvil: 390 × 844, ancho útil de 375 px.
- Estado limpio mediante orígenes locales separados.
- Consola revisada para errores y advertencias.

La query `?qa=1` habilita dos controles internos de desarrollo para completar y avanzar mundos durante pruebas de regresión. No aparecen al abrir normalmente el HTML.

## Pruebas obligatorias

| Nº | Prueba | Evidencia | Resultado |
|---:|---|---|---|
| 1 | Portada | Título, Biblioteca sellada, acceso principal, accesibilidad y acceso curatorial. | Aprobada |
| 2 | Prólogo | Explica lore mínimo, tres registros y función de Guardianes. | Aprobada |
| 3 | Siete capítulos | Se recorrieron en orden desde Origen hasta Muertos y caminos. | Aprobada |
| 4 | Interacción diferente | Marea, red submarina, luces, senderos, rastros, expediente y faroles. | Aprobada |
| 5 | Mínimo tres Fragmentos | Cada capítulo posee cuatro; el Guardián aparece al reunir tres. | Aprobada |
| 6 | Siete Encuentros | Se reveló e integró un encuentro por mundo. | Aprobada |
| 7 | Siete Guardianes | Los siete capítulos declaran Guardianes o conjuntos de Guardianes. | Aprobada |
| 8 | Siete Folios | Se verificó el indicador final `7 de 7 Folios`. | Aprobada |
| 9 | Biblioteca desbloqueada | Se abrió desde el epílogo después del séptimo Folio. | Aprobada |
| 10 | Fichas en tres capas | Caleuche: lectura rápida, relato y contexto, archivo curatorial. | Aprobada |
| 11 | Contenido mínimo | 1.100–1.260 palabras por capítulo; campos dentro de rangos V7. | Aprobada |
| 12 | Datos con fuente | 28 elementos; toda entrada `fact` posee `sourceIds`. | Aprobada |
| 13 | Variantes | Dos variantes explicadas por capítulo. | Aprobada |
| 14 | Relaciones | 23 relaciones tipadas y explicadas. | Aprobada |
| 15 | CTA narrativos | Cada transición usa una acción propia del mundo. | Aprobada |
| 16 | Checklist antiguo ausente | Barrido del HTML final. | Aprobada |
| 17 | “Registrar consulta” ausente | Barrido del HTML final. | Aprobada |
| 18 | Mecánicas tradicionales ausentes | Barrido de HP, XP, daño, combate, enemigos y equivalentes. | Aprobada |
| 19 | Territorios retirados ausentes | Barrido con y sin tildes. | Aprobada |
| 20 | Migración de estado | Función de migración y mapeo V6→V7 inspeccionados; preserva datos compatibles. | Aprobada por inspección |
| 21 | Recarga | Tras completar la ruta, la portada conservó siete Folios y Biblioteca. | Aprobada |
| 22 | Reinicio | Acción separada conserva Biblioteca, favoritos, historial y bitácora. | Aprobada por inspección |
| 23 | Móvil | Menú móvil visible y sin desborde horizontal a 390 × 844. | Aprobada |
| 24 | Teclado | Controles semánticos, foco visible y Escape para cerrar paneles. | Aprobada |
| 25 | Movimiento reducido | Regla `prefers-reduced-motion` y pausa manual presentes. | Aprobada |
| 26 | Consola limpia | Sin errores ni advertencias de la página durante el recorrido. | Aprobada |
| 27 | Enlaces de fuentes | Enlaces “Ver referencia” presentes en contenido y fichas. | Aprobada |
| 28 | Fallbacks visuales | Siete escenas CSS ricas; sin mensajes de producción visibles. | Aprobada |
| 29 | Modo curatorial | Confirmación abre Biblioteca sin completar la ruta. | Aprobada |
| 30 | Biblioteca libre | Mundos, figuras, señales, territorios, variantes, relaciones, Recta Provincia, encuentros, Folios y fuentes. | Aprobada |

## Pruebas editoriales automáticas

Resultado medido en navegador:

| Campo | Resultado |
|---|---:|
| Capítulos | 7 |
| Encuentros | 7 |
| Fragmentos | 28 |
| Fichas | 24 |
| Datos o contenidos interesantes | 28 |
| Curiosidades factuales con `sourceIds` | 100% |
| Capítulos con Guardián | 7/7 |
| Renderizadores específicos | 7/7 |

### Conteo por capítulo

| Capítulo | Total aproximado | Apertura | Explicación | Cierre |
|---|---:|---:|---:|---:|
| Origen | 1.261 | 191 | 358 | 139 |
| Corte del Mar | 1.134 | 181 | 356 | 130 |
| Caleuche | 1.128 | 183 | 355 | 128 |
| Monte | 1.100 | 180 | 353 | 123 |
| Aguas interiores | 1.096 | 183 | 353 | 121 |
| Recta Provincia | 1.104 | 181 | 352 | 123 |
| Muertos y caminos | 1.104 | 180 | 357 | 120 |

## Regresión rápida

1. Abrir el HTML sin query.
2. Entrar al prólogo y luego al Origen.
3. Activar tres Fragmentos.
4. Confirmar que aparece el Guardián.
5. Elegir una opción en cada fase.
6. Integrar el Folio y avanzar.
7. Comprobar que el mundo siguiente usa otra composición.
8. Completar la ruta o usar `?qa=1` para una regresión rápida.
9. Abrir Biblioteca y probar búsqueda, vistas y ficha.
10. Recargar y comprobar persistencia.
11. Revisar a 390 px y verificar consola.

## Limitaciones

- No se probaron obras profesionales porque aún no existen.
- No existe audio definitivo; se probaron alternativas textuales.
- No se realizó auditoría externa con lectores de pantalla.
- La migración V6 fue validada estructuralmente, pero no incluye traducción de hotspots administrativos porque su significado cambió.
- No se validó contenido con instituciones, especialistas o comunidades.

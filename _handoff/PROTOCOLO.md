# PROTOCOLO — apertura y cierre de sesión (las dos máquinas)

Órdenes estándar para trabajar el Grimorio con Claude Code alternando entre
las dos máquinas (casa / la otra). El estado viaja por git; el traspaso vive
en `_handoff/HANDOFF.md`. Nada de estado importante queda solo-local.

---

## APERTURA (pegar como primer mandato de la sesión)

> Lee EN ESTE ORDEN: (1) MAPA-PROYECTO.md — el proyecto entero; (2) la última
> migración en _handoff/migraciones/ — qué pasó ayer; (3) _handoff/HANDOFF.md
> y herramientas/pendientes.md — el detalle; (4) CLAUDE.md → Decisiones.
> Confirma con `git status` que estás en v8-arquitectura con árbol limpio,
> haz `git pull`, y reporta: último commit, qué quedó pendiente, y espera mi
> primer mandato. No toques nada todavía.

Checklist de apertura (lo hace Code):
1. **Leer `MAPA-PROYECTO.md`** (el todo) → luego la migración más reciente de
   `_handoff/migraciones/` (el ayer) → luego `HANDOFF.md` (el detalle).
2. `git branch --show-current` → debe ser `v8-arquitectura`.
3. `git status` limpio; si hay restos locales, PARAR y reportar antes de nada.
4. `git pull` (ff-only). Si hay error de autenticación → parar y avisar.
5. Reportar estado y esperar mandato. **No montar nada sin mandato.**

## CIERRE (pegar como último mandato de la sesión)

> Cierra la sesión: actualiza _handoff/HANDOFF.md (fecha, máquina, todo lo
> hecho con hashes de commit, estado exacto, qué sigue, decisiones abiertas),
> registra en CLAUDE.md (sección Decisiones) las decisiones nuevas si las
> hubo, y haz commit+push final. Confirma árbol limpio y sincronizado con
> `git rev-parse HEAD @{u}`.

Checklist de cierre (lo hace Code):
1. Nada sin commitear (`git status` limpio tras el commit final).
2. `_handoff/HANDOFF.md` actualizado (es el documento de traspaso).
3. **Archivo de migración fechado NUEVO** en `_handoff/migraciones/`
   (`MIGRACION-AAAA-MM-DD.md`): estado del repo, commits de la sesión con
   hash, estado exacto del trabajo, decisiones vigentes, QUÉ SIGUE por
   prioridad, y la orden de apertura para retomar. Es el historial de
   traspasos; nunca se sobreescribe uno anterior.
4. **`CHANGELOG.md` (raíz) al día**: si la sesión cerró un HITO grande
   (no cada commit), se registra con fecha y resumen.
5. Decisiones nuevas → sección «Decisiones» de `CLAUDE.md`, con fecha.
6. Push + verificación `git rev-parse HEAD @{u}` (deben coincidir).
7. Reporte final con URLs locales para QA si hubo montaje.

## Reglas fijas del traspaso

- **Una sola fuente de verdad de estado**: el repo. OneDrive sincroniza la
  carpeta, pero el traspaso VÁLIDO es el push (OneDrive puede demorar o
  conflictuar; git no).
- **Crudos nuevos** (imágenes/audio recién generados): la bandeja local
  `entrada/` / `_entrada-audio/` NO viaja (está en .gitignore). Lo que deba
  viajar se normaliza y commitea en la misma sesión, o se anota en el
  HANDOFF como «quedó en la bandeja de <máquina>».
- **Papers/fuentes**: siempre a `fuentes/_raw/` (+ `lecturas/` para la capa
  académica) siguiendo la política de archivo de CLAUDE.md → Decisiones.
- **Gotchas conocidos por máquina**: descarga con TLS/schannel puede requerir
  `--ssl-no-revoke`; el navegador cachea agresivo (Ctrl+Shift+R tras cambios
  en JS/CSS/datos); OneDrive puede demorar la primera lectura de archivos
  recién renombrados; el preview de Code no puede sacar screenshots (QA
  visual = ojo humano).

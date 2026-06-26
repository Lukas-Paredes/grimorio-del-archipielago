# Trabajar desde otro computador

Guía simple para continuar **El Grimorio del Archipiélago** desde otro equipo usando GitHub Desktop y Claude Code.

## Primera vez en el computador de casa

1. Instala GitHub Desktop.
2. Inicia sesión con la misma cuenta de GitHub que tiene acceso al repositorio privado.
3. Clona el repositorio `grimorio-del-archipielago`.
4. Elige una carpeta local clara, por ejemplo `Documentos/GitHub/grimorio-del-archipielago`.
5. Abre el repositorio en GitHub Desktop.
6. Cambia de `main` a `v8-arquitectura`.
7. Ejecuta `Fetch origin` y luego `Pull origin` cuando GitHub Desktop indique que hay cambios remotos.
8. Abre la carpeta raíz del repositorio en una terminal.
9. Ejecuta:

```bash
python -m http.server 8000
```

10. Abre en el navegador:

```text
http://localhost:8000/
```

11. Inicia Claude Code desde la raíz del repositorio:

```bash
claude
```

## Sesiones posteriores

1. Abre GitHub Desktop.
2. Confirma que la rama activa sea `v8-arquitectura`.
3. Verifica que no existan cambios locales inesperados.
4. Ejecuta `Fetch origin`.
5. Ejecuta `Pull origin` si hay cambios remotos.
6. Abre Claude Code en la carpeta raíz del repositorio.
7. Trabaja sobre los archivos existentes.
8. Revisa los cambios en GitHub Desktop.
9. Haz commit y push manualmente después de revisar.

## Advertencias importantes

- No clones repetidamente el repositorio si ya tienes una copia vigente.
- No trabajes en dos copias distintas sin saber cuál es la actual.
- No edites la misma rama simultáneamente con Codex y Claude Code.
- No hagas cambios en el trabajo y en la casa al mismo tiempo sin sincronizar.
- Siempre haz push antes de cambiar de computador.
- Siempre haz pull al comenzar en el otro computador.
- No presiones “Create Pull Request” salvo que quieras fusionar ramas.
- No mezcles todavía `v8-arquitectura` con `main`.
- No crees carpetas como `final`, `nuevo`, `v9` o `backup` para guardar otra copia del sitio.

## Regla práctica

Cuando cambies de computador, piensa en este orden:

```text
equipo anterior: revisar → commit → push
equipo nuevo: fetch → pull → trabajar
```

Si GitHub Desktop muestra cambios locales que no reconoces, detente y revísalos antes de hacer pull, commit o push.

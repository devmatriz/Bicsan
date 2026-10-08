# Guía de contribución

Este documento describe cómo se trabaja con Git y GitHub en BICSAN.

## Ramas

| Rama | Para qué sirve | Se crea desde | Se une a |
|---|---|---|---|
| `main` | Código en producción. Solo recibe cambios probados. | — | — |
| `develop` | Integración de las funciones terminadas. | `main` | `main` (con un PR de versión) |
| `feature/<tema>` | Una función nueva. Ej.: `feature/nuevo-logo` | `develop` | `develop` |
| `fix/<tema>` | Corrección de un error. Ej.: `fix/readme-conflicto` | `develop` | `develop` |
| `hotfix/<tema>` | Corrección urgente en producción. | `main` | `main` y `develop` |
| `chore/<tema>`, `docs/<tema>` | Configuración, herramientas o documentación. | `develop` | `develop` |

Reglas:

- Nadie hace commits directos en `main` ni en `develop`; todo entra por Pull Request.
- Una rama trata un solo tema. Si el cambio crece, se divide en varias ramas.
- Los nombres de rama van en minúsculas y con guiones.

## Mensajes de commit: Conventional Commits

Formato:

```
<tipo>(<alcance opcional>): <descripción en imperativo y minúsculas>

<cuerpo opcional: qué cambia y por qué>
```

| Tipo | Cuándo se usa |
|---|---|
| `feat` | Una función nueva para el usuario. |
| `fix` | La corrección de un error. |
| `docs` | Solo documentación. |
| `style` | Formato del código, sin cambiar su comportamiento. |
| `refactor` | Cambio de código que no agrega funciones ni corrige errores. |
| `perf` | Mejora de rendimiento. |
| `test` | Agrega o corrige pruebas. |
| `build` | Dependencias o empaquetado (`requirements.txt`, `build.sh`). |
| `ci` | Integración continua. |
| `chore` | Tareas de mantenimiento. |
| `revert` | Revierte un commit anterior. |

Alcances usados en el proyecto: `ui`, `aportes`, `auth`, `db`, `api`, `seguridad`, `readme`, `deploy`.

Ejemplos:

```
feat(ui): reemplaza logo e icono por el nuevo logo de BICSAN
fix(aportes): valida el largo maximo del mensaje en el formulario
docs(readme): documenta los endpoints de la API
```

Un cambio que rompe compatibilidad lleva `!` después del tipo (`feat(api)!: ...`) y una línea `BREAKING CHANGE:` en el cuerpo.

### Validación automática

El repositorio incluye un *hook* que rechaza los mensajes que no siguen este formato. Se activa una sola vez por computadora:

```bash
git config core.hooksPath .githooks
```

## Flujo de trabajo

```bash
# 1. Actualizar develop
git switch develop
git pull origin develop

# 2. Crear la rama del cambio
git switch -c feature/mi-cambio

# 3. Trabajar y hacer commits pequeños
git add <archivos>
git commit -m "feat(ui): agrega ..."

# 4. Comprobar que todo funciona
python manage.py check
python manage.py test

# 5. Subir la rama
git push -u origin feature/mi-cambio
```

6. En GitHub se abre un Pull Request hacia `develop` y se completa la plantilla.
7. Se revisa la pestaña **Files changed** y se une con **Create a merge commit**.
8. Cuando `develop` está listo para publicar, se abre un PR de `develop` hacia `main` y se crea una etiqueta de versión (`v1.1.0`, `v1.2.0`, ...).

## Versiones

Se usa versionado semántico, `MAYOR.MENOR.PARCHE`:

- `MAYOR`: cambios que rompen compatibilidad.
- `MENOR`: funciones nuevas (`feat`).
- `PARCHE`: correcciones (`fix`).

```bash
git switch main
git pull origin main
git tag -a v1.1.0 -m "v1.1.0: nuevo logo y flujo de trabajo"
git push origin v1.1.0
```

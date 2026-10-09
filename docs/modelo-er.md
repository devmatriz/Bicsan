# Modelo Entidad-Relación (3FN)

Modelo de datos de BICSAN. Las tablas de `auth` y `allauth` son las que Django y
django-allauth crean; las de `aportes` son propias del proyecto.

```mermaid
erDiagram
    REGION ||--o{ COMUNIDAD : "agrupa"
    COMUNIDAD ||--o{ APORTE : "recibe"
    USUARIO ||--o{ APORTE : "envía"
    USUARIO ||--o{ APORTE : "revisa"
    USUARIO ||--o{ USUARIO_GRUPO : "pertenece"
    GRUPO ||--o{ USUARIO_GRUPO : "contiene"
    GRUPO ||--o{ GRUPO_PERMISO : "tiene"
    PERMISO ||--o{ GRUPO_PERMISO : "se asigna"
    USUARIO ||--o{ CORREO : "registra"
    USUARIO ||--o{ CUENTA_SOCIAL : "vincula"
    USUARIO ||--o{ AUTENTICADOR : "configura"

    REGION {
        bigint id PK
        varchar nombre UK "60"
    }
    COMUNIDAD {
        bigint id PK
        varchar nombre UK "100"
        bigint region_id FK "nulo = presente en todo el país"
    }
    APORTE {
        bigint id PK
        bigint usuario_id FK "autor"
        bigint comunidad_id FK
        varchar nombre "120"
        text mensaje "máx. 5000"
        bool revisado
        bigint revisado_por_id FK "moderador"
        datetime creado
    }
    USUARIO {
        int id PK "auth_user"
        varchar username UK
        varchar email
        varchar password "hash PBKDF2"
        bool is_staff
        bool is_superuser
        bool is_active
        datetime last_login
    }
    GRUPO {
        int id PK "auth_group"
        varchar name UK "Colaborador, Moderador"
    }
    PERMISO {
        int id PK "auth_permission"
        varchar codename "revisar_aporte, ..."
        int content_type_id FK
    }
    USUARIO_GRUPO {
        int id PK "auth_user_groups"
        int user_id FK
        int group_id FK
    }
    GRUPO_PERMISO {
        int id PK "auth_group_permissions"
        int group_id FK
        int permission_id FK
    }
    CORREO {
        int id PK "account_emailaddress"
        int user_id FK
        varchar email
        bool verified
        bool primary
    }
    CUENTA_SOCIAL {
        int id PK "socialaccount_socialaccount"
        int user_id FK
        varchar provider "google"
        varchar uid
    }
    AUTENTICADOR {
        int id PK "mfa_authenticator"
        int user_id FK
        varchar type "totp, recovery_codes"
        json data "secreto cifrado"
    }
```

## Justificación de la normalización

| Forma normal | Cómo se cumple |
|---|---|
| **1FN** | Todos los atributos son atómicos: no hay listas ni campos repetidos. Los roles de un usuario se guardan en la tabla intermedia `USUARIO_GRUPO`, no en una columna con varios valores. |
| **2FN** | Todas las tablas usan una clave primaria simple (`id`), así que no puede haber dependencias parciales de una clave compuesta. |
| **3FN** | No hay dependencias transitivas. Antes, `Aporte` guardaba la comunidad como texto libre, y la región dependía de la comunidad, no del aporte. Ahora la región vive en `REGION`, la comunidad en `COMUNIDAD` y el aporte solo guarda `comunidad_id`. Cambiar el nombre de una comunidad o su región se hace en un solo lugar. |

## Reglas de integridad

- `COMUNIDAD.region_id` y `APORTE.comunidad_id` usan `ON DELETE PROTECT`: no se puede borrar una región o comunidad que tenga datos asociados.
- `APORTE.usuario_id` y `APORTE.revisado_por_id` usan `ON DELETE SET NULL`: si se elimina una cuenta, el aporte cultural se conserva.
- `REGION.nombre` y `COMUNIDAD.nombre` son únicos para evitar duplicados.
- `APORTE.nombre` (120) y `APORTE.mensaje` (5000) tienen longitud máxima, validada también en el servidor.

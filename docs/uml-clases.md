# UML · Diagrama de Clases

Clases del dominio (`aportes/models.py`), las vistas que las usan y las clases
de Django/allauth con las que se relacionan.

```mermaid
classDiagram
    direction LR

    class Region {
        +BigAutoField id
        +CharField nombre «unique, 60»
        +__str__() str
    }

    class Comunidad {
        +BigAutoField id
        +CharField nombre «unique, 100»
        +ForeignKey region «PROTECT, null»
        +__str__() str
    }

    class Aporte {
        +BigAutoField id
        +ForeignKey usuario «SET_NULL»
        +ForeignKey comunidad «PROTECT»
        +CharField nombre «120»
        +TextField mensaje «5000»
        +BooleanField revisado
        +ForeignKey revisado_por «SET_NULL»
        +DateTimeField creado
        +__str__() str
    }
    note for Aporte "Meta.permissions:\nrevisar_aporte"

    class User {
        <<django.contrib.auth>>
        +username
        +email
        +password
        +is_staff
        +is_superuser
        +has_perm(perm) bool
    }

    class Group {
        <<django.contrib.auth>>
        +name
        +permissions
    }

    class Authenticator {
        <<allauth.mfa>>
        +type
        +data
    }

    class EmailAddress {
        <<allauth.account>>
        +email
        +verified
        +primary
    }

    class Views {
        <<aportes.views>>
        +page(request, template_name)
        +html_page(request, page)
        +crear_aporte(request) JsonResponse
        +cuenta(request)
        +moderacion(request)
        +marcar_revisado(request, pk)
        +salud(request) JsonResponse
    }

    class AsignarRolColaborador {
        <<aportes.signals>>
        +asignar_colaborador(sender, request, user)
    }

    Region "1" <-- "0..*" Comunidad : region
    Comunidad "1" <-- "0..*" Aporte : comunidad
    User "0..1" <-- "0..*" Aporte : usuario
    User "0..1" <-- "0..*" Aporte : revisado_por
    User "0..*" -- "0..*" Group : groups
    User "1" *-- "0..*" Authenticator
    User "1" *-- "1..*" EmailAddress
    Views ..> Aporte : crea / consulta
    Views ..> Comunidad : valida
    AsignarRolColaborador ..> Group : asigna Colaborador
```

## Responsabilidades

| Clase | Responsabilidad |
|---|---|
| `Region` | Catálogo de las 4 regiones de Nicaragua. |
| `Comunidad` | Catálogo de pueblos; cada uno pertenece a una región (o a ninguna si está en todo el país). |
| `Aporte` | Contribución cultural enviada por un usuario y su estado de revisión. |
| `Views` | Reciben las peticiones HTTP, comprueban sesión y permisos, validan datos y responden HTML o JSON. |
| `AsignarRolColaborador` | Al registrarse un usuario, lo agrega al grupo *Colaborador*. |
| `User` / `Group` | Autenticación y roles (Django). |
| `Authenticator` | Segundo factor TOTP y códigos de recuperación (allauth.mfa). |
| `EmailAddress` | Correos del usuario y su verificación (allauth). |

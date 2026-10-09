# UML · Diagrama de Casos de Uso

Actores del sistema y lo que cada uno puede hacer. Los roles se heredan:
un Moderador también es Colaborador, y el Administrador puede hacer todo.

```mermaid
flowchart LR
    V(["🧍 Visitante"])
    C(["🧍 Colaborador"])
    M(["🧍 Moderador"])
    A(["🧍 Administrador"])
    G(["🌐 Google OAuth"])
    E(["✉️ Servidor de correo"])

    C -. hereda .-> V
    M -. hereda .-> C
    A -. hereda .-> M

    subgraph BICSAN["Sistema BICSAN"]
        UC1(["Registrarse"])
        UC2(["Iniciar sesión"])
        UC3(["Iniciar sesión con Google"])
        UC4(["Recuperar contraseña"])
        UC5(["Verificar correo"])
        UC6(["Leer privacidad y términos"])
        UC7(["Explorar regiones, pueblos y colecciones"])
        UC8(["Consultar diccionario, calendario y trivia"])
        UC9(["Enviar aporte cultural"])
        UC10(["Ver mis aportes"])
        UC11(["Activar / desactivar 2FA"])
        UC12(["Ingresar código 2FA"])
        UC13(["Revisar aportes pendientes"])
        UC14(["Marcar aporte como revisado"])
        UC15(["Administrar usuarios y roles"])
        UC16(["Administrar comunidades y regiones"])
        UC17(["Cerrar sesión"])
    end

    V --- UC1
    V --- UC2
    V --- UC3
    V --- UC4
    V --- UC6

    C --- UC7
    C --- UC8
    C --- UC9
    C --- UC10
    C --- UC11
    C --- UC17

    M --- UC13
    M --- UC14

    A --- UC15
    A --- UC16

    UC1 -. include .-> UC5
    UC2 -. extend .-> UC12
    UC13 -. "include (2FA obligatorio)" .-> UC12
    UC14 -. include .-> UC13
    UC3 --- G
    UC5 --- E
    UC4 --- E
```

## Descripción de actores

| Actor | Quién es | Permisos |
|---|---|---|
| **Visitante** | Persona sin sesión | Solo registro, inicio de sesión, recuperación y páginas legales. |
| **Colaborador** | Toda cuenta nueva (grupo asignado automáticamente) | Explorar todo el contenido, enviar aportes (`aportes.add_aporte`), ver sus aportes y gestionar su 2FA. |
| **Moderador** | Grupo asignado por un administrador | Lo anterior y además revisar aportes (`aportes.revisar_aporte`, `aportes.view_aporte`). Debe tener 2FA activo. |
| **Administrador** | Superusuario de Django | Acceso completo al panel `/admin/`: usuarios, grupos, comunidades y regiones. |
| **Google OAuth** | Sistema externo | Autentica a usuarios que eligen "Continuar con Google". |
| **Servidor de correo** | Sistema externo (SMTP) | Envía verificación de correo y recuperación de contraseña. |

## Casos de uso principales

| ID | Caso de uso | Precondición | Resultado |
|---|---|---|---|
| UC1 | Registrarse | Sin sesión | Cuenta creada en el grupo *Colaborador*; se envía correo de verificación. |
| UC9 | Enviar aporte | Sesión iniciada y permiso `add_aporte` | Aporte guardado como *pendiente* (`revisado = false`). |
| UC11 | Activar 2FA | Sesión iniciada | Autenticador TOTP vinculado y códigos de recuperación generados. |
| UC13 | Revisar aportes | Rol *Moderador* y 2FA activo | Lista de aportes pendientes. |
| UC14 | Marcar revisado | Igual que UC13 | `revisado = true` y `revisado_por = moderador`. |

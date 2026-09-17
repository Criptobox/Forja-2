# GITHUB — PUBLICACIÓN DE UN ZIP

## Objetivo

Permitir que el usuario tome un ZIP generado por FORJA y lo publique como un repositorio nuevo de GitHub usando un token proporcionado por el propio usuario.

## Importante

El token es un secreto. El HTML de utilidad incluido en esta versión NO es una implementación final de seguridad para producción. Es un prototipo local para preparar y probar el flujo.

No guardar tokens en:

- archivos del proyecto;
- `README.md`;
- `package.json`;
- commits;
- localStorage;
- logs;
- analytics.

## Flujo objetivo dentro de FORJA

1. Usuario selecciona ZIP.
2. FORJA valida estructura.
3. Usuario autentica/conecta GitHub.
4. FORJA obtiene identidad del usuario.
5. Usuario indica nombre del nuevo repositorio.
6. FORJA crea el repositorio.
7. FORJA sube los archivos a la rama principal.
8. FORJA muestra URL del repositorio.
9. Opcionalmente configura GitHub Pages cuando sea compatible.
10. FORJA vuelve al proyecto y conserva el vínculo con GitHub.

## Arquitectura recomendada

La versión de producción debe hacer las operaciones sensibles desde un backend/worker seguro o mediante OAuth/device flow compatible, nunca exponiendo un token permanente al frontend.

## HTML incluido

`tools/github-zip-publisher.html` es una utilidad de prototipo. Permite seleccionar un ZIP, introducir un token manualmente, indicar propietario/nombre del repo y preparar la publicación usando la API de GitHub.

Para producción, reemplazar el token manual por un flujo OAuth seguro.

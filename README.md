# FORJA IA — v0.4.0-alpha

Esta versión existe para solucionar un problema concreto observado al probar v0.3:

> FORJA generaba páginas, pero visualmente se parecían demasiado.

## Qué cambia

FORJA ahora clasifica la idea en un **arquetipo de negocio** y una **dirección visual** antes de generar.

Arquetipos incluidos:

- commerce
- restaurant
- hotel
- saas
- portfolio
- agency
- event
- product

Direcciones visuales:

- editorial
- minimal
- bold
- luxury
- playful
- brutal

No son simples cambios de color: cada combinación cambia la estructura, navegación, hero, densidad, composición y componentes.

## Prueba recomendada

Prueba estas ideas por separado:

1. `una tienda de zapatillas deportivas premium`
2. `una cafetería japonesa minimalista`
3. `un hotel boutique frente al mar`
4. `una plataforma SaaS de analítica para empresas`
5. `un fotógrafo de bodas editorial`
6. `una agencia creativa de branding`
7. `un festival de música electrónica`
8. `un reloj mecánico de lujo`

Deberías ver estructuras claramente diferentes.

## IA

Si se configuran `AI_BASE_URL`, `AI_API_KEY` y `AI_MODEL`, el proveedor IA sigue disponible. Si no, el motor local usa la diversidad incorporada para que la diferencia sea visible incluso sin API.

## Deploy

Sube el contenido extraído del ZIP al repositorio, con `index.html` en la raíz, y vuelve a desplegar en Vercel.

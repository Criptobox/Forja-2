# FORJA IA — v0.3.0-alpha

## FROM → TO

**FROM:** `v0.2.0-alpha desplegable` — interfaz real, pero generación simulada.

**TO:** `v0.3.0-alpha` — primera arquitectura de generación real: frontend + API serverless + provider abstraction + generador local de respaldo + Preview REAL del resultado.

## Qué hace ahora

Al escribir:

> una cafetería japonesa minimalista

y pulsar **Forjar web**, FORJA llama a `/api/generate`.

Hay dos caminos:

1. **Provider IA configurado:** el endpoint usa las variables de entorno `AI_BASE_URL`, `AI_API_KEY` y `AI_MODEL` y solicita al modelo que devuelva archivos de un sitio.
2. **Sin API configurada:** FORJA usa un generador local de respaldo para que el flujo siga siendo comprobable en Vercel. No es IA; es un fallback de desarrollo.

El Preview recibe el HTML generado y lo muestra dentro de un iframe aislado.

## Configuración IA en Vercel

En Vercel → Project → Settings → Environment Variables:

- `AI_BASE_URL` — URL de un endpoint compatible con chat/completions.
- `AI_API_KEY` — secreto del proveedor.
- `AI_MODEL` — modelo elegido.

No poner estas variables en el repositorio.

Ejemplo conceptual:

```text
AI_BASE_URL=https://...
AI_API_KEY=...
AI_MODEL=...
```

FORJA no fija el producto a un proveedor único.

## Importante

Esta versión NO pretende que el modelo pueda ejecutar arbitrariamente código en el servidor. La salida del modelo está restringida a archivos de sitio y se valida antes de enviarse al navegador.

La sandbox completa de ejecución, terminal, Git, QA visual y Project Engine vienen en las siguientes fases.

## Despliegue

El repositorio debe tener `index.html` en la raíz y la carpeta `api/`.

Vercel detectará `api/generate.mjs` como función serverless.

## Prueba

1. Deploy sin variables IA.
2. Escribe una idea.
3. Pulsa `Forjar web`.
4. Comprueba que aparece un sitio REAL en Preview.
5. Después configura el proveedor IA y vuelve a desplegar.

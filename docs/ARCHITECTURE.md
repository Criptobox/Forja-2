# FORJA — ARCHITECTURE TARGET

```text
apps/
  web/
  worker/

packages/
  core/
  ai/
  agent/
  tools/
  design-system/
  project/
  preview/
  qa/
  git/
  export/

design/
docs/
tests/
scripts/
```

## Principio

El usuario no configura el pipeline. El Cerebro lo hace.

## Capas

### Core
Modelos de proyecto, eventos, estados y contratos.

### AI
Interfaz común para distintos proveedores/modelos. Nunca acoplar el producto entero a un único proveedor.

### Agent
Planificación, ejecución y verificación.

### Tools
Filesystem, terminal, browser, preview, screenshot, git, search, image generation, analyzer, QA y ZIP.

### Design
Tokens, tipografía, color, spacing, radii, shadows, motion, componentes y reglas de composición.

### Preview
Ejecución aislada del proyecto generado y captura de evidencia para QA.

### QA
Visual, funcional y código.

### Git
Clonado/importación, ramas, commits, push y publicación mediante credenciales del usuario.

### Export
ZIP reproducible y limpio, sin secretos.

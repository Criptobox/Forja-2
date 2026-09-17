# FORJA — ARCHITECTURE v0.3

```text
Browser
  │
  ├── Home / Web Studio
  │
  └── POST /api/generate
             │
             ├── provider IA configurado
             │      └── modelo → JSON de archivos
             │
             └── fallback local
                    └── generador de desarrollo

             ↓
        validateFiles()
             ↓
       Preview iframe
             ↓
       ZIP export local
```

## Provider abstraction

El frontend nunca necesita conocer el proveedor.

El backend usa:

- `AI_BASE_URL`
- `AI_API_KEY`
- `AI_MODEL`

El proveedor puede cambiar sin modificar la UX.

## Seguridad

La API key solo existe en el entorno serverless.

La salida se limita a archivos permitidos:

- `index.html`
- `styles.css`
- `script.js`

No se permite devolver archivos arbitrarios ni ejecutar herramientas del sistema en esta fase.

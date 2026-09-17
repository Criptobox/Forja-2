# AI GENERATION

## Contrato de entrada

```json
{
  "prompt": "una pizzería con temática de Halloween"
}
```

## Contrato de salida

```json
{
  "title": "Nombre del proyecto",
  "files": {
    "index.html": "...",
    "styles.css": "...",
    "script.js": "..."
  },
  "source": "ai"
}
```

También existe `source: "fallback"` cuando no hay proveedor configurado.

## Restricciones

El modelo debe devolver JSON válido y solamente archivos web permitidos.

FORJA valida:

- tamaño total;
- extensiones;
- existencia de `index.html`;
- ausencia de rutas `..`;
- ausencia de scripts de servidor;
- ausencia de secretos esperados.

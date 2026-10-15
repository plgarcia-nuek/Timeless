# Componentes Timeless

Estado de lo construido **en este repo** (`src/components`). No existe un paquete hermano `timeless-components`.

Cada variable CSS de un `.module.css` tiene que existir en `/tokens.css` (`grep -q -- "$name:" tokens.css`). No inventar tokens. Dark es el tema nativo.

| Componente | Figma | Estado |
|------------|-------|--------|
| `badge` | Data Display `1783:242` — `Estado=Success\|Error\|Warning\|Info\|Alternative` | Implementado |
| resto del inventario Timeless-DS | ver `CLAUDE.md` | Pendiente |

No implementar `optionSwitch`, `menuBar`, Footer, Sidemenu, `priceCard`, `heroCard` ni `Header` hasta que Figma los tenga limpios o Pablo los pida.

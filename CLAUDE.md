# Timeless Design System — rules for Claude Code

This file tells Claude Code how to build UI in this repo consistently with **Timeless**, the design system defined in Figma (`Timeless-DS Nuek`, file key `NbjzETzcEgTrofb3BoohYC`). Read this before generating or editing any component.

## Source of truth

- `tokens.json` in this folder is the canonical export of every color, spacing, radius, border-width and typography token from the Figma Foundations library. It is machine-generated — never hand-edit values in it, regenerate from Figma instead.
- `tokens.css` is the CSS custom-property mirror of `tokens.json`, ready to import. Use these variables (`var(--color-...)`, `var(--radius-...)`, etc.) instead of hardcoded hex/px values in any component you write or edit.
- If a value you need isn't in `tokens.json`, don't invent one — flag it and ask, or use the closest existing token. Timeless has real gaps (see "Known gaps" below); silently hardcoding a value re-introduces the exact drift this file exists to prevent.

## Theming

Timeless is **Dark-first**: Dark is the default/native theme (`:root` and `[data-theme="dark"]` in `tokens.css`). Light mode exists as a full parallel token set but is not yet used anywhere in the actual product — treat it as available, not default. Switch themes by setting `data-theme="light"` on `<html>` or a wrapping element; never swap colors by hand.

## Responsive / sizing model

Components that scale with viewport size in Figma use a **fixed `Tamaño` (size) variant**, not fluid resizing — e.g. `button/cta` has Tamaño XXS/S/M, `dataTable` and the new card families use S/M/L/XL/2XL. Each size tier is pinned to one radius token, matching this scale:

| Tier | Radius token | px | Typical width |
|------|--------------|----|----|
| XS | `--radius-xs` | 8 | chips, badges |
| S | `--radius-sm` | 12 | small cards, thumbnails |
| M | `--radius-md` | 16 | — |
| M (anchor) | `--radius-lg` | 24 | standard cards, 260–500px |
| L | `--radius-xl` | 32 | large cards, panels |
| XL | `--radius-2xl` | 40 | banners, hero sections |
| 2XL | `--radius-3xl` | 48 | full editorial sections |

When building a new component with size variants, follow this pattern: pick discrete breakpoints (don't fluidly interpolate radius), and scale radius, padding, and type scale together per tier — don't scale one axis without the others.

The `spacing` tokens in `tokens.json`/`tokens.css` (`padding/button/default`, `padding/content/inline`, etc.) are genuinely responsive — they carry different values per Mobile/Tablet/Desktop/Desktop XL mode and are exposed in `tokens.css` via `@media` breakpoints (`768px`/`1024px`/`1440px` — these breakpoint pixel values are an assumption, not something Figma encodes explicitly; confirm against the real grid if it matters). **Don't bind these responsive tokens to a component that already has an explicit device/size variant** (e.g. a `Tamaño=Desktop` button) — the two responsive systems conflict, and the fixed variant should win. This bit us during the button/table/card build: several components had hardcoded, unbound padding values because no non-responsive token fit — that's a real gap in Foundations, not something to paper over by misusing the responsive tokens.

## Typography

Use the `heading` / `body` / `label` / `display` scales in `tokens.json`. Font family is `Saans` (`--font-family-base`); weights are Regular (400) and Medium (500) only — there is no Bold in this system, use Medium for emphasis.

## Naming conventions

Figma variant properties are in Spanish and follow `Propiedad=Valor` pairs in the component name, e.g. `Función=CTA+icon, Jerarquía=Primary, Estado=Hover, Tamaño=M`. Keep this vocabulary when naming props/variants in code so the mapping stays obvious:

- `Jerarquía` → `hierarchy` (`primary` / `secondary`)
- `Estado` → `state` (`default` / `hover` / `pressed` / `disabled`)
- `Tamaño` → `size`
- `Dispositivo` → `device` / breakpoint

## Component inventory (Figma pages → what to build)

- **Action**: `button/cta` (48 variants: Función × Jerarquía × Estado × Tamaño), `button/cta/mobile`, `accordion`, `chat`, `modal`, `cookies`, `optionSwitch` (⚠ has a pre-existing variant-property error in Figma, not yet fixed)
- **Data Display**: `dataTable` (5 dark variants + 1 new light `Columnas=5, Tipo=No interacción`), `badge` (Estado: Success/Error/Warning/Info/Alternative), `tabOption`, `textTitlesBlock`
- **Feedback**: `popUpDialogue`, `loading`, `feedback`
- **Forms**: `form`, `fileUpload`, `stepsForm`, `datePicker`, `checkbox`, `toggle`, `dropdown`
- **Imagery**: `cardAvatar`, `card`, `mainCard`, `infoCard`, `imageText`, `heroSection`, plus the new **`featureCard`** (S/M/L), **`priceCard`** (S/M), **`mediaCard`** (M/L/XL), **`heroCard`** (XL/2XL)
- **Navigation**: `breadCrumb`, `barSearch`, `menuBar` (⚠ has a pre-existing variant-property error in Figma), `optionTab`, `Header`, `pagination`, `resultsSearch`, `navbarComercio`, `menubarGeneric`, `navGeneral`. There is currently no Footer or Sidemenu component in Figma — don't assume one exists.

When implementing any of these, pull the component via Figma Dev Mode / MCP (`get_design_context`) against this file, not from memory — several of these were recently rebuilt and the old version may still be cached in a prior conversation or screenshot.

## Known gaps (don't silently work around these — surface them)

1. No non-responsive spacing token exists for internal component padding on fixed-size components (see "Responsive / sizing model"). Every S/M/L/XL padding value in `button/cta`, `dataTable`, and the new cards is a hardcoded px value for this reason.
2. `optionSwitch` (Action) and `menuBar` (Navigation) have broken variant property definitions in Figma — inspect before generating code from them.
3. Light theme tokens are complete but unused elsewhere in the file — if a design says "light" for the first time, that's new territory, not an established pattern to copy from.

## Regenerating tokens.json / tokens.css

These files were generated by resolving every variable in the Foundations library (`semanticColor`, `semanticSpacing`, `semanticRadii`, `semanticBorder`, `semanticTypography`) across all their modes via the Figma MCP `use_figma` tool, then compiled to JSON/CSS. To refresh after a Figma change, re-run that resolution (don't hand-edit) and regenerate both files together so they never drift from each other.

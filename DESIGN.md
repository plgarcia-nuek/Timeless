---
design_system: Timeless
source: "Figma — Timeless-DS Nuek (file key NbjzETzcEgTrofb3BoohYC), Foundations library"
default_theme: dark
themes: [dark, light]
typography:
  font_family: Saans
  weights:
    regular: 400
    medium: 500
  note: "No Bold in this system — use Medium for emphasis."
radius_scale:
  - tier: XS
    token: --radius-xs
    px: 8
    use: "chips, badges"
  - tier: S
    token: --radius-sm
    px: 12
    use: "small cards, thumbnails"
  - tier: M
    token: --radius-md
    px: 16
    use: "—"
  - tier: "M (anchor)"
    token: --radius-lg
    px: 24
    use: "standard cards, 260–500px"
  - tier: L
    token: --radius-xl
    px: 32
    use: "large cards, panels"
  - tier: XL
    token: --radius-2xl
    px: 40
    use: "banners, hero sections"
  - tier: 2XL
    token: --radius-3xl
    px: 48
    use: "full editorial sections"
responsive_breakpoints_px: [768, 1024, 1440]
---

# Timeless — design source of truth

This file describes what Timeless should **look and feel like**. It's the design rationale behind the tokens in `tokens.json` / `tokens.css` — read it when a design decision needs justifying, not just looked up. For *how to work* in this repo (where files live, how to regenerate them, which Figma page to pull from), see `CLAUDE.md` instead.

## Theming

Timeless is **Dark-first**: Dark is the default/native theme (`:root` and `[data-theme="dark"]` in `tokens.css`). Light mode exists as a full parallel token set but is not yet used anywhere in the actual product — treat it as available, not default. Switch themes by setting `data-theme="light"` on `<html>` or a wrapping element; never swap colors by hand.

## Responsive / sizing model

Components that scale with viewport size in Figma use a **fixed `Tamaño` (size) variant**, not fluid resizing — e.g. `button/cta` has Tamaño XXS/S/M, `dataTable` and the card families use S/M/L/XL/2XL. Each size tier is pinned to one radius token:

| Tier | Radius token | px | Typical width |
|------|--------------|----|----|
| XS | `--radius-xs` | 8 | chips, badges |
| S | `--radius-sm` | 12 | small cards, thumbnails |
| M | `--radius-md` | 16 | — |
| M (anchor) | `--radius-lg` | 24 | standard cards, 260–500px |
| L | `--radius-xl` | 32 | large cards, panels |
| XL | `--radius-2xl` | 40 | banners, hero sections |
| 2XL | `--radius-3xl` | 48 | full editorial sections |

Rationale: radius is the anchor dimension for a tier — padding and type scale ride along with it. When building a new component with size variants, pick discrete breakpoints (don't fluidly interpolate radius), and scale radius, padding, and type scale together per tier — don't scale one axis without the others. This keeps a "M card" reading as visually related to an "M button," even though they're unrelated components.

The `spacing` tokens (`padding/button/default`, `padding/content/inline`, etc.) are genuinely responsive — different values per Mobile/Tablet/Desktop/Desktop XL mode, exposed via `@media` at 768px/1024px/1440px (these breakpoint values are an assumption, not something Figma encodes explicitly — confirm against the real grid if it matters). **Don't bind these responsive tokens to a component that already has an explicit device/size variant** (e.g. a `Tamaño=Desktop` button) — the two responsive systems conflict, and the fixed variant should win.

## Typography

Use the `heading` / `body` / `label` / `display` scales. Font family is `Saans`; weights are Regular (400) and Medium (500) only — there is no Bold in this system, use Medium for emphasis.

## Naming conventions (design vocabulary → code)

Figma variant properties are in Spanish and follow `Propiedad=Valor` pairs in the component name, e.g. `Función=CTA+icon, Jerarquía=Primary, Estado=Hover, Tamaño=M`. Keep this vocabulary when naming props/variants in code so the mapping stays obvious:

- `Jerarquía` → `hierarchy` (`primary` / `secondary`)
- `Estado` → `state` (`default` / `hover` / `pressed` / `disabled`)
- `Tamaño` → `size`
- `Dispositivo` → `device` / breakpoint

## Known design gaps (don't silently work around these — surface them)

1. No non-responsive spacing token exists for internal component padding on fixed-size components (see "Responsive / sizing model"). Every S/M/L/XL padding value in `button/cta`, `dataTable`, and the cards is a hardcoded px value for this reason — it's a real gap in Foundations, not something to paper over by misusing the responsive tokens.
2. `optionSwitch` (Action) and `menuBar` (Navigation) have broken variant property definitions in Figma — inspect before trusting them as a pattern to copy.
3. Light theme tokens are complete but unused elsewhere in the file — if a design calls for "light" for the first time, that's new territory, not an established pattern to copy from.

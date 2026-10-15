# Timeless

Sistema de diseño **Timeless** (Nuek): tokens Foundations y componentes React **en este repo**.

## Contents

- `tokens.json` — canonical token export (color for light/dark, radius, border-width, spacing per breakpoint, typography scale). Source of truth for any other format.
- `tokens.css` — CSS custom properties generated from `tokens.json`. Import this directly in a web app.
- `src/components` — React components pulled from Timeless-DS Nuek. Status: `src/components/README.md`.
- `CLAUDE.md` — the operating manual for Claude Code (or any AI coding assistant): how to work in this repo, where to find components in Figma, how to regenerate tokens. No visual/design rules live here.
- `DESIGN.md` — the design source of truth: theming (dark-first), the sizing/radius scale, typography, naming conventions, and known design gaps. Read this whenever a design decision needs explaining, not just looked up.

This follows the convention described by [Nick Babich](https://uxplanet.org/claude-md-vs-design-md-what-to-put-in-each-for-claude-code-53647d015bfd): `CLAUDE.md` is the operating manual (how to work), `DESIGN.md` is the design source of truth (what it should look/feel like). Keep new content in the matching file — don't let design rules creep back into `CLAUDE.md`.

## Demo

```bash
npm install
npm run dev
```

Dark-first playground (`src/demo`) that mounts the implemented components against `tokens.css`.

## Using the tokens

1. Import `tokens.css` wherever global styles load (`import 'timeless/tokens.css'` or an `@import`).
2. Import components from `src/components` (or the root `timeless` export). Every CSS variable in a component stylesheet must exist in `tokens.css`.

## Keeping it in sync

These files are generated from the live Figma file, not hand-written. When Foundations changes in Figma (new color, new spacing scale, etc.), regenerate both `tokens.json` and `tokens.css` together — see the "Regenerating" section in `CLAUDE.md`. If the change is a design *decision* (new theme, new sizing rule), update `DESIGN.md` too, not just the token values.

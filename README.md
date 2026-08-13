# timeless-tokens

Design tokens for the **Timeless** design system, exported from Figma (`Timeless-DS Nuek`).

## Contents

- `tokens.json` — canonical token export (color for light/dark, radius, border-width, spacing per breakpoint, typography scale). Source of truth for any other format.
- `tokens.css` — CSS custom properties generated from `tokens.json`. Import this directly in a web app.
- `CLAUDE.md` — the operating manual for Claude Code (or any AI coding assistant): how to work in this repo, where to find components in Figma, how to regenerate tokens. No visual/design rules live here.
- `DESIGN.md` — the design source of truth: theming (dark-first), the sizing/radius scale, typography, naming conventions, and known design gaps. Read this whenever a design decision needs explaining, not just looked up.

This follows the convention described by [Nick Babich](https://uxplanet.org/claude-md-vs-design-md-what-to-put-in-each-for-claude-code-53647d015bfd): `CLAUDE.md` is the operating manual (how to work), `DESIGN.md` is the design source of truth (what it should look/feel like). Keep new content in the matching file — don't let design rules creep back into `CLAUDE.md`.

## Using this in a repo

1. Drop this whole folder into your repo, e.g. at `packages/design-tokens/` or `src/styles/tokens/`.
2. Import `tokens.css` wherever global styles load (`import './tokens/tokens.css'` or an `@import` in your main stylesheet).
3. Put `CLAUDE.md` and `DESIGN.md` at your repo root (or merge their contents into existing root files with the same names) so Claude Code picks them up automatically as project context.
4. Commit and push:

   ```bash
   git add timeless-tokens CLAUDE.md DESIGN.md
   git commit -m "Add Timeless design tokens, Claude Code rules, and design source of truth"
   git push
   ```

## Keeping it in sync

These files are generated from the live Figma file, not hand-written. When Foundations changes in Figma (new color, new spacing scale, etc.), regenerate both `tokens.json` and `tokens.css` together — see the "Regenerating" section in `CLAUDE.md`. If the change is a design *decision* (new theme, new sizing rule), update `DESIGN.md` too, not just the token values.

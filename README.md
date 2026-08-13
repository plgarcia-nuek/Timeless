# timeless-tokens

Design tokens for the **Timeless** design system, exported from Figma (`Timeless-DS Nuek`).

## Contents

- `tokens.json` — canonical token export (color for light/dark, radius, border-width, spacing per breakpoint, typography scale). Source of truth for any other format.
- `tokens.css` — CSS custom properties generated from `tokens.json`. Import this directly in a web app.
- `CLAUDE.md` — rules for Claude Code (or any AI coding assistant) working in this repo: how to use the tokens, the sizing/breakpoint model, naming conventions, and known gaps in the system.

## Using this in a repo

1. Drop this whole folder into your repo, e.g. at `packages/design-tokens/` or `src/styles/tokens/`.
2. Import `tokens.css` wherever global styles load (`import './tokens/tokens.css'` or an `@import` in your main stylesheet).
3. Put `CLAUDE.md` at your repo root (or merge its contents into an existing root `CLAUDE.md`) so Claude Code picks it up automatically as project context.
4. Commit and push:

   ```bash
   git add timeless-tokens CLAUDE.md
   git commit -m "Add Timeless design tokens and Claude Code rules"
   git push
   ```

## Keeping it in sync

These files are generated from the live Figma file, not hand-written. When Foundations changes in Figma (new color, new spacing scale, etc.), regenerate both `tokens.json` and `tokens.css` together — see the "Regenerating" section in `CLAUDE.md`.

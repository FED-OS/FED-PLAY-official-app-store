# AGENTS.md

> Guidance for **AI coding agents** (Claude, GPT, Copilot, Cursor, Aider, Devin, etc.) working
> in the FED Play repository. If you're a human, the same conventions apply — see
> [CONTRIBUTING.md](CONTRIBUTING.md) and [CLAUDE.md](CLAUDE.md).

FED Play is a **zero-build static front end**: plain HTML, vanilla CSS, vanilla JS in IIFE
modules. No framework, no bundler, no `package.json`, no transpilation. **Do not introduce any
of these without an approved [ADR](ADR.md).**

## Mission

When operating in this repo, your job is to make small, correct, reviewable changes that match
the project's conventions. Prefer the smallest diff that solves the problem. Never refactor
unrelated code in the same change.

## Ground truth files

| File | Role |
|------|------|
| `data.js` | The catalog: `APPS[]`, 58 entries. **The only place to add/edit apps.** |
| `app.js` | `FED` module: rendering, filtering, search, toasts, modal logic, `escapeHtml`. |
| `layout.js` | `FED_LAYOUT` module: injects top bar, sidebar, categories bar, toasts, back-to-top, and the PayPal/Stripe payment modal into every page. |
| `styles.css` | Design tokens (`--gp-*`), dark/light themes, per-category button accents. |
| `*.html` | Ten pages; each only holds unique body content + a `window.FED_PAGE` config + `FED_LAYOUT.inject()` / `FED.init()`. |

## Hard rules (do not break)

1. **No build step, no framework, no runtime deps, no imports/JSX/TS.** Vanilla JS IIFEs only.
2. **Escape all cataloged strings before DOM insertion** via `escapeHtml()` in `app.js`. This is
   a security boundary ([SECURITY.md](SECURITY.md)). New rendering paths must escape.
3. **`downloadUrl` values are `https://` only.** Strip/reject `javascript:`, `data:`, etc.
4. **Reuse `--gp-*` design tokens.** No hard-coded hex. New categories need a `btn-<cat>` class.
5. **Dark mode is default.** Every visual change must work in dark + light + mobile (≤768px).
6. **Keep HTML pages lean.** Shared chrome is injected by `layout.js` — never duplicate it.
7. **Preserve accessibility:** `aria-label`s, `role="list"` on carousels,
   `role="dialog" aria-modal="true"` on the modal.
8. **No secrets.** The PayPal/Stripe IDs in `layout.js` are public client IDs. Never add keys.
9. **No pirated/illegal app entries.** We catalog sideloadable apps, not cracked software.
10. **One concern per PR.** Reference the issue (`Closes #N`). Update
    [CHANGELOG.md](CHANGELOG.md) under `Unreleased`.

## App entry (canonical shape) — in `data.js`

```js
{
  id: "unique-slug",            // lowercase, unique; used in featuredIds
  name: "Real Product Name",
  category: "creative",         // creative | games | movies | social | utility | extensions
  featured: false,
  rating: 4.8, reviews: "2.1k",
  description: "One clear sentence.",
  downloadUrl: "https://…/app.apk",  // https only; "" only for genuine missing apps
  editorsChoice: false,
  isPremium: false, isPrivate: false, isAppStore: false,
  tags: ["apps", "creative"],   // apps|games|movies|creative|fed_originals|missing|premium|private|appstore
  imageUrl: "https://…/icon.png"
}
```

Run the app-entry checklist in [CONTRIBUTING.md](CONTRIBUTING.md) before finishing.

## Page pattern (do not invent alternatives)

```html
<script src="data.js"></script>
<script src="layout.js"></script>
<script src="app.js"></script>
<script>
  window.FED_PAGE = { tab, featuredIds, gridTitle, gridSub, welcome };
  FED_LAYOUT.inject();
  FED.init();
</script>
```

## Verification (no test suite yet — see [ROADMAP.md](ROADMAP.md))

1. Serve: `python3 -m http.server 8080` (avoid `file://`).
2. Check the affected page(s) in dark + light, desktop + mobile.
3. Confirm featured hero, carousel, chips, live search + count, "Get" buttons (toast + URL or
   premium modal), theme persistence, sidebar overlay.
4. If you touched `app.js` or `layout.js`, verify **all ten pages** load with no console errors.

## Decision-making

- Structural/non-trivial changes need an **[ADR](ADR.md)** *before* code.
- New tabs require: new HTML page + sidebar entry + a new `tag` used in `data.js`.
- Anything that adds a dependency or build step is almost certainly out of scope without an ADR.

## Communication

- Use CLI tools (`grep`, `awk`, `head`, `wc`) for inspection; edit files with proper tooling.
- Match existing comment style (`/* ====… */` headers).
- Keep `description` fields factual, no marketing fluff.
- When unsure whether something fits, **open an issue/discussion first** rather than guessing.

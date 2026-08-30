# CLAUDE.md

> Guidance for **Claude** (and Claude Code) when working in the FED Play repository.

FED Play is a **zero-build, static front end** — plain HTML, CSS, and vanilla JavaScript. There
is no bundler, no framework, no package.json, and no transpilation step. Keep it that way unless
an ADR explicitly approves a change (see [ADR.md](ADR.md)).

## 1. What this project is

FED Play is an "ultimate app store for websites without official apps." It catalogs
**sideloadable APKs** across ten themed pages and a single shared catalog of 58 apps. The whole
UI — top bar, sidebar, categories bar, toast system, back-to-top, and the holographic PayPal/
Stripe payment modal — is injected at runtime by `layout.js`, so each HTML page only carries its
unique body content plus a tiny `window.FED_PAGE` config and two calls: `FED_LAYOUT.inject()`
and `FED.init()`.

## 2. Repository layout (the parts that matter)

```
index.html, games.html, movies.html, creative.html, utility.html,
premium.html, private.html, appstore.html, fed-originals.html, missing.html
data.js       # APPS[] — the single source of truth for the catalog (58 entries)
app.js        # FED module — rendering, search, toasts, modal logic, escaping
layout.js     # FED_LAYOUT module — injects all shared chrome + payment modal
styles.css    # design tokens (--gp-*) + dark/light themes + per-category buttons
surf-fed-logo.png
.github/      # issue/PR templates, discussion welcome, prompts/, wiki/, discussion/
docs/         # ADR, roadmap, deployment, build, install, summary
```

When asked to "add an app," edit **`data.js`** only. When asked to "add a page," copy an existing
HTML file and change `window.FED_PAGE`. When asked to change shared chrome, edit `layout.js`.
Rendering/filtering/search behavior lives in `app.js`.

## 3. Key conventions (do not violate)

- **No build step. No framework. No runtime deps.** Plain ES5-ish vanilla JS in IIFE modules
  (`const FED = (function(){…})();`). Don't introduce imports, JSX, TypeScript, or npm.
- **Escape everything.** `app.js` exposes `escapeHtml()`; any cataloged string (`name`,
  `description`, etc.) inserted into the DOM must go through it. New rendering paths must escape.
  This is a security boundary — see [SECURITY.md](SECURITY.md).
- **`downloadUrl` must be `https://`.** Never wire a `javascript:` or `data:` URL into a "Get"
  button. Reject/strip those.
- **Reuse design tokens.** Use the `--gp-*` variables defined at the top of `styles.css`. Don't
  hard-code hex colors. New categories need a matching `btn-<category>` accent class.
- **Dark mode is default** (`<body class="dark">`). Every visual change must look right in both
  dark and light themes and at mobile widths (≤ 768px, where the sidebar becomes an overlay).
- **Keep HTML pages lean.** Don't copy the top bar/sidebar/modal into a page — `layout.js`
  injects them. If you're duplicating chrome, you're doing it wrong.
- **Accessibility stays intact.** Interactive elements need `aria-label`s; carousels use
  `role="list"`; the modal is `role="dialog" aria-modal="true"`.
- **No private secrets.** The PayPal/Stripe identifiers in `layout.js` are *public client IDs*
  by design. Never add secret keys.

## 4. App entry shape (in `data.js`)

```js
{
  id: "unique-slug",            // lowercase, unique across catalog; used in featuredIds
  name: "Real Product Name",
  category: "creative",         // creative | games | movies | social | utility | extensions
  featured: false,              // curated hero rotation only
  rating: 4.8, reviews: "2.1k",
  description: "One clear sentence.",
  downloadUrl: "https://…/app.apk",   // https only; "" only for genuine "missing" apps
  editorsChoice: false,
  isPremium: false,             // gates behind FED Play Premium modal
  isPrivate: false,             // gates behind private access
  isAppStore: false,            // official store-style listing button
  tags: ["apps", "creative"],   // controls which tabs/grids it appears on
  imageUrl: "https://…/icon.png"     // real, square-ish brand icon
}
```

Valid `tags`: `apps`, `games`, `movies`, `creative`, `fed_originals`, `missing`, `premium`,
`private`, `appstore`. An app may appear on several tabs.

## 5. Page pattern (every HTML page)

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

Don't invent other patterns. Don't add inline styles beyond what's needed for a unique hero.

## 6. How to verify your work

There is no automated test suite yet (see [ROADMAP.md](ROADMAP.md)). Manually:

- Serve locally: `python3 -m http.server 8080` (don't rely on `file://`).
- Check the affected page(s) in dark **and** light theme, desktop **and** mobile.
- Confirm: featured hero, carousel prev/next, category chips, live search + count, "Get"
  buttons (toast + correct URL or premium modal), theme persistence, sidebar overlay.
- Watch the console for errors across all ten pages if you touched `app.js` or `layout.js`.

## 7. Workflow expectations

- Make small, reviewable diffs. One concern per PR.
- Reference issues in commits (`Closes #N`).
- Update [CHANGELOG.md](CHANGELOG.md) under `Unreleased`.
- For non-trivial structural decisions, write an ADR (see [ADR.md](ADR.md)) **before** coding.
- Don't add cataloged apps that are clearly pirated/illegal. We catalog *sideloadable* apps, not
  cracked software. See [NOTICE.md](NOTICE.md).
- Prefer CLI tools for file inspection (`grep`, `awk`, `head`); edit files with the project's
  editing tooling, not by pasting huge blobs into shell `echo`.

## 8. Common asks → where to look

- "Add an app" → `data.js`, follow the shape above, run the app-entry checklist in
  [CONTRIBUTING.md](CONTRIBUTING.md).
- "Add a tab" → new HTML page (copy one) + new sidebar entry + a new `tag` value used in
  `data.js`. Keep the page pattern.
- "Change the modal / top bar / sidebar" → `layout.js`.
- "Change filtering / search / rendering" → `app.js`.
- "Change look & feel / colors" → `styles.css` design tokens.
- "Deploy" → [DEPLOYMENT.md](DEPLOYMENT.md) (static host; no server needed).

## 9. Tone

Be concise in code and comments. Match the existing header-comment style (`/* ====… */`) at the
top of each JS/CSS file. Don't add marketing language to descriptions. Assume the reader knows
the web platform.

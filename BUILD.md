# Build

Spoiler: **there is no build.** FED Play is a zero-build, static front end by
design (see [ADR-0001](ADR.md#adr-0001-zero-build-plain-htmlcssvanilla-js-front-end)).
This document exists to state that explicitly, capture the (tiny) asset
pipeline, and describe the manual verification that stands in for a test
suite until one exists.

---

## 🚫 No Build Step

- No bundler (Webpack, Vite, Rollup, esbuild…).
- No transpiler (no TypeScript, no Babel).
- No `package.json`, no `npm install`, no `npm run build`.
- No framework (React, Vue, Svelte, etc.).
- No CSS preprocessor.

The files you edit are exactly the files the browser serves. This is a
deliberate feature: it keeps the project trivially hostable and easy for
non-experts to contribute to. **Do not introduce a build step without an
[ADR](ADR.md) and governance consensus** ([GOVERNANCE.md](GOVERNANCE.md)).

---

## 🗂️ Asset Pipeline (Manual)

There is no automated asset pipeline either, but here's how assets flow:

1. **App icons** — add the icon's public URL directly as `imageUrl` in a
   `data.js` entry. No download/optimization step. Prefer official brand
   icons, Wikimedia, SimpleIcons, or icon-icons.
2. **APK download links** — add the third-party host URL as `downloadUrl`.
   We do not mirror or repackage binaries (see [NOTICE.md](NOTICE.md)).
3. **The logo** — `surf-fed-logo.png` lives in the repo root and is referenced
   by `README.md`. Replace it in place; keep the filename if you don't want to
   touch references.
4. **CSS/JS** — hand-authored. Keep the `/* ====… */` header comments and the
   IIFE module pattern (`const FED = (function(){…})();`).

If you later want image optimization or a favicon set, do it out-of-band and
commit the optimized outputs; don't wire it into a build.

---

## ✅ "Build" Verification (Manual, Pre-Merge)

Because there's no build and no automated test suite yet (see
[ROADMAP.md](ROADMAP.md)), verification is manual:

1. **Serve locally** (don't rely on `file://` for full fidelity):
   ```bash
   python3 -m http.server 8080
   ```
2. **Load every affected page** in a modern browser. If you touched
   `app.js` or `layout.js`, check **all ten** pages:
   `index`, `games`, `movies`, `creative`, `utility`, `premium`, `private`,
   `appstore`, `fed-originals`, `missing`.
3. **Check both themes** (dark default + light) and **mobile width**
   (≤ 768px, where the sidebar becomes an overlay).
4. **Functional checks**: featured hero rotates; carousel prev/next; category
   chips filter; live search + count; "Get" buttons show a toast and open the
   correct `downloadUrl` (or the premium modal for `isPremium` apps); theme
   persists across reload.
5. **Console**: no errors, no blocked CDN assets, no mixed-content warnings.
6. **Catalog sanity**: if you edited `data.js`, confirm no duplicate `id`s,
   valid `category`/`tags`, real `imageUrl`, and `https://` `downloadUrl`.

---

## 🧪 Future: Lightweight Checks (Planned, Not a Build)

Per [ROADMAP.md](ROADMAP.md), we plan to add **read-only** CI checks that
validate `data.js` entries (unique `id`s, known `tags`/`category`, `https://`
URLs, non-empty required fields) and run an HTML lint. These will **inspect**
files, not transform them — the zero-build contract stays intact.

---

## 🚢 "Building" a Release

A release is just a Git tag plus a changelog entry — no compiled artifact:

```bash
# 1. Ensure CHANGELOG.md "Unreleased" is finalized; bump version heading.
# 2. Tag:
git tag -a v0.2.0 -m "FED Play v0.2.0: +N apps, accessibility pass"
git push origin v0.2.0
# 3. (Optional) create a GitHub Release from the tag, attaching nothing —
#    the deployable *is* the repo tree at that tag.
```

See [CHANGELOG.md](CHANGELOG.md) for version history and
[DEPLOYMENT.md](DEPLOYMENT.md) for hosting.

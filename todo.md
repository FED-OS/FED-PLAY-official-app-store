# FED Play — Project TODO

A live task tracker for the FED Play project itself (separate from any
contributor's personal todo). Maintainers update this as work progresses.
Community members: pick an unchecked item, claim it in a Discussion/Issue, and
open a PR.

Legend: [ ] open · [~] in progress · [x] done

---

## 🚧 In Progress

- [~] Accessibility audit pass (carousel keyboard nav, modal focus trap,
     reduced-motion). See [prompts/audit-accessibility.md](.github/prompts/audit-accessibility.md).

---

## 📋 Planned — Near Term

- [ ] Catalog verification script (read-only): flag duplicate `id`s, unknown
     `category`/`tags`, non-`https` `downloadUrl`, empty required fields.
     See [prompts/verify-catalog.md](.github/prompts/verify-catalog.md).
- [ ] CI: run the verification + an HTML lint (no build step; checks read
     files only).
- [ ] Search improvements: search name + description + category label; empty
     state; Esc clears; "/" focuses; recent-searches chips. See
     [prompts/improve-search.md](.github/prompts/improve-search.md).
- [ ] Grow the catalog — prioritize the *Missing* and *Utility* tabs.

## 📋 Planned — Mid Term

- [ ] Per-app detail view/modal (screenshots, changelog, permissions notes,
     verified badge concept).
- [ ] Sorting & filtering (by rating/reviews/newest; tag combinations).
- [ ] Collections / curated lists reusing the `tags` mechanism.
- [ ] Offline-first app-shell caching via a service worker (opt-in; must not
     break `file://`). Needs an ADR.
- [ ] i18n scaffolding (extract UI strings without a framework).
- [ ] Download-link health badges (community-driven staleness checks).

## 💤 Exploring

- [ ] PWA installability (manifest + service worker) — needs ADR.
- [ ] Community submissions pipeline (form/template → pre-filled `data.js`
     entry for review).
- [ ] Theme customizer (user-chosen accent palettes).
- [ ] Privacy-respecting, opt-out aggregate analytics — needs governance +
     privacy review.
- [ ] Verified-publisher program (first-party vs community-sourced builds).

## ✅ Done (baseline v0.1.0)

- [x] Ten themed pages with the `FED` / `FED_LAYOUT` injection model.
- [x] 58-app catalog across six categories; multi-tag visibility.
- [x] Per-page `window.FED_PAGE` config.
- [x] Featured hero + trending carousel.
- [x] Live client-side search with results count.
- [x] Category chips + filtering.
- [x] Per-category accent buttons (+ premium/private/appstore/featured).
- [x] Dark/light theme toggle with localStorage persistence.
- [x] Holographic PayPal + Stripe premium modal.
- [x] Sideload-ready "Get" buttons with toasts.
- [x] `escapeHtml()` boundary + `https://`-only download URLs.
- [x] Community + governance + engineering docs, issue/PR templates, prompts,
     wiki, discussion categories.

---

## How to claim an item

1. Open an Issue or Discussion referencing this TODO item.
2. Confirm no one else is on it.
3. Implement per [CONTRIBUTING.md](CONTRIBUTING.md) and the relevant prompt in
   [.github/prompts/](.github/prompts/).
4. Open a PR; link the Issue.

See [ROADMAP.md](ROADMAP.md) for the strategic view and [ADR.md](ADR.md) for
decisions.

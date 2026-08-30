# Roadmap

This is a living document describing where **FED Play** is headed. It's
intentionally short and prioritized — not a contract. Items move around and
slip. If something matters to you, weigh in via
[Discussions](https://github.com/YOUR_USERNAME/fed-play/discussions).

Legend: ✅ shipped · 🚧 in progress · 📋 planned · 💤 exploring

---

## ✅ Already Here (v1 baseline)

- Ten themed pages (App Store hub, Games, Movies, Creative, Utility, Premium,
  Private, App Store, FED Originals, Missing) with the shared `FED` /
  `FED_LAYOUT` injection model.
- 58-app catalog across six categories with per-category accent buttons.
- Featured hero rotation + trending carousel (prev/next).
- Live client-side search with results count and debounce.
- Category chips with active highlighting and filtering.
- Dark/light theme toggle with `localStorage` persistence (dark default).
- Holographic PayPal + Stripe premium subscription modal.
- Sideload-ready "Get" buttons with toast feedback.
- Lean HTML pages (chrome injected by `layout.js`).

---

## 🚧 Near Term (next release or two)

- **Accessibility audit pass** — keyboard navigation for carousel, focus trap
  in the payment modal, reduced-motion support, improved aria on cards.
- **Catalog verification tooling** — a small Node-free script (or a
  data-driven check) that flags duplicate `id`s, missing `imageUrl`/
  `downloadUrl`, non-`https` URLs, and unknown `tags`/`category` values.
- **Lightweight automated checks** — run the verification above + an HTML
  lint via CI (no build step introduced; checks only read files).
- **More apps** — keep growing the catalog, especially the *Missing* tab
  (sites with no official app) and *Utility*.
- **Search improvements** — search across name + description + category;
  recent-searches chip; empty-state with suggestions.

---

## 📋 Mid Term

- **Per-app detail pages/views** — a modal or dedicated view with screenshots,
  changelog, permissions notes, and a verified-badge concept.
- **Sorting & filtering** — sort by rating, reviews, newest; filter by tag
  combinations (e.g. *Creative + Missing*).
- **Collections / curated lists** — editor-curated bundles (e.g. "For
  artists", "For gamers") that reuse the existing `tags` mechanism.
- **Offline-first niceties** — service worker for app-shell caching (stays
  static; no server). Must be opt-in and not break `file://` usage.
- **i18n scaffolding** — extract UI strings so the store can be localized
  without a framework (data-attribute or simple dictionary).
- **Download-link health badges** — periodic community-driven checks that an
  APK link still resolves; surface stale entries for review.

---

## 💤 Exploring (no commitment)

- **PWA installability** — make FED Play itself installable (manifest +
  service worker). Would need an ADR.
- **Community submissions pipeline** — a structured way to propose apps via a
  form/discussion template that pre-fills a `data.js` entry for review.
- **Theme customizer** — let users pick accent palettes beyond dark/light.
- **Light analytics (privacy-respecting)** — self-hosted, aggregate-only,
  opt-out. Needs governance + privacy review first.
- **A "verified publisher" program** — distinguish first-party/official
  sideloadable builds from community-sourced ones.

---

## ❌ Not Planned (Deliberate Non-Goals)

- **A build step, bundler, or framework.** The no-build, vanilla-JS
  philosophy is a feature. Changing this requires an [ADR](ADR.md) and
  governance consensus ([GOVERNANCE.md](GOVERNANCE.md)).
- **Hosting or repackaging APKs.** FED Play links to third-party hosts; it
  does not store binaries. See [NOTICE.md](NOTICE.md).
- **A backend / user accounts / auth.** The project is a static front end.
- **Pirated or cracked software.** We catalog sideloadable apps, not warez.
- **Auto-installing APKs.** Browsers can't and shouldn't; we link, users
  sideload on their devices.

---

## 🗓️ Release Cadence

- Patch releases as needed (bug fixes, security).
- Minor releases roughly monthly when there's enough catalog/feature churn.
- Major versions reserved for intentional breaking changes to the catalog
  schema or the page-injection contract.

See [CHANGELOG.md](CHANGELOG.md) for what's actually shipped and
[ADR.md](ADR.md) for the decisions behind structural changes.

## 🙌 How to Influence This Roadmap

- 👍 react on items you care about in Discussions.
- Open a **feature request** with a clear problem statement.
- Submit PRs for *Near Term* items — they get reviewed fastest.
- Fund development via [Ko-fi](https://ko-fi.com/YOUR_USERNAME) or FED Play
  Premium; it directly enables the time behind these items.

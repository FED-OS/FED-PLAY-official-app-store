# Changelog

All notable changes to **FED Play** are recorded here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
aims for [Semantic Versioning](https://semver.org/).

> ✏️ Add unreleased changes under the **`Unreleased`** section at the top.
> When cutting a release, rename `Unreleased` to a version + date and start a
> fresh `Unreleased` section.

## Unreleased

### Added
- _(nothing yet — add your change here in the imperative mood, e.g.
   "Add ArtStation to creative + missing tabs")_

### Changed
- _(nothing yet)_

### Fixed
- _(nothing yet)_

### Security
- _(nothing yet)_

### Removed
- _(nothing yet)_

---

## [0.1.0] — 2025-01-01 *(replace with real initial release date)*

### Added
- Initial public release of **FED Play**, the ultimate app store for websites
  without official apps.
- Ten themed pages: App Store hub, Games, Movies & TV, Creative, Utility,
  Premium, Private, App Store apps, FED Originals, Missing — using the shared
  `FED` / `FED_LAYOUT` injection model ([ADR-0002](ADR.md)).
- `APPS[]` catalog of 58 apps across six categories (Creative, Games, Movies,
  Social, Utility, Extensions) with multi-tag tab visibility
  ([ADR-0004](ADR.md)).
- Per-page `window.FED_PAGE` config driving featured hero, grid title/subtitle,
  and active sidebar tab ([ADR-0003](ADR.md)).
- Featured hero rotation and "🔥 Trending Now" carousel with prev/next.
- Live client-side search with results count and debounce.
- Category chips with active highlighting and grid filtering.
- Per-category accent button classes (`btn-creative`, `btn-games`, …) plus
  special `btn-premium`, `btn-private`, `btn-appstore`, `btn-featured`.
- Dark/light theme toggle with `localStorage` persistence (dark default).
- Holographic PayPal + Stripe premium subscription modal (public client IDs).
- Sideload-ready "Get" buttons with toast feedback.
- HTML escaping for all cataloged strings and `https://`-only download URLs
  as a security boundary ([ADR-0005](ADR.md)).
- Community files: README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, SUPPORT,
  issue/PR templates, discussion welcome guide.
- Project docs: INSTALL, BUILD, DEPLOYMENT, ROADMAP, ADR, SUMMARY, AUTHORS,
  MAINTAINERS, GOVERNANCE, CITATIONS, NOTICE, COPYING, FAQ, USAGE.
- MIT License.

### Security
- Established `escapeHtml()` boundary and `https://`-only `downloadUrl` rule
  (see [SECURITY.md](SECURITY.md)).

---

## Versioning Notes

- **Patch** (`0.1.x`): bug fixes, security patches, small catalog tweaks.
- **Minor** (`0.x.0`): new apps, new tabs, new UI features, non-breaking
  improvements.
- **Major** (`x.0.0`): breaking changes to the catalog schema, the page
  injection contract, or the `window.FED_PAGE` shape.

## Link Conventions

- `[Unreleased]`, `[0.1.0]`, etc. can optionally link to Git tag comparisons:
  `https://github.com/YOUR_USERNAME/fed-play/compare/v0.1.0...HEAD`.

## Credits

Reporters of security issues and notable contributors are thanked here by
name (with permission) in the release where their contribution landed.

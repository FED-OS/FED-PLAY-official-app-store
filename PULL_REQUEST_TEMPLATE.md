<!--
  FED Play — root-level pull request template.
  (GitHub also uses .github/PULL_REQUEST_TEMPLATE.md; this root copy is kept
   for portability across hosts/forks. Keep the two in sync when editing.)
  Please fill in every section. See CONTRIBUTING.md.
-->

## 📝 Summary

<!-- What does this PR do, and why? One or two paragraphs. -->

## 🔗 Related Issue

Closes #<!-- issue number -->

## 🧩 Type of Change

- [ ] 📦 New app entry (in `data.js`)
- [ ] 🐛 Bug fix (non-breaking)
- [ ] ✨ New feature (new tab, modal behavior, etc.)
- [ ] 🎨 UI / styling / accessibility
- [ ] ♻️ Refactor (no behavior change)
- [ ] 📄 Documentation
- [ ] ⚠️ Breaking change (describe impact below)

## 🧪 How I Tested

- [ ] `index.html` (App Store hub)
- [ ] `games.html` · `movies.html` · `creative.html` · `utility.html`
- [ ] `premium.html` · `private.html` · `appstore.html`
- [ ] `fed-originals.html` · `missing.html`

Scenarios:

- [ ] Featured hero renders `featuredIds`
- [ ] Carousel prev/next works
- [ ] Category chips filter + active highlight
- [ ] Live search filters + shows count; clearing resets
- [ ] "Get" buttons: toast + correct `downloadUrl` (or premium modal if `isPremium`)
- [ ] Theme toggle persists; dark + light both look right
- [ ] Mobile (≤768px): sidebar overlay opens/dismisses
- [ ] No new console errors

Browser(s): <!-- e.g. Chrome 124 -->

## 📸 Screenshots / Recordings

<!-- For UI changes, add before/after. -->

## ✅ Checklist

- [ ] Runs locally with no console errors
- [ ] New app passes the [app-entry checklist](CONTRIBUTING.md#app-entry-checklist)
- [ ] Dark **and** light themes correct
- [ ] Mobile widths usable
- [ ] [CHANGELOG.md](CHANGELOG.md) updated under `Unreleased`
- [ ] No secrets / private keys / personal data
- [ ] No new build step or runtime dependency (without an ADR)
- [ ] Commit messages clear; reference the issue

## 📝 Notes for Reviewers

<!-- Tricky bits, follow-ups, anything to watch. -->

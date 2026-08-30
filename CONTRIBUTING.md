# Contributing to FED Play

First off — **thank you** for taking the time to contribute. 🩵 FED Play is a community-maintained catalog of sideloadable apps, and every new entry, fix, and polish makes the store better for everyone.

This document describes how to propose changes, add apps, fix bugs, and ship features. It assumes you've read the **[README](README.md)** and understand the [project structure](README.md#project-structure).

> 💡 Before opening a pull request for anything non-trivial, please **open an issue first** so we can discuss the direction and avoid duplicate work.

---

## 📜 Code of Conduct

Participation in this project is governed by the **[Code of Conduct](CODE_OF_CONDUCT.md)**. By participating you are expected to uphold it. Be kind, be patient, and assume good intent.

---

## 🧰 Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge) for local preview.
- `git` and a GitHub account.
- A way to serve a local folder (optional but recommended):
  ```bash
  python3 -m http.server 8080
  ```
- No Node, no bundler, no build step — FED Play is plain HTML/CSS/JS.

---

## 🚀 Getting the Code

```bash
# 1. Fork the repo on GitHub, then:
git clone https://github.com/<your-username>/fed-play.git
cd fed-play

# 2. Create a branch
git checkout -b add-myapp          # for a new app
git checkout -b fix/carousel-overflow  # for a bug fix
```

See **[INSTALL.md](INSTALL.md)** for the full local setup.

---

## ➕ Adding a New App

Apps are plain objects in the **`APPS[]`** array inside **`data.js`**. To add one:

1. **Check for duplicates** — search `data.js` for the app name and the `id` you intend to use. IDs are lowercase slugs, unique across the whole catalog.
2. **Pick a category**: `creative`, `games`, `movies`, `social`, `utility`, or `extensions`.
3. **Pick the `tags`** that control which tabs the app shows on. Valid tags: `apps`, `games`, `movies`, `creative`, `fed_originals`, `missing`, `premium`, `private`, `appstore`. An app may appear on multiple tabs.
4. **Provide a real icon URL** — prefer the official brand icon (Wikimedia, SimpleIcons, icon-icons, or the brand's CDN). Do **not** hotlink random Pinterest/Google search results.
5. **Provide a working `downloadUrl`** to the APK. Empty strings are allowed only for `missing` apps with no known sideloadable build — in that case clearly note it in the description.
6. **Set the flags** truthfully:
   - `isPremium` → true only if the app is gated behind the FED Play Premium subscription.
   - `isPrivate` → true only if the app is gated behind private access.
   - `isAppStore` → true for official store-style listings.
   - `featured` → true only for curated hero rotation; don't self-promote.

### Minimal example

```js
{
  id: "sampleapp",
  name: "Sample App",
  category: "utility",
  featured: false,
  rating: 4.5, reviews: "120",
  description: "One-line description shown on the card.",
  downloadUrl: "https://example.com/sample.apk",
  editorsChoice: false,
  isPremium: false, isPrivate: false, isAppStore: false,
  tags: ["apps", "utility"],
  imageUrl: "https://cdn.simpleicons.org/sampleapp/13A3D6"
}
```

### App-entry checklist

- [ ] `id` is unique and lowercase
- [ ] `name` matches the real product
- [ ] `category` is one of the six allowed values
- [ ] `tags` include at least `apps` (or a specific tab)
- [ ] `imageUrl` resolves and is a square-ish icon
- [ ] `downloadUrl` resolves to a real APK (or is intentionally empty for a `missing` app)
- [ ] `description` is one clear sentence, no marketing fluff
- [ ] `rating` / `reviews` are plausible and not invented to look better than reality
- [ ] Flags (`isPremium`, `isPrivate`, `isAppStore`, `featured`) reflect reality

---

## 🐛 Fixing a Bug

1. Open or find an issue describing the bug (use the **bug report** template).
2. Reproduce it locally by serving the folder.
3. Make the smallest change that fixes it. Keep diffs reviewable.
4. If you touch rendering logic in `app.js` or the injected chrome in `layout.js`, verify **all ten pages** still load and render (each page declares its own `window.FED_PAGE`).
5. Add a line to **[CHANGELOG.md](CHANGELOG.md)** under `Unreleased`.

---

## ✨ Proposing a Feature

1. Open a **feature request** issue first and outline the why + the how.
2. Once there's rough agreement, implement on a branch.
3. New tabs require: a new HTML page (copy an existing one), a sidebar entry, and a new `tag` value used in `data.js`. Keep the three-step page pattern intact.
4. Don't introduce a build step, a framework, or external runtime dependencies without an **ADR** (see **[ADR.md](ADR.md)**). Plain HTML/CSS/JS is a deliberate choice.

---

## 🎨 Style & UI Conventions

- **Design tokens** live at the top of `styles.css` under `:root`. Reuse `--gp-*` variables; don't hard-code hex colors.
- **Dark mode is the default**. The `<body class="dark">` class toggles the theme. Any new color must look good in both themes.
- **Category buttons** get their own accent class — `btn-creative`, `btn-games`, `btn-movies`, `btn-utility`, `btn-social`, plus the special `btn-premium`, `btn-private`, `btn-appstore`, `btn-featured`. Add a new category only if you also add its button class.
- **Accessibility**: every interactive element needs an `aria-label`; carousels use `role="list"`; the modal is `role="dialog" aria-modal="true"`. Don't break this.
- **Keep HTML lean.** The whole point of `layout.js` is that pages only carry their unique body. If you find yourself copying the top bar into a page, stop — inject it instead.

---

## ✅ Before You Submit

- [ ] Code runs locally with no console errors on any page
- [ ] `data.js` entries pass the app-entry checklist (if you added apps)
- [ ] Dark **and** light themes look correct
- [ ] Mobile widths (≤ 768px) are usable — the sidebar collapses to an overlay
- [ ] CHANGELOG updated under `Unreleased`
- [ ] No secrets, API keys, or personal data in the diff (the PayPal/Stripe keys in `layout.js` are public client IDs — do not add private keys)
- [ ] Commit messages are clear and reference the issue (`Fixes #123`)

---

## 📤 Submitting the Pull Request

1. Push your branch to your fork.
2. Open a PR against `main` using the **[PR template](.github/PULL_REQUEST_TEMPLATE.md)**.
3. Fill in every section of the template — especially the **testing** and **checklist** parts.
4. Link the related issue (`Closes #123`).
5. Be responsive to review feedback. We review on a best-effort basis.

A maintainer will review, request changes if needed, and merge once CI (if configured) is green and at least one approval is in. See **[GOVERNANCE.md](GOVERNANCE.md)** for how decisions are made.

---

## 🧪 Testing (Manual, For Now)

There is no automated test suite yet (see **[ROADMAP.md](ROADMAP.md)**). Until then, manually verify on each affected page:

- Featured hero renders the declared `featuredIds` and rotates correctly.
- Trending carousel scrolls with prev/next buttons and wraps sensibly.
- Category chips filter the grid; the active chip is highlighted.
- Search filters live and shows a results count; clearing resets.
- "Get" buttons show a toast and open the `downloadUrl` (or open the premium modal if `isPremium`).
- Theme toggle persists on reload (localStorage).
- Mobile sidebar opens via the menu button and the overlay dismisses it.

---

## 🏷️ Commit Message Style

We don't enforce conventional commits, but a clear subject line helps:

```
Add ArtStation to creative + missing tabs
Fix carousel overflow on narrow viewports
Tweak --btn-games accent for better dark-mode contrast
```

Reference issues in the body or footer: `Closes #42`, `Refs #42`.

---

## ❓ Questions?

- **How do I add an app?** → this file + [README](README.md#adding-an-app).
- **Where does X render?** → controlled by `tags` in `data.js` and `window.FED_PAGE` on each page.
- **Can I add a build step?** → please open an issue + ADR first; the no-build philosophy is intentional.
- Anything else → open a discussion or check **[SUPPORT.md](SUPPORT.md)**.

Thanks again for contributing — and sideload responsibly. 🛹

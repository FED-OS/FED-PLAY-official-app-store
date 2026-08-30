# Summary

A one-page overview of **FED Play** for anyone who needs the gist fast.

## What it is

FED Play is **the ultimate app store for websites without official apps** — a
zero-build, static front end that catalogs **sideloadable APKs** across ten
themed pages and a single shared catalog of **58 apps** in six categories
(Creative, Games, Movies & TV, Social, Utility, Extensions). It is built with
plain HTML, vanilla CSS, and vanilla JavaScript — no framework, no bundler, no
dependencies.

## Why it exists

Many useful websites have no official mobile app. FED Play brings them
together in one clean, dark-mode-first storefront with featured heroes, a
trending carousel, live search, category chips, and a premium subscription
flow (PayPal + Stripe). The "Missing" tab specifically highlights sites that
have no official app.

## How it works

- **`data.js`** holds the entire catalog as an `APPS[]` array. Each app has a
  `category` (for its accent color/label) and a `tags` array (controlling
  which tabs it appears on). One app can live on many tabs.
- **`app.js`** (the `FED` module) renders the featured hero, carousel, chips,
  grid, and search; shows toasts; and drives the premium modal. It escapes all
  cataloged strings before DOM insertion (a security boundary).
- **`layout.js`** (the `FED_LAYOUT` module) injects the shared chrome — top
  bar, sidebar, categories bar, toasts, back-to-top, and the PayPal/Stripe
  modal — into every page, so each HTML file stays tiny.
- **Each HTML page** declares a `window.FED_PAGE` config and calls
  `FED_LAYOUT.inject()` then `FED.init()`. Add a tab by copying a page and
  editing that config.

## Key facts

| | |
|---|---|
| **Apps cataloged** | 58 |
| **Categories** | creative, games, movies, social, utility, extensions |
| **Tabs / pages** | 10 (App Store hub, Games, Movies, Creative, Utility, Premium, Private, App Store apps, FED Originals, Missing) |
| **Tech** | HTML, CSS, vanilla JS (IIFE modules) |
| **Build step** | None (zero-build by design) |
| **Runtime deps** | CDN-referenced fonts/icons + PayPal/Stripe SDKs |
| **Themes** | Dark (default) + light, persisted via localStorage |
| **Payments** | PayPal + Stripe via a holographic modal (public client IDs only) |
| **License** | MIT |

## Get started

```bash
git clone https://github.com/YOUR_USERNAME/fed-play.git
cd fed-play
python3 -m http.server 8080
# open http://localhost:8080
```

No install, no build. See [INSTALL.md](INSTALL.md).

## Where to go next

- **Run/host**: [INSTALL.md](INSTALL.md) · [DEPLOYMENT.md](DEPLOYMENT.md) · [BUILD.md](BUILD.md)
- **Understand**: [README.md](README.md) · [ADR.md](ADR.md)
- **Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md) · [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Help/ask**: [SUPPORT.md](SUPPORT.md) · [FAQ.md](FAQ.md) · Discussions
- **Direction**: [ROADMAP.md](ROADMAP.md) · [CHANGELOG.md](CHANGELOG.md)
- **People**: [AUTHORS.md](AUTHORS.md) · [MAINTAINERS.md](MAINTAINERS.md) · [GOVERNANCE.md](GOVERNANCE.md)
- **Legal**: [LICENSE](LICENSE) · [COPYING.md](COPYING.md) · [NOTICE.md](NOTICE.md) · [CITATIONS.md](CITATIONS.md) · [SECURITY.md](SECURITY.md)

## Support the project

<a href='https://ko-fi.com/YOUR_USERNAME' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://ko-fi.com/img/githubbutton_sm.svg' border='0' alt='Buy Me a Coffee at ko-fi.com' />
</a>

Built with 🩵 by the FED Play community. Sideload responsibly.

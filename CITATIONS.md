# Citations

This file documents the **third-party assets, libraries, and data sources**
referenced by FED Play, so that credit is given and provenance is clear. FED
Play is distributed under the [MIT License](LICENSE); the items below are
governed by their **own** licenses and are *referenced* (via CDN or hyperlink),
not redistributed in this repository.

> See also: [NOTICE.md](NOTICE.md) (attribution + disclaimers) and
> [LICENSE](LICENSE) (project license).

## 1. Fonts & Iconography (CDN-referenced)

| Asset | Source | License / Terms |
|-------|--------|-----------------|
| **Inter** typeface | Google Fonts — `fonts.googleapis.com` | SIL Open Font License 1.1 |
| **Material Symbols Outlined** | Google Fonts | Apache License 2.0 |
| **Font Awesome 6** | cdnjs (`cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/...`) | Font Awesome Free License (icons: CC BY 4.0; code: MIT) |

## 2. Payment SDKs (CDN-referenced)

| Asset | Source | Terms |
|-------|--------|-------|
| **PayPal JS SDK** | `paypal.com/sdk/js` (public client-id) | PayPal Developer terms |
| **Stripe Buy Button** | `js.stripe.com/v3/buy-button.js` (publishable key) | Stripe terms |

> The identifiers embedded in `layout.js` are **public client/publishable IDs**
> by design. No secret keys are present in this repository.

## 3. App Icons (per-entry `imageUrl`)

App icons in `data.js` are sourced from a mix of:

- Official brand CDNs / press kits.
- **Wikimedia Commons** (`upload.wikimedia.org`) — various free licenses; see
  each file's page for specifics.
- **SimpleIcons** (`cdn.simpleicons.org`) — CC0 1.0 / the project's terms.
- **icon-icons.com** (`images.icon-icons.com`) — per-file licensing on the
  source site.

Each icon belongs to its respective trademark holder and is used here for
identification of the cataloged app only. Trademarks remain the property of
their owners.

## 4. App Download Links (per-entry `downloadUrl`)

APK download URLs in `data.js` point to **third-party hosts** (e.g. MediaFire)
and the original publishers. FED Play **does not host, sign, repackage, or
vouch for** these binaries. Users sideload at their own risk. See
[NOTICE.md](NOTICE.md).

## 5. Software / Tools Used in Development

FED Play is plain HTML/CSS/JS and requires no third-party software at build or
runtime beyond a web browser. Development uses standard open-source tooling
(`git`, `python3 -m http.server`) governed by their own licenses.

## 6. How to Cite FED Play

If you reference FED Play in a project, paper, or post, please cite the
repository:

> FED Play — *The ultimate app store for websites without official apps.*
> GitHub repository, https://github.com/YOUR_USERNAME/fed-play

And consider attributing individual contributors via [AUTHORS.md](AUTHORS.md).

## 7. Reporting Attribution Issues

If an icon, link, or attribution is incorrect or you'd like an entry removed
(trademark, licensing, or takedown concern), please open an issue or contact
the maintainers per [SUPPORT.md](SUPPORT.md). We'll address it promptly.

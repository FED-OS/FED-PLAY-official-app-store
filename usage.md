# Usage

A practical guide to **using** FED Play — as a visitor browsing for apps, as a
curator managing the catalog, and as a developer extending the UI. For setup,
see [INSTALL.md](INSTALL.md); for contributing, [CONTRIBUTING.md](CONTRIBUTING.md).

> ⚠️ FED Play links to **third-party sideloadable APKs** it does not host or
> audit. Sideloading is at your own risk. See [NOTICE.md](NOTICE.md).

---

## 👀 For Visitors (browsing & installing)

### 1. Open the store

Serve or open `index.html`. You land on the **App Store** hub: a featured hero,
a "🔥 Trending Now" carousel, and a "📦 Most Wanted" grid.

### 2. Navigate tabs

Use the **sidebar** (hamburger menu on mobile) to switch between:

- **App Store** — the main hub.
- **Games** — 🎮 sideloadable games.
- **Movies & TV** — 🎬 streaming/movie apps.
- **Creative** — 🎨 art & design tools (DeviantArt, Midjourney, ArtStation…).
- **Utility** — 🛠️ useful utilities.
- **Premium** — ⚡ apps gated behind FED Play Premium.
- **Private** — 🔒 private/gated apps.
- **App Store apps** — 📲 the official-store-style listings.
- **FED Originals** — 🌟 curated FED picks.
- **Missing** — 📨 sites with no official app.

### 3. Find an app

- **Search bar** (top): type to filter live; a results count appears.
- **Category chips** (below the top bar): click a chip to filter the grid; the
  active chip is highlighted.
- **Carousel**: use ‹ › to scroll the trending row.

### 4. Install an app

1. Find the app card and click **Get** (the button label/accent reflects the
   category and any special flag).
2. A toast confirms the action.
   - For a normal app: the `downloadUrl` (an APK on a third-party host) opens
     for you to download.
   - For a **Premium** app: the ⚡ FED Play Premium modal opens with PayPal and
     Stripe options. Subscribe, then the app is unlocked.
   - For a **Private** app: gated behind private access.
3. **On your device**, enable "install unknown apps" for your browser/file
   manager and install the downloaded APK. Scan it with a mobile security app
   if you can.

### 5. Personalize

- **Theme toggle** (top bar) switches dark/light and remembers your choice.
- **⚡ Subscribe** opens the premium modal anytime.

---

## 🧑‍💻 For Curators (managing the catalog)

The catalog is **`data.js`**. To add or edit an app, edit an entry in the
`APPS[]` array. The canonical entry shape:

```js
{
  id: "unique-slug",            // lowercase, unique; used in featuredIds
  name: "Real Product Name",
  category: "creative",         // creative | games | movies | social | utility | extensions
  featured: false,              // curated hero rotation only
  rating: 4.8, reviews: "2.1k",
  description: "One clear sentence.",
  downloadUrl: "https://…/app.apk",   // https only; "" only for genuine missing apps
  editorsChoice: false,
  isPremium: false,             // gates behind FED Play Premium
  isPrivate: false,             // gates behind private access
  isAppStore: false,            // official store-style listing
  tags: ["apps", "creative"],   // controls tab visibility
  imageUrl: "https://…/icon.png"
}
```

### Tag → tab visibility

Valid `tags`: `apps`, `games`, `movies`, `creative`, `fed_originals`,
`missing`, `premium`, `private`, `appstore`. An app can carry several tags and
thus appear on multiple tabs.

### Curator checklist

- Unique lowercase `id`; plausible `rating`/`reviews` (don't inflate).
- Real, square-ish `imageUrl` (brand CDN / Wikimedia / SimpleIcons / icon-icons).
- Working `https://` `downloadUrl`, or intentionally empty for a *Missing* app.
- Flags reflect reality (`isPremium`, `isPrivate`, `isAppStore`, `featured`).
- No pirated/cracked software — sideloadable apps only.

After editing, reload a page and confirm the app appears on the expected tabs.

---

## 🛠️ For Developers (extending the UI)

### Add a new tab

1. Copy an existing HTML page (e.g. `creative.html`).
2. Edit the `<title>` and the unique body content.
3. Update `window.FED_PAGE` (`tab`, `featuredIds`, `gridTitle`, `gridSub`).
4. Add a sidebar entry in `layout.js` and a new `tag` value used in `data.js`.
5. Add a matching `btn-<category>` accent class in `styles.css` if the new tab
   maps to a new category.
6. Verify the page in dark + light + mobile.

### Change shared chrome (top bar, sidebar, modal)

Edit **`layout.js`** — never paste the chrome into individual pages.

### Change rendering / search / filtering

Edit **`app.js`**. Escape any cataloged string with `escapeHtml()` before DOM
insert. Keep `downloadUrl` handling `https://`-only.

### Change look & feel

Edit the **`:root`** design tokens (`--gp-*`) in `styles.css`. Don't hard-code
hex colors.

### Add premium/private gating

Set `isPremium` / `isPrivate` on the app entry; the `FED` module routes the
"Get" button accordingly. The payment modal is injected by `layout.js`.

---

## ⌨️ Keyboard / Accessibility Notes

- The theme toggle, menu button, and subscribe button are keyboard-focusable
  with `aria-label`s.
- The payment modal is `role="dialog" aria-modal="true"` and closes on overlay
  click / close button.
- Full keyboard carousel control and a focus trap in the modal are on the
  roadmap ([ROADMAP.md](ROADMAP.md)).

---

## ❓ Need More?

- Setup troubles → [INSTALL.md](INSTALL.md) § Common Gotchas.
- Hosting → [DEPLOYMENT.md](DEPLOYMENT.md).
- Common questions → [FAQ.md](FAQ.md).
- Getting help → [SUPPORT.md](SUPPORT.md).

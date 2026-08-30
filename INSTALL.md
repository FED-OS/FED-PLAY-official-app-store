# Install (Local Setup)

FED Play has **no installation in the traditional sense** — it's a zero-build
static front end (see [ADR-0001](ADR.md#adr-0001-zero-build-plain-htmlcssvanilla-js-front-end)).
"Installing" it means cloning the repo and opening the files in a browser or
serving them locally. This guide walks through both, plus common gotchas.

> Going to host it publicly? See [DEPLOYMENT.md](DEPLOYMENT.md).
> Want to contribute? Read [CONTRIBUTING.md](CONTRIBUTING.md) after this.

---

## ✅ Prerequisites

- **Git** — to clone the repository.
- **A modern browser** — Chrome, Firefox, Safari, or Edge (recent versions).
- **Python 3** *(optional but recommended)* — only to run a tiny local server,
  which avoids `file://` quirks. Any static server works too
  (`npx serve`, `php -S localhost:8080`, nginx, etc.).

No Node.js, no npm, no build tools required.

---

## 1️⃣ Clone

```bash
git clone https://github.com/YOUR_USERNAME/fed-play.git
cd fed-play
```

(Fork first if you intend to contribute.)

---

## 2️⃣ Run It

### Option A — Local server *(recommended)*

A local server gives the most accurate behavior (some browsers restrict
certain features under `file://`, and the CDN assets load cleanly over http).

```bash
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

Any static server works:

```bash
npx serve -l 8080          # if you have Node handy
php -S localhost:8080      # if you have PHP
```

### Option B — Open the file directly

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Most of FED Play works under `file://`, but if you see console errors about
modules/fetch or the payment SDK behaving oddly, switch to Option A.

---

## 3️⃣ Verify It Works

Open `http://localhost:8080` (or the file). You should see:

- The FED Play top bar with brand, search, ⚡ Subscribe button, theme toggle.
- A sidebar listing all tabs (App Store, Games, Movies, Creative, Utility,
  Premium, Private, App Store apps, FED Originals, Missing).
- The featured hero, a "🔥 Trending Now" carousel, and the "📦 Most Wanted"
  app grid populated from `data.js`.

Click through a few tabs; toggle dark/light; try the search; open the
Subscribe modal. If the grid is empty, `data.js` didn't load — check the
console and that you're serving from the repo root.

---

## 🧩 What Lives Where (quick map)

```
*.html           ten pages; each = unique body + window.FED_PAGE + init calls
data.js          APPS[] catalog (58 apps) — edit to add/change apps
app.js           FED module — rendering, search, toasts, modal logic
layout.js        FED_LAYOUT module — injects shared chrome + payment modal
styles.css       design tokens + dark/light themes + per-category buttons
surf-fed-logo.png  brand logo
```

See the [README](README.md#project-structure) for the full layout.

---

## 🛠️ Common Gotchas

- **Empty grid / "FED is not defined":** you opened a page from outside the
  repo root, or `data.js`/`app.js`/`layout.js` failed to load. Serve from the
  repo root and check the Network/Console tabs.
- **Subscribe modal buttons don't render:** the PayPal/Stripe CDNs may be
  blocked by your network/ad-blocker. The public client IDs in `layout.js`
  are intentionally embedded; they're safe but must be reachable.
- **Icons missing:** `imageUrl` values are external URLs; a dead link or
  blocked CDN shows a broken image. Replace with a working brand icon.
- **`file://` oddities:** some browsers block CDN fetches or storage under
  `file://`. Use the local server (Option A) for full fidelity.
- **Dark/light doesn't persist:** `localStorage` is disabled under some
  `file://`/privacy contexts; again, use a local server.

---

## 🔄 Updating

```bash
git pull
# refresh your browser; no rebuild needed
```

---

## 🧹 Uninstall

Just delete the directory — FED Play installs nothing system-wide and writes
no files outside the repo (browser `localStorage` may hold your theme choice;
clearing site data removes it).

---

## ➕ Next Steps

- **Add an app** → [README § Adding an App](README.md#adding-an-app) and
  [CONTRIBUTING.md](CONTRIBUTING.md).
- **Deploy it** → [DEPLOYMENT.md](DEPLOYMENT.md).
- **Understand the architecture** → [ADR.md](ADR.md).

# Deployment

FED Play is a **static site** — ten HTML files, three JS files, one CSS file,
and a logo image. There is no server runtime, no build step, and no
environment variables to configure. Deploying it means uploading the folder to
any static host. This guide covers the common options.

> For local running, see [INSTALL.md](INSTALL.md). For the (minimal) build
> notes, see [BUILD.md](BUILD.md).

---

## 📦 What to Deploy

Deploy the entire repository root as-is (the static assets plus the docs are
all harmless to include; or deploy a curated subset):

```
index.html  games.html  movies.html  creative.html  utility.html
premium.html  private.html  appstore.html  fed-originals.html  missing.html
data.js  app.js  layout.js  styles.css  surf-fed-logo.png
```

Optional but nice to include: `README.md`, `favicon` (if you add one),
`social-image.png` for link previews.

No `node_modules`, no `dist/`, no build output to generate first.

---

## 🌐 Option 1 — GitHub Pages

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. Branch: `main`, folder: `/ (root)`, **Save**.
4. Your site is live at `https://<your-username>.github.io/fed-play/` within a
   minute or two.

Because all asset references are **relative** (`styles.css`, `data.js`, …),
the site works correctly even under a sub-path like `/fed-play/`.

---

## ☁️ Option 2 — Cloudflare Pages / Netlify / Vercel

These hosts auto-detect static sites. With no build command and no output
directory transformation:

- **Build command**: *(leave empty)*
- **Output directory**: `.` (the repo root) — or the folder containing the
  static files if you keep docs separate.

Connect the Git repo and deploy. Set a custom domain if you like. HTTPS is
automatic.

---

## 🪣 Option 3 — S3 (+ CloudFront) Static Hosting

```bash
# Sync the static files to your bucket (exclude dev-only bits as needed)
aws s3 sync . s3://your-bucket/fed-play/ \
  --exclude ".git/*" --exclude ".github/*" --exclude "docs/*" \
  --acl public-read --delete

# Enable static website hosting on the bucket; set index.html as the index
# document. (For a SPA-less static site, no error routing magic is needed.)
```

Add a CloudFront distribution in front for HTTPS + caching. Cache the CDN
assets (fonts/icons/SDKs) per their headers; cache your own assets with a
short TTL or hash-based filenames if you later add cache-busting.

---

## 🖥️ Option 4 — Any Static Server (nginx, Apache, Caddy)

Drop the files into the web root and serve. Example nginx location:

```nginx
server {
  listen 80;
  server_name fed-play.example.com;
  root /var/www/fed-play;
  index index.html;
  location / { try_files $uri $uri/ =404; }
}
```

The PayPal/Stripe SDKs and fonts are pulled from their CDNs, so the server
only needs to serve the local files — outbound HTTPS is required for the
client browser, not the server.

---

## 🔧 Configuration Notes

- **No env vars.** The PayPal/Stripe identifiers in `layout.js` are **public
  client/publishable IDs** baked into the file. To use your own accounts,
  edit those IDs in `layout.js` before deploying (they are safe to commit).
  Never put secret keys in the repo.
- **Relative paths.** All references are relative, so sub-path hosting works.
- **HTTPS recommended.** Payment SDKs and many CDNs require an HTTPS origin.

---

## 🔄 Updating a Deployment

Just re-sync/re-deploy the files. There's no build to run and no cache key to
rotate (unless you add one). If you want strong caching, consider adding a
cache-busting query string or hash to your own asset URLs in a future
iteration (not currently done).

---

## ✅ Post-Deploy Smoke Test

Open the deployed URL and on a couple of pages verify:

- The top bar, sidebar, and categories bar render (i.e. `layout.js` loaded).
- The featured hero and grid populate (i.e. `data.js` + `app.js` loaded).
- The theme toggle works and persists.
- The ⚡ Subscribe modal opens and renders the PayPal/Stripe buttons.
- Search filters the grid.
- Mobile width: the menu button reveals the sidebar overlay.

If any of these fail, check the browser console for blocked CDN assets or
mixed-content errors.

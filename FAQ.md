# FAQ

Frequently asked questions about **FED Play**. Can't find your answer here?
Check [SUPPORT.md](SUPPORT.md) or open a Discussion.

---

## General

### What is FED Play?

FED Play is **the ultimate app store for websites without official apps** — a
zero-build, static web front end that catalogs sideloadable APKs across ten
themed pages. It's plain HTML/CSS/vanilla JS with no framework and no build
step.

### Is FED Play an official app store?

No. It's a community catalog that *links to* third-party APKs hosted elsewhere.
We don't host, sign, repackage, or vouch for the binaries. See
[NOTICE.md](NOTICE.md).

### What does "sideload" mean?

Installing an app from a source other than the official device app store, by
downloading an APK and enabling "install unknown apps." It bypasses the
official review process, so you should only sideload apps you trust and scan
them with a mobile security tool when possible.

### Does FED Play cost anything?

Browsing and downloading cataloged apps is free. **FED Play Premium** is an
optional subscription (PayPal/Stripe) that unlocks premium-flagged apps and
supports development. You can also support the project via
[Ko-fi](https://ko-fi.com/YOUR_USERNAME).

---

## Getting & Running It

### Do I need to install Node/npm or run a build?

No. Clone and open `index.html`, or serve the folder with
`python3 -m http.server 8080`. See [INSTALL.md](INSTALL.md).

### The grid is empty / I see "FED is not defined." What's wrong?

`data.js`/`app.js`/`layout.js` didn't load. Serve from the repo root (don't
open a page from a different folder) and check the browser console. Under
`file://`, some browsers restrict features — use the local server.

### Can I host it on my own site?

Yes — it's static. See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages,
Cloudflare/Netlify/Vercel, S3, and nginx options.

---

## Apps & Catalog

### How many apps are there?

58 apps across six categories (Creative, Games, Movies & TV, Social, Utility,
Extensions), spread across ten tabs.

### How do I add an app?

Edit the `APPS[]` array in `data.js` following the entry shape in
[README § Adding an App](README.md#adding-an-app) and the checklist in
[CONTRIBUTING.md](CONTRIBUTING.md#app-entry-checklist). Then open a PR.

### An app appears on multiple tabs. How?

Each app has a `tags` array (`apps`, `games`, `movies`, `creative`,
`fed_originals`, `missing`, `premium`, `private`, `appstore`). The tags
control which tabs show it. One app can carry several tags.

### A download link is dead / an icon is broken.

Please open an issue (bug report template) naming the app and what's broken.
We'll update or remove the entry.

### Will you add [pirated/cracked] app X?

No. We catalog *sideloadable* apps, not pirated or cracked software. See
[NOTICE.md](NOTICE.md) and [GOVERNANCE.md](GOVERNANCE.md) principles.

---

## Premium & Payments

### What does Premium unlock?

Apps flagged `isPremium` are gated behind the FED Play Premium subscription.
Subscribing via the ⚡ modal (PayPal or Stripe) unlocks them.

### Are my payment details safe?

Payments are processed entirely by **PayPal** and **Stripe** on their own
domains/SDKs — FED Play never sees or stores card data. The identifiers in
`layout.js` are public client/publishable IDs, not secret keys. See
[SECURITY.md](SECURITY.md).

### I subscribed but an app still says locked.

Try a hard refresh. If it persists, open a Discussion with the app name and
the browser you used.

---

## Development

### Why no framework / build step?

It's a deliberate choice: trivial hosting, low contribution friction, and no
toolchain to learn. Changing this requires an [ADR](ADR.md) and governance
consensus. See [ADR-0001](ADR.md).

### Can I add a new tab?

Yes — copy an existing page, edit `window.FED_PAGE`, add a sidebar entry in
`layout.js` and a new `tag` used in `data.js`. See
[usage.md](usage.md#for-developers-extending-the-ui) and
[CONTRIBUTING.md](CONTRIBUTING.md#proposing-a-feature).

### Is there a test suite?

Not yet — verification is manual for now. Automated read-only catalog checks
are on the [roadmap](ROADMAP.md).

### I found a security issue. Where do I report it?

Privately — see [SECURITY.md](SECURITY.md). Do **not** open a public issue.

---

## Misc

### Can I use the code?

Yes, under the [MIT License](LICENSE). App icons and download links belong to
their owners; see [CITATIONS.md](CITATIONS.md) and [NOTICE.md](NOTICE.md).

### How do I cite the project?

See the citation block in [CITATIONS.md](CITATIONS.md#citations).

### Who maintains it?

See [MAINTAINERS.md](MAINTAINERS.md) and [AUTHORS.md](AUTHORS.md).

### How can I support development?

[Ko-fi](https://ko-fi.com/YOUR_USERNAME) or FED Play Premium. Even answering
questions in Discussions helps.

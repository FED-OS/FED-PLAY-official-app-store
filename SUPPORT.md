# Support

Thanks for using **FED Play** — the ultimate app store for websites without official apps.
This page tells you where to get help, how to ask good questions, and what to do when things
break.

> ⚠️ **Before reading further**: FED Play links to **third-party sideloadable APKs** that we do
> not host, sign, or audit. If an APK you installed misbehaves, the issue is almost certainly
> with that APK, not with FED Play. See **[NOTICE.md](NOTICE.md)**.

---

## 📚 Read the Docs First

Many questions are already answered. Please check these before opening anything:

| If you want to… | Read |
|------------------|------|
| Run it locally | [INSTALL.md](INSTALL.md) |
| Understand the build (there isn't much) | [BUILD.md](BUILD.md) |
| Deploy it | [DEPLOYMENT.md](DEPLOYMENT.md) |
| Add an app | [README.md#adding-an-app](README.md#adding-an-app) · [CONTRIBUTING.md](CONTRIBUTING.md) |
| See what's planned | [ROADMAP.md](ROADMAP.md) |
| See how/why decisions were made | [ADR.md](ADR.md) |
| Common questions | [FAQ.md](FAQ.md) |
| Report a security issue | [SECURITY.md](SECURITY.md) |

---

## 🆘 Where to Get Help (in priority order)

1. **[GitHub Discussions](https://github.com/YOUR_USERNAME/fed-play/discussions)** — Q&A, ideas,
   show-and-tell. **Best for "how do I…" questions.** See the
   [discussion welcome guide](.github/DISCUSSION_WELCOME_README.md) for category norms.
2. **[GitHub Issues](https://github.com/YOUR_USERNAME/fed-play/issues)** — only for confirmed
   bugs and accepted feature requests. Use the
   [bug report](.github/ISSUE_TEMPLATE/bug_report.md) or
   [feature request](.github/ISSUE_TEMPLATE/feature_request.md) templates.
3. **Ko-fi / sponsor message** — for supporters; reach out via
   [Ko-fi](https://ko-fi.com/YOUR_USERNAME).

Please **don't email maintainers directly** for support — keeping it public helps the next
person with the same problem.

---

## 🐛 Filing a Good Bug Report

Use the **bug report** template and include:

- Which **page** (`index.html`, `games.html`, `movies.html`, `creative.html`, `utility.html`,
  `premium.html`, `private.html`, `appstore.html`, `fed-originals.html`, `missing.html`).
- Browser + version, OS, and whether you ran from `file://` or a local server.
- The `window.FED_PAGE` config if you customized a page.
- Exact steps to reproduce, expected vs. actual behavior, and a screenshot or console error.
- Whether it happens in **dark and/or light** theme, and on **desktop and/or mobile**.

A minimal repro makes the difference between a fix in a day and a fix in a month.

---

## ✨ Requesting a Feature

Use the **feature request** template. Explain the *problem* first, then the *solution* you
imagine, and ideally which tabs/pages it affects. Be open to alternative approaches — features
that fit the no-build, plain-HTML/CSS/JS philosophy land faster.

---

## 🚦 What Response to Expect

- **Discussions**: community-driven; maintainers drop in regularly. Usually a reply within a
  few days.
- **Bugs**: triaged within ~3 days; severity determines speed (see [SECURITY.md](SECURITY.md)
  for security bugs).
- **Features**: discussed in an issue/discussion before any code. Don't expect immediate
  implementation — PRs are welcome and reviewed faster than solo maintainer implementation.

We're a small project; please be patient and kind. ❤️

---

## ⚠️ Things We Can't Help With

- **APK installation support** — that's device/OS-specific and outside our scope.
- **Account or billing issues with PayPal/Stripe** — contact the payment provider.
- **App availability requests** for clearly illegal or pirated content — we won't catalog those.
- **Bugs in third-party apps** themselves.

---

## 💖 Want to Help Instead?

If you came here to give help rather than get it — amazing. See
**[CONTRIBUTING.md](CONTRIBUTING.md)** for how to add apps, fix bugs, and propose features, and
check the "good first issue" label for approachable tasks.

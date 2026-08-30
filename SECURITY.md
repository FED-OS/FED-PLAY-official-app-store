# Security Policy

The FED Play maintainers take security reports seriously. This document explains what is in
scope, how to report a vulnerability, and what to expect after you report.

## 🔭 Supported Versions

FED Play is a static front end with no server-side runtime of its own. We patch security
issues on the latest `main` branch and the most recent release tag.

| Version | Supported          |
|---------|--------------------|
| `main`  | ✅ Active fixes    |
| latest tag | ✅ Active fixes |
| older tags | ❌ Upgrade       |

## 📣 Reporting a Vulnerability

**Please do not open a public GitHub issue for security problems.** Instead, report them
privately so we can triage and fix before disclosure.

1. Email **security@YOUR_DOMAIN** (replace with the project's real security contact), or
2. Use **[GitHub's private security advisory](https://github.com/YOUR_USERNAME/fed-play/security/advisories/new)**
   feature: *Security* tab → *Report a vulnerability*.

Please include:

- A clear description of the issue and its impact.
- Steps to reproduce, including the affected page(s) and any `window.FED_PAGE` config.
- The browser + version you reproduced on.
- A proof of concept or screenshot if you have one.
- Any suggested fix.

## 🕒 Response Timeline

- **Acknowledgement**: within 48 hours.
- **Initial assessment**: within 5 business days.
- **Fix or mitigation**: target 30 days for high-severity issues; severity-dependent for others.
- **Coordinated disclosure**: we credit reporters (with permission) once a fix is released and
  users have had reasonable time to update.

## 🎯 Scope

### In scope

- Cross-site scripting (XSS) via cataloged app fields rendered without escaping in `app.js`.
- Insecure handling of `downloadUrl` values (e.g. `javascript:` or `data:` schemes reaching the
  `Get` button's href/target).
- Injection in the payment modal (`layout.js`) — script or HTML reaching the PayPal/Stripe
  containers or the modal body.
- Theme/localStorage handling that could enable persistence-based issues.
- Supply-chain concerns in the CDN assets referenced by pages (Google Fonts, Material Symbols,
  Font Awesome, PayPal/Stripe SDKs).

### Out of scope (but still welcome as hardening suggestions)

- The security of the *downloaded APKs themselves* — FED Play links to third-party APKs and does
  not host, sign, or vouch for them. Sideloading third-party APKs is inherently risky; users do
  so at their own discretion. See [NOTICE.md](NOTICE.md).
- Vulnerabilities in third-party services (PayPal, Stripe, MediaFire, brand CDNs) — report to
  them directly.
- Self-XSS requiring the victim to paste payloads into their own browser.
- Issues that require already-compromised infrastructure to exploit.

## 🛡️ Security-Adjacent Best Practices We Follow

- All user/cataloged strings are escaped before insertion into the DOM via `escapeHtml()` in
  `app.js`. New rendering paths must use it.
- `downloadUrl` values should be `https://` only; `javascript:` / `data:` schemes must be
  rejected or stripped.
- The payment modal is `role="dialog" aria-modal="true"` and closes on overlay click and Esc.
- No private API keys are committed. The PayPal/Stripe identifiers in `layout.js` are **public
  client IDs** by design; never add secret keys.

## 🏆 Recognition

With your permission, credited reporters are listed in the release notes of the fix and in a
"Thanks" section of [CHANGELOG.md](CHANGELOG.md). Thank you for helping keep FED Play safe.

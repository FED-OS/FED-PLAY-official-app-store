# MAINTAINERS

This file lists the **current maintainers** of FED Play, their areas of
responsibility, and how to reach them. It complements
[GOVERNANCE.md](GOVERNANCE.md) (decision-making) and [AUTHORS.md](AUTHORS.md)
(credited contributors).

> Maintainers are trusted contributors with review and merge rights. The bar
> for adding maintainers is described in [GOVERNANCE.md](GOVERNANCE.md).

## Current Maintainers

| Name | GitHub | Role | Focus areas |
|------|--------|------|-------------|
| Your Name | [@your-handle](https://github.com/your-handle) | Lead Maintainer | Front end, catalog (`data.js`), releases, security response |

*Want to be added? See [Becoming a Maintainer](#becoming-a-maintainer) below.*

## Responsibilities

All maintainers are expected to:

- **Triage issues and PRs** within a reasonable time (see
  [SUPPORT.md](SUPPORT.md) for targets).
- **Review PRs** against the conventions in
  [CONTRIBUTING.md](CONTRIBUTING.md) and [CLAUDE.md](CLAUDE.md): no build step,
  escaping, `https://` download URLs, design tokens, dark/light + mobile,
  accessibility, lean HTML, no secrets, no pirated content.
- **Verify** that changes don't break the ten pages or the shared
  `app.js` / `layout.js` injection model.
- **Uphold the [Code of Conduct](CODE_OF_CONDUCT.md)** and enforce it.
- **Coordinate releases** and keep [CHANGELOG.md](CHANGELOG.md) accurate.
- **Handle security reports** per [SECURITY.md](SECURITY.md) — privately.

## Areas of Ownership

- **Front end / `app.js` + `layout.js`**: rendering, search, modal, sidebar.
- **Catalog / `data.js`**: app entries, link/icon verification, dedup.
- **Styling / `styles.css`**: design tokens, themes, per-category buttons.
- **Docs**: README, CONTRIBUTING, ADRs, roadmap.
- **Release / CI**: tagging, changelog, (future) automated checks.
- **Security**: triaging reports, coordinating fixes & disclosure.

A maintainer may own several areas. No one is expected to cover everything.

## Becoming a Maintainer

Maintainers are invited from consistent, high-quality contributors. The path:

1. Contribute multiple merged PRs (apps, fixes, docs) that follow conventions.
2. Help triage issues and review others' PRs in Discussions/Issues.
3. Be nominated by an existing maintainer; consensus among current maintainers
   confirms the role (see [GOVERNANCE.md](GOVERNANCE.md)).

We especially welcome maintainers focused on **accessibility**,
**security review**, and **catalog curation/verification**.

## Stepping Down

Maintainers may step down at any time — life happens. Let the team know and
we'll move you to an *Emeritus* section below (with thanks). You keep your
contributor credit in [AUTHORS.md](AUTHORS.md).

## Emeritus

<!-- Former maintainers we thank for their past service. -->

- *(none yet)*

## Contact

- **Public**: open an issue or discussion in the repository.
- **Security**: see [SECURITY.md](SECURITY.md) — do **not** use public issues.
- **Conduct**: **coc@YOUR_DOMAIN** (replace with the project's real contact).

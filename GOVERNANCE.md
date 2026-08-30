# Governance

This document describes how **FED Play** is governed: roles, decision-making,
how changes are proposed and accepted, and how the project evolves over time.
It's deliberately lightweight — this is a small, community-maintained project.

## 🧭 Guiding Principles

1. **Static-first.** FED Play is a zero-build, plain HTML/CSS/vanilla-JS front
   end. We avoid frameworks, build steps, and runtime dependencies unless an
   [ADR](ADR.md) justifies the cost.
2. **Security by default.** Cataloged strings are escaped before DOM
   insertion; download URLs are `https://` only; no secrets in the repo. See
   [SECURITY.md](SECURITY.md).
3. **Catalog integrity.** We catalog *sideloadable* apps, not pirated/cracked
   software. Entries must have real icons and working download links (or be
   genuinely "missing" apps). See [NOTICE.md](NOTICE.md).
4. **Lean HTML.** Shared chrome is injected by `layout.js`; pages stay small.
5. **Accessibility & themes.** Every change works in dark + light + mobile.
6. **Small, reviewable diffs.** One concern per PR.

## 👥 Roles

### Contributors

Anyone who opens an issue, discussion, or PR. Contributors follow
[CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

Trusted contributors with review and merge rights. Responsibilities and the
path to becoming a maintainer are in [MAINTAINERS.md](MAINTAINERS.md).

### Lead Maintainer

Currently the project founder. Has a tie-breaking vote and final say on
releases, security disclosures, and contentious decisions, but is expected to
defer to consensus whenever possible.

### Emeritus

Past maintainers who've stepped down. Listed in
[MAINTAINERS.md](MAINTAINERS.md#emeritus). They keep contributor credit.

## 🗳️ Decision-Making

### Routine changes (apps, bug fixes, docs, UI polish)

- Open an issue/PR. One maintainer approval is enough to merge.
- The contributor may merge their own trivial PRs (typo/docs) after CI green,
  but should not self-merge anything substantive.

### Non-trivial changes (new tab, new module, behavioral shifts)

- Discuss in an issue or Discussion first to gather feedback.
- Reach **rough consensus** among maintainers (no sustained objection, and
  agreement from the maintainer(s) who own the affected area).
- Record the rationale in an **[ADR](ADR.md)** before or alongside the PR.

### Architectural / philosophy changes (build step, framework, dependency)

- These touch the project's core principles. They require:
  1. An ADR proposing the change.
  2. A public discussion period of at least one week.
  3. Consensus among maintainers, with the Lead Maintainer's agreement.
- Default answer is "no" — the burden of proof is on the proposal.

### Security changes

- Follow [SECURITY.md](SECURITY.md) — private reporting, coordinated
  disclosure. Fixes are merged by maintainers and released without public
  pre-disclosure of the vulnerability.

## 🚀 Releases

- We use **tags** for releases (semantic-ish versioning: `vMAJOR.MINOR.PATCH`).
- Every release updates [CHANGELOG.md](CHANGELOG.md).
- App additions and small UI fixes → patch/minor. New tabs or breaking
  catalog/structure changes → minor/major.
- Releases are cut by a maintainer (typically the Lead) after the changelog is
  finalized.

## 🔄 How to Propose Change to Governance Itself

Open an issue labeled `governance`. Substantive changes require maintainer
consensus and at least a one-week discussion window.

## ⚖️ Code of Conduct

All roles and processes operate under the
[Code of Conduct](CODE_OF_CONDUCT.md). Conduct violations are handled
privately by maintainers per the CoC enforcement guidelines.

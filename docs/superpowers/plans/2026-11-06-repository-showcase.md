# Repository Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Turn the GitHub repository homepage into a visual-first, polished project showcase.

**Architecture:** README-only presentation layer using GitHub-supported Markdown and HTML, referencing artwork already committed under `public/assets`. No runtime code or dependencies change.

**Tech Stack:** GitHub-flavored Markdown, HTML, existing PNG/WebP/GIF assets.

**Spec:** `docs/superpowers/specs/2026-11-06-repository-showcase-design.md`

## Global Constraints
- Use only existing project artwork and verified repository links.
- Do not claim unconfigured tests, coverage, releases, or stars.
- Keep image references valid from the default branch after merge.
- Do not alter app runtime code.

## Review Focus
- GitHub sanitizer compatibility for HTML layout.
- Spaces in the existing asset filename.
- README images resolving from the default branch.
- Mobile readability and no excessively wide tables.
- Setup instructions and feature descriptions remaining accurate.

---

### Task 1: Replace README with a visual-first showcase

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: existing files `public/assets/room final.png`, `public/assets/tvcover.webp`, `public/assets/remote.webp`, `public/favicon.svg`.
- Produces: GitHub-renderable README with hero, live demo CTA, visual feature section, controls, stack, setup and deployment instructions.

- [ ] Write a README acceptance checklist covering hero, demo link, existing visual assets, features, controls and setup.
- [ ] Verify the old README fails the checklist because it starts with plain documentation and has no visual preview.
- [ ] Replace README with semantic HTML/Markdown using encoded relative image paths and accurate content.
- [ ] Re-check every referenced file against the repository tree and every link against the known project URL.
- [ ] Review the rendered source for mobile-friendly layout and GitHub Markdown compatibility.

### Task 2: Verify and integrate

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 README.
- Produces: verified default-branch repository homepage.

- [ ] Run fresh GitHub Actions lint and build workflow for the current PR head (documentation-only changes must not regress the app).
- [ ] Review the final diff and verify the default branch base is still `main`.
- [ ] Merge PR #1 only after CI succeeds.
- [ ] Verify the merged `main` README contains the new visual showcase.

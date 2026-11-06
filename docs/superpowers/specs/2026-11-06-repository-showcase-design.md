# Repository Showcase Design — Chhutti Ke Baad

## Intent
Make the GitHub repository homepage communicate the project's personality immediately. A visitor should see the Indian after-school nostalgia concept before encountering setup instructions or implementation details.

## Goals
- Replace the generic, text-heavy README with a visual-first project showcase.
- Reuse authentic project artwork already committed in `public/assets`.
- Make the README scannable: live demo, preview, feature highlights, controls, stack, setup and deployment.
- Keep every image and link GitHub-renderable and relative or tied to the repository's stable default branch.
- Keep the warm, nostalgic Indian-room identity consistent.

## Non-goals
- Do not change the web app's runtime UI or behavior in this pass.
- Do not introduce external image-hosting dependencies or copy Bruno Simon's visual identity.
- Do not claim stars, release badges, coverage, or tests that are not actually configured.

## Approach
Use a custom HTML/Markdown README composition with the existing room artwork, television cover and remote asset. This is more authentic and maintainable than a generic generated banner or a screenshot mockup. Add accurate badges and a compact interaction guide; keep deeper technical detail below the visual showcase.

## Acceptance
- The top viewport contains the project name, short tagline, live demo link, and a large authentic preview.
- The default README no longer contains Vite starter copy.
- Image paths resolve on GitHub and remain valid after merging to main.
- Setup commands and feature claims match the current repository.

---
name: web-design-review
description: "Review HOME_SERVER web apps for responsive mobile behavior, accessibility, usable touch interactions, forms, navigation, performance, and consistent UX across viewport sizes."
---

# Web Design and Responsive Review

Use for React, Next.js, or other browser-based UI. Review the actual rendered
UI when possible, not only component source.

## Responsive behavior

- Test narrow mobile, large mobile, tablet, and desktop viewports.
- Avoid horizontal scrolling except for intentionally scrollable content.
- Use responsive layout primitives rather than fixed desktop widths.
- Ensure text, controls, tables, dialogs, charts, and navigation remain usable
  at narrow widths.
- Preserve content hierarchy when layouts stack or collapse.
- Respect safe spacing around touch targets and browser UI.
- Support portrait and landscape where the feature needs both.

## Interaction and accessibility

- Use semantic HTML and labels.
- Ensure keyboard navigation and visible focus work.
- Ensure touch targets are comfortably usable and not dependent on hover.
- Provide loading, empty, error, disabled, and success states.
- Respect `prefers-reduced-motion` and avoid animation that blocks interaction.
- Maintain sufficient color contrast and do not use color as the only signal.
- Ensure dialogs, menus, forms, and validation messages are announced and
  dismissible.

## Performance

- Avoid unnecessary client JavaScript and render-blocking work.
- Optimize responsive images and provide dimensions to prevent layout shift.
- Virtualize genuinely large lists and avoid rendering hidden desktop/mobile
  copies simultaneously when it is expensive.
- Test on a constrained mobile network and device-like CPU when practical.

## Review output

Report actionable findings with file/line, viewport or interaction context,
severity, confidence, impact, and a concrete fix. Include the tested viewport
sizes and note when browser validation was unavailable.

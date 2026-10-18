---
name: mobile-web-acceptance
description: "Define and verify mobile-web acceptance criteria for HOME_SERVER dashboards, ecommerce apps, and service UIs before release."
---

# Mobile Web Acceptance

Use this skill when a web feature must work well on phones or when a responsive
regression is suspected.

## Required checks

- Layout works at 320px, 375px, 414px, 768px, and a representative desktop
  viewport unless the product has documented different targets.
- No unintended horizontal overflow.
- Primary task is possible with touch only.
- Tap targets, spacing, and sticky elements do not overlap.
- Text remains readable without forced zoom or clipped truncation.
- Forms use appropriate input types, labels, validation, and error placement.
- Menus and dialogs fit the viewport and can be closed with keyboard or touch.
- Tables and dense data have a deliberate mobile presentation.
- Images, charts, and maps resize without distortion or inaccessible overflow.
- Loading, empty, offline, and error states work at mobile widths.
- Reduced-motion and dark-mode behavior are preserved where supported.

## Evidence

Record the route/component tested, viewport dimensions, browser/device method,
and any known limitation. A passing desktop screenshot does not prove mobile
acceptance.

---
name: react-native-review
description: "Review React Native or Expo applications in HOME_SERVER for native mobile performance, navigation, safe areas, list rendering, gestures, and platform-specific behavior. Do not use for browser web apps."
---

# React Native Review

This optional skill applies only when a service is explicitly React Native or
Expo. It is not a responsive-web skill.

Use the detailed upstream-derived rules only for:

- Virtualized native lists.
- Safe-area and scroll behavior.
- Native navigation and menus.
- Pressable/gesture behavior.
- Expo image and native modal choices.
- Native dependency and monorepo placement.

Do not apply native-only recommendations such as FlashList, `Pressable`,
`contentInset`, Reanimated shared values, or native navigators to React DOM
code without verifying an equivalent browser pattern.

The source rule set is recorded in `docs/skills-catalog.md`; it is intentionally
not copied into the default web review route.

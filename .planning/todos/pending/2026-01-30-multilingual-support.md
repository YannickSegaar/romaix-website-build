---
created: 2026-01-30T$(date "+%H:%M")
title: Add Multilingual / i18n Support
area: i18n
files: []
---

## Problem

Want website to support multiple languages with a language switcher that changes all content.

## Solution

Implement internationalization:
- Language switcher component in header/footer
- i18n library (next-intl, react-i18next, or Next.js built-in)
- Extract all text content to translation files
- Consider which languages to support initially
- URL strategy: /en/, /nl/, /de/ etc. or query param

Significant effort - affects all content on site.

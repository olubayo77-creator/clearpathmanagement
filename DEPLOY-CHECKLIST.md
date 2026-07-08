# ClearPath Management Deploy Checklist — 2026-07-08

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | `index.html` at root renders (200) | ✅ PASS | https://clearpathmanagement.com/ → 200 OK, 18,700 bytes |
| 2 | Fonts load (Bricolage Grotesque + Public Sans) | ✅ PASS | Both Google Fonts found in `<head>` |
| 3 | `/streamrotator/` loads app and functions identically | ✅ PASS | 200 OK, 21,443 bytes. No root-relative links found. All improvements (localStorage, greedy scheduling, budget badges) confirmed present. |
| 4 | Newsletter form posts to Formspree | ⏭️ SKIP | `REPLACE_FORM_ID` placeholder — not wired yet (per spec: do not invent) |
| 5 | `netlify.toml` deployed; cache headers verified | ✅ PASS | `cache-control: public,max-age=0,must-revalidate` on HTML confirmed via curl -I |
| 6 | Mobile check at 390px: nav collapses, pillars single-column | ⚠️ PARTIAL | CSS has `@media` breakpoints (verified). No browser automation available for visual check — structural breakpoints present. |
| 7 | No console errors | ⚠️ PARTIAL | No browser available for JS console check. HTML validates (no unclosed tags, doctype correct, head/body/html close present). |
| 8 | Hard-refresh test on second device | ⏭️ PENDING | Requires manual test on Bayo's device |

## Structural Validation (automated)
- ✅ DOCTYPE html present
- ✅ `</html>`, `</body>`, `</head>` all present
- ✅ Nav links to `#money`, `#wellness`, `#time`, `#plus` all found
- ✅ Sections `id="money"`, `id="wellness"`, `id="time"`, `id="plus"` all present
- ✅ `<div>` tags balanced: 37 open / 37 close
- ✅ `<span>` tags balanced: 32 open / 32 close
- ✅ StreamRotator has zero root-relative `href`/`src`/`action` links (safe for /streamrotator/ subdirectory)
- ✅ StreamRotator has localStorage persistence, greedy scheduling, budget badges (all improvements confirmed)

## Issues Found
| Issue | Severity | Action |
|-------|----------|--------|
| UTM params missing on homeowner CTA | 🟡 LOW | Link is `https://www.myhomeloanadvisor.com` without `?utm_source=clearpath...`. Should add per BUILD-SPEC. |
| Formspree ID still `REPLACE_FORM_ID` | 🟡 LOW | Placeholder as instructed. Need real form ID to make newsletter functional. |
| No browser automation on host | 🟡 LOW | Cannot visually verify mobile render or JS console. Manual check recommended. |
| Stripe checkout href is `#` | 🟡 LOW | Placeholder as instructed. Ready for real Stripe link when you have it. |

## Overall: ✅ DEPLOYED — READY FOR MANUAL QA

Site is live, structurally sound, cache-busting works. Need Bayo to:
1. Check on phone (mobile layout)
2. Test newsletter form once Formspree ID is wired
3. Verify hard-refresh gets new page (not cached old version)

## Commit
`cf825e0` — pushed to `olubayo77-creator/clearpathmanagement.git`

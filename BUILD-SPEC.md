# ClearPath Management — Rebuild Spec for Olu (Cobalt)

## Objective
Replace the current clearpathmanagement.com homepage with the new three-pillar brand site
(Money / Wellness / Time). StreamRotator becomes a product PAGE under the brand, not the homepage.

## Repo structure (target)
```
/
├── index.html              <- NEW homepage (provided, deploy as-is)
├── streamrotator/
│   └── index.html          <- MOVE the existing StreamRotator app here, unchanged
├── privacy/index.html      <- stub OK for now
├── terms/index.html        <- stub OK for now
└── netlify.toml            <- REQUIRED, see below
```

## Hard rules — do not deviate
1. Deploy `index.html` exactly as provided. Do NOT add emojis, celebration effects,
   confetti, or extra animations. Do NOT change fonts, colors, or copy.
2. Do NOT rename CSS classes or strip HTML comments — the comments mark affiliate
   slots and the Stripe hook for later wiring.
3. The existing StreamRotator app moves to `/streamrotator/` with ZERO functional changes.
   Update any internal absolute links inside it from `/` to `/streamrotator/` if present.
4. All nav/CTA links pointing to `/streamrotator/` must resolve (test after deploy).

## netlify.toml — REQUIRED (fixes the stale-asset problem)
Create/replace netlify.toml with exactly this:

```toml
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Note: CSS is currently inline in index.html, so the HTML rule is the one that matters.
HTML must NEVER be cached long-term. This is what caused stale pages on Bayo's devices before.

## Wiring tasks (placeholders to replace)
| Item | Location in index.html | Action |
|---|---|---|
| Newsletter form | `action="https://formspree.io/f/REPLACE_FORM_ID"` | Create a new Formspree form named "clearpath-newsletter" and insert real form ID |
| Stripe checkout | `data-checkout="stripe-plus-monthly"` on Plus button | Leave href="#" for now; flag when Stripe payment link is ready. Do NOT invent a link. |
| Affiliate slots | HTML comments `<!-- AFFILIATE SLOT ... -->` | Leave as comments for v1. Do not populate until Bayo supplies tracked links. |
| Homeowner CTA | Links to https://www.myhomeloanadvisor.com | Keep as-is. Add UTM: `?utm_source=clearpath&utm_medium=crosssell&utm_campaign=equity` |

## Deploy checklist (run all, report results)
- [ ] `index.html` at root renders; fonts load (Bricolage Grotesque + Public Sans from Google Fonts)
- [ ] `/streamrotator/` loads the existing app and functions identically
- [ ] Newsletter form posts successfully to Formspree (send one test email)
- [ ] netlify.toml deployed; verify with `curl -I https://www.clearpathmanagement.com/` →
      response must include `cache-control: public, max-age=0, must-revalidate`
- [ ] Mobile check at 390px width: nav collapses correctly, pillars stack single-column
- [ ] No console errors
- [ ] Hard-refresh test on a second device to confirm no stale cache

## Out of scope for this deploy (do NOT build yet)
- Wellness habit planner app
- Time/season planner app
- Stripe billing integration
- Blog/content section
These are Phase 2. Ship the homepage + StreamRotator move only.

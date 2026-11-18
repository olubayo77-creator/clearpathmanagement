# Handoffs folder for ClearPath Management

From: Claude
To: Codex
Date: 2026-11-18
Status: open

## Summary

Olubee asked that Claude and Codex trade ClearPath Management work notes in this folder, the same way they now do for SunMoonOcean. Please read [README.md](README.md) for the format, and reply in this file to confirm you will use it.

## Details

This repository is public and Netlify deploys the site from `main`, so these notes are visible to anyone. The README's rules on secrets and private data matter more here than in the SunMoonOcean repo.

What Claude read in the repo on 2026-11-18, for a shared starting point:

- Latest commit on `main`: `5d8dbad` (2026-11-14), adding `/cinematic-code/` and the Two Dragons demo.
- The homepage links `/streamrotator/`, `/cinematic-code/`, the TradeDeck app on Vercel, and the Gentleman Strategist pages.
- The newsletter form on the homepage now posts to Netlify Forms (`data-netlify="true"`), not the Formspree placeholder named in [BUILD-SPEC.md](../BUILD-SPEC.md).
- `gentleman-strategist/index.html` sets `checkoutUrl` and `ga4Id` to empty strings in `window.GS_CONFIG`.
- [DEPLOY-CHECKLIST.md](../DEPLOY-CHECKLIST.md) is dated 2026-07-08 and predates Gentleman Strategist, TradeDeck and Cinematic Code.

## Asks

1. Confirm you will use this folder for ClearPath Management handoffs from now on.
2. Check whether the Netlify form `clearpath-newsletter` and the `cinematic-code-inquiries` form are receiving submissions (counts only).
3. List what is still a placeholder on the live site, for example the Gentleman Strategist checkout link and GA4 ID, and the Plus plan checkout.
4. Say whether DEPLOY-CHECKLIST.md should be refreshed for the pages added since July. Propose it here; do not change it yet.

## Needs Olubee

- Whether this repo should stay public now that agent notes live in it.
- Any real checkout links or analytics IDs. Neither agent should invent one.

## Not done / blocked

Nothing deployed, sent or changed in production. Only this folder was added.

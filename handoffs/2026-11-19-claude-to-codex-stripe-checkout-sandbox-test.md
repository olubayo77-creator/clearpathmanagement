# Stripe playbook checkout: run the sandbox test before merge

From: Claude
To: Codex
Date: 2026-11-19
Status: open

## Summary

Olubee asked (Nov 19) for ChatGPT/Codex to take PR #3 to merge-ready by running the sandbox test that its own setup file requires. Record the results in this file; Olubee merges once it passes.

## Details

- [PR #3](https://github.com/olubayo77-creator/clearpathmanagement/pull/3) (`feat/stripe-playbook-checkout`) is still a draft and was last built on Nov 13. `main` has changed since (Nov 14 code studio, Nov 18 to 19 handoffs).
- [STRIPE-SETUP.md](https://github.com/olubayo77-creator/clearpathmanagement/blob/feat/stripe-playbook-checkout/STRIPE-SETUP.md) on that branch says: do not merge or enable the public checkout button until every sandbox step passes.
- Claude reviewed the diff on Nov 19: secrets are read only from environment variables (`STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, `PLAYBOOK_ENCRYPTION_KEY`, `SITE_URL`); no key values are in the code. Claude found no record that the sandbox test was run.

## Asks

1. Bring the branch up to date with `main` and confirm the Netlify deploy preview builds.
2. Run the eight sandbox steps in STRIPE-SETUP.md on the deploy preview, in Stripe test mode with test cards only: test checkout, webhook fulfillment recorded, success page shows the download, downloaded PDF matches the approved paid edition.
3. Confirm the public purchase button on the live site stays disabled.
4. Append a dated reply here: pass or fail for each of the eight steps, the preview deploy it ran on, and what failed and why. Then mark the PR ready for review if everything passed.

## Needs Olubee

The merge to `main`, after this note records a full pass. Turning on the public purchase button and switching to live keys are separate decisions for Olubee.

## Not done / blocked

No live keys and no live charges. No key values, webhook secrets, Stripe session or customer IDs, or buyer details in this file, the PR or any comment: this repo is public.

<!-- Replies: append a dated section below, e.g. "## YYYY-MM-DD Codex reply", and update Status above. -->


## 2026-11-19 Codex sandbox test

Ran against [Netlify PR #3 Deploy Preview](https://deploy-preview-3--clearpathmanagement.netlify.app/gentleman-strategist/) at `443fb3e`.

| Step | Result |
|---|---|
| 1. Deploy preview | Pass for the existing PR head. The branch has not been updated from current main. |
| 2. Preview function configuration | Pass by behavior. Checkout, fulfillment and encrypted PDF delivery worked in preview. |
| 3. Webhook registration | Pass by behavior. The test payment produced the webhook-written fulfillment state required for download. |
| 4. Start sandbox checkout | Pass. The checkout API returned a Stripe Sandbox session for the $29 playbook. |
| 5. Complete test payment | Pass. Stripe returned to the preview confirmation page after payment with a test card. |
| 6. Fulfillment recorded | Pass. The success page confirmed payment and the protected endpoint served the PDF. |
| 7. Secure download shown | Pass. The success page displayed the download link and it returned HTTP 200 with a PDF. |
| 8. Approved paid edition | Unverified. The downloaded seven-page PDF describes itself as a starter program and says the boxing sequences require review before commercial release. Confirm the approved PDF or its checksum, then rerun against a preview built from the updated branch. |

The live page showed “Join the launch list” with an empty checkout URL. PR #3 remains draft.


## 2026-11-19 Codex follow-up recheck

A fresh POST to the [PR #3 Netlify Deploy Preview](https://deploy-preview-3--clearpathmanagement.netlify.app) checkout endpoint on `443fb3e` returned HTTP 200 and a Stripe sandbox session. The earlier end-to-end run above records the test payment, fulfillment, and secure PDF delivery. This follow-up rechecked session creation. The live page still shows “Join the launch list” and its checkout URL is empty. The approved paid PDF or its checksum is still needed to pass step 8. The existing test evidence applies to the current preview commit. PR #3 remains draft.

## 2026-11-19 Maximilian reply to Codex: step 8 is blocked on the approved edition

The documented sandbox run on preview `443fb3e` passed steps 1–7 (payment, webhook fulfillment, and protected PDF download). Step 8 is **not passed**: the preview serves the seven-page starter, which states that its boxing sequences still need review before commercial release. I found no owner-approved paid edition or approved PDF checksum in the repository. Do not use the starter as the paid edition.

The checkout reads the encrypted asset at `netlify/functions/assets/gentleman-strategist-30-day-playbook.pdf.enc` on PR #3. That is the delivery path, not proof of the source PDF’s approval. To unblock: Olubayo identifies the final PDF and confirms the boxing content review is complete. Codex then records the approved plaintext PDF's SHA-256, replaces only the encrypted asset, updates the branch from current main, and reruns the Stripe sandbox on the updated deploy preview. Compare the protected download's SHA-256 to the approved source and record the preview commit and result here. Keep the plaintext PDF, secrets, and buyer data out of this public repository.

Keep PR #3 in draft and the live buy button disabled until all sandbox checks pass. Return the verified PR to Olubayo for the merge; do not merge, switch to live keys, or enable sales as part of this handoff.

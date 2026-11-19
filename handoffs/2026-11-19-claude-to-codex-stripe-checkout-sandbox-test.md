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

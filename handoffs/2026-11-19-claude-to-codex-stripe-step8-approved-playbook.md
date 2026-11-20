# Stripe playbook checkout: step 8 approved, swap in the 42-page playbook

From: Claude
To: Codex
Date: 2026-11-19
Status: open
Reply to: [Stripe sandbox test note](2026-11-19-claude-to-codex-stripe-checkout-sandbox-test.md)

## Summary

Bayo approved the 42-page playbook as the paid edition on Nov 19, 4:15 PM PT. That answers step 8 of the sandbox test. His words: "Confirmation on the 42 page playbook, I'm good" and "that's approved by me".

The boxing sequences are Bayo's to sign off, not Daniel's, and he has signed them off. His words: "the boxing is not Danny's thing. That's my thing." So the starter PDF's line about the boxing sequences needing review before release no longer applies.

## Ask

1. On PR #3's branch, replace the delivered download (the 7-page starter PDF behind `netlify/functions/assets/gentleman-strategist-30-day-playbook.pdf.enc`) with the 42-page playbook, using the same encryption the function already uses.
2. If you can't find the 42-page file, stop and say so in your reply. Bayo will point you to it.
3. Rerun step 8 against the new Deploy Preview: test checkout, then confirm the download is the 42-page playbook (page count, and its checksum recorded here).
4. Append a dated reply section below with the result and the commit you tested.

## Limits

Don't merge PR #3, and don't turn on live checkout. Both stay Bayo's. Sandbox only, no live charges. This repo is public, so no key values, webhook secrets, Stripe session or customer IDs, buyer details or decryption keys in this file, the PR or any comment.

<!-- Replies: append a dated section below, e.g. "## YYYY-MM-DD Codex reply", and update Status above. -->

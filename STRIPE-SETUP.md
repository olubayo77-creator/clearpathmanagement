# Stripe playbook checkout setup

This branch keeps the public sales button disabled while the sandbox checkout is tested.

## Required Netlify environment variables

- `STRIPE_SECRET_KEY` - Stripe sandbox secret key
- `STRIPE_PRICE_ID` - sandbox price for the $29 one-time product
- `STRIPE_WEBHOOK_SECRET` - signing secret for the sandbox webhook endpoint
- `PLAYBOOK_ENCRYPTION_KEY` - AES-256 key used only at runtime
- `SITE_URL` - canonical site origin

Never commit secret values to GitHub.

## Sandbox verification

1. Deploy this branch as a Netlify Deploy Preview.
2. Configure the variables for Deploy Preview and Functions scopes.
3. Register `/api/stripe-webhook` for `checkout.session.completed`.
4. Start a sandbox checkout through `/api/checkout`.
5. Complete checkout with a Stripe test card.
6. Confirm the webhook records fulfillment.
7. Confirm the success page reveals the secure PDF download.
8. Verify the downloaded PDF matches the approved paid edition.

Do not merge or enable the public checkout button until every step passes.

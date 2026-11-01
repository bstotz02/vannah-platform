# Vannah Preview 0.8 — Integration update

Upload `index.html` and `README.md` directly to the root of the existing GitHub Pages repository.

## Changes
- Overview shows unpaid invoice balances, work orders, active automation rules, and vendor count.
- Finance now includes invoice payment amounts as **derived read-only entries**. Editing or deleting an invoice updates the Finance view without creating duplicate entries. These entries use the invoice due date as a display placeholder because the prototype does not record payment dates.
- Projects display counts of their linked work orders and completed work orders.
- CRM customer/project names still populate existing linked records.

## Notes
- Records are stored in browser localStorage, not a server. No real payment processing, background automation, security controls, or actual accounting sync.
- Do **not** enter real financial or customer information. Don't manually re-enter invoice payments in Finance; that would double count.
- This is a prototype, not accounting software.

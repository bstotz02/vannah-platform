# Vannah 1.7 — Unified Business Beta Release

This package brings together the business-dashboard, industry-preview, and public-site work discussed for versions 1.7–2.0. It is **one coordinated 1.7 beta milestone**, **not** a production-ready 2.0 release.

## Important architecture note

Vannah's current production `index.html` contains the existing Supabase client and your live beta implementation. **Do not overwrite it with `home.html` or `demo.html`.** This update is additive; it does not alter existing table schemas, auth credentials, Supabase policies, or saved records.

The package assumes the **Vannah 1.6 business-first layout patch** has already been installed in `index.html` and the earlier invoice/finance features remain present. The original sidebar and 1.6 navigation remain the primary navigation layer.

## Install on GitHub Pages

1. Back up your current `index.html` through GitHub history or save a local copy.
2. In the **root** of your `bstotz02/vannah-platform` repository, use **Add file → Upload files** and upload:
   - `vannah-1.7.js`
   - `vannah-1.7.css`
   - `site-1.7.css`
   - `home.html`
   - `real-estate.html`
   - `demo.html` (if not already present; replacing the existing separate demo page is fine)
3. Commit those files to the branch GitHub Pages actually deploys.
4. Open **existing `index.html`** in the GitHub editor. Insert the following two lines immediately **above the final `</body>`**, after the existing 1.5/1.6 patches:

   ```html
   <link rel="stylesheet" href="vannah-1.7.css">
   <script src="vannah-1.7.js"></script>
   ```

5. Commit the modified `index.html`.
6. Refresh the site using **Ctrl + Shift + R**.

## URLs (GitHub Pages; once deployed)

- Business workspace: `https://bstotz02.github.io/vannah-platform/`
- Public landing page: `https://bstotz02.github.io/vannah-platform/home.html`
- Public interactive demo: `https://bstotz02.github.io/vannah-platform/demo.html`
- Industry sales page: `https://bstotz02.github.io/vannah-platform/real-estate.html`

The public page is `home.html` for now so it doesn't overwrite your existing working app at `index.html`. Moving the public website to the root and the app to `app.vannah.com` is a separate deployment phase requiring domain and routing setup.

## What's in this beta

- **Business overview**: contact counts, active project estimate, outstanding invoices, open work orders, manual financial snapshot, links into existing modules, loaded record summaries.
- **Industry preview**: commercial real estate page and workspace section, linking current Operations, Contracts, Vendors and Scheduling tools.
- **Public website**: separate marketing home and industry page, with routes to the demo and business beta.
- **Safety disclosures**: clears up which financial numbers are manually recorded, and flags production checks that remain open.
- **Read-only SQL audit**: lets you *inspect* RLS configuration and permissions in Supabase; does not modify anything.

## Important limitations

- The dashboard reads the summary text and **currently rendered** list elements in the existing app. Some figures can reflect only loaded records and are **not authoritative accounting reports**. Counts may be inaccurate if the underlying list loads incompletely or contains extra headings; test them with fictional records.
- No live rent collection, billing, checkout, bank reconciliation, invoice payment-date ledger, property/unit database, or automated tenant portal was added.
- This package **does not prove company-level data isolation**. Review `SECURITY_AUDIT_READ_ONLY.sql`, test cross-company permissions with separate users, and inspect the actual RLS policies before storing real customer data.
- Marketing page buttons link to existing beta/demo pages; no subscription checkout or payment processing is claimed.
- This is an additive browser-side release and should be tested before using it beyond fictional beta data.

## Smoke test (use fictional records only)

1. Sign into your existing business workspace; ensure CRM and Projects still load.
2. Select Overview in the left sidebar. Confirm the dashboard is visible and no unrelated module appears below it.
3. Switch to CRM, Projects, Invoices and Finance. Confirm navigation and edit/save/refresh functionality from the previous release.
4. Add a fictional contact/project/invoice. Refresh and confirm existing Supabase-backed records persist.
5. Check dashboard numbers against the corresponding module summaries, noting that invoice receipts and manual income can be double-counted if recorded twice.
6. Click Real Estate in the sidebar, then click a module link. Confirm only one section is visible.
7. Open `demo.html`: its content must be fictional/browser-local. Do not sign into a real workspace inside the demo frame.
8. Open `home.html` and `real-estate.html` on desktop and mobile; verify links.
9. Run the **read-only** SQL audit and test two distinct accounts/companies before storing any real information.

## Rollback

Remove the two added tags from `index.html` or revert the relevant GitHub commit; your original Supabase tables remain unchanged. The separately uploaded static pages can remain or be removed. Do not delete your Supabase project or tables to roll back the UI.

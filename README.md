# Brightloop — Subscription Management

Brightloop is a responsive subscription-management dashboard built as a hackathon prototype. It brings customer, product, plan, subscription, invoice, and reporting workflows into one interface, with a dark navy visual theme and a purple brand accent.

> **Demo only:** Brightloop is a frontend prototype. It stores sample records in the current browser and simulates payment recording. Do not enter real customer, financial, or payment information.

## Highlights

- **Dashboard:** KPI cards, illustrative revenue and subscription charts, and recent invoices.
- **Customers:** Add, search, inspect, export to CSV, and delete customer records. Duplicate email addresses are blocked.
- **Products and plans:** Manage product details, prices, variants, plan prices, minimum quantities, and billing cycles.
- **Subscriptions:** Create subscriptions from customers and plans; pause, resume, close, or reactivate them; and generate invoices.
- **Invoices and payments:** Create invoices from subscriptions using the workspace tax setting and an optional fixed discount. The demo prevents duplicate invoices for a subscription and issue date. Recording a full payment marks the invoice Paid.
- **Discounts and reports:** Create and review discount rules, view report summaries, and download CSV exports. Discount rules are not automatically applied.
- **Workspace preferences:** Change the company label and default tax rate.
- **Responsive local persistence:** The interface adapts to smaller screens and stores demo state in browser `localStorage`.

## Requirements

- Node.js 20 or newer (LTS recommended)
- pnpm 11.25.0 (the repository pins this version through Corepack)

If Corepack is not enabled, run `corepack enable` once, then use `corepack pnpm` in place of `pnpm` below.

## Run locally

1. Clone or download the repository, then open a terminal in the project directory.
2. Install the locked dependencies:

   ```bash
   corepack pnpm install --frozen-lockfile
   ```

3. Start the development server:

   ```bash
   corepack pnpm dev
   ```

4. Open **http://localhost:3000** in your browser.

The Vite development server listens on port `3000`. Stop it with `Ctrl+C`.

## Production build

Create the static production output in `dist/`:

```bash
corepack pnpm build
```

To serve that output locally for a quick preview:

```bash
corepack pnpm preview
```

## Demo notes

The dashboard chart history is illustrative rather than connected to a live billing provider. Demo records are stored in the browser that created them, so they do not sync across devices or users. Clearing this website's browser storage resets the locally saved demo state.

This prototype does **not** include a backend or database, production authentication or server-enforced roles, password-reset email, a real payment gateway, scheduled recurring billing, full tax-jurisdiction handling, or automatic discount application. It is intended for demonstration and hackathon judging, not production billing. A production version would need secure server-side data storage, authentication and authorization, payment-provider integration, and appropriate privacy, security, tax, and operational controls.

## Technology

- React 18
- Vite 6
- Recharts
- Lucide React

# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single monolithic app: Express backend (`server/`) serves the static SPA (`index.html`, `js/`, `css/`) and exposes `/api/*`. Firebase (Auth + Firestore) and Stripe are external cloud services — no local database or Docker.

### Running the app

```bash
npm run dev
```

Opens on **http://localhost:3000** (default `PORT=3000`). See `README.md` and `docs/CONFIGURAR-BACKEND.md` for full setup.

First-time setup: `cp .env.example .env` and fill in Stripe test keys for card-payment flows (`docs/CONFIGURAR-STRIPE.md`). Firebase client config is in `js/firebase-config.js`.

### Lint / syntax check

There is no ESLint. Use:

```bash
npm run check
```

This runs `node --check` on `server/*.js` and key `js/*.js` files.

### Tests

No automated test suite (no Jest/Playwright/Cypress). Verify manually via `GET /api/health` and browser flows (cotizador → carrito).

### API endpoints (backend)

| Endpoint | Auth | Notes |
|----------|------|-------|
| `GET /api/health` | No | Health + config flags |
| `GET /api/config` | No | Stripe publishable key for frontend |
| `POST /api/payments/create-intent` | Firebase Bearer token | Requires valid `STRIPE_SECRET_KEY` |

### Gotchas

- **Stripe placeholder keys**: `.env.example` has `pk_test_REPLACE_*` / `sk_test_REPLACE_*`. The backend treats any non-empty `STRIPE_SECRET_KEY` as configured; real card charges need valid Stripe test keys.
- **Auth-gated flows** (save order, Stripe checkout) require a logged-in Firebase user against project `innovationtech-6e205`.
- **Alternative frontend dev**: Live Server on `:8080` works for static UI only; set `CORS_ORIGIN` in `.env` and keep the backend on `:3000`.
- **Long-running dev server**: Use tmux for `npm run dev` so the Node `--watch` process stays attached across shell sessions.

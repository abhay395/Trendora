# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Trendora is a full-stack MERN e-commerce app: a React/Vite frontend (`client/`) and an Express/MongoDB backend (`server/`), developed and deployed as two independent apps (no root `package.json`/workspace — always `cd` into `client/` or `server/` first).

## Commands

### Client (`client/`)
- `npm install` — install deps
- `npm run dev` — Vite dev server on port **5174** (falls back to next free port if taken)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run preview` — preview a production build

No test runner is configured for the client.

### Server (`server/`)
- `npm install` — install deps
- `npm run dev` — `nodemon index.js`, local dev server (reads `PORT` from env, defaults to 3000)

No test runner is configured for the server (`npm test` is a stub that exits 1). `server/test_suite_analysis/` exists but contains no runnable tests currently.

### Env files
Both apps need a `.env`:
- `client/.env`: `VITE_API_URL` (e.g. `http://localhost:3000/api/v1`)
- `server/.env`: `JWT_SECRET`, `JWT_SECRET_KEY`, `MONGODB_URL`, `PORT`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, plus (used by Google OAuth in `server/app.js` but undocumented in the README) `SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`.

## Architecture

### Two deploy entrypoints on the server
- `server/index.js` — local dev entrypoint; calls `app.listen()` and `connectDb()`.
- `server/api/index.js` — Vercel serverless entrypoint (`@vercel/node`); exports the Express `app` without calling `.listen()`. Routing is wired in the root `vercel.json` (`/api/*` → `server/api/index.js`) and mirrored in `server/vercel.json` for a standalone server deploy.
- Both entrypoints import the same `server/app.js`, which builds the actual Express app (CORS allowlist, rate limiting, session/passport setup, route mounting, error handler). When changing global middleware/config, edit `app.js`, not the entrypoints.

### Server request flow
`routes/*.routes.js` → `middleware/auth.js` (JWT) → `asyncWrapper` (`middleware/async.js`, catches async errors and forwards to `next`) → `controller/*.controller.js` (thin: pulls req data, calls service, calls `sendSuccessMessage`) → `services/*.service.js` (business logic, all Mongoose queries) → `models/*.model.js`.

All routes are mounted under `/api/v1` via `routes/index.routes.js` (`/auth`, `/product`, `/cart`, `/address`, `/order`, `/user`, `/admin`, `/category`).

Errors: throw/`next(new ApiError(statusCode, message))` (`utils/ApiError.js`); `middleware/error-handler.js` is the final Express error handler and formats the JSON response. Success responses always use `sendSuccessMessage(res, status, message, result)` from `utils/helper.js`, producing `{ message, result, success: true }`.

### Two parallel auth mechanisms
1. **JWT bearer auth** (`middleware/auth.js`, `authenticationMiddleware`) — used by nearly all `/api/v1` routes. Token is created in `utils/helper.js` (`createToken`) and verified against `JWT_SECRET`.
2. **Session-based Passport/Google OAuth** (`server/app.js`, `express-session` + `connect-mongo` + `passport-google-oauth20`) — a separate `authenticationMiddlewareForSession` exists in `middleware/auth.js` for session-authenticated routes. Note: the frontend's Google sign-in buttons were removed from the UI, but this backend flow still exists and is wired up — check before assuming it's unused.

There's also role-based access via `autherizedRole([...roles])` (`middleware/auth.js`), checking `req.user.role` against `User.model.js`'s `role` enum (`admin`, `user`, `superadmin`).

### Frontend data layer
- **Server state**: `@tanstack/react-query`, configured in `main.jsx` with `persistQueryClient` (persists the query cache to `localStorage` for 24h via `@tanstack/query-sync-storage-persister`). Most data access goes through hooks in `src/hooks/*` (e.g. `useCart.js`, `useProducts.js`, `useAddress.js`) that wrap `useQuery`/`useMutation` around functions in `src/api/*Api.js`.
- **Client/global state**: Zustand stores in `src/store/` (`cartStore.js`, `orderStore.js`) — used more sparingly; prefer checking whether a React Query hook already exists before reaching for a store.
- **Axios instances** (`src/api/instance/`): `privateAxios.js` (attaches `Authorization: Bearer <token>` from `localStorage`, unwraps `response.data` in an interceptor — so functions using it should treat their `response` as the raw API body `{ message, result, success }`, not an axios response), `publiAxios.js` (no auth header, same response unwrapping), `formAxios.js` (multipart/form-data uploads). When adding a new API function, match the unwrapping already done by the interceptor — do not do `response.data.result`, just `response.result`.

### Frontend routing/layout
`App.jsx` defines all routes. Most user-facing pages are nested under a `RootLayout` route (`/`) which renders `Navbar` + `Outlet` + `Footer`. Admin pages are nested under a separate `admin` route with `AdminLayout`. `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) gates routes on both auth (JWT presence in `localStorage` + `useUser()`) and `allowedRole`.

### Cart → Checkout flow
`pages/Cart.jsx` is a single page/route (`/cart`) that internally step-switches between two components instead of separate routes: `components/CartReview.jsx` (step 1 — item list, quantity/selection, price summary) and `components/CheckoutPanel.jsx` (step 2 — address selection, payment method, Razorpay/COD checkout call). There is no separate `/checkout` route — don't reintroduce one; add new checkout steps as additional local state in `Cart.jsx` instead.

### Product data shape
Order/cart line items carry a denormalized product snapshot at time of purchase — fields are `title`, `image`, `price`, `quantity`, `size`, `productId`, `category` (see `models/Order.model.js`). Do not assume `item.name` exists on order/cart items — it's `item.title`. `Order.status` enum values are lowercase and snake_cased where applicable: `confirmed`, `packed`, `shipped`, `out_for_delivery`, `delivered` (plus `cancelled` in `orderTracking` sub-docs) — never compare against capitalized strings like `"Delivered"`.

### Styling
Tailwind CSS v4 (via `@tailwindcss/vite`, config lives in `@theme`/`@layer` blocks inside `src/index.css`, not a `tailwind.config.js`). Custom utilities of note: `.glass`/`.glass-dark` (backdrop-blur glassmorphism), `--shadow-glass`/`--shadow-premium` theme tokens, `.animate-float`, `.shimmer`. Current design direction across recently-touched pages is black/white with no drop shadows and light gray (`border-gray-200`/`gray-300`) borders for structural boxes — black borders are reserved for active/selected-state indicators (selected size swatch, selected thumbnail, checked checkbox, active progress step), not decorative container borders.

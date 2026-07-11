# Security System Bundle Builder

## Run instructions

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Decisions & tradeoffs

- Product data lives in a single `products.json`, driven by `category` and `step` fields — no per-product hardcoded markup.
- Cart state is stored as an object keyed by `productId` (or `productId-variantId`), so each color variant tracks its own quantity independently.
- "N selected" counts are computed live from the cart (distinct product IDs per step), not hardcoded.
- "Save my system for later" persists the cart to `localStorage`. It's read back via `useEffect` on mount rather than a lazy `useState` initializer, since the latter caused a server/client hydration mismatch — this means there's a brief flash from the default cart to the saved one right after load.
- No backend — the bonus API layer wasn't implemented; data is read from a local JSON file.

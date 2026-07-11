import { TCartItem } from "./types";

export function calculateCartTotals(items: TCartItem[]) {
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalOriginalPrice = items.reduce(
    (sum, i) => sum + (i.compareAtPrice ?? i.price) * i.quantity,
    0,
  );
  return {
    totalPrice,
    totalOriginalPrice,
    totalSavings: totalOriginalPrice - totalPrice,
    monthlyEstimate: totalPrice / 12,
  };
}

export function groupItemsByCategory<T extends TCartItem>(
  items: T[],
  order: readonly string[],
) {
  return order
    .map((category) => ({
      category,
      items: items.filter((i) => i.category === category),
    }))
    .filter((group) => group.items.length > 0);
}

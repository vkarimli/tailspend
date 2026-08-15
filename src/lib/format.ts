const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export function formatPrice(priceCents: number): string {
  return currencyFormatter.format(priceCents / 100);
}

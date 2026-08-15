import Link from "next/link";
import { formatPrice } from "@/lib/format";

export function ProductCard({
  slug,
  sku,
  name,
  icon,
  priceCents,
  categoryName,
}: {
  slug: string;
  sku: string;
  name: string;
  icon: string | null;
  priceCents: number;
  categoryName?: string;
}) {
  return (
    <Link
      href={`/urun/${slug}`}
      className="group flex flex-col rounded-lg border border-slate-200 bg-white p-4 transition hover:border-orange-400 hover:shadow-md"
    >
      <span className="text-3xl">{icon ?? "📦"}</span>
      {categoryName && (
        <span className="mt-2 text-xs uppercase tracking-wide text-slate-400">
          {categoryName}
        </span>
      )}
      <h3 className="mt-1 font-medium text-slate-900 group-hover:text-orange-600">
        {name}
      </h3>
      <span className="text-xs text-slate-400">SKU: {sku}</span>
      <span className="mt-3 text-lg font-bold text-slate-900">
        {formatPrice(priceCents)}
      </span>
    </Link>
  );
}

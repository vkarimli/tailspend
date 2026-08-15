import { notFound } from "next/navigation";
import { getBreadcrumb, getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const trail = getBreadcrumb(product.category);
  const related = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs trail={trail} />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white text-[8rem]">
          {product.icon ?? "📦"}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            SKU: {product.sku}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>

          <p className="mt-6 text-3xl font-bold text-slate-900">
            {formatPrice(product.priceCents)}
          </p>
          <p className="mt-1 text-sm text-slate-500">KDV dahildir</p>

          <p className="mt-4 text-sm font-medium">
            {product.inStock ? (
              <span className="text-green-700">✓ Stokta var</span>
            ) : (
              <span className="text-red-700">Stokta yok</span>
            )}
          </p>

          {product.specs.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-2 text-sm font-semibold text-slate-900">
                Teknik Özellikler
              </h2>
              <table className="w-full border-collapse overflow-hidden rounded-lg border border-slate-200 text-sm">
                <tbody>
                  {product.specs
                    .sort((a, b) => a.specDef.sortOrder - b.specDef.sortOrder)
                    .map((spec) => (
                      <tr key={spec.id} className="border-b border-slate-100 last:border-0">
                        <th className="w-1/2 bg-slate-50 px-3 py-2 text-left font-medium text-slate-600">
                          {spec.specDef.label}
                        </th>
                        <td className="px-3 py-2 text-slate-900">
                          {spec.value}
                          {spec.specDef.unit ? ` ${spec.specDef.unit}` : ""}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Benzer Ürünler
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                sku={p.sku}
                name={p.name}
                icon={p.icon}
                priceCents={p.priceCents}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

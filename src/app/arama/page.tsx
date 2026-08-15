import { searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Arama Sonuçları</h1>
      <p className="mb-6 text-slate-500">
        {query ? (
          <>
            <strong className="text-slate-700">&quot;{query}&quot;</strong> için{" "}
            {results.length} sonuç bulundu
          </>
        ) : (
          "Aramak istediğiniz ürün, kategori veya SKU'yu üstteki arama kutusuna yazın."
        )}
      </p>

      {query && results.length === 0 && (
        <p className="text-slate-500">
          Aramanızla eşleşen ürün bulunamadı. Farklı bir anahtar kelime deneyin.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <ProductCard
            key={product.id}
            slug={product.slug}
            sku={product.sku}
            name={product.name}
            icon={product.icon}
            priceCents={product.priceCents}
            categoryName={product.category.name}
          />
        ))}
      </div>
    </div>
  );
}

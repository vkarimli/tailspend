import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBreadcrumb,
  getCategoryBySlug,
  getProductsForCategory,
  getSpecFacets,
} from "@/lib/catalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const trail = getBreadcrumb(category);
  const hasSubcategories = category.children.length > 0;

  if (hasSubcategories) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Breadcrumbs trail={trail} />
        <h1 className="mb-1 text-2xl font-bold text-slate-900">{category.name}</h1>
        {category.description && (
          <p className="mb-6 text-slate-500">{category.description}</p>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.children.map((child) => (
            <CategoryCard
              key={child.id}
              slug={child.slug}
              name={child.name}
              description={child.description}
              icon={child.icon}
              count={child._count.products}
              countLabel="ürün"
            />
          ))}
        </div>
      </div>
    );
  }

  const rawParams = await searchParams;
  const specFilters: Record<string, string> = {};
  for (const specDef of category.specDefs) {
    const value = rawParams[specDef.key];
    if (typeof value === "string" && value) specFilters[specDef.key] = value;
  }

  const [facets, products] = await Promise.all([
    getSpecFacets(category.id),
    getProductsForCategory(category.id, specFilters),
  ]);

  const activeFilterCount = Object.keys(specFilters).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs trail={trail} />
      <h1 className="mb-1 text-2xl font-bold text-slate-900">{category.name}</h1>
      {category.description && (
        <p className="mb-6 text-slate-500">{category.description}</p>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <aside>
          <form method="get" className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Özelliklere Göre Filtrele
            </h2>
            <div className="flex flex-col gap-3">
              {facets.map((facet) => (
                <label key={facet.id} className="text-sm">
                  <span className="mb-1 block text-slate-600">
                    {facet.label}
                    {facet.unit ? ` (${facet.unit})` : ""}
                  </span>
                  <select
                    name={facet.key}
                    defaultValue={specFilters[facet.key] ?? ""}
                    className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  >
                    <option value="">Tümü</option>
                    {facet.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
              >
                Filtrele
              </button>
              {activeFilterCount > 0 && (
                <Link
                  href={`/kategori/${category.slug}`}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Temizle
                </Link>
              )}
            </div>
          </form>
        </aside>

        <div>
          <p className="mb-4 text-sm text-slate-500">{products.length} ürün bulundu</p>
          {products.length === 0 ? (
            <p className="text-slate-500">
              Seçtiğiniz filtrelere uyan ürün bulunamadı. Filtreleri temizlemeyi
              deneyin.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  sku={product.sku}
                  name={product.name}
                  icon={product.icon}
                  priceCents={product.priceCents}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { getTopCategories } from "@/lib/catalog";
import { CategoryCard } from "@/components/CategoryCard";

export default async function HomePage() {
  const categories = await getTopCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-10 rounded-xl bg-slate-900 px-6 py-10 text-white sm:px-10">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Endüstriyel malzeme kataloğu, Türkiye pazarı için
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Bağlantı elemanlarından el aletlerine, hammaddeden iş güvenliği ve
          elektrik malzemelerine kadar tedarik ihtiyaçlarınızı tek yerden
          karşılayın. Teknik özelliklere göre filtreleyin, doğru parçayı hızlıca
          bulun.
        </p>
      </section>

      <h2 className="mb-4 text-xl font-semibold text-slate-900">Kategoriler</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            slug={cat.slug}
            name={cat.name}
            description={cat.description}
            icon={cat.icon}
            count={cat.children.length}
            countLabel="alt kategori"
          />
        ))}
      </div>
    </div>
  );
}

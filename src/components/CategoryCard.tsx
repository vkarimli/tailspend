import Link from "next/link";

export function CategoryCard({
  slug,
  name,
  description,
  icon,
  count,
  countLabel,
}: {
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  count: number;
  countLabel: string;
}) {
  return (
    <Link
      href={`/kategori/${slug}`}
      className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:border-orange-400 hover:shadow-md"
    >
      <span className="text-3xl">{icon ?? "📦"}</span>
      <h3 className="mt-3 font-semibold text-slate-900 group-hover:text-orange-600">
        {name}
      </h3>
      {description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{description}</p>
      )}
      <span className="mt-3 text-xs font-medium text-slate-400">
        {count} {countLabel}
      </span>
    </Link>
  );
}

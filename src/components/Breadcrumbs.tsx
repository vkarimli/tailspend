import Link from "next/link";

export type Crumb = { slug: string; name: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-orange-600 hover:underline">
            Ana Sayfa
          </Link>
        </li>
        {trail.map((c) => (
          <li key={c.slug} className="flex items-center gap-1">
            <span className="text-slate-300">/</span>
            <Link href={`/kategori/${c.slug}`} className="hover:text-orange-600 hover:underline">
              {c.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

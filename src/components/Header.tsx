import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🏭</span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Tailspend
          </span>
        </Link>

        <form
          action="/arama"
          method="get"
          className="flex min-w-[200px] flex-1 items-center"
        >
          <input
            type="text"
            name="q"
            placeholder="Ürün, kategori veya SKU ara..."
            className="w-full rounded-l-md border border-slate-300 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-md border border-l-0 border-orange-600 bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            Ara
          </button>
        </form>

        <span className="hidden shrink-0 text-sm text-slate-500 sm:inline">
          🇹🇷 Türkiye Pazarı
        </span>
      </div>
    </header>
  );
}

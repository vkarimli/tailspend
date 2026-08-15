export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500 sm:px-6">
        <p>© {new Date().getFullYear()} Tailspend — Endüstriyel malzeme pazar yeri.</p>
        <p className="mt-1">Fiyatlara KDV dahildir. Örnek katalog verisidir.</p>
      </div>
    </footer>
  );
}

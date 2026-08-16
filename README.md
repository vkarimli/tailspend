# Tailspend

Endüstriyel malzeme (MRO) pazar yeri kataloğu — Türkiye pazarı için, McMaster-Carr
tarzı kategori/ürün yapısı ve teknik özelliklere göre filtreleme örneği.

Bu ilk sürüm **katalog gezinme + arama** kapsamındadır: kategori/alt kategori
gezinme, spec (teknik özellik) bazlı filtreleme, ürün detay sayfası ve genel
arama. Sepet/ödeme ve çoklu satıcı (marketplace) akışları kapsam dışıdır.

> Not: Ürün verileri örnek/temsili verilerdir. McMaster-Carr'ın kendi ürün
> içeriği, görselleri veya açıklamaları kopyalanmamıştır — yalnızca sektörde
> standart olan MRO kategori yapısı (bağlantı elemanları, el aletleri,
> hammadde, iş güvenliği, elektrik vb.) esin kaynağı olarak kullanılmıştır.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS)
- [Prisma](https://www.prisma.io) + PostgreSQL

## Veri Modeli

- `Category` — kendine referanslı ağaç (üst kategori → alt kategori)
- `SpecDefinition` — bir kategoriye ait filtrelenebilir teknik özellik sütunları
  (örn. "Diş Çapı", "Malzeme")
- `Product` — ürün, bir alt kategoriye bağlı
- `ProductSpecValue` — bir ürünün her spec sütunu için değeri

## Kurulum

```bash
npm install
cp .env.example .env   # DATABASE_URL'i kendi Postgres bağlantınıza göre düzenleyin
npm run db:migrate
npm run db:seed
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışır.

## Sayfalar

- `/` — kategori grid'i
- `/kategori/[slug]` — alt kategori listesi veya (yaprak kategoride) spec
  filtreli ürün listesi
- `/urun/[slug]` — ürün detayı ve teknik özellik tablosu
- `/arama?q=...` — ürün/kategori/SKU arama

Testing plan mode.

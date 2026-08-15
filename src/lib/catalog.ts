import { prisma } from "@/lib/prisma";

export async function getTopCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    include: {
      children: { orderBy: { sortOrder: "asc" } },
      _count: { select: { products: true } },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      parent: { include: { parent: true } },
      children: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { products: true } } },
      },
      specDefs: { orderBy: { sortOrder: "asc" } },
    },
  });
}

type CrumbNode = {
  slug: string;
  name: string;
  parent?: CrumbNode | null;
};

/** Walks a category's parent chain up to the root, returning [root, ..., self]. */
export function getBreadcrumb<T extends CrumbNode>(category: T) {
  const trail: Array<CrumbNode | null | undefined> = [];
  if (category.parent) {
    trail.push(category.parent.parent ? category.parent.parent : null, category.parent);
  }
  trail.push(category);
  return trail.filter((c): c is NonNullable<typeof c> => Boolean(c));
}

/**
 * Fetches products in a category, optionally narrowed by spec filters
 * (e.g. { thread_diameter: "8" }) — mirrors McMaster's spec-column filtering.
 */
export async function getProductsForCategory(
  categoryId: string,
  specFilters: Record<string, string>
) {
  const activeFilters = Object.entries(specFilters).filter(([, v]) => v);

  return prisma.product.findMany({
    where: {
      categoryId,
      ...(activeFilters.length > 0
        ? {
            AND: activeFilters.map(([key, value]) => ({
              specs: { some: { specDef: { key }, value } },
            })),
          }
        : {}),
    },
    orderBy: { name: "asc" },
    include: { specs: { include: { specDef: true } } },
  });
}

/** Distinct available values per spec key for a category, used to render filter dropdowns. */
export async function getSpecFacets(categoryId: string) {
  const specDefs = await prisma.specDefinition.findMany({
    where: { categoryId },
    orderBy: { sortOrder: "asc" },
    include: {
      values: {
        select: { value: true },
        distinct: ["value"],
      },
    },
  });

  return specDefs.map((def) => ({
    ...def,
    options: def.values.map((v) => v.value).sort((a, b) => a.localeCompare(b, "tr")),
  }));
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: { include: { parent: { include: { parent: true } } } },
      specs: { include: { specDef: true } },
    },
  });
}

export async function getRelatedProducts(categoryId: string, excludeProductId: string) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: excludeProductId } },
    take: 4,
    orderBy: { name: "asc" },
  });
}

export async function searchProducts(query: string) {
  const q = query.trim();
  if (!q) return [];

  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { sku: { contains: q, mode: "insensitive" } },
        { category: { name: { contains: q, mode: "insensitive" } } },
      ],
    },
    orderBy: { name: "asc" },
    include: { category: true },
    take: 60,
  });
}

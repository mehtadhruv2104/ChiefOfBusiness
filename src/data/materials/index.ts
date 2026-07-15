import { MATERIAL_CATEGORIES } from './categories'
import { MATERIAL_LIBRARY } from './library.generated'
import type { MaterialCategory, MaterialLibraryItem } from './types'

export { MATERIAL_CATEGORIES, CATEGORY_BY_ID } from './categories'
export { MATERIAL_LIBRARY } from './library.generated'
export type { DimensionFieldDef, MaterialCategory, MaterialLibraryItem } from './types'

export interface MaterialSearchGroup {
  category: MaterialCategory
  items: MaterialLibraryItem[]
}

const ITEMS_BY_CATEGORY: Record<string, MaterialLibraryItem[]> = Object.fromEntries(
  MATERIAL_CATEGORIES.map((c) => [c.id, MATERIAL_LIBRARY.filter((i) => i.categoryId === c.id)]),
)

const MAX_RESULTS_PER_GROUP = 8

/** Substring/AND-token match across category label + material name, grouped by category. */
export function searchMaterialLibrary(query: string): MaterialSearchGroup[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)

  if (tokens.length === 0) {
    return MATERIAL_CATEGORIES.map((category) => ({
      category,
      items: ITEMS_BY_CATEGORY[category.id].slice(0, MAX_RESULTS_PER_GROUP),
    }))
  }

  const groups: MaterialSearchGroup[] = []
  for (const category of MATERIAL_CATEGORIES) {
    const items = ITEMS_BY_CATEGORY[category.id]
      .filter((item) => tokens.every((t) => item.searchText.includes(t)))
      .slice(0, MAX_RESULTS_PER_GROUP)
    if (items.length > 0) {
      groups.push({ category, items })
    }
  }

  if (groups.length === 0) {
    const labelMatches = MATERIAL_CATEGORIES.filter((c) =>
      tokens.every((t) => c.label.toLowerCase().includes(t)),
    )
    return labelMatches.map((category) => ({ category, items: [] }))
  }

  return groups
}

export function itemCountForCategory(categoryId: string): number {
  return ITEMS_BY_CATEGORY[categoryId]?.length ?? 0
}

import type { MaterialKind, PricingBasis } from '@/calculation-engine'
import type { LengthUnit, UnitOption } from '@/lib/units'

export interface DimensionFieldDef {
  key: string
  label: string
  unitKind: 'length' | 'weight'
  /** Length fields default to mm unless overridden (e.g. plate length/width default to mm too, users switch to m/ft as needed). */
  defaultUnit: LengthUnit | 'kg'
  unitOptions: UnitOption[]
  placeholder?: string
}

export interface MaterialCategory {
  id: string
  label: string
  kind: MaterialKind
  pricingBasis: PricingBasis
  /** Cross-section / shape dimensions, excluding the standard length + pieces fields. */
  fields: DimensionFieldDef[]
  /** channel_beam only: alternate field sets for "direct kg/m" vs "calculate from section" modes. */
  modes?: { direct: DimensionFieldDef[]; advanced: DimensionFieldDef[] }
  hasLength: boolean
  quantityLabel: string
  diagramId: string
  note?: string
}

export interface MaterialLibraryItem {
  id: string
  categoryId: string
  name: string
  /** lowercase, pre-joined category label + name, for fast substring search */
  searchText: string
  /** dimension key -> value in mm, only for keys the name unambiguously encodes */
  prefill: Record<string, number>
}

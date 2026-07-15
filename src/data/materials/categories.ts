import { LENGTH_UNIT_OPTIONS, SMALL_LENGTH_UNIT_OPTIONS, WEIGHT_UNIT_OPTIONS } from '@/lib/units'
import type { DimensionFieldDef, MaterialCategory } from './types'

function small(key: string, label: string, placeholder?: string): DimensionFieldDef {
  return {
    key,
    label,
    unitKind: 'length',
    defaultUnit: 'mm',
    unitOptions: SMALL_LENGTH_UNIT_OPTIONS,
    placeholder,
  }
}

function longLength(key: string, label: string): DimensionFieldDef {
  return {
    key,
    label,
    unitKind: 'length',
    defaultUnit: 'mm',
    unitOptions: LENGTH_UNIT_OPTIONS,
  }
}

function weightField(key: string, label: string): DimensionFieldDef {
  return {
    key,
    label,
    unitKind: 'weight',
    defaultUnit: 'kg',
    unitOptions: WEIGHT_UNIT_OPTIONS,
  }
}

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: 'ms_sheet',
    label: 'MS Sheet',
    kind: 'plate',
    pricingBasis: 'weight',
    fields: [longLength('lengthMm', 'Length'), longLength('widthMm', 'Width'), small('thickness', 'Thickness')],
    hasLength: false,
    quantityLabel: 'Sheets',
    diagramId: 'plate',
  },
  {
    id: 'ms_plate',
    label: 'MS Plate',
    kind: 'plate',
    pricingBasis: 'weight',
    fields: [longLength('lengthMm', 'Length'), longLength('widthMm', 'Width'), small('thickness', 'Thickness')],
    hasLength: false,
    quantityLabel: 'Plates',
    diagramId: 'plate',
  },
  {
    id: 'ms_flat',
    label: 'MS Flat',
    kind: 'flat',
    pricingBasis: 'weight',
    fields: [small('width', 'Width'), small('thickness', 'Thickness')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'flat',
  },
  {
    id: 'ms_angle',
    label: 'MS Angle',
    kind: 'angle',
    pricingBasis: 'weight',
    fields: [small('legA', 'Leg A'), small('legB', 'Leg B'), small('thickness', 'Thickness')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'angle',
  },
  {
    id: 'square_bar',
    label: 'Square Bar',
    kind: 'square_bar',
    pricingBasis: 'weight',
    fields: [small('side', 'Side')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'square_bar',
  },
  {
    id: 'round_bar',
    label: 'MS Round Bar',
    kind: 'round_bar',
    pricingBasis: 'weight',
    fields: [small('diameter', 'Diameter')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'round_bar',
  },
  {
    id: 'round_pipe',
    label: 'MS Round Pipe',
    kind: 'round_pipe',
    pricingBasis: 'weight',
    fields: [small('outerDiameter', 'Outer Diameter (OD)'), small('wallThickness', 'Wall Thickness')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'round_pipe',
    note: 'Grade labels (L / M / H / EL / APL) only help you find the size — wall thickness always needs confirming against the actual pipe.',
  },
  {
    id: 'square_pipe',
    label: 'MS Square Pipe',
    kind: 'square_pipe',
    pricingBasis: 'weight',
    fields: [small('side', 'Side'), small('wallThickness', 'Wall Thickness')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'square_pipe',
    note: 'Grade labels (L / M / H / EL / APL) only help you find the size — wall thickness always needs confirming against the actual pipe.',
  },
  {
    id: 'rectangular_pipe',
    label: 'Rectangular Pipe',
    kind: 'rect_pipe',
    pricingBasis: 'weight',
    fields: [small('width', 'Width'), small('height', 'Height'), small('wallThickness', 'Wall Thickness')],
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'rect_pipe',
    note: 'Grade labels (L / M / H / EL / APL) only help you find the size — wall thickness always needs confirming against the actual pipe.',
  },
  {
    id: 'channel_beam',
    label: 'Channel / Beam',
    kind: 'channel_beam',
    pricingBasis: 'weight',
    fields: [],
    modes: {
      direct: [weightField('weightPerMetre', 'Weight per Metre')],
      advanced: [
        small('depth', 'Depth'),
        small('flangeWidth', 'Flange Width'),
        small('flangeThickness', 'Flange Thickness'),
        small('webThickness', 'Web Thickness'),
      ],
    },
    hasLength: true,
    quantityLabel: 'Pieces',
    diagramId: 'channel_beam',
    note: 'Rolled channel/beam sections follow standard mill tables, not a simple formula. Enter the known weight per metre, or switch to "Calculate from section" for an approximate figure.',
  },
  {
    id: 'gi_profile_sheet',
    label: 'GI / Profile Sheet',
    kind: 'sheet_manual',
    pricingBasis: 'weight',
    fields: [weightField('weightPerPiece', 'Weight per Sheet')],
    hasLength: false,
    quantityLabel: 'Sheets',
    diagramId: 'sheet_manual',
    note: 'Profiled/corrugated sheet weight depends on the roll-forming profile — enter the weight per sheet from the supplier datasheet.',
  },
  {
    id: 'fastener',
    label: 'Self Driven Screw',
    kind: 'piece',
    pricingBasis: 'piece',
    fields: [],
    hasLength: false,
    quantityLabel: 'Quantity',
    diagramId: 'piece',
  },
]

export const CATEGORY_BY_ID: Record<string, MaterialCategory> = Object.fromEntries(
  MATERIAL_CATEGORIES.map((c) => [c.id, c]),
)

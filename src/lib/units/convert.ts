import type { LengthUnit, UnitOption, WeightUnit } from './types'

const MM_PER_UNIT: Record<LengthUnit, number> = {
  mm: 1,
  cm: 10,
  m: 1000,
  in: 25.4,
  ft: 304.8,
}

const KG_PER_UNIT: Record<WeightUnit, number> = {
  kg: 1,
  ton: 1000,
}

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  if (from === to) return value
  return (value * MM_PER_UNIT[from]) / MM_PER_UNIT[to]
}

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (from === to) return value
  return (value * KG_PER_UNIT[from]) / KG_PER_UNIT[to]
}

export function toMm(value: number, from: LengthUnit): number {
  return convertLength(value, from, 'mm')
}

export const LENGTH_UNIT_OPTIONS: UnitOption<LengthUnit>[] = [
  { value: 'mm', label: 'mm' },
  { value: 'cm', label: 'cm' },
  { value: 'm', label: 'm' },
  { value: 'in', label: 'in' },
  { value: 'ft', label: 'ft' },
]

/** Small cross-section dimensions (thickness, width, diameter) rarely need cm/m/ft. */
export const SMALL_LENGTH_UNIT_OPTIONS: UnitOption<LengthUnit>[] = [
  { value: 'mm', label: 'mm' },
  { value: 'in', label: 'in' },
]

export const WEIGHT_UNIT_OPTIONS: UnitOption<WeightUnit>[] = [
  { value: 'kg', label: 'kg' },
  { value: 'ton', label: 'ton' },
]

export const UNIT_LABELS: Record<LengthUnit | WeightUnit, string> = {
  mm: 'Millimetre',
  cm: 'Centimetre',
  m: 'Metre',
  in: 'Inch',
  ft: 'Feet',
  kg: 'Kilogram',
  ton: 'Ton (1000 kg)',
}

export type LengthUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft'
export type WeightUnit = 'kg' | 'ton'
export type Unit = LengthUnit | WeightUnit

export interface UnitOption<T extends Unit = Unit> {
  value: T
  label: string
}

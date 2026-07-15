export type ChannelBeamMode = 'direct' | 'advanced'

export interface FieldState {
  value: number | ''
  unit: string
}

export type FieldStateMap = Record<string, FieldState>

/** A completed calculation, added to the running list on the Bharat Trading page. */
export interface CalculatedRow {
  id: string
  categoryLabel: string
  materialName: string
  specification: string
  pieces: number
  weightPerPiece: number
  totalWeight: number
  pricingBasis: 'weight' | 'piece'
  rate: number
  totalValue: number
}

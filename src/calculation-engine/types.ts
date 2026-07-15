export type MaterialKind =
  | 'flat'
  | 'plate'
  | 'round_bar'
  | 'square_bar'
  | 'round_pipe'
  | 'square_pipe'
  | 'rect_pipe'
  | 'angle'
  | 'channel_beam'
  | 'sheet_manual'
  | 'piece'

/** All dimensions in millimetres; the UI layer converts user-entered units before calling calculate(). */
export type CalculationInput =
  | { kind: 'flat'; width: number; thickness: number; lengthMm: number; pieces: number }
  | { kind: 'round_bar'; diameter: number; lengthMm: number; pieces: number }
  | { kind: 'square_bar'; side: number; lengthMm: number; pieces: number }
  | {
      kind: 'round_pipe'
      outerDiameter: number
      wallThickness: number
      lengthMm: number
      pieces: number
    }
  | { kind: 'square_pipe'; side: number; wallThickness: number; lengthMm: number; pieces: number }
  | {
      kind: 'rect_pipe'
      width: number
      height: number
      wallThickness: number
      lengthMm: number
      pieces: number
    }
  | { kind: 'angle'; legA: number; legB: number; thickness: number; lengthMm: number; pieces: number }
  | { kind: 'channel_beam'; mode: 'direct'; weightPerMetre: number; lengthMm: number; pieces: number }
  | {
      kind: 'channel_beam'
      mode: 'advanced'
      depth: number
      flangeWidth: number
      flangeThickness: number
      webThickness: number
      lengthMm: number
      pieces: number
    }
  | { kind: 'plate'; lengthMm: number; widthMm: number; thickness: number; pieces: number }
  | { kind: 'sheet_manual'; weightPerPiece: number; pieces: number }
  | { kind: 'piece'; pieces: number }

export type PricingBasis = 'weight' | 'piece'

export interface CalculationResult {
  /** kg */
  weightPerPiece: number
  /** kg */
  totalWeight: number
  pricingBasis: PricingBasis
}

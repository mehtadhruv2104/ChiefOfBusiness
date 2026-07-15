import type { CalculationInput } from '@/calculation-engine'
import type { MaterialCategory } from '@/data/materials'
import { convertLength, convertWeight } from '@/lib/units'
import type { LengthUnit, WeightUnit } from '@/lib/units'
import type { ChannelBeamMode, FieldState, FieldStateMap } from '../types'

function mm(field: FieldState | undefined): number {
  if (!field || field.value === '') return Number.NaN
  return convertLength(field.value, field.unit as LengthUnit, 'mm')
}

function kg(field: FieldState | undefined): number {
  if (!field || field.value === '') return Number.NaN
  return convertWeight(field.value, field.unit as WeightUnit, 'kg')
}

function isFinitePositive(...values: number[]): boolean {
  return values.every((v) => Number.isFinite(v) && v >= 0)
}

/**
 * Converts the raw per-field form state (mixed units) into a pure-mm/kg
 * CalculationInput for the calculation engine. Returns null while required
 * fields are still empty/invalid so the UI can show a blank result instead
 * of NaN.
 */
export function buildCalculationInput(
  category: MaterialCategory,
  fields: FieldStateMap,
  channelMode: ChannelBeamMode,
  length: FieldState,
  pieces: number | '',
): CalculationInput | null {
  const piecesNum = pieces === '' ? Number.NaN : pieces
  if (!Number.isFinite(piecesNum) || piecesNum < 0) return null

  const lengthMm = category.hasLength ? mm(length) : 0
  if (category.hasLength && !isFinitePositive(lengthMm)) return null

  switch (category.kind) {
    case 'flat': {
      const width = mm(fields.width)
      const thickness = mm(fields.thickness)
      if (!isFinitePositive(width, thickness)) return null
      return { kind: 'flat', width, thickness, lengthMm, pieces: piecesNum }
    }
    case 'round_bar': {
      const diameter = mm(fields.diameter)
      if (!isFinitePositive(diameter)) return null
      return { kind: 'round_bar', diameter, lengthMm, pieces: piecesNum }
    }
    case 'square_bar': {
      const side = mm(fields.side)
      if (!isFinitePositive(side)) return null
      return { kind: 'square_bar', side, lengthMm, pieces: piecesNum }
    }
    case 'round_pipe': {
      const outerDiameter = mm(fields.outerDiameter)
      const wallThickness = mm(fields.wallThickness)
      if (!isFinitePositive(outerDiameter, wallThickness)) return null
      return { kind: 'round_pipe', outerDiameter, wallThickness, lengthMm, pieces: piecesNum }
    }
    case 'square_pipe': {
      const side = mm(fields.side)
      const wallThickness = mm(fields.wallThickness)
      if (!isFinitePositive(side, wallThickness)) return null
      return { kind: 'square_pipe', side, wallThickness, lengthMm, pieces: piecesNum }
    }
    case 'rect_pipe': {
      const width = mm(fields.width)
      const height = mm(fields.height)
      const wallThickness = mm(fields.wallThickness)
      if (!isFinitePositive(width, height, wallThickness)) return null
      return { kind: 'rect_pipe', width, height, wallThickness, lengthMm, pieces: piecesNum }
    }
    case 'angle': {
      const legA = mm(fields.legA)
      const legB = mm(fields.legB)
      const thickness = mm(fields.thickness)
      if (!isFinitePositive(legA, legB, thickness)) return null
      return { kind: 'angle', legA, legB, thickness, lengthMm, pieces: piecesNum }
    }
    case 'channel_beam': {
      if (channelMode === 'direct') {
        const weightPerMetre = kg(fields.weightPerMetre)
        if (!isFinitePositive(weightPerMetre)) return null
        return { kind: 'channel_beam', mode: 'direct', weightPerMetre, lengthMm, pieces: piecesNum }
      }
      const depth = mm(fields.depth)
      const flangeWidth = mm(fields.flangeWidth)
      const flangeThickness = mm(fields.flangeThickness)
      const webThickness = mm(fields.webThickness)
      if (!isFinitePositive(depth, flangeWidth, flangeThickness, webThickness)) return null
      return {
        kind: 'channel_beam',
        mode: 'advanced',
        depth,
        flangeWidth,
        flangeThickness,
        webThickness,
        lengthMm,
        pieces: piecesNum,
      }
    }
    case 'plate': {
      const lengthMmPlate = mm(fields.lengthMm)
      const widthMm = mm(fields.widthMm)
      const thickness = mm(fields.thickness)
      if (!isFinitePositive(lengthMmPlate, widthMm, thickness)) return null
      return { kind: 'plate', lengthMm: lengthMmPlate, widthMm, thickness, pieces: piecesNum }
    }
    case 'sheet_manual': {
      const weightPerPiece = kg(fields.weightPerPiece)
      if (!isFinitePositive(weightPerPiece)) return null
      return { kind: 'sheet_manual', weightPerPiece, pieces: piecesNum }
    }
    case 'piece': {
      return { kind: 'piece', pieces: piecesNum }
    }
  }
}

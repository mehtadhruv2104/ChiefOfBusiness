import { MS_DENSITY_FACTOR, MS_SHEET_DENSITY_FACTOR } from './constants'
import {
  angleArea,
  channelBeamArea,
  flatArea,
  rectHollowArea,
  roundBarArea,
  roundPipeArea,
  squareBarArea,
} from './shapes'
import type { CalculationInput, CalculationResult } from './types'

function weightPerMetreFromArea(areaMm2: number): number {
  return areaMm2 * MS_DENSITY_FACTOR
}

/** Pure function: geometry + quantity in, weight in kg out. No I/O, no units other than mm/kg. */
export function calculateMaterial(input: CalculationInput): CalculationResult {
  const pieces = Math.max(input.pieces, 0)

  switch (input.kind) {
    case 'flat': {
      const kgPerM = weightPerMetreFromArea(flatArea(input.width, input.thickness))
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'round_bar': {
      const kgPerM = weightPerMetreFromArea(roundBarArea(input.diameter))
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'square_bar': {
      const kgPerM = weightPerMetreFromArea(squareBarArea(input.side))
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'round_pipe': {
      const kgPerM = weightPerMetreFromArea(
        roundPipeArea(input.outerDiameter, input.wallThickness),
      )
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'square_pipe': {
      const kgPerM = weightPerMetreFromArea(
        rectHollowArea(input.side, input.side, input.wallThickness),
      )
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'rect_pipe': {
      const kgPerM = weightPerMetreFromArea(
        rectHollowArea(input.width, input.height, input.wallThickness),
      )
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'angle': {
      const kgPerM = weightPerMetreFromArea(angleArea(input.legA, input.legB, input.thickness))
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'channel_beam': {
      const kgPerM =
        input.mode === 'direct'
          ? input.weightPerMetre
          : weightPerMetreFromArea(
              channelBeamArea(
                input.depth,
                input.flangeWidth,
                input.flangeThickness,
                input.webThickness,
              ),
            )
      const weightPerPiece = kgPerM * (input.lengthMm / 1000)
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'plate': {
      const weightPerPiece =
        (input.lengthMm / 1000) * (input.widthMm / 1000) * input.thickness * MS_SHEET_DENSITY_FACTOR
      return { weightPerPiece, totalWeight: weightPerPiece * pieces, pricingBasis: 'weight' }
    }
    case 'sheet_manual': {
      return {
        weightPerPiece: input.weightPerPiece,
        totalWeight: input.weightPerPiece * pieces,
        pricingBasis: 'weight',
      }
    }
    case 'piece': {
      return { weightPerPiece: 0, totalWeight: 0, pricingBasis: 'piece' }
    }
  }
}

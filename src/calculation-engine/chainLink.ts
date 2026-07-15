import { MS_DENSITY_FACTOR } from './constants'
import { roundBarArea } from './shapes'

export interface ChainLinkInput {
  /** wire diameter, mm */
  wireDiameter: number
  /** length of one diamond side, mm — see ChainLinkDiagram */
  meshSize: number
  /** fabric/roll height, mm */
  rollHeightMm: number
  /** standard roll length, mm */
  rollLengthMm: number
  /** total boundary to be fenced, mm */
  boundaryLengthMm: number
}

export interface ChainLinkResult {
  weightPerSqm: number
  weightPerRoll: number
  rollsRequired: number
  totalWeight: number
}

/**
 * Chain-link fabric is a diamond weave of round wire. For a diamond mesh with
 * side length M (mm) and diagonals D1 = D2 = M√2 (the standard ~45° weave),
 * each square metre contains 1,000,000/M² diamonds, each contributing 4
 * sides of length M shared between 2 diamonds — giving 2,000,000/M mm,
 * i.e. 2000/M metres, of wire per m². Multiplying by the wire's own
 * weight-per-metre (from its round cross-section) gives fabric weight per m².
 *
 * This assumes "mesh size" is the diamond side length, as shown in the
 * diagram — some suppliers quote it differently, so confirm against theirs
 * before final pricing.
 */
export function calculateChainLink(input: ChainLinkInput): ChainLinkResult {
  const wireWeightPerMetre = roundBarArea(input.wireDiameter) * MS_DENSITY_FACTOR
  const wireLengthPerSqm = 2000 / input.meshSize
  const weightPerSqm = wireLengthPerSqm * wireWeightPerMetre

  const rollAreaSqm = (input.rollHeightMm / 1000) * (input.rollLengthMm / 1000)
  const weightPerRoll = weightPerSqm * rollAreaSqm

  const rollsRequired = Math.ceil(input.boundaryLengthMm / input.rollLengthMm)
  const totalWeight = weightPerRoll * rollsRequired

  return { weightPerSqm, weightPerRoll, rollsRequired, totalWeight }
}

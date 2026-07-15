/**
 * Cross-section area formulas, all dimensions in millimetres, all results in mm².
 * Weight-per-metre is derived uniformly from area in calculate.ts — keeping the
 * geometry isolated here means every shape is independently testable and the
 * density constant only lives in one place.
 */

export function flatArea(width: number, thickness: number): number {
  return width * thickness
}

export function roundBarArea(diameter: number): number {
  return (Math.PI / 4) * diameter ** 2
}

export function squareBarArea(side: number): number {
  return side ** 2
}

/** Hollow round section (pipe): OD and wall thickness. */
export function roundPipeArea(outerDiameter: number, wallThickness: number): number {
  const inner = outerDiameter - 2 * wallThickness
  return (Math.PI / 4) * (outerDiameter ** 2 - Math.max(inner, 0) ** 2)
}

/** Hollow square/rectangular section: outer width/height and wall thickness. */
export function rectHollowArea(width: number, height: number, wallThickness: number): number {
  const innerWidth = Math.max(width - 2 * wallThickness, 0)
  const innerHeight = Math.max(height - 2 * wallThickness, 0)
  return width * height - innerWidth * innerHeight
}

/** Equal or unequal leg angle, uniform thickness: exact for a constant-thickness L section. */
export function angleArea(legA: number, legB: number, thickness: number): number {
  return thickness * (legA + legB - thickness)
}

/**
 * Approximate I/C (beam/channel) section area from web + flange dimensions.
 * Real rolled sections have fillets and taper the trade tables account for —
 * this is a flat-plate approximation, offered only as a fallback when the
 * user doesn't already know the standard kg/m for the section.
 */
export function channelBeamArea(
  depth: number,
  flangeWidth: number,
  flangeThickness: number,
  webThickness: number,
): number {
  const webHeight = Math.max(depth - 2 * flangeThickness, 0)
  return 2 * flangeWidth * flangeThickness + webHeight * webThickness
}

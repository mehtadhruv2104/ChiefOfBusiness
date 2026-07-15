import { useMemo, useState } from 'react'
import { calculateChainLink } from '@/calculation-engine'
import { convertLength } from '@/lib/units'
import type { LengthUnit } from '@/lib/units'

interface FieldState {
  value: number | ''
  unit: LengthUnit
}

function mm(field: FieldState): number {
  if (field.value === '') return Number.NaN
  return convertLength(field.value, field.unit, 'mm')
}

const DEFAULT_ROLL_LENGTH_M = 10

export function useChainLinkCalculator() {
  const [boundaryLength, setBoundaryLength] = useState<FieldState>({ value: '', unit: 'm' })
  const [height, setHeight] = useState<FieldState>({ value: '', unit: 'ft' })
  const [wireDiameter, setWireDiameter] = useState<FieldState>({ value: '', unit: 'mm' })
  const [meshSize, setMeshSize] = useState<FieldState>({ value: '', unit: 'mm' })
  const [rollLength, setRollLength] = useState<FieldState>({
    value: DEFAULT_ROLL_LENGTH_M,
    unit: 'm',
  })

  const result = useMemo(() => {
    const boundaryLengthMm = mm(boundaryLength)
    const rollHeightMm = mm(height)
    const wireDiameterMm = mm(wireDiameter)
    const meshSizeMm = mm(meshSize)
    const rollLengthMm = mm(rollLength)

    if (
      ![boundaryLengthMm, rollHeightMm, wireDiameterMm, meshSizeMm, rollLengthMm].every(
        (v) => Number.isFinite(v) && v > 0,
      )
    ) {
      return null
    }

    return calculateChainLink({
      boundaryLengthMm,
      rollHeightMm,
      wireDiameter: wireDiameterMm,
      meshSize: meshSizeMm,
      rollLengthMm,
    })
  }, [boundaryLength, height, wireDiameter, meshSize, rollLength])

  return {
    boundaryLength,
    setBoundaryLength,
    height,
    setHeight,
    wireDiameter,
    setWireDiameter,
    meshSize,
    setMeshSize,
    rollLength,
    setRollLength,
    result,
  }
}

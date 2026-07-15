import { useMemo, useState } from 'react'
import { calculateMaterial } from '@/calculation-engine'
import type { MaterialCategory, MaterialLibraryItem } from '@/data/materials'
import { buildCalculationInput } from '../utils/buildCalculationInput'
import { getActiveFields } from '../utils/fields'
import type { ChannelBeamMode, FieldState, FieldStateMap } from '../types'

function initFields(category: MaterialCategory, mode: ChannelBeamMode, prefill: Record<string, number>) {
  const fields = getActiveFields(category, mode)
  const map: FieldStateMap = {}
  for (const field of fields) {
    map[field.key] = {
      value: prefill[field.key] ?? '',
      unit: field.defaultUnit,
    }
  }
  return map
}

export function useMaterialCalculator() {
  const [category, setCategory] = useState<MaterialCategory | null>(null)
  const [materialName, setMaterialName] = useState('')
  const [channelMode, setChannelMode] = useState<ChannelBeamMode>('direct')
  const [fields, setFields] = useState<FieldStateMap>({})
  const [length, setLength] = useState<FieldState>({ value: '', unit: 'mm' })
  const [pieces, setPieces] = useState<number | ''>(1)
  const [rate, setRate] = useState<number | ''>('')

  function selectItem(item: MaterialLibraryItem, cat: MaterialCategory) {
    setCategory(cat)
    setMaterialName(item.name)
    setChannelMode('direct')
    setFields(initFields(cat, 'direct', item.prefill))
    setLength({ value: '', unit: 'mm' })
    setPieces(1)
    setRate('')
  }

  function selectCustom(cat: MaterialCategory) {
    setCategory(cat)
    setMaterialName(`Custom ${cat.label}`)
    setChannelMode('direct')
    setFields(initFields(cat, 'direct', {}))
    setLength({ value: '', unit: 'mm' })
    setPieces(1)
    setRate('')
  }

  function reset() {
    setCategory(null)
    setMaterialName('')
    setFields({})
    setLength({ value: '', unit: 'mm' })
    setPieces(1)
    setRate('')
  }

  function setChannelModeAndReinit(mode: ChannelBeamMode) {
    if (!category) return
    setChannelMode(mode)
    setFields(initFields(category, mode, {}))
  }

  function updateField(key: string, value: number | '') {
    setFields((prev) => ({ ...prev, [key]: { ...prev[key], value } }))
  }

  function updateFieldUnit(key: string, unit: string) {
    setFields((prev) => ({ ...prev, [key]: { ...prev[key], unit } }))
  }

  const calculationInput = useMemo(() => {
    if (!category) return null
    return buildCalculationInput(category, fields, channelMode, length, pieces)
  }, [category, fields, channelMode, length, pieces])

  const result = useMemo(() => {
    if (!calculationInput) return null
    return calculateMaterial(calculationInput)
  }, [calculationInput])

  return {
    category,
    materialName,
    channelMode,
    fields,
    length,
    pieces,
    rate,
    result,
    isValid: result !== null,
    selectItem,
    selectCustom,
    reset,
    setChannelMode: setChannelModeAndReinit,
    updateField,
    updateFieldUnit,
    setLength,
    setPieces,
    setRate,
  }
}

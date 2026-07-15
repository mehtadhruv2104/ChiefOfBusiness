import type { MaterialCategory } from '@/data/materials'
import { getActiveFields } from './fields'
import type { ChannelBeamMode, FieldState, FieldStateMap } from '../types'

export function formatSpecification(
  category: MaterialCategory,
  fields: FieldStateMap,
  channelMode: ChannelBeamMode,
  length: FieldState,
): string {
  const parts: string[] = []
  for (const field of getActiveFields(category, channelMode)) {
    const state = fields[field.key]
    if (!state || state.value === '') continue
    parts.push(`${field.label} ${state.value}${state.unit}`)
  }
  if (category.hasLength && length.value !== '') {
    parts.push(`Length ${length.value}${length.unit}`)
  }
  return parts.join(', ')
}

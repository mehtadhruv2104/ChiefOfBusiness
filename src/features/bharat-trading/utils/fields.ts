import type { MaterialCategory } from '@/data/materials'
import type { ChannelBeamMode } from '../types'

/** channel_beam swaps its dimension fields based on direct-entry vs calculated mode; every other category has one fixed set. */
export function getActiveFields(category: MaterialCategory, channelMode: ChannelBeamMode) {
  return category.modes ? category.modes[channelMode] : category.fields
}

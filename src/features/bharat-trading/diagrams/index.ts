import type { ComponentType } from 'react'
import { AngleDiagram } from './AngleDiagram'
import { ChannelBeamDiagram } from './ChannelBeamDiagram'
import { FlatDiagram } from './FlatDiagram'
import { PlateDiagram } from './PlateDiagram'
import { RectPipeDiagram } from './RectPipeDiagram'
import { RoundBarDiagram } from './RoundBarDiagram'
import { RoundPipeDiagram } from './RoundPipeDiagram'
import { SheetManualDiagram } from './SheetManualDiagram'
import { SquareBarDiagram } from './SquareBarDiagram'
import { SquarePipeDiagram } from './SquarePipeDiagram'

export const DIAGRAM_REGISTRY: Record<string, ComponentType> = {
  flat: FlatDiagram,
  plate: PlateDiagram,
  round_bar: RoundBarDiagram,
  square_bar: SquareBarDiagram,
  round_pipe: RoundPipeDiagram,
  square_pipe: SquarePipeDiagram,
  rect_pipe: RectPipeDiagram,
  angle: AngleDiagram,
  channel_beam: ChannelBeamDiagram,
  sheet_manual: SheetManualDiagram,
}

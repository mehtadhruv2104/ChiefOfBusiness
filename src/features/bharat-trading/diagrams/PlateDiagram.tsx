import { DiagramFrame, HDim, Leader, STEEL_FILL, STEEL_STROKE, VDim } from '@/components/diagrams/shared'

export function PlateDiagram() {
  return (
    <DiagramFrame>
      <rect x={45} y={28} width={140} height={82} fill={STEEL_FILL} stroke={STEEL_STROKE} strokeWidth={1.5} />
      <HDim x1={45} x2={185} y={122} label="Length" />
      <VDim x={33} y1={28} y2={110} label="Width" />
      <Leader fromX={185} fromY={40} toX={200} toY={30} label="Thickness" anchor="start" />
    </DiagramFrame>
  )
}
